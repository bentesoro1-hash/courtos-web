import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { userId, userEmail, resetAt, kind } = body;

    const label = kind === 'match_history' ? 'Match History Delete' : 'Full App Reset';

    await resend.emails.send({
      from: 'CourtOS <hello@courtos.co>',
      to: 'bentesoro1@gmail.com',
      subject: `⚠️ CourtOS ${label}: ${userEmail ?? 'unknown user'}`,
      html: `
        <h2>CourtOS — ${label}</h2>
        <p>A user performed a destructive action. Their data is soft-deleted /
        backed up and recoverable for <strong>30 days</strong>.</p>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><strong>Action:</strong></td><td>${label}</td></tr>
          <tr><td><strong>User:</strong></td><td>${userEmail ?? '—'}</td></tr>
          <tr><td><strong>User ID:</strong></td><td><code>${userId ?? '—'}</code></td></tr>
          <tr><td><strong>When:</strong></td><td>${resetAt ?? '—'}</td></tr>
        </table>

        <h3>Recover their roster data (Supabase SQL editor)</h3>
        <pre style="background:#0f172a;color:#e2e8f0;padding:12px;border-radius:8px;overflow:auto">
update public.teams
  set deleted_at = null
  where owner_id = '${userId}' and deleted_at is not null;

update public.lineups
  set deleted_at = null
  where team_id in (select id from public.teams where owner_id = '${userId}')
    and deleted_at is not null;

update public.players
  set deleted_at = null
  where team_id in (select id from public.teams where owner_id = '${userId}')
    and deleted_at is not null;</pre>

        <h3>Recover their match history &amp; season stats</h3>
        <p>These live only on-device, so a JSON snapshot was saved to
        <code>data_backups</code>. Pull the most recent one and send it back to the user:</p>
        <pre style="background:#0f172a;color:#e2e8f0;padding:12px;border-radius:8px;overflow:auto">
select payload
  from public.data_backups
  where owner_id = '${userId}'
  order by created_at desc
  limit 1;</pre>

        <p style="color:#64748b;font-size:12px">Recoverable until 30 days from the timestamp above.</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[notify-reset] failed', e);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
