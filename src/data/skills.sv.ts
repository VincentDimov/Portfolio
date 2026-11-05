import type { SkillGroup } from './skills'

export const skillTranslations: Record<SkillGroup['id'], { title: string; description: string }> = {
  frontend: {
    title: 'Frontend',
    description: 'React och TypeScript återkommer i mina applikationer, tillsammans med Next.js, responsiv CSS och komponentbaserade gränssnitt.',
  },
  backend: {
    title: 'Backend & API:er',
    description: 'Projektspecifika ramverk: NestJS i LedgerApp och Hono i StayFinder, med typad validering och tydliga gränser för API:erna.',
  },
  data: {
    title: 'Data & CMS',
    description: 'PostgreSQL i fullstackprojekten och Storyblok i Nordbladet och Jobbportalen för strukturerat innehåll som går att redigera.',
  },
  delivery: {
    title: 'Verktyg & leverans',
    description: 'Versionshanterad källkod och driftsättning på Vercel. Jest och Playwright används i applikationernas repon för att testa viktiga flöden.',
  },
}
