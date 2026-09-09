import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '../../data/projects'
import { Badge } from '../ui/Badge'
import { ProjectVisual } from './ProjectVisual'

type ProjectCardProps = {
  project: Project
  index: number
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const reduceMotion = useReducedMotion()
  return (
    <motion.article
      className={`project-card project-card--${project.accent} project-card--${index}`}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-card__meta">
        <span>{project.eyebrow}</span>
        <span>{project.year}</span>
      </div>
      <ProjectVisual project={project} />
      <div className="project-card__body">
        <div className="project-card__intro">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
        <div className="project-card__footer">
          <div className="project-card__tags">
            {project.technologies.slice(0, 3).map((technology) => <Badge key={technology}>{technology}</Badge>)}
          </div>
          <a href={`/projects/${project.slug}`} className="project-card__link" aria-label={`View ${project.name} case study`}>
            <span>View case study</span><ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}
