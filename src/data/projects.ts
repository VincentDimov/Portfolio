export type ProjectVisual = 'signal' | 'atlas' | 'northstar' | 'relay'

export type Project = {
  slug: string
  name: string
  eyebrow: string
  tagline: string
  description: string
  problem: string
  solution: string
  role: string
  year: string
  technologies: string[]
  results: { value: string; label: string }[]
  accent: string
  visual: ProjectVisual
  architecture: string[]
  decisions: string[]
  lessons: string
  liveUrl: string
  githubUrl: string
}

export const projects: Project[] = [
  {
    slug: 'signal',
    name: 'Signal',
    eyebrow: '01 / Product intelligence',
    tagline: 'Clarity for product teams moving at speed.',
    description:
      'An AI-assisted product intelligence workspace that turns scattered customer feedback into calm, confident decisions.',
    problem:
      'Research lived in too many places, making it difficult for product teams to see what mattered before planning their next release.',
    solution:
      'I designed a focused signal layer that clusters conversations, surfaces evidence, and connects every insight to the product work it informs.',
    role: 'Product design, frontend architecture & fullstack implementation',
    year: '2025',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'OpenAI', 'Vercel'],
    results: [
      { value: '62%', label: 'faster synthesis' },
      { value: '4.8/5', label: 'team adoption' },
      { value: '−31%', label: 'planning overhead' },
    ],
    accent: 'lavender',
    visual: 'signal',
    architecture: ['Ingestion API', 'Semantic processing', 'PostgreSQL + vectors', 'Collaborative workspace'],
    decisions: [
      'Kept AI outputs inspectable by always linking claims to source evidence.',
      'Used optimistic updates so the workspace feels immediate under collaboration.',
      'Designed the data model around decisions, rather than documents or tickets.',
    ],
    lessons: 'The most useful AI experiences make people more certain, not merely more impressed.',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/VincentDimov?tab=repositories',
  },
  {
    slug: 'atlas',
    name: 'Atlas',
    eyebrow: '02 / Team operations',
    tagline: 'The operating system for thoughtful teams.',
    description:
      'A real-time planning space where distributed teams can turn a messy week into a shared, actionable picture.',
    problem:
      'Remote teams were spending too much of their week aligning across disconnected calendars, docs, and chat threads.',
    solution:
      'Atlas brings plans, ownership and momentum into one flexible operating canvas with presence built into every interaction.',
    role: 'Technical lead, interaction design & platform engineering',
    year: '2024',
    technologies: ['React', 'Node.js', 'Socket.io', 'Redis', 'Docker'],
    results: [
      { value: '48%', label: 'fewer status meetings' },
      { value: '2.4×', label: 'weekly engagement' },
      { value: '99.98%', label: 'realtime uptime' },
    ],
    accent: 'sky',
    visual: 'atlas',
    architecture: ['React client', 'WebSocket gateway', 'Redis presence', 'Event-sourced API'],
    decisions: [
      'Modeled collaboration as durable events so work can be reconstructed when clients reconnect.',
      'Made presence quiet and helpful instead of turning the UI into a stream of notifications.',
      'Used a component system that lets new workflows remain visually coherent.',
    ],
    lessons: 'Real-time collaboration succeeds when people feel in control of the change around them.',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/VincentDimov?tab=repositories',
  },
  {
    slug: 'northstar',
    name: 'Northstar',
    eyebrow: '03 / Commerce platform',
    tagline: 'A better way to buy objects worth keeping.',
    description:
      'A fast editorial commerce experience for a design-led homewares brand — from first discovery through considered checkout.',
    problem:
      'The original store made a distinctive brand feel interchangeable and created friction on mobile, where most customers discovered it.',
    solution:
      'I paired a visual product story with a resilient, highly performant storefront that makes product context feel as considered as the objects.',
    role: 'Experience design, frontend & commerce integration',
    year: '2024',
    technologies: ['Next.js', 'Shopify', 'Tailwind', 'GraphQL', 'Playwright'],
    results: [
      { value: '+37%', label: 'mobile conversion' },
      { value: '0.8s', label: 'LCP on 4G' },
      { value: '+22%', label: 'avg. order value' },
    ],
    accent: 'sand',
    visual: 'northstar',
    architecture: ['Edge storefront', 'Shopify GraphQL', 'CMS stories', 'Analytics events'],
    decisions: [
      'Prioritized product detail over catalog density to protect the brand’s point of view.',
      'Built the browsing UI as progressively enhanced HTML to keep it resilient on low-connectivity mobile.',
      'Captured commerce events with a small typed analytics layer instead of leaking vendor calls across components.',
    ],
    lessons: 'Performance is not a technical finish line; it changes how a brand feels in someone’s hands.',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/VincentDimov?tab=repositories',
  },
  {
    slug: 'relay',
    name: 'Relay',
    eyebrow: '04 / Developer experience',
    tagline: 'Observability for teams that prefer momentum.',
    description:
      'A developer-facing incident workspace that makes system health legible without making the interface feel like an aircraft cockpit.',
    problem:
      'Engineers could see plenty of telemetry, but had no clear path from an alert to the context needed to solve it together.',
    solution:
      'Relay pairs live traces with a focused incident narrative: what changed, what is affected, and the next most useful action.',
    role: 'Product strategy, design system & fullstack development',
    year: '2023',
    technologies: ['React', 'Go', 'ClickHouse', 'OpenTelemetry', 'AWS'],
    results: [
      { value: '43%', label: 'lower MTTR' },
      { value: '71%', label: 'less alert noise' },
      { value: '3 wk', label: 'to first release' },
    ],
    accent: 'mint',
    visual: 'relay',
    architecture: ['Event collector', 'Trace pipeline', 'ClickHouse store', 'Incident workspace'],
    decisions: [
      'Treated incidents as narratives rather than a collection of charts.',
      'Created an opinionated default view, while keeping deep investigation one step away.',
      'Built the UI around streaming states so data arrives with poise instead of flicker.',
    ],
    lessons: 'Technical tools earn trust when their complexity is felt in capability, not in the interface.',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/VincentDimov?tab=repositories',
  },
]

export const getProject = (slug: string) => projects.find((project) => project.slug === slug)
