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
  {
    slug: 'volleyball-rotation-faults-refs-actually-call',
    title: 'The 6 Volleyball Rotation Faults Refs Actually Call',
    description:
      'Overlap, serving out of order, illegal back-row attacks, libero faults — the 6 rotation violations that cost real points, and how to stop giving them away.',
    date: '2026-07-15',
    readingMinutes: 8,
    excerpt:
      'Alignment errors are the most preventable points in volleyball — nothing about them is athletic. Here are the six that get whistled most, what actually triggers the call, and how to stop bleeding points on them.',
    html: `
<p>Nobody loses a match because of one overlap call. Teams lose matches because they give away four or five free points a night on alignment errors — points that never required the other team to do anything but serve the ball.</p>
<p>The frustrating part is that these are the most preventable points in volleyball. Nothing about them is athletic. They're bookkeeping errors that happen at 22–22 when your brain is full. Here are the six that get whistled most, what actually triggers the call, and how to stop bleeding points on them.</p>

<h2>First: the rule that makes all of this make sense</h2>
<p>Every alignment fault comes down to one moment — <strong>the instant the server contacts the ball.</strong></p>
<p>Before that contact, your players must be in legal rotational order. After that contact, they can go anywhere they want. That's it. That's the whole rule. A libero standing at the net is fine the moment after the serve is struck; a libero standing at the net a half-second <em>before</em> it is a point for the other team.</p>
<p>Two details coaches consistently get wrong:</p>
<ul>
<li><strong>Only feet count.</strong> Position is judged by foot placement on the floor. Body lean, shoulder angle, and where a player's arms are don't matter. A player can lean way over the line as long as their feet are legal.</li>
<li><strong>It's relative, not absolute.</strong> There is no fixed box a player has to stand in. Legality is judged <em>against their neighbors</em> — the player next to them and the player in front of or behind them. Two players can both be standing in bizarre places and still be perfectly legal.</li>
</ul>
<p>Once that clicks, the six faults are just variations on a theme.</p>

<h2>Fault 1: Front-to-back overlap</h2>
<p><strong>What it is:</strong> A back-row player has crept ahead of the front-row player they're paired with.</p>
<p>Each back-row player is linked to a front-row counterpart: right back with right front, middle back with middle front, left back with left front. At the moment of serve contact, the <strong>front-row player must have at least part of one foot closer to the net</strong> than their back-row partner.</p>
<p><strong>Where it shows up:</strong> Almost always with the setter. In a 6-2 — or a 5-1 with the setter in the back row — your setter wants to be at the net <em>yesterday</em> so they can set a fast tempo. Every rotation, they inch a little further forward. Eventually they cross their right-front hitter and the whistle goes.</p>
<p><strong>The fix:</strong> Give the setter a visual landmark, not a feeling. "Your heels stay behind [hitter's] toes until you hear contact." Then hold them to it in practice, not just in matches.</p>

<h2>Fault 2: Side-to-side overlap</h2>
<p><strong>What it is:</strong> A player has drifted past their left/right neighbor within the same row.</p>
<p>Within any row, the left player must have part of a foot to the left of the middle player, and the middle must have part of a foot to the left of the right player. Same relationship in the back row.</p>
<p><strong>Where it shows up:</strong> Serve receive. You've got your best two passers wide in a two-person system and your middle front slides way over toward the left to get out of the way — and drifts past the left front. It's also common with a middle who's trying to get a head start on their approach.</p>
<p><strong>The fix:</strong> This one is genuinely hard to eyeball from the bench, especially from the sideline where the angle lies to you. It's the fault most likely to surprise you.</p>

<h2>Fault 3: Serving out of order</h2>
<p><strong>What it is:</strong> The wrong player served.</p>
<p>Your serving order is locked by your starting lineup. Six players, positions 1 through 6, clockwise. Serve out of that order and it's a point and the serve for the other team — regardless of whether the serve was an ace.</p>
<p><strong>Where it shows up:</strong> After a chaotic substitution sequence, or after a timeout, or after a long rally where somebody chased a ball into the stands and came back to the wrong spot. Also very common in a 6-2, where you're subbing two setters and an opposite in and out all match and the order gets muddy.</p>
<p><strong>Worth knowing:</strong> A service fault outranks other faults. If your team is serving and the <em>other</em> team is out of rotation, the ref waits for your serve — if you serve out of order, that gets called first and their overlap never gets whistled. Your mistake erases their mistake.</p>
<p><strong>The fix:</strong> Know your serve order cold, and re-verify it after every sub. Most out-of-order serves happen because a coach <em>assumed</em> the rotation instead of checking it.</p>

<h2>Fault 4: Illegal back-row attack</h2>
<p><strong>What it is:</strong> A back-row player attacked the ball from inside the 10-foot line while the ball was entirely above the height of the net.</p>
<p>Back-row players can attack — they just can't do it from the front zone with the ball above the net. Behind the 10-foot line, they can hit anything at any height (as long as they don't touch or cross the line at takeoff; landing in front of it is fine). Inside the line, the ball must be at least partially below the top of the net at contact.</p>
<p><strong>Where it shows up:</strong> The setter dump. Your back-row setter jumps to set, sees a hole, and puts it over with one hand — from the front zone, above the net. That's a fault, and it's a heartbreaker because it usually looks like a great play. It also gets called when a back-row hitter starts their approach too close and takes off from inside the line.</p>
<p><strong>The fix:</strong> Back-row setters need one rule drilled in: <em>if you're dumping from the front zone, the ball has to be below the tape.</em> If it's above, you set it.</p>

<h2>Fault 5: Libero attack and set faults</h2>
<p><strong>What it is:</strong> Two separate violations that both trace back to the libero.</p>
<ul>
<li><strong>The libero attacked above net height.</strong> The libero can never complete an attack hit if the ball is entirely above the top of the net — from anywhere on the court, front zone or back.</li>
<li><strong>A teammate attacked a libero's overhand set from the front zone.</strong> If the libero uses finger action (an overhand set) while standing <strong>in the front zone</strong>, the ball cannot then be attacked above net height. The fault lands on the <em>attacker</em>, not the libero. If the libero sets from behind the 10-foot line, there's no restriction.</li>
</ul>
<p><strong>Where it shows up:</strong> Scramble situations. The libero digs, runs down a second ball, and hand-sets it from somewhere around the 10-foot line to your outside — who crushes it. Whistle. Your hitter did nothing wrong and gets the fault.</p>
<p><strong>The fix:</strong> Teach the libero to bump-set anything near the front zone. Overhand set only from clearly behind the line.</p>

<h2>Fault 6: Illegal libero replacement</h2>
<p><strong>What it is:</strong> The libero came on or off the wrong way.</p>
<p>The rules here are specific. The libero and the player they replace may <strong>only enter and leave through the libero replacement zone</strong> — the sideline in front of your bench, between the attack line and the end line. Not at the net. Not past the end line.</p>
<p>And there must be <strong>at least one completed rally between two libero replacements</strong> — with the practical exception of the libero leaving to let the replaced player rotate into the serving position.</p>
<p><strong>The penalty depends on timing:</strong> if the officials catch it <em>before the next service contact</em>, it's a delay of game. If it's caught <em>after</em> service contact, it's a position fault — a point for the other team.</p>
<p><strong>Where it shows up:</strong> Rushed replacements between quick rallies. Your libero sprints on at the wrong spot on the sideline because there wasn't time to get to the zone.</p>
<p><strong>The fix:</strong> Slow the replacement down. If you're not sure there's been a rally, don't send them.</p>

<h2>The pattern underneath all six</h2>
<p>Look at where each of these actually comes from:</p>
<ul>
<li>Front-to-back overlap — setter drifting</li>
<li>Side-to-side overlap — receive pattern drifting</li>
<li>Serving out of order — lost track of rotation after subs</li>
<li>Illegal back-row attack — forgot the setter was back row</li>
<li>Libero attack/set fault — forgot where the libero was standing</li>
<li>Illegal libero replacement — lost track of the replacement sequence</li>
</ul>
<p>Every single one is a <strong>tracking</strong> failure, not a knowledge failure. You already know these rules. What you don't have is a reliable way to hold six players' legal positions, your serve order, and your libero's replacement state in your head <em>while</em> you're scoring, calling subs, reading the other team's offense, and coaching human beings.</p>
<p>That's not a coaching flaw. That's a working-memory limit, and paper doesn't help — a scoresheet records what happened, it doesn't warn you about what's about to happen.</p>

<h2>A better setup for the bench</h2>
<p>This is exactly the problem <a href="/">CourtOS</a> was built to solve. It follows your rotation automatically on every serve, so you always know — without looking down — who's front row, who's back row, which setter is running the offense, and where your libero legally is. When a player rotates into a spot that needs a substitution, it tells you before the whistle instead of after.</p>
<p>The value isn't that it knows the rules. It's that it holds all six of these in its head so you don't have to, and you get to spend the last four points of a tight set watching your team instead of reconstructing your lineup.</p>
<p>You can see the live rotation and auto-sub view on the <a href="/#in-action">CourtOS home page</a>.</p>

<p><em>Rules vary slightly between NFHS, NCAA, USAV, and FIVB. The relationships described here are consistent across all of them, but always check your governing body's current rulebook for specifics.</em></p>
`,
    faqs: [
      {
        q: 'Does leaning over a line count as an overlap?',
        a: 'No. Overlap is judged by foot placement on the floor at the moment of serve contact. A player can lean, reach, or angle their shoulders across a teammate’s position as long as their feet are in legal relative order.',
      },
      {
        q: 'Can a back-row setter ever dump the ball over the net?',
        a: 'Yes — with one condition. From inside the 10-foot line, the ball has to be at least partially below the top of the net at contact. From behind the 10-foot line, they can attack it at any height, as long as they do not touch or cross the line at takeoff.',
      },
      {
        q: 'What happens if both teams are out of rotation on the same serve?',
        a: 'Service faults take precedence. If the serving team commits a fault — including serving out of order — that is what gets called, and the receiving team’s overlap never gets whistled.',
      },
    ],
  },
  {
    slug: 'best-volleyball-stats-apps-for-coaches-2026',
    title: 'Best Volleyball Stats Apps for Coaches in 2026',
    description:
      'An honest comparison of the top volleyball stats apps for coaches in 2026 — SoloStats, GameChanger, VolleyInsights, Coachr, and CourtOS — by feature and price.',
    date: '2026-07-22',
    readingMinutes: 7,
    excerpt:
      'SoloStats, GameChanger, VolleyInsights, Coachr, and CourtOS compared honestly by what each actually solves — stats, rotation, or both at once — not just feature lists.',
    html: `
<p>Every volleyball coach eventually hits the same wall: the scorebook works fine until the third set gets tight, subs start flying, and you're trying to track kills, rotation, and the libero swap all at once with one clipboard. A good app fixes that — but &ldquo;best&rdquo; depends entirely on what you're actually trying to solve. Some apps are built purely for stat capture. Some are free team-management tools with stats bolted on. Some focus on rotations and nothing else. This guide compares the apps coaches actually mention most in 2026, honestly, so you can pick based on what you need rather than whoever has the loudest marketing.</p>

<h2>What to actually evaluate an app on</h2>
<p>Before the comparisons, it helps to know what separates a good in-match app from a good after-the-fact one:</p>
<ul>
<li><strong>Live capture speed.</strong> Can you tag a play in one or two taps without looking away from the court for long, or does it take a menu dive to log a kill?</li>
<li><strong>Rotation and sub handling.</strong> Does it just record what happened, or does it actively track your rotation and warn you about a sub or an overlap before the whistle?</li>
<li><strong>Depth of stats.</strong> Basic (kills, errors, aces) versus advanced (passing rating, hitting efficiency by rotation, serve-receive trends).</li>
<li><strong>Where your data lives.</strong> Local device only, or synced so parents, assistant coaches, or recruiters can see it live.</li>
<li><strong>Price.</strong> Genuinely free, free-with-upsell, or paid from the start.</li>
</ul>
<p>With that lens, here's how the well-known options stack up.</p>

<h2>SoloStats (Rotate 123 LLC)</h2>
<p>SoloStats is one of the most established names in volleyball stat tracking, and it's really a family of apps under one company (Rotate 123 LLC) rather than a single product. SoloStats123 is the free entry point — unlimited stat tracking, offline use, automatic score and rotation tracking, and live sideout and point-scoring percentages, with export to MaxPreps. Deeper analysis (WebReports, mobile access via SoloStats Coach, and the standalone Rotate123 rotation/lineup tool) sits behind paid tiers, reportedly starting around $7.99/month for the Intermediate plan.</p>
<p><strong>Good fit for:</strong> coaches who want a dedicated, stats-first tool and don't mind adding a separate rotation product (Rotate123) if they need deeper lineup planning. <strong>Trade-off:</strong> because the ecosystem is split across several apps, getting the full picture — live stats, rotation planning, and video — means learning more than one interface.</p>

<h2>GameChanger</h2>
<p>GameChanger is the biggest name in youth sports team management, and it's expanded into volleyball with serving stats (attempts, aces, errors, ace percentage), a box score and play-by-play, live streaming, and automatic highlight clips from streamed games. All of it — including the premium features — is free for coaches and staff.</p>
<p><strong>Good fit for:</strong> programs that want one free app for scheduling, messaging, live streaming to family, and basic stats, especially if you're coaching multiple sports. <strong>Trade-off:</strong> GameChanger is a generalist tool built across many sports, so its volleyball-specific stats (like passing rating or rotation tracking) are lighter than a volleyball-only app, and it isn't built to actively manage your live rotation or subs.</p>

<h2>VolleyInsights</h2>
<p>VolleyInsights is a newer, completely free volleyball stats app aimed at both indoor and beach coaches, with a stated goal of staying free. It covers live stat capture, team and player analytics, side-by-side comparisons of up to three players, radar charts, heatmaps, and some AI-assisted tactical insight after the match.</p>
<p><strong>Good fit for:</strong> coaches who want genuinely free, fairly deep post-match analytics without a subscription. <strong>Trade-off:</strong> the emphasis is on analysis after the match rather than actively guiding your rotation or subs during it.</p>

<h2>Coachr</h2>
<p>Coachr is a volleyball-specific app that leans into match management as much as stats — it tracks rotations, subs under FIVB and USA Volleyball rules, libero switches, and timeouts, alongside hitting, serving, passing, blocking, and dig stats. It also offers voice capture so you can call out stats hands-free instead of tapping a screen mid-rally.</p>
<p><strong>Good fit for:</strong> coaches who want rotation and sub tracking built in alongside stats, not as an afterthought. <strong>Trade-off:</strong> it's still primarily a stat-and-rotation recorder — it logs your lineup rules rather than actively catching a fault or a missed sub for you in the moment.</p>

<h2>CourtOS</h2>
<p>CourtOS is built around a different premise: instead of a stats app that also shows rotation, or a rotation app that also shows stats, it's one system that runs your bench end to end — live scoring, automatic rotation tracking with libero and sub logic built in, and real-time stats, together. The free tier covers full live match tracking, automatic rotation, manual substitutions, timeouts, and a live view parents can follow from the stands. Coach Premium ($9.99/month) adds deeper analytics, heat maps, AI-generated match summaries, and multi-team support.</p>
<p><strong>Good fit for:</strong> coaches who want to stop juggling a scorebook, a rotation cheat sheet, and a stats app as three separate things during a live match. <strong>Trade-off:</strong> it's newer than SoloStats or GameChanger, so it doesn't yet have their years of user base or third-party integrations like MaxPreps export.</p>
<p>You can see the live scoring, rotation, and stats view together on the <a href="/#in-action">CourtOS home page</a>.</p>

<h2>Head-to-head, honestly</h2>
<p>No single app wins on every axis, and the right pick depends on what's actually costing you points right now:</p>
<ul>
<li><strong>If your problem is losing track of stats while you're also scoring</strong> — SoloStats123 or GameChanger cover that for free, with SoloStats going deeper on volleyball-specific numbers.</li>
<li><strong>If your problem is free post-match analytics with no cost at all</strong> — VolleyInsights is the most fully-featured free option for that specifically.</li>
<li><strong>If your problem is rotation faults and missed subs, not just stats</strong> — Coachr and CourtOS both build rotation logic in, rather than leaving it to you to track separately.</li>
<li><strong>If you want scoring, rotation, subs, and stats to be one system instead of three</strong> — that's the specific gap CourtOS was built to close.</li>
</ul>
<p>None of this is a knock on the others — SoloStats and GameChanger both have real staying power and loyal coaches for good reasons. The honest takeaway is that &ldquo;best&rdquo; volleyball stats app depends on whether your actual bottleneck is stats, rotation, or juggling both at once.</p>

<h2>Related reading</h2>
<p>If rotation faults specifically are your pain point, see our breakdown of <a href="/blog/volleyball-rotation-faults-refs-actually-call">the six rotation faults refs actually call</a>. If you're still getting comfortable with the vocabulary on a stat sheet, our guide to <a href="/blog/volleyball-stat-abbreviations-explained">volleyball stat abbreviations</a> covers every common one.</p>
`,
    faqs: [
      {
        q: 'Is there a completely free volleyball stats app?',
        a: "Yes — GameChanger, SoloStats123, and VolleyInsights are all free for live stat tracking, and CourtOS's free tier covers full live scoring, automatic rotation, and stats as well. Paid tiers across these apps generally unlock deeper analytics, video, or multi-team management rather than gating basic in-match tracking.",
      },
      {
        q: "What's the difference between a stats app and a rotation app?",
        a: "A stats app records what happened on each play — kills, errors, aces, digs. A rotation app tracks who's legally supposed to be where on the court and flags subs or overlap faults before they cost a point. Some apps (SoloStats, Rotate123) split these into separate products; others (Coachr, CourtOS) build rotation tracking directly into the stats app.",
      },
      {
        q: 'Do any of these apps track the libero automatically?',
        a: "CourtOS and Coachr both build libero and sub logic into their rotation tracking. Apps that are primarily stat-capture tools, like GameChanger or VolleyInsights, record libero-related stats but don't actively manage the substitution rules for you during the match.",
      },
    ],
  },
  {
    slug: 'how-to-keep-a-volleyball-scorebook',
    title: 'How to Keep a Volleyball Scorebook (and a Faster Way)',
    description:
      "A coach's guide to keeping an official volleyball scorebook — the running score, serving order, substitutions, libero tracking — plus a faster alternative.",
    date: '2026-07-29',
    readingMinutes: 7,
    excerpt:
      'The running score, serving order, substitution log, and libero tracker demystified — plus a faster way to keep the same accurate record without owning the pen all match.',
    html: `
<p>Every coach remembers their first time behind the scorebook: a blank grid, a pen, and a very clear sense that if you mess this up, the referee is going to notice. The official scorebook is a legal record of the match, and it looks intimidating mostly because nobody explains it in plain language. Once you know what each box is actually tracking, it's a fast, mechanical process. This guide walks through the real mechanics — the running score, serving order, substitutions, and libero tracking — and then shows a faster way to get the same accuracy without owning the pen all match.</p>

<h2>What the scorebook is actually for</h2>
<p>A volleyball scoresheet exists to answer three questions at any point in the match: what's the score, whose serve is it, and is everyone legally where they're supposed to be. Referees use it to verify rotation order and substitution legality, and it becomes the official record if there's ever a dispute about the score or a lineup. That's why it matters more than it looks like it should — a clean scoresheet isn't busywork, it's the paper trail that backs up every call on the court.</p>
<p>Most governing bodies (NFHS, USA Volleyball, NCAA) use slightly different sheet layouts, but the core pieces are the same everywhere: a lineup grid for each team, a serving-order box per rotation, a running score column, and a substitution log. Learn those four pieces and you can read any scoresheet you're handed.</p>

<h2>The lineup grid: locking in serve order</h2>
<p>Before the first serve of each set, both teams submit a starting lineup — six players, in serving order, positions 1 through 6. The scorekeeper copies that into the lineup grid, and that order is now locked for the set: player in position 1 serves first, then the team rotates clockwise and position 2 serves next, and so on. This is the single most important thing to get right at the start of a set, because everything else on the sheet is built around it.</p>
<p>A quick sanity check worth doing every time: read the lineup back against the roster before the first serve. A wrong number copied into the grid at 0-0 turns into a serving-out-of-order fault three rotations later, and it's much harder to untangle mid-set than to catch before it starts.</p>

<h2>Recording a rally: the running score</h2>
<p>Each new serve gets its own row (or box, depending on the sheet format), numbered sequentially. When the serving team wins the rally, you record the point in that server's box and they serve again — no rotation. When the receiving team wins the rally (a &ldquo;sideout&rdquo;), that's recorded differently: it's written on the line of the <em>next</em> server's number, usually with a box drawn around it, and a box is also drawn around the matching number in that team's running score column. The team that just won the rally now serves.</p>
<p>The pattern to hold onto: points won while serving stay in a simple line down the page. A change of serve gets a visual marker (a box or circle, depending on your sheet's key) because it also means a rotation is about to happen. Every scoresheet has a legend, usually bottom-left, defining exactly what its own symbols mean — check it before the match starts rather than guessing mid-set, since conventions vary slightly by state association and level.</p>

<h2>Common symbols worth knowing</h2>
<p>Sheets vary, but a few conventions show up almost everywhere:</p>
<ul>
<li><strong>Aces</strong> are marked with an &ldquo;A&rdquo; next to the point number, so you can distinguish a serve that won the point outright from one the other team simply failed to return in play.</li>
<li><strong>Substitutions</strong> get logged with an &ldquo;S,&rdquo; often written like a fraction — the player coming out over the player coming in — next to the point where the sub happened.</li>
<li><strong>Timeouts</strong> get a mark in a dedicated timeout box per set, tracking how many each team has used (typically two per set at most levels).</li>
<li><strong>Loss of rally without an ace</strong> — a service error, a net violation, anything that ends the rally without a &ldquo;highlight&rdquo; cause — usually gets its own simple symbol so you're not confusing an ace with a routine sideout later when you're trying to read the sheet back.</li>
</ul>
<p>None of these are hard individually. What makes scorekeeping hard is doing all of them, correctly, in real time, while also trying to actually watch the match.</p>

<h2>Tracking substitutions without losing the thread</h2>
<p>Regular substitutions get logged in a dedicated substitution box: the number of the player leaving, the number of the player entering, and the score at the moment of the sub. Most levels allow a fixed number of substitutions per set (commonly capped around a dozen or more depending on your governing body — check your specific rulebook, since NFHS, USAV, and club/travel rules don't all match), and a player who's been subbed out can typically only re-enter once, back in their original lineup spot. That's easy to track for one sub. It gets genuinely hard in a 6-2 offense, where you might be running a double substitution — a hitter in for a rotating setter, a setter in for the opposite — multiple times a set, on top of a libero swap.</p>

<h2>Tracking the libero</h2>
<p>The libero gets a separate tracking sheet in most scorebook systems, because libero replacements don't count against your substitution limit and follow their own rules. The basics: write down which player number the libero is replacing every time they enter, and which player replaces the libero when they come back out. There must be a completed rally between libero replacements (with the practical exception of letting a libero exit before rotating into the serve position, since a libero cannot serve for more than one rotation lineup in most rule sets — again, verify your governing body's current rule). If the libero ends up serving, some sheets mark that serving position specifically since it affects how the rotation reads afterward.</p>
<p>Get a libero swap wrong on paper and it tends to compound — the next few rotations reference a lineup that's no longer accurate, and untangling it mid-set while the match keeps moving is exactly the kind of moment that produces a rotation fault nobody meant to commit.</p>

<h2>The honest problem with doing all of this on paper</h2>
<p>None of the individual pieces above are hard. The problem is doing all of them — serve order, running score, substitution log, libero tracker — at once, live, while a set is moving fast and you're also supposed to be coaching. Most coaches either dedicate a parent or assistant to score full-time, or they do it themselves and split their attention between the sheet and the game at exactly the moments (close sets, sub scrambles, libero swaps) when the game deserves their full attention.</p>

<h2>A faster way to get the same record</h2>
<p><a href="/">CourtOS</a> handles the same information the scorebook does — running score, serve order, substitutions, libero tracking — but it updates automatically as the match happens instead of asking you to write it down by hand. You tap to score a point, and the rotation, serve order, and libero eligibility all update themselves; when a substitution is needed, it tells you before the whistle instead of leaving you to remember it. At the end of the set you have an accurate, exportable record without anyone having sat there translating the game into symbols the whole time. You can see the live scoring and rotation view on the <a href="/#in-action">CourtOS home page</a>.</p>
<p>That doesn't make the paper scorebook obsolete — plenty of leagues still require an official paper sheet, and it's worth knowing how to keep one well regardless. But for the coach who's also trying to run the bench, an app that tracks the same information automatically means the person who used to be glued to the scorebook can actually watch the match.</p>
<p>If you want the rule-by-rule breakdown of what actually causes a fault mid-set, our guide to <a href="/blog/volleyball-rotation-faults-refs-actually-call">the six rotation faults refs actually call</a> covers the ones that trip up scorekeepers most.</p>
`,
    faqs: [
      {
        q: "What's the difference between a scorebook and a libero tracking sheet?",
        a: "The main scorebook records the score, serve order, and regular substitutions. The libero tracking sheet is a separate form that records libero replacements specifically, since those don't count against a team's substitution limit and follow their own re-entry rules.",
      },
      {
        q: 'Who is allowed to keep the official scorebook?',
        a: 'Rules vary by governing body and level, but most require a designated scorer (often trained or certified at higher levels) rather than either team\'s coach, to keep the record neutral. Many leagues also use a second scorer or a libero tracker as a backup.',
      },
      {
        q: 'Can a substitution count get you a rotation fault?',
        a: "Not directly — running out of substitutions or misusing a libero replacement typically results in an illegal substitution ruling rather than a rotation fault. But a missed or mistimed substitution often leads directly to a rotation fault a play or two later, because the lineup on the court no longer matches what the sheet (or the players) expect.",
      },
    ],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
export const getAllPosts = () => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
