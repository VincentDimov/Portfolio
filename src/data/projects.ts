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
  imageKind?: 'landing' | 'local'
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
    summary: 'A Swedish bookkeeping application connecting vouchers, supporting documents and financial reports. A Next.js workspace and NestJS API turn accounting rules into a structured workflow.',
    technologies: ['Next.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma'],
    githubUrl: 'https://github.com/VincentDimov/AppenBokforing', sourceVisibility: 'public',
    liveUrl: 'https://bokforingsappen.vercel.app/', image: '/images/projects/ledgerapp.webp',
    imageAlt: 'LedgerApp public landing page with its bookkeeping workflow and labelled illustrative overview.',
    accent: 'lavender', flow: ['Documents', 'Vouchers', 'Reports'],
    context: 'Accounting application project',
    purpose: 'Bookkeeping connects everyday records to a larger financial picture. LedgerApp brings those steps into a web application with a separate frontend, backend and relational data model. Organisations, chart-of-account entries, fiscal years, journals and reports are represented explicitly, so the interface can work with the domain rather than a set of disconnected forms.',
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
    summary: 'A booking application connecting accommodation discovery, host listings and guest reservations. A typed Hono API and PostgreSQL constraints handle pricing, ownership and overlapping bookings.',
    technologies: ['Next.js', 'TypeScript', 'Hono', 'PostgreSQL', 'Zod'],
    githubUrl: 'https://github.com/VincentDimov/StayFinder', sourceVisibility: 'public',
    liveUrl: 'https://stayfinder-tau-sepia.vercel.app/', image: '/images/projects/stayfinder.webp',
    imageAlt: 'StayFinder public homepage showing accommodation discovery, a destination search and featured stays.',
    accent: 'sand', flow: ['Discover', 'Choose dates', 'Book'],
    context: 'Individual school project · WEBB25',
    purpose: 'A stay-booking flow needs more than an appealing list of places. StayFinder connects discovery, host and guest access, and booking availability in an individual fullstack school project. The server calculates prices and checks ownership, while database rules protect availability when requests arrive at the same time.',
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
    summary: 'A recruitment workspace bringing jobs, candidate records and interview planning into one flow. Kanban and list views share the same data, with company boundaries and private CV storage enforced behind the interface.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/VincentDimov/mini-ATS-Vincent', sourceVisibility: 'public',
    liveUrl: 'https://miniatsvincent.vercel.app/', image: '/images/projects/mini-ats.webp',
    imageAlt: 'Mini ATS public landing page introducing the recruitment workspace and an explicitly labelled example pipeline.',
    accent: 'mint', flow: ['Jobs', 'Candidates', 'Pipeline'],
    context: 'Recruitment workspace project',
    purpose: 'Hiring information becomes difficult to follow when roles, candidate files and conversations live in different places. Mini ATS brings them into a shared workspace with explicit company and file access. Search, tags, notes and candidate stages support day-to-day recruitment, while server checks and database policies connect each action to the correct organisation.',
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
    slug: 'plot-twist', name: 'Plot Twist', category: 'Fullstack',
    summary: 'A local plant-sharing platform connecting map-based discovery with listings and exchange requests. React and TypeScript meet an Express API with transactional reservations and exchange history.',
    technologies: ['React', 'TypeScript', 'Express', 'MongoDB', 'TanStack Query', 'Leaflet'],
    githubUrl: 'https://github.com/VincentDimov/plot-twist', sourceVisibility: 'private',
    liveUrl: 'https://plot-twist-vincent.vercel.app/', image: '/images/projects/plot-twist.webp',
    imageAlt: 'Plot Twist public homepage introducing local plant exchanges and map-based discovery.',
    accent: 'mint', flow: ['Find a plant', 'Request exchange', 'Complete'],
    context: 'Plant-exchange application',
    purpose: 'Plot Twist turns the idea of sharing cuttings locally into a connected web application. A React interface supports discovery, plant listings and personal account flows, while an Express and MongoDB backend keeps exchange requests, reservations, notifications and history consistent.',
    features: [
      { title: 'Discover nearby plants', description: 'Server-side search and filters connect the listing catalogue with a separately loaded Leaflet map and plant detail pages.' },
      { title: 'Follow an exchange', description: 'Request, approve, decline and complete actions are checked against ownership and the current exchange state, with notifications for the participants.' },
      { title: 'Protect reservations', description: 'MongoDB transactions update the plant, active requests and exchange history together so conflicting approvals do not reserve the same plant twice.' },
    ],
    architecture: ['React / TanStack Query', 'Express API', 'Exchange transactions', 'MongoDB'], decisions: [],
    scopeNote: 'Further development of the Grupp11 course backend with a separate React frontend. This does not imply sole authorship of the original group work. Image URLs are supported; chat and file uploads are not implemented.',
  },
  {
    slug: 'sole-search', name: 'SOLE_SEARCH', category: 'Fullstack',
    summary: 'A sneaker-store demo built around scheduled drops and stock per shoe size. Vanilla JavaScript drives the storefront while the server controls availability, pricing and repeat-safe orders.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Vite', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/VincentDimov/sole-search', sourceVisibility: 'private',
    liveUrl: 'https://sole-search-vincent.vercel.app/', image: '/images/projects/sole-search.webp',
    imageAlt: 'SOLE_SEARCH public storefront featuring a sneaker drop, catalogue navigation and countdown.',
    accent: 'sky', flow: ['Explore drops', 'Choose size', 'Demo checkout'],
    context: 'Sneaker-commerce demo',
    purpose: 'SOLE_SEARCH explores the full shopping flow for time-limited sneaker releases without relying on a frontend framework. Product discovery, size selection, a saved basket and demo checkout connect to persistent customer, stock and order data through an Express API.',
    features: [
      { title: 'Server-controlled drops', description: 'The API calculates whether a release is upcoming, live or sold out. The interface refreshes that status instead of trusting the browser countdown to permit a purchase.' },
      { title: 'Stock-aware ordering', description: 'MongoDB transactions check each variant, use server prices and update all order lines together. Idempotency keys prevent a retried request from creating another order.' },
      { title: 'Customer and admin flows', description: 'Cookie-based sessions support account pages and order history, while administration manages products, release schedules and stock.' },
    ],
    architecture: ['JavaScript storefront', 'Express API', 'Mongoose / transactions', 'MongoDB'], decisions: [],
    scopeNote: 'A clearly labelled demo store. There is no real payment, physical delivery, refund integration or external notification delivery.',
  },
  {
    slug: 'eventera', name: 'EVENTERA', category: 'Fullstack',
    summary: 'An event platform connecting discovery, guest bookings and organiser workflows. Capacity checks, private booking links, waiting lists and QR tickets sit behind a framework-free JavaScript interface.',
    technologies: ['JavaScript', 'Vite', 'Express', 'MongoDB', 'Mongoose', 'Zod'],
    githubUrl: 'https://github.com/VincentDimov/EVENTERA', sourceVisibility: 'private',
    liveUrl: 'https://eventera-vincent.vercel.app/', image: '/images/projects/eventera.webp',
    imageAlt: 'EVENTERA public homepage with event search, city selection and featured experiences.',
    accent: 'sand', flow: ['Discover event', 'Reserve seats', 'Check in'],
    context: 'Event-booking platform',
    purpose: 'EVENTERA brings the visitor and organiser sides of an event into one application. Guests can browse and reserve seats without an account, while authorised staff manage event publication, participants and check-in through a separate administration area.',
    features: [
      { title: 'Explore the programme', description: 'Search, city and category filters, dates and available seats work with grid, list and calendar views and shareable URL parameters.' },
      { title: 'Capacity-safe bookings', description: 'Transactional seat reservations, idempotent requests and private management links connect booking, cancellation and a FIFO waiting list.' },
      { title: 'Support the event day', description: 'QR tickets, calendar export and staff check-in complement participant search and CSV export, with role checks on administration actions.' },
    ],
    architecture: ['JavaScript interface', 'Express routes', 'Booking / waiting list', 'MongoDB'], decisions: [],
    scopeNote: 'Seeded events and participants are demonstration data. Payments are not included; outgoing email requires SMTP configuration and camera scanning depends on device support.',
  },
  {
    slug: 'folio', name: 'FOLIO', category: 'Fullstack',
    summary: 'A portfolio builder with a structured editor, autosaving and separate public versions. Users can organise projects, choose a visual template and publish a shareable page without exposing the private draft.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Express', 'MongoDB', 'Zod'],
    githubUrl: 'https://github.com/VincentDimov/folio', sourceVisibility: 'private',
    liveUrl: 'https://folio-vincent-wine.vercel.app/', image: '/images/projects/folio.webp',
    imageAlt: 'FOLIO public homepage showing the portfolio-builder concept and a labelled example portfolio.',
    accent: 'lavender', flow: ['Edit', 'Preview', 'Publish'],
    context: 'Portfolio-builder application',
    purpose: 'FOLIO explores how a publishing tool can stay approachable while keeping editing and public presentation separate. A vanilla JavaScript editor works with an Express and MongoDB backend to manage profile content, projects, skills, templates and a chosen public address.',
    features: [
      { title: 'Recoverable editing', description: 'Serialised autosaves, revision checks, retry handling and local JSON rescue reduce the risk of silently overwriting or losing draft changes.' },
      { title: 'Controlled publishing', description: 'Private drafts and published snapshots are stored separately. Public portfolio pages are rendered as HTML with page metadata and a canonical address.' },
      { title: 'Personal presentation', description: 'Three template layouts, themes and section ordering combine with reviewed GitHub imports and JSON export to make the content reusable.' },
    ],
    architecture: ['JavaScript editor', 'Express services', 'Draft / published data', 'MongoDB'], decisions: [],
    scopeNote: 'Free and Premium limits are enforced in the backend, but Premium is a clearly labelled demonstration. No subscription billing or payment provider is connected.',
  },
  {
    slug: 'nordmark', name: 'Nordmark', category: 'Fullstack',
    summary: 'A marketplace demo covering product discovery, checkout and customer, seller and admin workflows. Isolated visitor workspaces make it possible to explore stock, orders and returns without real commerce.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'Better Auth'],
    githubUrl: 'https://github.com/VincentDimov/nordmark-marketplace', sourceVisibility: 'public',
    liveUrl: 'https://nordmark-vincent.vercel.app/', image: '/images/projects/nordmark.webp',
    imageAlt: 'Nordmark public demo marketplace with catalogue search, categories and a clearly labelled demo-store banner.',
    accent: 'sand', flow: ['Find products', 'Demo checkout', 'Manage orders'],
    context: 'Multi-role marketplace demo',
    purpose: 'Nordmark connects the storefront with the workflows that come after a purchase. Next.js and strict TypeScript present catalogue, account and portal views, while Prisma and PostgreSQL handle server-calculated prices, stock, order snapshots and role-scoped actions.',
    features: [
      { title: 'A connected shopping flow', description: 'Search, filters and product variants lead into baskets, wishlists and a checkout with server-calculated amounts, discounts and gift-card balances.' },
      { title: 'Explore different roles', description: 'Customer, seller and demo-admin views cover order history, seller-owned offers and shipments, returns and simulated refunds inside an isolated visitor workspace.' },
      { title: 'Keep commerce rules on the server', description: 'Serializable transactions and idempotency keys protect order creation, with input validation and ownership checks around private resources.' },
    ],
    architecture: ['Next.js storefront', 'Server routes / Better Auth', 'Prisma transactions', 'PostgreSQL'], decisions: [],
    scopeNote: 'Demonstration products, reviews and commerce flows. Payments, shipping and payouts are simulated by default; optional Stripe test code does not imply an active payment integration.',
  },
  {
    slug: 'anastasiia', name: 'Anastasiia — Consultation', category: 'Websites & CMS',
    summary: 'A consultation website with service presentation and a clear path to making an enquiry.',
    technologies: ['Next.js', 'TypeScript', 'React'],
    githubUrl: 'https://github.com/VincentDimov/anastasiia', sourceVisibility: 'private',
    liveUrl: 'https://anastasiia-friskvard.vercel.app/', image: '/images/projects/anastasiia.webp',
    imageAlt: 'Anastasiia public wellbeing website with a calm editorial layout and paths for individuals and businesses.',
    accent: 'sand', flow: ['Services', 'Information', 'Enquiry'],
    context: 'Website project',
    purpose: 'A service website where visitors can understand an offer, explore supporting content and find a suitable contact path. The implementation brings structured page content and responsive presentation together in Next.js.',
    features: [
      { title: 'Structured content', description: 'Services and supporting information are organised into reusable page structures rather than repeated page markup.' },
      { title: 'Responsive presentation', description: 'TypeScript, React and responsive layouts keep navigation and content usable across desktop and mobile.' },
      { title: 'Image delivery', description: 'Local WebP optimisation and Next.js image handling support the visual presentation without relying on unoptimised originals.' },
    ],
    architecture: [], decisions: [],
  },
  {
    slug: 'dspwebb', name: 'DSP', category: 'Websites & CMS',
    summary: 'A bilingual business website with dedicated pages for digital services, accounting and roofing.',
    technologies: ['Next.js', 'TypeScript', 'React'],
    githubUrl: 'https://github.com/VincentDimov/DSPWEBB', sourceVisibility: 'private',
    liveUrl: 'https://www.dspab.se/', image: '/images/projects/dspwebb.webp',
    imageAlt: 'DSP public homepage introducing digital development, accounting and roofing services.',
    accent: 'sky', flow: ['Services', 'Business needs', 'Contact'],
    context: 'Business website project',
    purpose: 'DSP brings digital services, accounting and roofing together under a shared identity while giving each service area its own content and contact path. Swedish and English are handled through explicit language routes.',
    features: [
      { title: 'Service-specific journeys', description: 'Dedicated pages let visitors move from a business need to the relevant service information and enquiry form.' },
      { title: 'Two languages', description: 'Path-based locale switching makes the selected language part of navigation rather than a visual-only toggle.' },
      { title: 'Server-side contact', description: 'The contact endpoint validates submissions and uses a configurable SMTP transport, with error handling when mail delivery is unavailable.' },
    ],
    architecture: [], decisions: [],
  },
  {
    slug: 'bokforingsmatchen', name: 'Bokföringsmatchen', category: 'Websites & CMS',
    summary: 'A bilingual comparison demo for accounting agencies, with filters, a quote wizard and indicative calculators.',
    technologies: ['Next.js', 'TypeScript', 'React'],
    githubUrl: 'https://github.com/VincentDimov/bokforingsmatchen', sourceVisibility: 'public',
    liveUrl: 'https://bokforingsmatchen.vercel.app/', image: '/images/projects/bokforingsmatchen.webp',
    imageAlt: 'Bokföringsmatchen public comparison-demo homepage with agency discovery and a quote-guide entry point.',
    accent: 'lavender', flow: ['Compare', 'Estimate', 'Quote wizard'],
    context: 'Comparison prototype',
    purpose: 'A comparison experience for businesses looking for accounting support. The prototype connects agency discovery with information, indicative calculations and a guided quote flow in Swedish and English.',
    features: [
      { title: 'Find and compare', description: 'Directory filters and individual agency profiles help visitors narrow a fictional agency catalogue to relevant alternatives.' },
      { title: 'Explore costs', description: 'Price and financial calculators provide indicative estimates alongside searchable knowledge articles.' },
      { title: 'Guided enquiries', description: 'A multistep quote wizard captures a request locally in the browser, demonstrating the interaction without implying external lead delivery.' },
    ],
    architecture: [], decisions: [],
    scopeNote: 'Prototype with fictional agencies. Quote requests are stored locally in the browser; they are not sent to agencies.',
  },
  {
    slug: 'nordblad', name: 'Nordbladet', category: 'Websites & CMS',
    summary: 'A headless-CMS newspaper with article pages, categories and author profiles powered by Storyblok.',
    technologies: ['Next.js', 'JavaScript', 'Storyblok', 'Tailwind CSS'],
    githubUrl: 'https://github.com/VincentDimov/Nordblad', sourceVisibility: 'public',
    liveUrl: 'https://nordblad.vercel.app/', image: '/images/projects/nordblad.webp',
    imageAlt: 'Nordbladet public newspaper homepage with navigation to articles and categories.',
    accent: 'sand', flow: ['Storyblok', 'Articles', 'Readers'],
    context: 'Educational CMS project',
    purpose: 'An editorial site that separates content management from presentation. Storyblok supplies articles, categories, author information and page blocks, while Next.js renders the reader-facing experience.',
    features: [
      { title: 'Connected editorial content', description: 'Article-author relations connect a story with the person behind it and a dedicated author profile.' },
      { title: 'Category browsing', description: 'Category-aware content queries let readers explore the newspaper by subject instead of only following a single article list.' },
      { title: 'Headless architecture', description: 'Reusable CMS blocks and a dedicated Storyblok integration keep content retrieval separate from page components.' },
    ],
    architecture: [], decisions: [],
  },
  {
    slug: 'jobbportalen', name: 'Jobbportalen', category: 'Websites & CMS',
    summary: 'A CMS-driven job portal with job detail pages, text search and department filtering.',
    technologies: ['Next.js', 'TypeScript', 'Storyblok'],
    githubUrl: 'https://github.com/VincentDimov/jobbportalenCMS', sourceVisibility: 'public',
    liveUrl: 'https://jobbportalen-mauve.vercel.app/jobs', image: '/images/projects/jobbportalen.webp',
    imageAlt: 'Jobbportalen public vacancies page with keyword search, a department filter and job listings.',
    accent: 'sky', flow: ['CMS content', 'Search', 'Job details'],
    context: 'CMS project',
    purpose: 'A job portal where editorial control over vacancies sits in Storyblok and the public browsing experience runs in Next.js. The project connects structured job content with searchable, filterable listings and dedicated detail pages.',
    features: [
      { title: 'Focused discovery', description: 'Keyword search and department filters are passed into Storyblok queries to retrieve the relevant published vacancies.' },
      { title: 'Job detail pages', description: 'Each vacancy has its own page, giving the listing overview a clear next step and a place for complete role information.' },
      { title: 'Typed integration', description: 'TypeScript and reusable CMS block composition give the content integration a consistent structure across the portal.' },
    ],
    architecture: [], decisions: [],
  },
  {
    slug: 'paskquiz', name: 'Påsk Quiz', category: 'Interactive',
    summary: 'An Easter-themed, category-based quiz with timed questions and browser interactions.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/VincentDimov/PaskQuiz', sourceVisibility: 'private',
    image: '/images/projects/paskquiz.webp', imageKind: 'local',
    imageAlt: 'Local preview of Påsk Quiz showing its Easter-themed category selector.',
    accent: 'sand', flow: ['Pick category', 'Answer', 'Score'],
    context: 'Interactive web project',
    purpose: 'An Easter-themed quiz built with HTML, CSS and JavaScript. The project explores how category selection, timed questions, answer feedback and a results view fit into a browser-based game loop.',
    features: [
      { title: 'Category-based rounds', description: 'Players choose a subject and receive randomised multiple-choice questions for each round.' },
      { title: 'Timed interaction', description: 'A countdown and progress feedback give each answer a clear time window and keep the current game state visible.' },
      { title: 'Result feedback', description: 'Scoring, results and audio feedback connect individual answers to the completed round, using DOM interactions and local media.' },
    ],
    architecture: [], decisions: [],
  },
  {
    slug: 'jultomtesquiz', name: 'Jultomtes Quiz', category: 'Interactive',
    summary: 'A Christmas-themed quiz combining category selection, a countdown and question handling in JavaScript.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/VincentDimov/JultomtesQuiz', sourceVisibility: 'private',
    image: '/images/projects/jultomtesquiz.webp', imageKind: 'local',
    imageAlt: 'Local preview of Jultomtes Quiz showing its Christmas-themed category selector.',
    accent: 'mint', flow: ['Pick category', 'Answer', 'Score'],
    context: 'Interactive web project',
    purpose: 'A Christmas-themed quiz exploring interactive game states without a frontend framework. JavaScript coordinates question selection, timing, score updates and the transition from a running round to its result.',
    features: [
      { title: 'Varied questions', description: 'Christmas categories and randomised multiple-choice questions make the quiz flow reusable across different rounds.' },
      { title: 'Visible game state', description: 'A timer and progress indicators show where the player is and when an answer must be submitted.' },
      { title: 'Round completion', description: 'Scoring and audio feedback lead into a result view, demonstrating event handling and DOM updates with browser fundamentals.' },
    ],
    architecture: [], decisions: [],
  },
  {
    slug: 'pokemon', name: 'Pokémon Application', category: 'Interactive',
    summary: 'A React interface for exploring the original 151 Pokémon, with details fetched from PokéAPI.',
    technologies: ['React', 'JavaScript', 'Vite', 'PokéAPI'],
    githubUrl: 'https://github.com/VincentDimov/PokemonApplicationAPI', sourceVisibility: 'public',
    image: '/images/projects/pokemon.webp', imageKind: 'local',
    imageAlt: 'Local preview of Pokémon Application with Pikachu selected and its image, type, weight and height loaded from PokéAPI.',
    accent: 'lavender', flow: ['PokéAPI', 'Browse', 'Details'],
    context: 'API integration project',
    purpose: 'A React learning project that turns remote PokéAPI data into an interactive browsing interface. It separates the selection flow from the details of an individual Pokémon and uses a public API rather than a custom backend.',
    features: [
      { title: 'Browse the original collection', description: 'Fetch the original 151 Pokémon and expose them through a selection control.' },
      { title: 'Load selected details', description: 'A second API request retrieves information for the chosen Pokémon rather than hardcoding its properties in the interface.' },
      { title: 'Present structured data', description: 'React components display the sprite, types, weight and height, connecting fetched JSON to a readable detail view.' },
    ],
    architecture: [], decisions: [],
  },
]

export const selectedProjects = projects.filter(project => project.selected)
export const moreProjects = projects.filter(project => !project.selected)
export const getProject = (slug: string) => projects.find(project => project.slug === slug && project.selected)
