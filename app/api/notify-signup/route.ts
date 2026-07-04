import { Resend } from 'resend';
import { NextResponse } from 'next/server';

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
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();

  const platform: string = body.platform || '';
  const firstName = (body.name || '').trim().split(/\s+/)[0] || 'Coach';
  const email: string = (body.email || '').trim();

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
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Club/Team:</strong> ${body.organization}</p>
        <p><strong>Level:</strong> ${body.coaching_level}</p>
        <p><strong>Platform:</strong> ${platform === 'ios' ? '📱 iPhone (iOS)' : platform === 'android' ? '🤖 Android' : (platform || '—')}</p>
        <p><strong>Notes:</strong> ${body.frustration}</p>
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
