// CourtOS Academy — blog posts registry (no external deps).
// The weekly SEO task appends a new BlogPost object to `posts` for each article.
// `html` is trusted, author-controlled content rendered into the article body.

export type FAQ = { q: string; a: string }

export type BlogPost = {
  slug: string
  title: string          // SEO <title> (≤ 60 chars ideal)
  description: string    // meta description (≤ 155 chars)
  date: string           // ISO yyyy-mm-dd
  updated?: string
  readingMinutes: number
  excerpt: string        // shown on the index card
  html: string           // article body
  faqs?: FAQ[]           // rendered + emitted as FAQPage schema
}

export const posts: BlogPost[] = [
  {
    slug: 'how-to-track-a-6-2-rotation',
    title: 'How to Track a 6-2 Volleyball Rotation (With Diagrams)',
    description:
      'A coach’s guide to the 6-2 volleyball rotation: how it works, the 6 rotations, what to track each serve, and the mistakes that cost points.',
    date: '2026-06-17',
    readingMinutes: 7,
    excerpt:
      'What the 6-2 is, how it differs from the 5-1, the six rotations to track, and the overlap and substitution mistakes that quietly cost teams points.',
    html: `
<p>The 6-2 is one of the most popular offenses in club and high-school volleyball — and one of the easiest to lose track of mid-match. This guide breaks down exactly what the 6-2 is, what changes every rotation, and what you actually have to keep an eye on as a coach so you never give away a free point on an alignment fault.</p>

<h2>What is a 6-2 rotation?</h2>
<p>The name describes your personnel: <strong>6 hitters and 2 setters</strong>. The key rule is that the setter <strong>always sets from the back row</strong>. Whichever of your two setters is in the back row runs the offense; when that setter rotates to the front row, the other setter — now in the back row — takes over.</p>
<p>The payoff: because the setter is always a back-row player, you have <strong>three front-row attackers in every rotation</strong>. That’s the whole reason coaches run it.</p>

<h2>6-2 vs. 5-1: the difference that matters</h2>
<p>In a <strong>5-1</strong>, one setter plays all six rotations. When that setter is in the front row, you only have <strong>two</strong> front-row attackers. In a <strong>6-2</strong>, the setter is always back-row, so you keep <strong>three</strong> attackers at the net the entire match. The trade-off is that the 6-2 needs two capable setters and more substitutions, which means more to track.</p>

<h2>The six rotations — what to watch each serve</h2>
<p>Volleyball positions are numbered 1–6. Position 1 is right-back (the server), and play rotates clockwise. In a 6-2, your back-row setter typically penetrates from <strong>position 1 (right back)</strong> to the net to set. As your team rotates through all six positions, three things change that you need to follow:</p>
<ul>
<li><strong>Which setter is in the back row</strong> (and therefore setting).</li>
<li><strong>Where the setter is penetrating from</strong> — the route to the net changes as they rotate through positions 1, 6, and 5.</li>
<li><strong>Your substitutions</strong> — when a setter rotates to the front row and gets subbed for an opposite, and when your libero comes in for a middle.</li>
</ul>

<h2>The mistakes that quietly cost points</h2>
<p>Three alignment errors show up over and over in 6-2 teams — and each one is a fault before the ball is even in play:</p>
<ul>
<li><strong>Overlap on serve receive.</strong> When the back-row setter creeps toward the net to set faster, they can drift ahead of the right-front player. At the moment of contact, each back-row player must be behind their front-row counterpart — cross that line and it’s an overlap fault.</li>
<li><strong>Forgetting the setter must be back row.</strong> If your designated setter ends up front row without the right substitution, you’ve lost an attacker and broken the system.</li>
<li><strong>Late substitutions.</strong> Miss the timing on subbing the opposite in for a front-row setter, or the libero for a rotating middle, and you’re a beat behind for the whole rally.</li>
</ul>

<h2>How to track it without a clipboard</h2>
<p>Most coaches track the 6-2 on paper while also scoring, calling subs, and actually coaching — which is how rotations get lost at 22–22. <a href="/">CourtOS</a> follows your rotation automatically on every serve, shows which setter is running the offense, and flags the substitution the moment a player rotates — so you can watch your team instead of your scoresheet. The libero and defensive-specialist swaps are handled for you.</p>

<p>You can see the live rotation view and auto-sub flow on the <a href="/#in-action">CourtOS home page</a>.</p>
`,
    faqs: [
      {
        q: 'How many setters are in a 6-2 rotation?',
        a: 'Two. In a 6-2 you use two setters, and the one currently in the back row runs the offense. When a setter rotates to the front row, the other setter takes over from the back row.',
      },
      {
        q: 'Does a 6-2 always have three front-row hitters?',
        a: 'Yes. Because the setter always sets from the back row, all three front-row players are attackers in every rotation — the main advantage of the 6-2 over the 5-1.',
      },
      {
        q: 'What is the most common 6-2 rotation fault?',
        a: 'Overlap on serve receive: the back-row setter penetrating toward the net drifts ahead of the right-front player. At contact, each back-row player must be behind their front-row counterpart.',
      },
    ],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
export const getAllPosts = () => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
