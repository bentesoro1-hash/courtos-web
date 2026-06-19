import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getPost, getAllPosts } from '../posts'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const url = `https://courtos.co/blog/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const url = `https://courtos.co/blog/${post.slug}`
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Organization', name: 'CourtOS' },
    publisher: { '@type': 'Organization', name: 'CourtOS', logo: { '@type': 'ImageObject', url: 'https://courtos.co/logo.png' } },
    mainEntityOfPage: url,
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://courtos.co' },
      { '@type': 'ListItem', position: 2, name: 'Academy', item: 'https://courtos.co/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }
  const faqLd = post.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null

  return (
    <>
      <Navbar />
      <main style={{ background: '#0C0C0C', minHeight: '100vh', paddingTop: 64 }}>
        <article style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 96px' }}>
          <Link href="/blog" style={{ color: '#3DBE6B', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            ← CourtOS Academy
          </Link>

          <div style={{ color: '#555', fontSize: 13, margin: '28px 0 10px', letterSpacing: '0.04em' }}>
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {post.readingMinutes} min read
          </div>
          <h1 className="font-bebas" style={{ fontSize: 'clamp(34px, 5.5vw, 56px)', lineHeight: 1.02, color: '#F0F0F0', letterSpacing: '0.02em', marginBottom: 28 }}>
            {post.title}
          </h1>

          <div className="article-body" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.faqs?.length ? (
            <section style={{ marginTop: 56 }}>
              <h2 className="font-bebas" style={{ fontSize: 32, color: '#F0F0F0', letterSpacing: '0.02em', marginBottom: 20 }}>
                FREQUENTLY ASKED
              </h2>
              {post.faqs.map((f) => (
                <div key={f.q} style={{ marginBottom: 20 }}>
                  <h3 style={{ color: '#F0F0F0', fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{f.q}</h3>
                  <p style={{ color: '#888', fontSize: 15, lineHeight: 1.65, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </section>
          ) : null}

          {/* CTA */}
          <div style={{ marginTop: 56, background: '#141414', border: '1px solid #242424', borderRadius: 16, padding: '32px 28px', textAlign: 'center' }}>
            <h2 style={{ color: '#F0F0F0', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Stop tracking rotations on paper.</h2>
            <p style={{ color: '#888', fontSize: 15, marginBottom: 22 }}>CourtOS follows your rotation, runs your subs, and tracks stats live — built by a coach.</p>
            <a href="/#beta" style={{ background: '#3DBE6B', color: '#000', padding: '14px 32px', borderRadius: 8, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.06em' }}>
              Get Early Access →
            </a>
          </div>
        </article>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /> : null}
    </>
  )
}
