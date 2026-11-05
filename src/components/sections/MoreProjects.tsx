import { useState } from 'react'
import { ArrowUpRight, ChevronDown, Github, LockKeyhole } from 'lucide-react'
import { moreProjects, type ProjectCategory } from '../../data/projects'
import { ProjectVisual } from '../projects/ProjectVisual'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { useLanguage } from '../../lib/locale'
import { localizeProject } from '../../lib/content'

type ProjectFilter = 'All' | Exclude<ProjectCategory, 'Fullstack'>
const filters: ProjectFilter[] = ['All', 'Websites & CMS', 'Interactive']
const initialProjectCount = 4

export const MoreProjects = () => {
  const { copy, language } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All')
  const [showAll, setShowAll] = useState(false)
  const matchingProjects = moreProjects.filter(project => activeFilter === 'All' || project.category === activeFilter)
  const visibleProjects = (showAll ? matchingProjects : matchingProjects.slice(0, initialProjectCount)).map(project => localizeProject(project, language))

  const changeFilter = (filter: ProjectFilter) => {
    setActiveFilter(filter)
    setShowAll(false)
  }

  return (
    <section className="section more-projects" id="more-projects" aria-labelledby="more-projects-title">
      <Container>
        <SectionHeading
          index="04"
          eyebrow={copy.more.eyebrow}
          title={<span id="more-projects-title">{copy.more.title}</span>}
          description={copy.more.description}
        />
        <div className="project-filters" role="group" aria-label={copy.more.filterLabel}>
          {filters.map(filter => (
            <button
              type="button"
              key={filter}
              aria-pressed={activeFilter === filter}
              aria-controls="more-project-grid"
              onClick={() => changeFilter(filter)}
            >
              {filter === 'All' ? copy.more.all : copy.categories[filter]}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {copy.more.showing} {visibleProjects.length} {copy.more.of} {matchingProjects.length} {copy.more.projects}{activeFilter !== 'All' ? ` ${copy.more.in} ${copy.categories[activeFilter]}` : ''}.
        </p>
        <div className="more-project-grid" id="more-project-grid">
          {visibleProjects.map(project => (
            <Reveal className="compact-project" key={project.slug}>
              <article id={`project-${project.slug}`} aria-labelledby={`project-${project.slug}-title`}>
                <ProjectVisual project={project} compact />
                <div className="compact-project__body">
                  <span className="eyebrow">{copy.categories[project.category]}</span>
                  <h3 id={`project-${project.slug}-title`}>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div className="compact-project__tags" aria-label={`${project.name}: ${copy.case.technologies}`}>
                    {project.technologies.map(technology => <Badge key={technology}>{technology}</Badge>)}
                  </div>
                  {project.scopeNote && <p className="compact-project__scope">{project.scopeNote}</p>}
                  <div className="compact-project__links">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name}: ${project.sourceVisibility === 'private' ? `${copy.more.private}, ${copy.more.access}` : copy.more.sourceLabel}`}
                    >
                      {project.sourceVisibility === 'private' ? <LockKeyhole size={14} aria-hidden="true" /> : <Github size={14} aria-hidden="true" />}
                      {project.sourceVisibility === 'private' ? copy.more.private : copy.work.source}
                    </a>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`${copy.more.visit}: ${project.name}`}>
                        {copy.more.visit} <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {matchingProjects.length > initialProjectCount && (
          <div className="show-more-row">
            <Button
              type="button"
              variant="secondary"
              aria-expanded={showAll}
              aria-controls="more-project-grid"
              onClick={() => setShowAll(current => !current)}
            >
              {showAll ? copy.more.fewer : `${copy.more.showAll} ${matchingProjects.length} ${copy.more.projects}`}
              <ChevronDown size={15} aria-hidden="true" style={{ transform: showAll ? 'rotate(180deg)' : undefined }} />
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}
