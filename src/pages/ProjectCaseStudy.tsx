import { useEffect } from 'react'
import { ArrowLeft, ArrowUpRight, Check, ExternalLink, Github, Layers3 } from 'lucide-react'
import type { Project } from '../data/projects'
import { ProjectVisual } from '../components/projects/ProjectVisual'
import { Container } from '../components/ui/Container'
import { Badge } from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { profile } from '../data/profile'

type ProjectCaseStudyProps = { project: Project }

export const ProjectCaseStudy = ({ project }: ProjectCaseStudyProps) => {
  useEffect(() => {
    document.title = `${project.name} — ${profile.name}`
    return () => { document.title = `${profile.name} — ${profile.role}` }
  }, [project.name])

  return (
    <main className={`case-study case-study--${project.accent}`} id="main">
      <span id="top" className="page-top-anchor" aria-hidden="true" />
      <Container>
        <Reveal className="case-study__back">
          <a href="/#work"><ArrowLeft size={16} aria-hidden="true" /> Back to selected work</a>
        </Reveal>
        <div className="case-study__hero">
          <Reveal className="case-study__intro" delay={0.04}>
            <span className="eyebrow">{project.eyebrow} <i /> {project.year}</span>
            <h1>{project.name}<br /><em>{project.tagline}</em></h1>
            <p>{project.description}</p>
            <div className="case-study__links">
              <ButtonLink href={project.liveUrl} target="_blank" rel="noreferrer" icon>Live preview</ButtonLink>
              <ButtonLink href={project.githubUrl} target="_blank" rel="noreferrer" variant="quiet"><Github size={16} aria-hidden="true" /> Repository</ButtonLink>
            </div>
          </Reveal>
          <Reveal className="case-study__visual" delay={0.1}><ProjectVisual project={project} /></Reveal>
        </div>
        <Reveal className="case-study__facts" delay={0.12}>
          <div><span>Role</span><strong>{project.role}</strong></div>
          <div><span>Technologies</span><p>{project.technologies.map((technology) => <Badge key={technology}>{technology}</Badge>)}</p></div>
          <div><span>Built</span><strong>{project.year}</strong></div>
        </Reveal>
      </Container>

      <section className="case-story">
        <Container>
          <div className="case-story__grid">
            <Reveal className="case-story__aside"><span>01 / Context</span></Reveal>
            <Reveal className="case-story__content" delay={0.04}>
              <div><h2>The challenge</h2><p>{project.problem}</p></div>
              <div><h2>The response</h2><p>{project.solution}</p></div>
            </Reveal>
          </div>
          <Reveal className="case-results" delay={0.08}>
            <span>What changed</span>
            {project.results.map((result) => <div key={result.label}><strong>{result.value}</strong><p>{result.label}</p></div>)}
          </Reveal>
        </Container>
      </section>

      <section className="case-architecture">
        <Container>
          <Reveal className="case-architecture__heading"><span className="eyebrow">02 / Architecture</span><h2>Built to keep the<br /><em>important things simple.</em></h2></Reveal>
          <Reveal className="architecture-map" delay={0.06}>
            <div className="architecture-map__path" aria-hidden="true" />
            {project.architecture.map((item, index) => <div className="architecture-node" key={item}><span>0{index + 1}</span><strong>{item}</strong><i><Check size={12} /></i></div>)}
          </Reveal>
        </Container>
      </section>

      <section className="case-decisions">
        <Container>
          <div className="case-story__grid">
            <Reveal className="case-story__aside"><span>03 / Key decisions</span></Reveal>
            <div className="decision-list">
              {project.decisions.map((decision, index) => (
                <Reveal className="decision" delay={index * 0.06} key={decision}>
                  <span>0{index + 1}</span><p>{decision}</p><ArrowUpRight size={18} aria-hidden="true" />
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="case-lesson" delay={0.12}><Layers3 size={20} aria-hidden="true" /><div><span>What I took away</span><p>{project.lessons}</p></div></Reveal>
        </Container>
      </section>

      <section className="case-next">
        <Container>
          <Reveal>
            <span>Have a product story of your own?</span>
            <h2>Let’s make the next<br /><em>one count.</em></h2>
            <ButtonLink href="/#contact" icon>Start a conversation</ButtonLink>
          </Reveal>
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="case-next__external"><ExternalLink size={18} aria-hidden="true" /><span>Explore the live product</span></a>
        </Container>
      </section>
    </main>
  )
}
