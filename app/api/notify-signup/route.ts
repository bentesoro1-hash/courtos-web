import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { clientIp, emailBucketKey, hitRateLimit, serviceRoleClient } from '@/lib/rateLimit.server';

// ── Abuse controls ────────────────────────────────────────────────────────────
// This endpoint is public: it records the beta signup and sends Resend email.
// It is validated, honeypot-gated and rate-limited server-side (5/hour per IP,
// 3/day per inbox) through the service-role-only limiter in
// lib/rateLimit.server.ts, and every user value is HTML-escaped before it goes
// into an email. The limiter FAILS CLOSED: if it cannot answer, nothing is
// inserted and nothing is sent.
const MAX_BODY_BYTES = 8 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const clip = (v: unknown, n: number) => String(v ?? '').slice(0, n);
const tooMany = () => NextResponse.json({ error: 'Too many requests' }, { status: 429 });
const unavailable = () => NextResponse.json({ error: 'Temporarily unavailable' }, { status: 503 });

// ── Install links (set in Vercel → Settings → Environment Variables) ──────────
//   TESTFLIGHT_LINK   iOS TestFlight public/opt-in URL
//   ANDROID_TEST_LINK Google Play opt-in URL for the closed test
//   ANDROID_GROUP_URL (optional) Google Group join link — the self-serve tester
//                     list. When set, the Android email tells testers to join it
//                     themselves so no manual adding is needed on our end.
// The tester ALWAYS gets an acknowledgment email now (even before links exist),
// so nobody is left wondering whether/when a link is coming.

const BTN = (href: string, label: string) => `
  <a href="${href}" style="display:inline-block;background:#3DBE6B;color:#000;
    font-weight:700;text-transform:uppercase;letter-spacing:0.04em;
    padding:14px 26px;border-radius:8px;text-decoration:none;font-size:15px;margin:6px 0;">
    ${label}
  </a>`;
const NOTE = 'margin:12px 0 4px;color:#666;font-size:13px;line-height:1.6;';
const WRAP = (inner: string) => `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
    max-width:520px;margin:0 auto;color:#1a1a1a;line-height:1.6;">
    ${inner}
    <p style="margin:16px 0 6px;color:#666;font-size:13px;">
      Reply to this email if anything gives you trouble — we read every message.
    </p>
    <p style="margin:14px 0 0;color:#888;font-size:12px;">— The CourtOS team · OPERATE. COACH. WIN.</p>
  </div>`;

