import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllPosts } from './posts'

export const metadata: Metadata = {
  title: 'CourtOS Academy — Volleyball Coaching Guides',
  description:
    'Practical volleyball coaching guides: rotations, stats, lineups, and how to run your bench from the sideline. From the team behind CourtOS.',
  alternates: { canonical: 'https://courtos.co/blog' },
  openGraph: {
    title: 'CourtOS Academy — Volleyball Coaching Guides',
    description: 'Practical volleyball coaching guides on rotations, stats, and lineups.',
    url: 'https://courtos.co/blog',
    type: 'website',
  },
}

export default function BlogIndex() {
  const posts = getAllPosts()
  return (
    <>
      <Navbar />
      <main style={{ background: '#0C0C0C', minHeight: '100vh', paddingTop: 64 }}>
        <div style={{ maxWidth: 920, margin: '0 auto', padding: '72px 24px 96px' }}>
          <p style={{ color: '#3DBE6B', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
            CourtOS Academy
          </p>
          <h1 className="font-bebas" style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1, color: '#F0F0F0', letterSpacing: '0.02em', marginBottom: 14 }}>
            VOLLEYBALL COACHING GUIDES
          </h1>
          <p style={{ color: '#888', fontSize: 17, maxWidth: 560, marginBottom: 48 }}>
            Rotations, stats, lineups, and sideline strategy — written for club and high-school coaches.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                <article
                  style={{
                    background: '#141414', border: '1px solid #242424', borderRadius: 16,
                    padding: '24px 26px', transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ color: '#555', fontSize: 12, marginBottom: 8, letterSpacing: '0.04em' }}>
                    {new Date(p.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {p.readingMinutes} min read
                  </div>
                  <h2 style={{ color: '#F0F0F0', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{p.title}</h2>
                  <p style={{ color: '#888', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{p.excerpt}</p>
                  <span style={{ color: '#3DBE6B', fontSize: 14, fontWeight: 700, display: 'inline-block', marginTop: 14 }}>
                    Read guide →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
