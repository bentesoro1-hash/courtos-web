import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { clientIp, hitRateLimit } from '@/lib/rateLimit.server';

const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const clip = (v: unknown, n: number) => String(v ?? '').slice(0, n);

export async function POST(req: Request) {
  try {
    // Rate limit: 10/hour per IP. Durable, server-side only (lib/rateLimit.server.ts)
    // and fail closed: no email is sent unless the limiter allows it.
    const limit = await hitRateLimit('reset-ip', clientIp(req), 10, 3600);
    if (limit === 'limited') return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    if (limit !== 'allowed') return NextResponse.json({ error: 'Temporarily unavailable' }, { status: 503 });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const userId = clip(body.userId, 100);
    const userEmail = clip(body.userEmail, 200);
    const resetAt = clip(body.resetAt, 60);
    const kind = clip(body.kind, 40);

    const label = kind === 'match_history' ? 'Match History Delete' : 'Full App Reset';

    await resend.emails.send({
      from: 'CourtOS <hello@courtos.co>',
      to: 'bentesoro1@gmail.com',
      subject: `⚠️ CourtOS ${label}: ${esc(userEmail || 'unknown user')}`,
      html: `
        <h2>CourtOS — ${label}</h2>
        <p>A user performed a destructive action. Their data is soft-deleted /
        backed up and recoverable for <strong>30 days</strong>.</p>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><strong>Action:</strong></td><td>${label}</td></tr>
          <tr><td><strong>User:</strong></td><td>${esc(userEmail || '—')}</td></tr>
          <tr><td><strong>User ID:</strong></td><td><code>${esc(userId || '—')}</code></td></tr>
          <tr><td><strong>When:</strong></td><td>${esc(resetAt || '—')}</td></tr>
        </table>

        <h3>Recover their roster data (Supabase SQL editor)</h3>
        <pre style="background:#0f172a;color:#e2e8f0;padding:12px;border-radius:8px;overflow:auto">
update public.teams
  set deleted_at = null
  where owner_id = '${esc(userId)}' and deleted_at is not null;

update public.lineups
  set deleted_at = null
  where team_id in (select id from public.teams where owner_id = '${esc(userId)}')
    and deleted_at is not null;

update public.players
  set deleted_at = null
  where team_id in (select id from public.teams where owner_id = '${esc(userId)}')
    and deleted_at is not null;</pre>

        <h3>Recover their match history &amp; season stats</h3>
        <p>These live only on-device, so a JSON snapshot was saved to
        <code>data_backups</code>. Pull the most recent one and send it back to the user:</p>
        <pre style="background:#0f172a;color:#e2e8f0;padding:12px;border-radius:8px;overflow:auto">
select payload
  from public.data_backups
  where owner_id = '${esc(userId)}'
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
