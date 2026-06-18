import type { Metadata } from 'next'
import LegalShell from '@/components/LegalShell'

export const metadata: Metadata = {
  title: 'Terms of Service — CourtOS',
  description: 'The terms that govern your use of the CourtOS app and website.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" effectiveDate="June 14, 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) are a legal agreement between you and{' '}
        <strong>CourtOS LLC, a California limited liability company</strong> (&ldquo;CourtOS,&rdquo;
        &ldquo;we,&rdquo; &ldquo;us&rdquo;), governing your use of the CourtOS mobile application and the website
        at courtos.co (together, the &ldquo;Service&rdquo;). By creating an account or using the Service, you
        agree to these Terms and to our{' '}
        <a href="/privacy">Privacy Policy</a>. If you do not agree, do not use the Service.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 13 years old to use the Service, and if you are under 18 you may use it only with
        the permission and involvement of a parent, guardian, or coach. By using the Service you represent that
        you meet these requirements and that any information you provide is accurate.
      </p>

      <h2>2. Your account</h2>
      <p>
        You are responsible for your account credentials and for activity under your account. Keep your login
        secure and notify us at <a href="mailto:support@courtos.co">support@courtos.co</a> if you suspect
        unauthorized use. We may suspend or terminate accounts that violate these Terms.
      </p>

      <h2>3. Roster and athlete data — your responsibility</h2>
      <p>
        CourtOS lets you create teams and add players, including youth athletes. You represent and warrant that
        you have the necessary authority and permission (for example, from a club, the athletes, and/or their
        parents or guardians, as required) to enter and process the roster and performance information you add.
        You agree not to upload sensitive personal information beyond what the Service is designed for (names,
        jersey numbers, positions, and volleyball statistics). You are responsible for how you use information
        about athletes.
      </p>

      <h2>4. Subscriptions and payment</h2>
      <p>
        CourtOS offers a free tier and paid subscriptions (Coach Premium and Coach Advanced). Paid subscriptions
        are billed through your app store account and auto-renew until canceled. Full pricing, renewal, and
        cancellation details are in our <a href="/subscription-terms">Subscription Terms</a>, which are part of
        these Terms.
      </p>

      <h2>5. License and acceptable use</h2>
      <p>
        We grant you a limited, non-exclusive, non-transferable, revocable license to use the Service for your
        own coaching purposes, subject to these Terms. You agree not to:
      </p>
      <ul>
        <li>copy, modify, reverse engineer, or create derivative works of the Service;</li>
        <li>resell, sublicense, or commercially exploit the Service without our permission;</li>
        <li>use the Service to break the law or infringe others&rsquo; rights;</li>
        <li>upload malware or attempt to disrupt, overload, or gain unauthorized access to the Service;</li>
        <li>scrape or harvest data from the Service except as expressly permitted.</li>
      </ul>

      <h2>6. Your content</h2>
      <p>
        You retain ownership of the data you create in the Service (teams, rosters, matches, stats). You grant us
        a limited license to host, store, process, and display that content solely to operate and improve the
        Service and to provide features you request (such as syncing and optional AI features). We do not claim
        ownership of your data.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        The Service itself — including the software, design, logos, and the &ldquo;CourtOS&rdquo; name — is owned
        by us and protected by intellectual-property laws. These Terms do not grant you any rights to our
        trademarks or branding.
      </p>

      <h2>8. AI features and accuracy</h2>
      <p>
        Optional AI features generate suggestions and summaries that may be inaccurate or incomplete. They are
        for informational purposes to assist your coaching judgment — they are not professional advice and should
        not be relied upon as the sole basis for decisions. You remain responsible for your coaching decisions.
      </p>

      <h2>9. Disclaimers</h2>
      <p>
        The Service is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any
        kind, whether express or implied, including merchantability, fitness for a particular purpose, and
        non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or that data will
        never be lost. You are responsible for keeping your own records where data integrity is critical.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, CourtOS and its owners will not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or for lost profits or data, arising out of or
        related to your use of the Service. Our total liability for any claim relating to the Service will not
        exceed the greater of the amount you paid us in the twelve months before the claim or US $50.
      </p>

      <h2>11. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless CourtOS and its owners from claims, damages, and expenses
        (including reasonable attorneys&rsquo; fees) arising from your use of the Service, your content, or your
        violation of these Terms or the rights of others.
      </p>

      <h2>12. Termination</h2>
      <p>
        You may stop using the Service and delete your account at any time. We may suspend or terminate your
        access if you violate these Terms or if necessary to protect the Service or other users. Sections that by
        their nature should survive termination (such as ownership, disclaimers, and limitation of liability)
        will survive.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of California, without regard to its conflict-of-laws
        rules. You agree that any dispute will be resolved in the state or federal courts located in California,
        except where applicable law gives you the right to bring a claim elsewhere.
      </p>

      <h2>14. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. If we make material changes, we will update the effective
        date above and provide notice where appropriate. Continued use of the Service after changes take effect
        means you accept the updated Terms.
      </p>

      <h2>15. Contact</h2>
      <p>
        CourtOS LLC
        <br />
        Email: <a href="mailto:support@courtos.co">support@courtos.co</a>
      </p>
    </LegalShell>
  )
}
