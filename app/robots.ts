import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://courtos.co/sitemap.xml',
    host: 'https://courtos.co',
  }
}
