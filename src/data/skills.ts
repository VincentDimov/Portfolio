export type SkillGroup = {
  label: string
  description: string
  tools: string[]
  tone: 'lavender' | 'sky' | 'sand' | 'mint'
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Interface',
    description: 'Systems that feel precise, expressive and effortless.',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    tone: 'lavender',
  },
  {
    label: 'Application',
    description: 'Reliable product logic, APIs and integrations.',
    tools: ['Node.js', 'NestJS', 'REST', 'GraphQL', 'WebSockets'],
    tone: 'sky',
  },
  {
    label: 'Data',
    description: 'Models and queries that stay understandable as products grow.',
    tools: ['PostgreSQL', 'Redis', 'MongoDB', 'Prisma', 'SQL'],
    tone: 'mint',
  },
  {
    label: 'Delivery',
    description: 'A calm path from local idea to production.',
    tools: ['Docker', 'AWS', 'Vercel', 'CI/CD', 'GitHub Actions'],
    tone: 'sand',
  },
]

export const principles = [
  ['01', 'Build for users.', 'The best technical choice is the one that gives people more confidence and less friction.'],
  ['02', 'Design for change.', 'Flexible systems make future decisions cheaper, faster and kinder to the team.'],
  ['03', 'Make complexity legible.', 'Architecture should clarify the product, not make it harder to reason about.'],
  ['04', 'Treat performance as product.', 'Speed is felt as trust, focus and a little more room to think.'],
] as const
