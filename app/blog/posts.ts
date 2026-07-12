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
  {
    slug: '5-1-vs-6-2-which-rotation-should-your-team-run',
    title: '5-1 vs 6-2 Volleyball: Which Rotation Should You Run?',
    description:
      '5-1 vs 6-2 volleyball rotations compared: how each system works, the real pros and cons, and how to pick the one your roster can actually run.',
    date: '2026-07-01',
    readingMinutes: 8,
    excerpt:
      'Neither system is better in the abstract. How the 5-1 and 6-2 actually differ, the real trade-offs, and a simple way to pick the one your team can execute.',
    html: `
<p>Every coach eventually hits this fork: do you build your offense around one setter (the 5-1) or two (the 6-2)? It is one of the most-debated decisions in club and high-school volleyball, and the honest answer is that neither system is "better" in the abstract. The right one depends on your roster, your substitution rules, and what your team can actually execute under pressure in the third set. This guide breaks down how each system works, the real trade-offs, and a simple way to decide.</p>

<h2>What the numbers actually mean</h2>
<p>Volleyball offensive systems are named by the count of hitters and setters on the court. In a <strong>5-1</strong>, you have five hitters and one setter — that single setter runs the offense for all six rotations. In a <strong>6-2</strong>, you have six hitters and two setters, but the setters only set from the back row, so whichever setter is in the front row is hitting, not setting. Both systems keep six players on the court; the difference is who is distributing the ball and from where.</p>
<p>There is also the <strong>4-2</strong>, worth mentioning because it is where a lot of young teams start: two setters, four hitters, and the setter sets from the <em>front</em> row. It is the simplest system to learn, but it leaves you with only two front-row attackers, so most teams outgrow it. The real decision for a developing competitive team is 5-1 versus 6-2.</p>

<h2>How the 5-1 works</h2>
<p>In the 5-1, your one setter plays all the way around. When that setter is in the back row, you have three front-row attackers — outside, middle, and opposite. When the setter rotates to the front row, they typically play the right-front position and can attack or dump, but now you only have <strong>two</strong> true front-row hitters.</p>
<p>The payoff of the 5-1 is consistency. Your hitters see the same hands, the same tempo, and the same tendencies on every single set. Your best decision-maker touches the second ball every rally, which matters most in tight games when you need someone who can read the block and run the offense with conviction. The cost is those three rotations where you are a hitter short at the net — good opposing blockers will key on your two front-row attackers.</p>

<h2>How the 6-2 works</h2>
<p>In the 6-2, two setters sit diagonally opposite each other in the rotation, so exactly one of them is always in the back row. That back-row setter runs the offense; when they rotate to the front row, the other setter — now in the back row — takes over. Because the setter is always penetrating from the back, you keep <strong>three front-row attackers in every rotation</strong>. That is the entire reason coaches run it: a full complement of hitters, all the way around, which spreads the blocking load and gives the setter more options every play.</p>
<p>The price is complexity. You need two setters who can both genuinely run the offense under pressure, not one clear starter and a backup. And you need substitutions. The common pattern is a <strong>double substitution</strong>: when a setter rotates toward the front row, a strong right-side hitter subs in for them, and a setter subs in for the opposite on the other side of the net. Done well, it is seamless. Done a beat late, you are scrambling — which is exactly the moment tracking rotations on paper falls apart.</p>

<h2>The trade-off in one line</h2>
<p>The 5-1 trades one hitter (in three rotations) for one elite decision-maker on every ball. The 6-2 trades setter consistency for three attackers every rotation — at the cost of more subs and needing two capable setters. Everything else flows from that.</p>

<h2>How to actually decide</h2>
<p>Instead of starting with the system, start with your roster and your rules. A few honest questions:</p>
<ul>
<li><strong>Do you have one setter who is clearly your best?</strong> If one athlete is a level above everyone else at running the offense, the 5-1 puts the ball in their hands every rally. Do not split those reps just to have three hitters.</li>
<li><strong>Do you have two setters close in ability?</strong> If both can run the offense under pressure, the 6-2 lets you keep three attackers at the net the whole match instead of benching a hitter's rotation.</li>
<li><strong>How many substitutions does your league allow?</strong> The 6-2 leans on subs. Most US high-school and club rules allow 12 or more per set, which is plenty. If you are capped at six subs, the constant double-subbing of a 6-2 gets tight fast, and a 5-1 is safer.</li>
<li><strong>What can your team execute in game three?</strong> The best system is the one your athletes understand, your staff can teach, and your setter can run when it is 22–22 and the gym is loud. A clean 5-1 beats a shaky 6-2 every time, and vice versa.</li>
</ul>
<p>A common path is to start younger teams in a 4-2 or 5-1 for simplicity, then move to a 6-2 as a second setter develops and the roster gets deeper. There is no rule that you pick one forever.</p>

<h2>The part nobody tells you: tracking it live</h2>
<p>Whichever system you choose, the hard part is not the diagram — it is keeping the rotation straight in real time while you are also scoring, calling subs, and coaching. The 6-2 especially punishes a missed substitution or an overlap on serve receive, and those faults give away points before the ball is even in play. Most coaches try to manage all of it on a clipboard and lose the thread at exactly the wrong moment.</p>
<p><a href="/">CourtOS</a> follows your rotation automatically on every serve, shows which setter is running the offense, and flags the substitution the moment a player rotates — whether you run a 5-1 or a 6-2. Libero and defensive-specialist swaps are handled for you, so you can watch your team instead of your scoresheet. You can see the live rotation and auto-sub flow on the <a href="/#in-action">CourtOS home page</a>.</p>
<p>If you are still learning the six rotations themselves, our companion guide on <a href="/blog/how-to-track-a-6-2-rotation">how to track a 6-2 rotation</a> walks through what changes each serve.</p>
`,
    faqs: [
      {
        q: 'Is the 6-2 better than the 5-1?',
        a: 'Neither is universally better. The 6-2 keeps three front-row attackers every rotation but needs two capable setters and more substitutions. The 5-1 gives you one consistent setter on every ball but leaves you with two front-row hitters for three rotations. The right choice depends on your roster and your substitution rules.',
      },
      {
        q: 'When should a team switch from a 5-1 to a 6-2?',
        a: 'Usually when a second setter develops enough to run the offense under pressure and you want three attackers at the net in every rotation. If you only have one clearly strong setter, the 5-1 is the better fit.',
      },
      {
        q: 'Why do 6-2 teams substitute so much?',
        a: 'Because the setter must set from the back row, teams typically run a double substitution — a hitter comes in for the setter rotating to the front, and a setter comes in for the opposite. This keeps three attackers at the net and a setter always in the back, so the 6-2 needs a league that allows plenty of subs.',
      },
    ],
  },
  {
    slug: 'volleyball-stat-abbreviations-explained',
    title: 'Volleyball Stat Abbreviations Explained (K, E, TA, A…)',
    description:
      "A coach's plain-English guide to volleyball stat abbreviations — K, E, TA, A, D, BS, BA, SA — plus the formulas and what counts as good.",
    date: '2026-07-08',
    readingMinutes: 8,
    excerpt:
      'What K, E, TA, PCT, A, SA, RE, D, BS and BA actually mean, the formulas behind hitting percentage and passing average, and what counts as a good number by level.',
    html: `
<p>Open any volleyball box score and you're staring at a wall of letters: K, E, TA, PCT, A, SA, SE, RE, D, BS, BA. If you've ever nodded along in a coaches' meeting while quietly wondering what half of them mean, this guide is for you. Below is every common abbreviation, what it actually measures, how the calculated ones are figured, and what counts as a &ldquo;good&rdquo; number by level — all in plain English.</p>

<h2>Why the abbreviations matter</h2>
<p>Stats only help you coach if you trust what they're telling you. A player with 12 kills sounds great until you see 11 errors next to them — the abbreviations are the difference between &ldquo;she's carrying us&rdquo; and &ldquo;she's a coin flip.&rdquo; Learn the shorthand once and every scoresheet, app, and recruiting profile suddenly reads like a sentence instead of a code. We'll group them the way a match actually unfolds: attacking, setting, serving, passing, digging, and blocking.</p>

<h2>Attacking stats</h2>
<p>Attacking is where most of the alphabet lives, because hitting efficiency is one of the two or three stats that most reliably tracks with winning.</p>
<ul>
<li><strong>K — Kill.</strong> An attack that directly ends the rally in your team's favor: it hits the floor, goes off the block out of bounds, or forces a blocking error.</li>
<li><strong>E — Error (attack error).</strong> An attack that directly loses the rally — into the net, out of bounds, blocked straight down, or an illegal contact. Every error is a point for the other team.</li>
<li><strong>TA — Total Attempts.</strong> Every swing a player takes, regardless of outcome: kills, errors, and swings that stay in play. TA is the denominator that makes kills meaningful.</li>
<li><strong>PCT (Hitting %) — Hitting Percentage.</strong> The most important attacking number, calculated as <strong>(Kills − Errors) ÷ Total Attempts</strong>.</li>
</ul>
<p>So a hitter with 10 kills, 2 errors, and 20 attempts is at (10 − 2) ÷ 20 = <strong>.400</strong>. Because errors subtract, a player can post a negative hitting percentage if they make more errors than kills — a sign to run the offense elsewhere.</p>
<p>What's a good hitting percentage? As a rough guide across competitive play: <strong>.300 and up is excellent, .200+ is solid, and anything under .100 usually means a hitter is giving away more than they're earning.</strong> Elite college and pro attackers live in the .300s; a strong high-school or club hitter clearing .250 is doing real damage. Middle blockers, who get cleaner sets, typically post higher percentages than pins.</p>

<h2>Setting stats</h2>
<ul>
<li><strong>A — Assist.</strong> Credited to the player (almost always the setter) whose set leads directly to a kill. Assists are the setter's version of kills.</li>
<li><strong>BHE — Ball-Handling Error.</strong> A double, a lift, or a thrown set called by the referee — the setter's equivalent of an attack error, and a point for the opponent.</li>
</ul>

<h2>Serving stats</h2>
<ul>
<li><strong>SA — Service Ace.</strong> A serve that directly wins the point — the opponent can't return it, or the pass is so bad they can't make a legal attack.</li>
<li><strong>SE — Service Error.</strong> A serve that ends the rally in the opponent's favor: into the net, long, wide, or a foot fault.</li>
</ul>
<p><strong>Serving %</strong> is usually serves in play divided by total serve attempts. A common high-school target is keeping this <strong>above 90%</strong> — you can't ace a serve you never put in the court. Some systems also grade each serve on a <strong>0–4 scale</strong> (0 = error, 4 = ace) to measure how much pressure a server applies, not just whether it landed.</p>

<h2>Passing and serve-receive stats</h2>
<ul>
<li><strong>RE — Reception Error.</strong> A serve-receive that gives the serving team an immediate point — a shanked pass or an ace against you.</li>
</ul>
<p><strong>Passing average</strong> is graded per contact and averaged. On the common <strong>3-point scale</strong>: a <strong>3</strong> is a perfect pass (setter has all options), a <strong>2</strong> is playable, a <strong>1</strong> is an emergency pass (usually a free ball back), and a <strong>0</strong> is an ace against you. A team passing around <strong>2.3+</strong> is in good shape to run its full offense. (Some programs use a 0–4 scale — same idea, wider range.) Serve-receive efficiency and hitting percentage are widely treated as the two stats that most decide matches: win the serve-pass battle and you get to run your offense while denying theirs.</p>

<h2>Digging and defense</h2>
<ul>
<li><strong>D — Dig.</strong> A successful defensive play on an opponent's attack that keeps the ball off your floor and in play. Digs measure back-row defense and effort.</li>
</ul>

<h2>Blocking stats</h2>
<p>Blocking is where two abbreviations trip people up, because a block can be credited to one player or shared.</p>
<ul>
<li><strong>BS — Block Solo.</strong> A block that wins the point outright with only one blocker touching the ball.</li>
<li><strong>BA — Block Assist.</strong> A point-winning block where two or three players are all part of the touch. Each participating blocker gets a block assist — which is why a stat sheet can show more total blocks than points the team actually scored.</li>
<li><strong>BE — Blocking Error.</strong> A net touch, a reach-over, or a block that sends the ball out on your side — a point for the opponent.</li>
</ul>
<p><strong>Total Blocks</strong> are counted differently across programs — some count solos plus half of each assist, others count every participation. If you're comparing players across teams, check the definition before reading too much into the number.</p>

<h2>Putting it together: reading a stat line</h2>
<p>Here's a sample line — <strong>Jersey 12 — K: 14, E: 4, TA: 30, PCT: .333, D: 9, BS: 1, BA: 3</strong> — and how to read it: 14 kills against 4 errors on 30 swings for a .333 hitting percentage (an excellent, efficient night), plus 9 digs, one solo block, and three block assists. One line, a full picture of a well-rounded pin hitter.</p>

<h2>Track the stats without missing the match</h2>
<p>Knowing the abbreviations is step one. The harder part is capturing them live — most coaches try to score, call subs, follow the rotation, <strong>and</strong> mark stats on paper at the same time, and the numbers are the first thing to slip at 24–24.</p>
<p><a href="/">CourtOS</a> is built to take that off your clipboard. You tag each contact with one tap and it does the math for you — hitting percentage, passing average, serve-receive efficiency, and blocks all update in real time, so you get an accurate stat line the moment the set ends instead of reconstructing it from memory on the drive home. Because scoring, rotations, and stats live in the same place, you're watching your team play instead of bookkeeping. You can see the live stat tracking on the <a href="/#in-action">CourtOS home page</a>.</p>
`,
    faqs: [
      {
        q: 'What does TA mean in volleyball stats?',
        a: 'TA stands for Total Attempts — every attack swing a hitter takes, whether it is a kill, an error, or a ball that stays in play. It is the denominator in the hitting percentage formula.',
      },
      {
        q: 'How do you calculate hitting percentage?',
        a: 'Subtract attack errors from kills, then divide by total attempts: (Kills − Errors) ÷ Total Attempts. A player with 10 kills, 2 errors, and 20 attempts hits .400. A hitting percentage of .300 or higher is excellent.',
      },
      {
        q: 'What is the difference between BS and BA in volleyball?',
        a: 'BS is a Block Solo — a point-winning block with one blocker. BA is a Block Assist — a point-winning block where two or more players share the touch, and each of them is credited with an assist.',
      },
    ],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
export const getAllPosts = () => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
