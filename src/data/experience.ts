export type Experience = {
  period: string
  company: string
  role: string
  description: string
  impact: string
  technologies: string[]
}

export const experience: Experience[] = [
  {
    period: '2023 — now',
    company: 'Independent',
    role: 'Fullstack product engineer',
    description: 'Partnering with ambitious teams from early product shape to stable, scalable launch.',
    impact: 'Shipped 8 product releases across SaaS, commerce and developer tooling.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Postgres'],
  },
  {
    period: '2021 — 2023',
    company: 'Forma Studio',
    role: 'Senior frontend engineer',
    description: 'Led frontend systems for digital products where brand expression and usability carried equal weight.',
    impact: 'Reduced delivery time by 35% with a shared accessible component system.',
    technologies: ['Next.js', 'GraphQL', 'Framer Motion', 'Figma'],
  },
  {
    period: '2019 — 2021',
    company: 'Kite Labs',
    role: 'Software engineer',
    description: 'Built product foundations, API integrations and internal tooling for fast-moving venture teams.',
    impact: 'Improved core application performance by 45% through rendering and query redesign.',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
  },
]
