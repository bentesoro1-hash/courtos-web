import type { Metadata } from 'next'
import LegalShell from '@/components/LegalShell'

export const metadata: Metadata = {
  title: 'Support — CourtOS',
  description: 'Get help with CourtOS — contact support, report a bug, or find answers to common questions.',
  alternates: { canonical: '/support' },
}

export default function SupportPage() {
  return (
    <LegalShell title="Support" effectiveDate="September 3, 2026">
      <div className="note">
        <p>
          <strong>Need help fast?</strong> Email{' '}
          <a href="mailto:support@courtos.co">support@courtos.co</a> and we&rsquo;ll get back to you — usually
          within a day.
        </p>
      </div>

      <p>
        CourtOS is built and supported by a small team, so support is hands-on. Reach out any time for a bug,
        a question about how something works, or feedback on what to build next.
      </p>

      <h2>Contact us</h2>
      <p>
        Email <a href="mailto:support@courtos.co">support@courtos.co</a> for anything — account issues, bugs,
        billing questions, or feature requests. Include your team name and, if it&rsquo;s a bug, what you were
        doing when it happened; it helps us track it down faster.
      </p>

      <h2>In the app</h2>
      <p>
        You can also reach us without leaving CourtOS: open the <strong>More</strong> tab and tap{' '}
        <strong>Help</strong>, or use <strong>Report a Bug</strong> to send feedback directly from wherever
        you are in the app.
      </p>

      <h2>Common questions</h2>
      <h3>How do I delete my account or my data?</h3>
      <p>
        See our <a href="/delete-account">account deletion page</a> — you can do it directly in the app, or by
        emailing us.
      </p>
      <h3>Is my roster and match data private?</h3>
      <p>
        Yes. See our <a href="/privacy">Privacy Policy</a> for exactly what we collect and how it&rsquo;s used —
        we don&rsquo;t sell your data or your athletes&rsquo; data.
      </p>
      <h3>I found a bug or the app crashed — what do you need from me?</h3>
      <p>
        The device you were on, what you were doing right before it happened, and a screenshot if you have one.
        Email <a href="mailto:support@courtos.co">support@courtos.co</a> or use Report a Bug in the app.
      </p>
    </LegalShell>
  )
}
