import type { Metadata } from 'next'
import LegalShell from '@/components/LegalShell'

export const metadata: Metadata = {
  title: 'Privacy Policy — CourtOS',
  description: 'How CourtOS collects, uses, and protects your data, including youth athlete information.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" effectiveDate="June 14, 2026">
      <div className="note">
        <p>
          <strong>Plain-language summary:</strong> CourtOS is a tool for volleyball coaches. We collect the
          information needed to run your account and track your matches, rosters, and stats. We do not sell your
          data or your athletes&rsquo; data. Player roster entries may include youth athletes&rsquo; information —
          we treat that data carefully and only use it to provide coaching features. You can request deletion at
          any time at <a href="mailto:courtos@courtos.co">courtos@courtos.co</a>.
        </p>
      </div>

      <p>
        This Privacy Policy explains how <strong>[LLC LEGAL NAME], a [STATE] limited liability company</strong>{' '}
        (&ldquo;CourtOS,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and
        shares information in connection with the CourtOS mobile application and the website at courtos.co
        (together, the &ldquo;Service&rdquo;). By using the Service, you agree to this Policy.
      </p>

      <h2>1. Who can use CourtOS</h2>
      <p>
        CourtOS is built for volleyball coaches and the people who support a team (assistant coaches, club
        directors, and parents/guardians). You must be at least 13 years old to create an account. If you are
        under 18, you may only use the Service with the involvement and permission of a parent, guardian, or
        coach. See <strong>&ldquo;Children&rsquo;s Privacy&rdquo;</strong> below for how we handle information
        about minors.
      </p>

      <h2>2. Information we collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li>
          <strong>Account information</strong> — your email address and authentication details when you create
          an account or sign in.
        </li>
        <li>
          <strong>Team and roster data</strong> — team names, and for each player you add: name (often a first
          name or nickname), jersey number, and position. This roster data may describe minors.
        </li>
        <li>
          <strong>Match and performance data</strong> — scores, rotations, substitutions, and per-player
          statistics (e.g., kills, aces, errors, passing) that you record during matches.
        </li>
        <li>
          <strong>Communications</strong> — messages you send us (e.g., support emails) and information you
          submit through forms such as a beta or waitlist signup.
        </li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Device and usage data</strong> — basic technical information such as device type, app version,
          and crash/diagnostic logs used to keep the app stable.
        </li>
        <li>
          <strong>Purchase status</strong> — whether you hold an active subscription (entitlement), provided by
          the app store and our subscription processor. We do not receive or store your full payment card
          details.
        </li>
      </ul>

      <h2>3. How we use information</h2>
      <ul>
        <li>To provide and operate the Service — your account, rosters, live match tracking, and stats.</li>
        <li>To sync your data across your devices and back it up so you don&rsquo;t lose match data.</li>
        <li>To process and manage subscriptions and entitlements.</li>
        <li>
          To generate optional AI features (such as match summaries and practice recommendations) when you
          request them — see <strong>&ldquo;AI features&rdquo;</strong> below.
        </li>
        <li>To respond to support requests and send service-related communications.</li>
        <li>To maintain security, prevent abuse, fix bugs, and improve the Service.</li>
        <li>To comply with legal obligations.</li>
      </ul>
      <p>
        We rely on the following legal bases where applicable: performance of our contract with you, your
        consent (which you may withdraw), our legitimate interests in operating and improving the Service, and
        compliance with law.
      </p>

      <h2>4. AI features</h2>
      <p>
        Certain optional features use a third-party AI provider (Anthropic) to generate coaching insights from
        the match data you choose to analyze. When you trigger one of these features, the relevant match/stat
        data is sent to the provider solely to generate your result. We do not permit this data to be used to
        train third-party models. You can simply not use AI features if you prefer.
      </p>

      <h2>5. How we share information</h2>
      <p>We do not sell your personal information or your athletes&rsquo; information. We share data only with:</p>
      <ul>
        <li>
          <strong>Service providers</strong> that operate the Service on our behalf, under contract, including:
          our database and authentication host (Supabase), our subscription management provider (RevenueCat),
          the app stores (Apple, and Google if applicable) for payments, our email provider (Resend), and our AI
          provider (Anthropic) for features you request.
        </li>
        <li>
          <strong>Legal and safety</strong> — when required by law, or to protect the rights, safety, and
          security of our users or the public.
        </li>
        <li>
          <strong>Business transfers</strong> — in connection with a merger, acquisition, or sale of assets,
          subject to this Policy.
        </li>
      </ul>

      <h2>6. Children&rsquo;s privacy</h2>
      <p>
        CourtOS is a coaching tool, not a service directed to children, and it is not intended for children to
        use on their own. We do not knowingly allow children under 13 to create their own accounts.
      </p>
      <p>
        Because volleyball rosters include youth athletes, the app may contain information <em>about</em> minors
        (such as a first name, jersey number, position, and performance stats) that is entered by an adult coach.
        We act as a service provider to the coach/club and process that roster information only to provide the
        coaching features. We do not use minors&rsquo; information for advertising and do not sell it.
      </p>
      <p>
        If a parent, guardian, or coach believes a child under 13 has created an account or that we hold a
        child&rsquo;s information without appropriate authorization, contact{' '}
        <a href="mailto:courtos@courtos.co">courtos@courtos.co</a> and we will delete it promptly. Parents and
        guardians may request access to, correction of, or deletion of their child&rsquo;s information through
        the same address.
      </p>

      <h2>7. Data retention</h2>
      <p>
        We keep your information for as long as your account is active or as needed to provide the Service. You
        can delete teams, players, and match data in the app. When you delete your account, we delete or
        de-identify your personal data within a reasonable period, except where we must retain it to comply with
        law, resolve disputes, or enforce our agreements.
      </p>

      <h2>8. Security</h2>
      <p>
        We use reasonable administrative, technical, and organizational safeguards designed to protect your
        information, including access controls that scope data to the account that owns it. No method of
        transmission or storage is completely secure, so we cannot guarantee absolute security.
      </p>

      <h2>9. Your rights and choices</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete, or port your personal
        information, and to object to or restrict certain processing. Residents of California and certain other
        U.S. states have rights under applicable privacy laws, including the right not to be discriminated
        against for exercising them; we do not sell or &ldquo;share&rdquo; personal information for cross-context
        behavioral advertising. To exercise any right, email{' '}
        <a href="mailto:courtos@courtos.co">courtos@courtos.co</a>. You can also manage subscriptions and many
        data items directly in the app or your app store account.
      </p>

      <h2>10. International users</h2>
      <p>
        The Service is operated from the United States. If you use it from outside the U.S., you understand your
        information will be processed in the United States, which may have different data-protection laws than
        your country.
      </p>

      <h2>11. Changes to this Policy</h2>
      <p>
        We may update this Policy from time to time. If we make material changes, we will update the effective
        date above and, where appropriate, provide additional notice. Your continued use of the Service after an
        update means you accept the revised Policy.
      </p>

      <h2>12. Contact us</h2>
      <p>
        [LLC LEGAL NAME]
        <br />
        Email: <a href="mailto:courtos@courtos.co">courtos@courtos.co</a>
      </p>
    </LegalShell>
  )
}
