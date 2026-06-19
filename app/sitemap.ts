import type { MetadataRoute } from 'next'
import { getAllPosts } from './blog/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://courtos.co'
  const staticPaths = ['', '/blog', '/privacy', '/terms', '/subscription-terms']
  const staticUrls = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
  }))
  const postUrls = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  return [...staticUrls, ...postUrls]
}
