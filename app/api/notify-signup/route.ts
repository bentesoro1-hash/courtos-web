import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();

  await resend.emails.send({
    from: 'CourtOS <hello@courtos.co>',
    to: 'bentesoro1@gmail.com',
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

  return NextResponse.json({ ok: true });
}
