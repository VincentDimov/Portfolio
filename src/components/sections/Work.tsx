import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { ProjectCard } from '../projects/ProjectCard'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { socials } from '../../data/socials'

export const Work = () => (
  <section className="section section--work" id="work" aria-labelledby="work-title">
    <Container>
      <SectionHeading
        index="01"
        eyebrow="Selected work"
        title={<><span id="work-title">A few things I’ve helped</span> make more useful.</>}
        description="Product stories from the place where strategy, interface and implementation overlap."
        action={<a className="text-link" href={`mailto:${socials.email}`}>Request the full archive <ArrowUpRight size={15} aria-hidden="true" /></a>}
      />
      <div className="project-grid">
        {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </div>
    </Container>
  </section>
)
