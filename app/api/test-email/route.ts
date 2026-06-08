import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const { data, error } = await resend.emails.send({
    from: 'CourtOS <hello@courtos.co>',
    to: ['bentesoro1@gmail.com'],
    subject: 'CourtOS email test',
    html: '<p>Email working!</p>',
  });

  if (error) {
    return Response.json({ error }, { status: 400 });
  }

  return Response.json({ data });
}
