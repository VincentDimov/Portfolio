import { Braces, Database, Flame, GitBranch, Github, Layers3, TestTubeDiagonal } from 'lucide-react'

type TechIconProps = { name: string }

// Small decorative brand marks sit next to the full, accessible technology name.
export const TechIcon = ({ name }: TechIconProps) => {
  switch (name) {
    case 'React':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="10" ry="3.7" />
          <ellipse cx="12" cy="12" rx="10" ry="3.7" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3.7" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'Next.js':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 16V8l9 11M16 8v6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'TypeScript':
    case 'JavaScript':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" opacity=".13" />
          <rect x="2.5" y="2.5" width="19" height="19" rx="2.5" fill="none" stroke="currentColor" />
          <text x="12" y="16" textAnchor="middle" fill="currentColor" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="750" fontSize="10">{name === 'TypeScript' ? 'TS' : 'JS'}</text>
        </svg>
      )
    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M12 5.2c-3 0-4.9 1.5-5.6 4.5 1.1-1.5 2.4-2 3.9-1.5.9.3 1.5 1 2.1 1.7 1.1 1.2 2.4 2.6 5.2 2.6 3 0 4.9-1.5 5.6-4.5-1.1 1.5-2.4 2-3.9 1.5-.9-.3-1.5-1-2.1-1.7C16.1 6.6 14.8 5.2 12 5.2ZM6.4 11.5c-3 0-4.9 1.5-5.6 4.5 1.1-1.5 2.4-2 3.9-1.5.9.3 1.5 1 2.1 1.7 1.1 1.2 2.4 2.6 5.2 2.6 3 0 4.9-1.5 5.6-4.5-1.1 1.5-2.4 2-3.9 1.5-.9-.3-1.5-1-2.1-1.7-1.1-1.2-2.4-2.6-5.2-2.6Z" />
        </svg>
      )
    case 'Node.js':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
          <path d="m12 2 8.7 5v10L12 22l-8.7-5V7Z" strokeLinejoin="round" />
          <text x="12" y="15.5" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="700" fontSize="9">JS</text>
        </svg>
      )
    case 'NestJS':
      return <Layers3 size={20} aria-hidden="true" />
    case 'Hono':
      return <Flame size={20} aria-hidden="true" />
    case 'REST APIs':
    case 'Zod':
      return <Braces size={20} aria-hidden="true" />
    case 'PostgreSQL':
      return <Database size={20} aria-hidden="true" />
    case 'Prisma':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m9.8 2.8-7.2 12 4.6 6.4 13.2-3.7-9.4-15c-.3-.5-.9-.3-1.2.3Z" strokeLinejoin="round" /><path d="m10.6 3-3.4 18" /></svg>
      )
    case 'Supabase':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M13.4 2 3 14h8.1l-.5 8L21 10h-8.1l.5-8Z" /></svg>
      )
    case 'Storyblok':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 3h16v15H9l-5 4V3Z" strokeLinejoin="round" /><path d="M15.5 8.2c-.7-1.4-5.8-1.7-5.8.8 0 2.7 6 1.2 6 4 0 2.5-5.2 2.2-6 .7" strokeLinecap="round" /></svg>
      )
    case 'Git':
      return <GitBranch size={20} aria-hidden="true" />
    case 'GitHub':
      return <Github size={20} aria-hidden="true" />
    case 'Vercel':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 3 23 21H1L12 3Z" /></svg>
      )
    default:
      return <TestTubeDiagonal size={20} aria-hidden="true" />
  }
}
