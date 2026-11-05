import { ArrowUpRight, Braces, Database, PanelsTopLeft, Workflow } from 'lucide-react'
import { projects } from '../../data/projects'
import { skillGroups } from '../../data/skills'
import { socials } from '../../data/socials'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { TechIcon } from '../ui/TechIcon'
import { GitHubActivity } from './GitHubActivity'
import { useLanguage } from '../../lib/locale'
import { skillTranslations } from '../../data/skills.sv'

const categoryIcons = {
  frontend: PanelsTopLeft,
  backend: Braces,
  data: Database,
  delivery: Workflow,
}

export const Stack = () => {
  const { copy, language } = useLanguage()
  return (
  <section className="section section--stack" id="stack" aria-labelledby="stack-title">
    <Container>
      <SectionHeading
        index="03"
        eyebrow={copy.stack.eyebrow}
        title={<span id="stack-title">{copy.stack.title}<br /><em>{copy.stack.accent}</em></span>}
        description={copy.stack.description}
        action={<a className="text-link" href={socials.github} target="_blank" rel="noreferrer">{copy.stack.github} <ArrowUpRight size={15} aria-hidden="true" /></a>}
      />
      <GitHubActivity />
      <div className="tech-grid">
        {skillGroups.map((group, index) => {
          const Icon = categoryIcons[group.id]
          const content = language === 'sv' ? skillTranslations[group.id] : group
          return (
            <Reveal className="tech-card" delay={index * 0.04} key={group.id}>
              <div className="tech-card__heading"><Icon size={20} aria-hidden="true" /><h3>{content.title}</h3></div>
              <p>{content.description}</p>
              <ul className="tech-card__tools" aria-label={`${content.title}: ${copy.case.technologies}`}>
                {group.tools.map(tool => <li className="tech-item" key={tool}><TechIcon name={tool} /><span>{tool}</span></li>)}
              </ul>
              <div className="tech-card__project">
                <span>{copy.stack.inWork}</span>
                {group.projectSlugs.map(slug => {
                  const project = projects.find(item => item.slug === slug)
                  if (!project) return null
                  return <a href={project.selected ? `/projects/${project.slug}` : project.liveUrl ?? project.githubUrl} target={project.selected ? undefined : '_blank'} rel={project.selected ? undefined : 'noreferrer'} key={slug}>{project.name}<ArrowUpRight size={12} aria-hidden="true" /></a>
                })}
              </div>
            </Reveal>
          )
        })}
      </div>
    </Container>
  </section>
)
}
