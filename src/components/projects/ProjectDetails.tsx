import { ChevronDown } from 'lucide-react'
import type { Project } from '../../data/projects'
import { useLanguage } from '../../lib/locale'

export const ProjectDetails = ({ project }: { project: Project }) => {
  const { copy } = useLanguage()
  return (
    <details className="project-details">
      <summary aria-label={`${copy.more.aboutProject}: ${project.name}`}>
        <span>{copy.more.aboutProject}</span><ChevronDown size={15} aria-hidden="true" />
      </summary>
      <div className="project-details__content">
        <p>{project.purpose}</p>
        <ul>
          {project.features.map(feature => <li key={feature.title}><strong>{feature.title}.</strong> {feature.description}</li>)}
        </ul>
      </div>
    </details>
  )
}
