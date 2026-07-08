import type { Metadata } from 'next'
import LegalShell from '@/components/LegalShell'

export const metadata: Metadata = {
  title: 'Delete Your Account — CourtOS',
  description: 'How to delete your CourtOS account and all associated data, in-app or by request.',
  alternates: { canonical: '/delete-account' },
}

export default function DeleteAccountPage() {
  return (
    <LegalShell title="Delete Your Account" effectiveDate="July 8, 2026">
      <div className="note">
        <p>
          <strong>Summary:</strong> You can permanently delete your <strong>CourtOS</strong> account and all of
          its data at any time — directly in the app, or by emailing us. Deletion is permanent and cannot be
          undone.
        </p>
      </div>

      <p>
        This page explains how to delete your account with <strong>CourtOS LLC</strong> (&ldquo;CourtOS&rdquo;),
        the developer of the CourtOS app, and what happens to your data when you do.
      </p>

      <h2>Delete your account in the app</h2>
      <p>The fastest way — from the device where you&rsquo;re signed in:</p>
      <ul>
        <li>Open <strong>CourtOS</strong>.</li>
        <li>Tap the <strong>More</strong> tab (bottom navigation).</li>
        <li>Open the <strong>Danger Zone</strong> section.</li>
        <li>Tap <strong>Delete Account</strong>.</li>
        <li>Type <strong>DELETE</strong> to confirm.</li>
      </ul>
      <p>
        Your account and all associated data are then <strong>permanently erased right away</strong> — there is
        no recovery step.
      </p>

      <h2>Delete your account by request</h2>
      <p>
        If you can&rsquo;t access the app, email{' '}
        <a href="mailto:support@courtos.co">support@courtos.co</a> from the email address on your CourtOS account,
        with the subject <strong>&ldquo;Delete my account.&rdquo;</strong> We&rsquo;ll verify it&rsquo;s your
        account and complete the deletion within <strong>30 days</strong> (typically much sooner).
      </p>

      <h2>What gets deleted</h2>
      <p>Deleting your account permanently removes:</p>
      <ul>
        <li>Your account and login (email address / sign-in credentials).</li>
        <li>Your teams and rosters, including any player entries you created.</li>
        <li>Your lineups and formations.</li>
        <li>Your saved matches, match history, and statistics.</li>
        <li>Any backups associated with your account.</li>
      </ul>

      <h2>What we keep</h2>
      <p>
        After deletion we do not retain your personal data. The only exception is a limited set of records we are
        legally required to keep (for example, tax or transaction records related to a paid subscription), which
        are retained only for the period required by law and are not used for any other purpose. These contain no
        roster, athlete, match, or usage data.
      </p>

      <h2>Retention period</h2>
      <p>
        In-app deletion is <strong>immediate and permanent</strong>. Email-based deletion requests are completed
        within <strong>30 days</strong>. Once deleted, your data cannot be restored.
      </p>
      <p>
        (Note: CourtOS also offers an in-app &ldquo;reset&rdquo; that clears your current data but keeps a
        recoverable backup for 30 days. That is a separate feature from account deletion — full account deletion,
        described above, removes everything with no recovery.)
      </p>
    </LegalShell>
  )
}
