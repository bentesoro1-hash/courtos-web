import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();

  // 1) Notify the CourtOS team of the new signup.
  //    Failure-isolated: the signup is already saved to Supabase before this API
  //    is called, so a Resend hiccup must NOT surface an error to the tester.
  try {
    await resend.emails.send({
      from: 'CourtOS <hello@courtos.co>',
      to: 'courtos@courtos.co',
      subject: '🏐 New CourtOS Beta Signup!',
      html: `
        <h2>New Beta Signup</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Club/Team:</strong> ${body.organization}</p>
        <p><strong>Level:</strong> ${body.coaching_level}</p>
        <p><strong>Notes:</strong> ${body.frustration}</p>
      `,
    });
  } catch {
    // Team notification is best-effort — never fail the signup over it.
  }

  // 2) Auto-send the tester their download link — only once TESTFLIGHT_LINK is set.
  //    Set TESTFLIGHT_LINK in Vercel env vars the day your public link is live;
  //    no code change needed. Optional ANDROID_TEST_LINK adds a second button.
  const testflightLink = process.env.TESTFLIGHT_LINK;
  const androidLink = process.env.ANDROID_TEST_LINK;

  if (testflightLink && body.email) {
    const firstName = (body.name || '').trim().split(/\s+/)[0] || 'Coach';
    const button = (href: string, label: string) => `
      <a href="${href}" style="display:inline-block;background:#3DBE6B;color:#000;
        font-weight:700;text-transform:uppercase;letter-spacing:0.04em;
        padding:14px 26px;border-radius:8px;text-decoration:none;font-size:15px;margin:6px 0;">
        ${label}
      </a>`;

    try {
      await resend.emails.send({
        from: 'CourtOS <hello@courtos.co>',
        to: body.email,
        subject: "You're in — install the CourtOS beta 🏐",
        html: `
          <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
            max-width:520px;margin:0 auto;color:#1a1a1a;line-height:1.6;">
            <h2 style="margin:0 0 6px;">Welcome to the CourtOS beta, ${firstName}!</h2>
            <p style="margin:0 0 18px;color:#444;">
              Your entire coaching staff, in one tap. Tap below to install CourtOS on your phone
              and start running matches from the sideline.
            </p>
            <p style="margin:0 0 6px;">${button(testflightLink, 'Install on iPhone (TestFlight)')}</p>
            ${androidLink ? `<p style="margin:0 0 6px;">${button(androidLink, 'Install on Android')}</p>` : ''}
            <p style="margin:18px 0 6px;color:#666;font-size:13px;">
              On iPhone you'll first install Apple's free <strong>TestFlight</strong> app, then the link
              opens CourtOS inside it. Reply to this email if anything gives you trouble — we read every message.
            </p>
            <p style="margin:14px 0 0;color:#888;font-size:12px;">— The CourtOS team · OPERATE. COACH. WIN.</p>
          </div>
        `,
      });
    } catch {
      // Don't fail the signup if the welcome email bounces — the team notification already sent.
    }
  }

  return NextResponse.json({ ok: true });
}