export async function POST(req: Request) {
  // Reject oversized bodies before parsing.
  const len = Number(req.headers.get('content-length') ?? 0);
  if (len && len > MAX_BODY_BYTES) return NextResponse.json({ error: 'Too large' }, { status: 413 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }); }

  // Honeypot: bots fill the hidden field. Pretend success, send nothing.
  if (typeof body.hp === 'string' && body.hp.trim() !== '') return NextResponse.json({ ok: true });

  const platform: string = clip(body.platform, 20);
  const rawEmail: string = clip(body.email, 200).trim();
  const email: string = rawEmail.toLowerCase();

  // Validate email up front — the welcome email goes to this address, so a bad or
  // missing address means we don't send anything (kills the "mail a stranger" relay).
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Valid email required' }, { status: 400 });

  // Rate limit: per-IP, then per-inbox. Durable across serverless instances,
  // server-side only, and fail closed: no insert and no email unless allowed.
  const byIp = await hitRateLimit('signup-ip', clientIp(req), 5, 3600);
  if (byIp !== 'allowed') return byIp === 'limited' ? tooMany() : unavailable();
  const byEmail = await hitRateLimit('signup-email', emailBucketKey(email), 3, 86400);
  if (byEmail !== 'allowed') return byEmail === 'limited' ? tooMany() : unavailable();

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Sanitize everything that reaches the database or an email body.
  const name = clip(body.name, 100);
  const firstName = esc(name.trim().split(/\s+/)[0] || 'Coach');
  const organization = clip(body.organization, 120);
  const coachingLevel = clip(body.coaching_level, 60);
  const frustration = clip(body.frustration, 1000);

  // 0) Record the signup. The browser no longer writes beta_signups itself, so the
  //    limits above gate the insert as well as the emails.
  const db = serviceRoleClient();
  if (!db) return unavailable();
  const { error: insertError } = await db.from('beta_signups').insert([{
    name: name.trim(),
    email: rawEmail,
    organization: organization.trim() || null,
    coaching_level: coachingLevel,
    frustration: frustration.trim() || null,
    source: `courtos.co/beta-${platform === 'ios' || platform === 'android' ? platform : 'unknown'}`,
  }]);
  if (insertError) return NextResponse.json({ error: 'Signup failed' }, { status: 500 });

  // 1) Notify the CourtOS team. Android signups are flagged in the subject so
  //    they're easy to triage (they may need a manual add if the group isn't self-serve).
  try {
    await resend.emails.send({
      from: 'CourtOS <hello@courtos.co>',
      to: 'courtos@courtos.co',
      subject: platform === 'android'
        ? '🤖 New Android Beta Signup — check tester access'
        : '🏐 New CourtOS Beta Signup!',
      html: `
        <h2>New Beta Signup</h2>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Club/Team:</strong> ${esc(organization)}</p>
        <p><strong>Level:</strong> ${esc(coachingLevel)}</p>
        <p><strong>Platform:</strong> ${platform === 'ios' ? '📱 iPhone (iOS)' : platform === 'android' ? '🤖 Android' : (esc(platform) || '—')}</p>
        <p><strong>Notes:</strong> ${esc(frustration)}</p>
      `,
    });
  } catch {
    // Team notification is best-effort — never fail the signup over it.
  }

  // 2) Always send the tester an acknowledgment, tailored to their phone.
  const testflightLink = process.env.TESTFLIGHT_LINK;
  const androidLink = process.env.ANDROID_TEST_LINK;
  const androidGroup = process.env.ANDROID_GROUP_URL;

  if (email) {
    let subject = "You're on the CourtOS beta list 🏐";
    let inner = '';

    if (platform === 'android') {
      const steps: string[] = [];
      if (androidGroup) steps.push(`${BTN(androidGroup, 'Step 1 · Join the testers group')}`);
      if (androidLink) steps.push(`${BTN(androidLink, `${androidGroup ? 'Step 2 · ' : ''}Get CourtOS on Google Play`)}`);
      const hasLinks = steps.length > 0;
      subject = hasLinks ? 'Install the CourtOS Android beta 🤖' : "You're on the CourtOS Android list 🤖";
      inner = `
        <h2 style="margin:0 0 6px;">Welcome, ${firstName}!</h2>
        <p style="margin:0 0 14px;color:#444;">
          You're on the CourtOS Android beta. Android access runs through Google Play,
          so there are a couple of quick steps${hasLinks ? ' — do them on the phone you will use:' : ':'}
        </p>
        ${hasLinks ? steps.map((s) => `<p style="margin:0 0 6px;">${s}</p>`).join('') : ''}
        <p style="${NOTE}">
          ⏱️ <strong>Heads up on timing:</strong> Google Play can take up to about an hour to
          activate your access after you ${hasLinks ? 'join / opt in' : 'are added'}. If the Play
          Store says "not a tester" or can't find the app yet, wait a bit and try again — it's normal.
        </p>
        <p style="${NOTE}">
          Make sure you're signed into Google Play with <strong>${email}</strong> (the Google
          account on your phone) — that's how access is granted.
        </p>
        ${hasLinks ? '' : `<p style="${NOTE}">We're setting up your access now — nothing else to do. You'll get your install link here within 24 hours.</p>`}
      `;
    } else if (platform === 'ios') {
      const hasLink = !!testflightLink;
      subject = hasLink ? 'Install the CourtOS beta 🏐' : "You're on the CourtOS beta list 🏐";
      inner = `
        <h2 style="margin:0 0 6px;">Welcome to the CourtOS beta, ${firstName}!</h2>
        <p style="margin:0 0 16px;color:#444;">Your entire coaching staff, in one tap.</p>
        ${hasLink ? `<p style="margin:0 0 6px;">${BTN(testflightLink!, 'Install on iPhone (TestFlight)')}</p>
          <p style="${NOTE}">First time? The link opens Apple's free <strong>TestFlight</strong> app, then installs CourtOS inside it.</p>`
          : `<p style="${NOTE}">Your TestFlight invite is on its way — check your inbox shortly.</p>`}
      `;
    } else {
      // Unknown platform — offer whatever links exist.
      const parts: string[] = [];
      if (testflightLink) parts.push(`<p style="margin:0 0 6px;">${BTN(testflightLink, 'Install on iPhone (TestFlight)')}</p>`);
      if (androidLink) parts.push(`<p style="margin:0 0 6px;">${BTN(androidLink, 'Get CourtOS on Google Play')}</p>`);
      inner = `
        <h2 style="margin:0 0 6px;">You're on the list, ${firstName}!</h2>
        ${parts.length ? parts.join('') : `<p style="${NOTE}">Your beta install link is on its way — check your inbox shortly.</p>`}
      `;
    }

    try {
      await resend.emails.send({ from: 'CourtOS <hello@courtos.co>', to: email, subject, html: WRAP(inner) });
    } catch {
      // Don't fail the signup if the welcome email bounces — the team notification already sent.
    }
  }

  return NextResponse.json({ ok: true });
}
