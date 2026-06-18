import type { Metadata } from 'next'
import LegalShell from '@/components/LegalShell'

export const metadata: Metadata = {
  title: 'Subscription Terms — CourtOS',
  description: 'Pricing, billing, auto-renewal, and cancellation terms for CourtOS subscriptions.',
  alternates: { canonical: '/subscription-terms' },
}

export default function SubscriptionTermsPage() {
  return (
    <LegalShell title="Subscription Terms" effectiveDate="June 14, 2026">
      <p>
        CourtOS offers a free tier plus two optional paid subscriptions. These Subscription Terms are part of our{' '}
        <a href="/terms">Terms of Service</a> and explain pricing, billing, auto-renewal, and cancellation.
      </p>

      <h2>Plans and pricing</h2>
      <ul>
        <li>
          <strong>Free</strong> — $0. Live match tracking plus a per-match stats taster.
        </li>
        <li>
          <strong>Coach Premium</strong> — $9.99 per month. Full visual stats, heat/point map, rotation
          analytics, advanced player stats, season trends, unlimited matches, multiple rosters and lineups, and
          auto-sub rules.
        </li>
        <li>
          <strong>Coach Advanced</strong> — $19.99 per month. Everything in Coach Premium plus AI features
          (match summaries, stat captions, insights, and practice recommendations).
        </li>
      </ul>
      <p>
        Prices are in U.S. dollars and may vary by region and over time. Any price shown in the app at the time
        of purchase is controlling. Applicable taxes may apply.
      </p>

      <h2>Billing and auto-renewal</h2>
      <ul>
        <li>
          Payment is charged to your <strong>Apple App Store</strong> account (or Google Play account, if
          applicable) at confirmation of purchase.
        </li>
        <li>
          Subscriptions <strong>automatically renew</strong> for the same period at the then-current price unless
          you cancel at least 24 hours before the end of the current period.
        </li>
        <li>
          Your account is charged for renewal within 24 hours before the end of the current period.
        </li>
      </ul>

      <h2>Managing and canceling</h2>
      <p>
        You can manage or cancel your subscription anytime in your app store account settings:
      </p>
      <ul>
        <li>
          <strong>iOS:</strong> Settings → your name → Subscriptions → CourtOS → Cancel.
        </li>
        <li>
          <strong>Android (if applicable):</strong> Google Play → Profile → Payments &amp; subscriptions →
          Subscriptions → CourtOS → Cancel.
        </li>
      </ul>
      <p>
        Canceling stops future renewals; you keep access until the end of the current paid period. Deleting the
        app does not cancel a subscription.
      </p>

      <h2>Restoring purchases</h2>
      <p>
        If you reinstall the app or switch devices using the same app store account, use{' '}
        <strong>&ldquo;Restore Purchases&rdquo;</strong> in the app to reactivate your subscription.
      </p>

      <h2>Refunds</h2>
      <p>
        Purchases are processed by the app stores, and refunds are handled under their policies. We do not
        directly process payments or issue store refunds. For Apple purchases, request a refund at{' '}
        <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">
          reportaproblem.apple.com
        </a>
        . Where required by law, you may have additional rights.
      </p>

      <h2>Free trials and promotions</h2>
      <p>
        If we offer a free trial or promotional price, the terms will be shown at sign-up. Unless stated
        otherwise, a subscription begins (and billing starts) when any free-trial period ends, unless you cancel
        beforehand. Unused portions of a free trial are forfeited when you purchase a subscription.
      </p>

      <h2>Changes</h2>
      <p>
        We may change plans, features, or pricing. If we change the price of an existing subscription, we will
        provide notice and, where required, obtain your consent before the change applies to you. Continued use
        after a change takes effect means you accept it.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about billing? Email <a href="mailto:support@courtos.co">support@courtos.co</a>.
      </p>
    </LegalShell>
  )
}
