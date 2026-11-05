import { ArrowRight, Braces, Database, LayoutTemplate } from 'lucide-react'
import type { Project } from '../../data/projects'
import { cn } from '../../lib/utils'
import { useLanguage } from '../../lib/locale'

export const ProjectVisual = ({ project, className, compact = false }: { project: Project; className?: string; compact?: boolean }) => {
  const { copy } = useLanguage()
  return (
  <div className={cn('project-visual', `project-visual--${project.accent}`, compact && 'project-visual--compact', className)}>
    {project.image ? (
      <figure className="project-screenshot">
        <div className="preview-chrome" aria-hidden="true"><span><i /><i /><i /></span><small>{new URL(project.liveUrl!).hostname}</small><span>↗</span></div>
        <img src={project.image} alt={project.imageAlt ?? `${project.name}: ${copy.visual.landing}`} width="1280" height="854" loading="lazy" decoding="async" />
        <figcaption>{copy.visual.landing}</figcaption>
      </figure>
    ) : (
      <div className="project-map" aria-label={`${project.name}: ${project.flow.join(' → ')}`}>
        <span className="project-map__label">{copy.visual.overview}</span>
        <div className="project-map__symbol" aria-hidden="true">{project.category === 'Interactive' ? <Braces /> : project.name === 'Nordbladet' || project.name === 'Jobbportalen' ? <Database /> : <LayoutTemplate />}</div>
        <div className="project-map__flow">{project.flow.map((step, index) => <span key={step}>{step}{index < 2 && <ArrowRight size={12} aria-hidden="true" />}</span>)}</div>
        <small>{copy.visual.diagram}</small>
      </div>
    )}
  </div>
)
}
