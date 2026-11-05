import { ArrowLeft, ArrowUpRight, Check, Github, Layers3 } from 'lucide-react'
import type { Project } from '../data/projects'
import { ProjectVisual } from '../components/projects/ProjectVisual'
import { Container } from '../components/ui/Container'
import { Badge } from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { useLanguage } from '../lib/locale'

export const ProjectCaseStudy = ({ project }: { project: Project }) => {
  const { copy } = useLanguage()

  return (
    <main className={`case-study case-study--${project.accent}`} id="main" tabIndex={-1}>
      <span id="top" className="page-top-anchor" aria-hidden="true" />
      <Container>
        <Reveal className="case-study__back"><a href="/#work"><ArrowLeft size={16} aria-hidden="true" /> {copy.case.back}</a></Reveal>
        <div className="case-study__hero">
          <Reveal className="case-study__intro">
            <span className="eyebrow">{copy.categories[project.category]} / {project.context}</span>
            <h1>{project.name}</h1>
            <p>{project.summary}</p>
            <div className="case-study__links">
              {project.liveUrl && <ButtonLink href={project.liveUrl} target="_blank" rel="noreferrer" icon>{copy.case.demo}</ButtonLink>}
              <ButtonLink href={project.githubUrl} target="_blank" rel="noreferrer" variant="quiet"><Github size={16} aria-hidden="true" /> {copy.case.code}</ButtonLink>
            </div>
          </Reveal>
          <Reveal className="case-study__visual"><ProjectVisual project={project} /></Reveal>
        </div>
        <Reveal className="case-study__facts">
          <div><span>{copy.case.context}</span><strong>{project.context}</strong></div>
          <div><span>{copy.case.technologies}</span><p>{project.technologies.map(technology => <Badge key={technology}>{technology}</Badge>)}</p></div>
          <div><span>{copy.case.source}</span><a href={project.githubUrl} target="_blank" rel="noreferrer">{copy.case.public} <ArrowUpRight size={14} aria-hidden="true" /></a></div>
        </Reveal>
      </Container>
      <section className="case-story" aria-labelledby="purpose-title">
        <Container>
          <div className="case-story__grid">
            <Reveal className="case-story__aside"><span>{copy.case.purpose}</span></Reveal>
            <Reveal className="case-purpose"><h2 id="purpose-title">{copy.case.purposeTitle}</h2><p>{project.purpose}</p></Reveal>
          </div>
          <div className="case-features">
            {project.features.map((feature, index) => <Reveal key={feature.title} delay={index * 0.04}><span>0{index + 1}</span><h3>{feature.title}</h3><p>{feature.description}</p></Reveal>)}
          </div>
        </Container>
      </section>
      <section className="case-architecture" aria-labelledby="architecture-title">
        <Container>
          <Reveal className="case-architecture__heading"><span className="eyebrow">{copy.case.structure}</span><h2 id="architecture-title">{copy.case.structureTitle}<br /><em>{copy.case.structureAccent}</em></h2></Reveal>
          <Reveal className="architecture-map">
            <div className="architecture-map__path" aria-hidden="true" />
            {project.architecture.map((item, index) => <div className="architecture-node" key={item}><span>0{index + 1}</span><strong>{item}</strong><i><Check size={12} aria-hidden="true" /></i></div>)}
          </Reveal>
        </Container>
      </section>
      <section className="case-decisions" aria-labelledby="decisions-title">
        <Container>
          <div className="case-story__grid">
            <Reveal className="case-story__aside"><h2 id="decisions-title" className="eyebrow">{copy.case.focus}</h2></Reveal>
            <div className="decision-list">{project.decisions.map((decision, index) => <Reveal className="decision" key={decision.title}><span>0{index + 1}</span><div><h3>{decision.title}</h3><p>{decision.description}</p></div><ArrowUpRight size={18} aria-hidden="true" /></Reveal>)}</div>
          </div>
          {project.scopeNote && <Reveal className="case-lesson"><Layers3 size={20} aria-hidden="true" /><div><span>{copy.case.scope}</span><p>{project.scopeNote}</p></div></Reveal>}
        </Container>
      </section>
      <section className="case-next" aria-labelledby="next-title"><Container><Reveal><span>{copy.case.next}</span><h2 id="next-title">{copy.case.nextTitle}<br /><em>{copy.case.nextAccent}</em></h2><ButtonLink href="/#contact" icon>{copy.talk}</ButtonLink></Reveal><a href="/#work" className="case-next__external">{copy.case.explore} <ArrowUpRight size={18} aria-hidden="true" /></a></Container></section>
    </main>
  )
}
