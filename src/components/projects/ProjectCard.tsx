import { ArrowUpRight, Github } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '../../data/projects'
import { Badge } from '../ui/Badge'
import { ProjectVisual } from './ProjectVisual'
import { useLanguage } from '../../lib/locale'

type ProjectCardProps = {
  project: Project
  index: number
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { copy } = useLanguage()
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
        <span>0{index + 1} / {copy.categories[project.category]}</span>
        <span>{project.context}</span>
      </div>
      <ProjectVisual project={project} />
      <div className="project-card__body">
        <div className="project-card__intro">
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
        </div>
        <div className="project-card__footer">
          <div className="project-card__tags">
            {project.technologies.map((technology) => <Badge key={technology}>{technology}</Badge>)}
          </div>
          <a href={`/projects/${project.slug}`} className="project-card__link" aria-label={`${copy.work.caseStudy}: ${project.name}`}>
            <span>{copy.work.caseStudy}</span><ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="project-card__external">
          <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`${project.name}: ${copy.work.source}`}><Github size={14} aria-hidden="true" /> {copy.work.source}</a>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`${copy.work.demo}: ${project.name}`}>{copy.work.demo} <ArrowUpRight size={14} aria-hidden="true" /></a>}
        </div>
      </div>
    </motion.article>
  )
}
