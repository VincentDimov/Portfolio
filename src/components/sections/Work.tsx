import { ArrowUpRight } from 'lucide-react'
import { selectedProjects } from '../../data/projects'
import { ProjectCard } from '../projects/ProjectCard'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { useLanguage } from '../../lib/locale'
import { localizeProject } from '../../lib/content'

export const Work = () => {
  const { copy, language } = useLanguage()
  return (
  <section className="section section--work" id="work" aria-labelledby="work-title">
    <Container>
      <SectionHeading
        index="01"
        eyebrow={copy.work.eyebrow}
        title={<><span id="work-title">{copy.work.title}</span><em>{copy.work.accent}</em></>}
        description={copy.work.description}
        action={<a className="text-link" href="#more-projects">{copy.work.more} <ArrowUpRight size={15} aria-hidden="true" /></a>}
      />
      <div className="project-grid">
        {selectedProjects.map((project, index) => <ProjectCard key={project.slug} project={localizeProject(project, language)} index={index} />)}
      </div>
    </Container>
  </section>
)
}
