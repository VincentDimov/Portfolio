export type ProjectCategory = 'Fullstack' | 'Websites & CMS' | 'Interactive'
export type Project = {
  slug: string
  name: string
  category: ProjectCategory
  summary: string
  technologies: string[]
  githubUrl: string
  sourceVisibility: 'public' | 'private'
  liveUrl?: string
  image?: string
  imageAlt?: string
  accent: 'lavender' | 'sky' | 'sand' | 'mint'
  flow: [string, string, string]
  selected?: boolean
  context: string
  purpose: string
  features: { title: string; description: string }[]
  architecture: string[]
  decisions: { title: string; description: string }[]
  scopeNote?: string
}

export const projects: Project[] = [
  {
    slug: 'ledgerapp', name: 'LedgerApp', category: 'Fullstack', selected: true,
    summary: 'A Swedish bookkeeping application connecting vouchers, supporting documents and financial reports in one structured workflow.',
    technologies: ['Next.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma'],
    githubUrl: 'https://github.com/VincentDimov/AppenBokforing', sourceVisibility: 'public',
    liveUrl: 'https://bokforingsappen.vercel.app/', image: '/images/projects/ledgerapp.webp',
    imageAlt: 'LedgerApp public landing page with its bookkeeping workflow and labelled illustrative overview.',
    accent: 'lavender', flow: ['Documents', 'Vouchers', 'Reports'],
    context: 'Accounting application project',
    purpose: 'Bookkeeping connects everyday records to a larger financial picture. LedgerApp brings those steps into a web application with a separate frontend, backend and relational data model.',
    features: [
      { title: 'Voucher workflows', description: 'Create draft vouchers and work with posting flows and their supporting documents.' },
      { title: 'Reports and exchange', description: 'Financial reports and SIE import/export connect the application to Swedish bookkeeping workflows.' },
      { title: 'Structured backend', description: 'A NestJS API and Prisma data layer separate application rules from the Next.js interface.' },
    ],
    architecture: ['Next.js interface', 'NestJS API', 'Prisma models', 'PostgreSQL'],
    decisions: [
      { title: 'Keep financial data structured', description: 'A relational model gives vouchers and their rows an explicit structure instead of treating them as disconnected UI entries.' },
      { title: 'Separate the application layers', description: 'The Next.js and NestJS applications keep presentation, API behaviour and persistence distinct.' },
      { title: 'Test important workflows', description: 'Jest and Playwright are used in the repository to cover backend behaviour and browser workflows.' },
    ],
    scopeNote: 'A development project, not a claim of a certified accounting product. The full official BAS account catalogue is not complete.',
  },
  {
    slug: 'stayfinder', name: 'StayFinder', category: 'Fullstack', selected: true,
    summary: 'A booking application where guests discover stays and hosts manage listings, with booking rules enforced in the database.',
    technologies: ['Next.js', 'TypeScript', 'Hono', 'PostgreSQL', 'Zod'],
    githubUrl: 'https://github.com/VincentDimov/StayFinder', sourceVisibility: 'public',
    liveUrl: 'https://stayfinder-tau-sepia.vercel.app/', image: '/images/projects/stayfinder.webp',
    imageAlt: 'StayFinder public homepage showing accommodation discovery, a destination search and featured stays.',
    accent: 'sand', flow: ['Discover', 'Choose dates', 'Book'],
    context: 'Individual school project · WEBB25',
    purpose: 'A stay-booking flow needs more than an appealing list of places. StayFinder connects discovery, host and guest access, and booking availability in a fullstack school project.',
    features: [
      { title: 'Discover accommodation', description: 'Browse listings and use destination and guest inputs to find a suitable stay.' },
      { title: 'Guest and host flows', description: 'Authentication and separate guest and host responsibilities support bookings and listing management.' },
      { title: 'Booking integrity', description: 'Database-level constraints prevent overlapping bookings instead of relying only on checks in the interface.' },
    ],
    architecture: ['Next.js interface', 'Hono REST API', 'Validation / access', 'PostgreSQL'],
    decisions: [
      { title: 'Enforce availability in the database', description: 'Booking conflicts are constrained at the data layer so simultaneous requests cannot depend on a client-side availability check.' },
      { title: 'Make access part of the flow', description: 'Cookie authentication and database access rules connect user identity to host and guest actions.' },
      { title: 'Validate at the boundary', description: 'Zod schemas give incoming API data a defined shape before it reaches application logic.' },
    ],
    scopeNote: 'Built as an individual educational project. The public deployment is a project demonstration, not a commercial booking service.',
  },
  {
    slug: 'mini-ats', name: 'Mini ATS', category: 'Fullstack', selected: true,
    summary: 'A recruitment workspace for jobs and candidates, with a visual pipeline, shared notes and controlled access to CV files.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/VincentDimov/mini-ATS-Vincent', sourceVisibility: 'public',
    liveUrl: 'https://miniatsvincent.vercel.app/', image: '/images/projects/mini-ats.webp',
    imageAlt: 'Mini ATS public landing page introducing the recruitment workspace and an explicitly labelled example pipeline.',
    accent: 'mint', flow: ['Jobs', 'Candidates', 'Pipeline'],
    context: 'Recruitment workspace project',
    purpose: 'Hiring information becomes difficult to follow when roles, candidate files and conversations live in different places. Mini ATS brings them into a shared workspace with explicit company and file access.',
    features: [
      { title: 'Candidate pipeline', description: 'Kanban and list views support candidate stages, search and tags alongside job management.' },
      { title: 'Shared context', description: 'Candidate notes, interview planning and calendar exports keep the next conversation close to the candidate record.' },
      { title: 'Controlled access', description: 'Supabase authentication, PostgreSQL row-level security and private CV storage support separate company workspaces.' },
    ],
    architecture: ['Next.js workspace', 'Server routes', 'Supabase Auth / RLS', 'Postgres / Storage'],
    decisions: [
      { title: 'Keep files private', description: 'CV documents are stored privately, with access handled through the application instead of public file URLs.' },
      { title: 'Scope data to the workspace', description: 'Company boundaries and database row-level security are part of the data access model.' },
      { title: 'Offer more than one view', description: 'Pipeline and list views support different ways of navigating the same recruitment data.' },
    ],
    scopeNote: 'Workspace accounts are supplied by an administrator. The code includes optional server-side AI summaries; availability depends on configuration and is not assumed for the live demo.',
  },
  {
    slug: 'anastasiia', name: 'Anastasiia — Consultation', category: 'Websites & CMS',
    summary: 'A consultation website with service presentation and a clear path to making an enquiry.',
    technologies: ['Next.js', 'TypeScript', 'React'],
    githubUrl: 'https://github.com/VincentDimov/anastasiia', sourceVisibility: 'private',
    liveUrl: 'https://anastasiia-friskvard.vercel.app/', accent: 'sand', flow: ['Services', 'Information', 'Enquiry'],
    context: 'Website project', purpose: 'A focused service presentation for a consultation website.', features: [], architecture: [], decisions: [],
  },
  {
    slug: 'dspwebb', name: 'DSP', category: 'Websites & CMS',
    summary: 'A bilingual business website with dedicated pages for digital services, accounting and roofing.',
    technologies: ['Next.js', 'TypeScript', 'React'],
    githubUrl: 'https://github.com/VincentDimov/DSPWEBB', sourceVisibility: 'private',
    liveUrl: 'https://www.dspab.se/', accent: 'sky', flow: ['Services', 'Business needs', 'Contact'],
    context: 'Business website project', purpose: 'A website connecting business services with a clear enquiry path.', features: [], architecture: [], decisions: [],
  },
  {
    slug: 'bokforingsmatchen', name: 'Bokföringsmatchen', category: 'Websites & CMS',
    summary: 'A bilingual comparison demo for accounting agencies, with filters, a quote wizard and indicative calculators.',
    technologies: ['Next.js', 'TypeScript', 'React'],
    githubUrl: 'https://github.com/VincentDimov/bokforingsmatchen', sourceVisibility: 'public',
    liveUrl: 'https://bokforingsmatchen.vercel.app/', accent: 'lavender', flow: ['Compare', 'Estimate', 'Quote wizard'],
    context: 'Comparison prototype', purpose: 'Explore a service comparison flow.', features: [], architecture: [], decisions: [],
    scopeNote: 'Prototype with fictional agencies. Quote requests are stored locally in the browser; they are not sent to agencies.',
  },
  {
    slug: 'nordblad', name: 'Nordbladet', category: 'Websites & CMS',
    summary: 'A headless-CMS newspaper with article pages, categories and author profiles powered by Storyblok.',
    technologies: ['Next.js', 'JavaScript', 'Storyblok', 'Tailwind CSS'],
    githubUrl: 'https://github.com/VincentDimov/Nordblad', sourceVisibility: 'public',
    liveUrl: 'https://nordblad.vercel.app/', accent: 'sand', flow: ['Storyblok', 'Articles', 'Readers'],
    context: 'Educational CMS project', purpose: 'A newspaper experience driven by structured CMS content.', features: [], architecture: [], decisions: [],
  },
  {
    slug: 'jobbportalen', name: 'Jobbportalen', category: 'Websites & CMS',
    summary: 'A CMS-driven job portal with job detail pages, text search and department filtering.',
    technologies: ['Next.js', 'TypeScript', 'Storyblok'],
    githubUrl: 'https://github.com/VincentDimov/jobbportalenCMS', sourceVisibility: 'public',
    liveUrl: 'https://jobbportalen-mauve.vercel.app/jobs', accent: 'sky', flow: ['CMS content', 'Search', 'Job details'],
    context: 'CMS project', purpose: 'A searchable job listing interface with content managed in Storyblok.', features: [], architecture: [], decisions: [],
  },
  {
    slug: 'paskquiz', name: 'Påsk Quiz', category: 'Interactive',
    summary: 'An Easter-themed, category-based quiz with timed questions and browser interactions.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/VincentDimov/PaskQuiz', sourceVisibility: 'private',
    accent: 'sand', flow: ['Pick category', 'Answer', 'Score'],
    context: 'Interactive web project', purpose: 'A seasonal quiz built with browser fundamentals.', features: [], architecture: [], decisions: [],
  },
  {
    slug: 'jultomtesquiz', name: 'Jultomtes Quiz', category: 'Interactive',
    summary: 'A Christmas-themed quiz combining category selection, a countdown and question handling in JavaScript.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/VincentDimov/JultomtesQuiz', sourceVisibility: 'private',
    accent: 'mint', flow: ['Pick category', 'Answer', 'Score'],
    context: 'Interactive web project', purpose: 'A seasonal quiz built with browser fundamentals.', features: [], architecture: [], decisions: [],
  },
  {
    slug: 'pokemon', name: 'Pokémon Application', category: 'Interactive',
    summary: 'A React interface for exploring the original 151 Pokémon, with details fetched from PokéAPI.',
    technologies: ['React', 'JavaScript', 'Vite', 'PokéAPI'],
    githubUrl: 'https://github.com/VincentDimov/PokemonApplicationAPI', sourceVisibility: 'public',
    accent: 'lavender', flow: ['PokéAPI', 'Browse', 'Details'],
    context: 'API integration project', purpose: 'Explore remote data in a component-based browser interface.', features: [], architecture: [], decisions: [],
  },
]

export const selectedProjects = projects.filter(project => project.selected)
export const moreProjects = projects.filter(project => !project.selected)
export const getProject = (slug: string) => projects.find(project => project.slug === slug && project.selected)
