export type SkillGroup = {
  id: 'frontend' | 'backend' | 'data' | 'delivery'
  title: string
  description: string
  tools: string[]
  projectSlugs: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'React and TypeScript recur across my applications, alongside Next.js, responsive CSS and component-based interfaces.',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
    projectSlugs: ['ledgerapp', 'stayfinder', 'mini-ats'],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    description: 'Project-specific frameworks: NestJS in LedgerApp and Hono in StayFinder, with typed validation and explicit API boundaries.',
    tools: ['Node.js', 'NestJS', 'Hono', 'REST APIs', 'Zod'],
    projectSlugs: ['ledgerapp', 'stayfinder'],
  },
  {
    id: 'data',
    title: 'Data & CMS',
    description: 'PostgreSQL across the fullstack projects; Storyblok in Nordbladet and Jobbportalen for structured, editable content.',
    tools: ['PostgreSQL', 'Prisma', 'Supabase', 'Storyblok'],
    projectSlugs: ['mini-ats', 'nordblad', 'jobbportalen'],
  },
  {
    id: 'delivery',
    title: 'Tools & Delivery',
    description: 'Versioned source and Vercel deployments, with Jest and Playwright used in the application repositories to check important flows.',
    tools: ['Git', 'GitHub', 'Vercel', 'Playwright', 'Jest'],
    projectSlugs: ['ledgerapp', 'mini-ats'],
  },
]
