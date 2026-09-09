import { Braces, Layers3, PenTool, Route } from 'lucide-react'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const disciplines = [
  { icon: PenTool, label: 'Product sense', detail: 'Finding the useful question before building the answer.' },
  { icon: Layers3, label: 'Interface craft', detail: 'Designing clarity into every state and interaction.' },
  { icon: Braces, label: 'Engineering depth', detail: 'Building foundations that stay calm under pressure.' },
  { icon: Route, label: 'Systems thinking', detail: 'Connecting product decisions to durable technical choices.' },
]

const metrics = [
  ['8+', 'years coding'],
  ['34', 'products shipped'],
  ['18', 'countries reached'],
  ['∞', 'details considered'],
]

export const About = () => (
  <section className="section section--about" id="about" aria-labelledby="about-title">
    <Container>
      <SectionHeading
        index="02"
        eyebrow="A little about me"
        title={<span id="about-title">I care about the whole <em>shape</em> of a product.</span>}
      />
      <div className="about-layout">
        <Reveal className="about-copy">
          <p className="about-copy__lead">The products I’m drawn to are ambitious, useful, and a little bit difficult to get right.</p>
          <p>I work at the seam between product, design, frontend, backend and architecture — because the most meaningful product decisions rarely live in only one of them.</p>
          <p>That perspective helps teams move from a promising idea to a polished, production-ready experience without losing the reason it should exist in the first place.</p>
          <a className="text-link" href="#contact">More about how I work <span>↘</span></a>
        </Reveal>
        <Reveal className="discipline-grid" delay={0.08}>
          {disciplines.map(({ icon: Icon, label, detail }, index) => (
            <article className="discipline-card" key={label}>
              <span>0{index + 1}</span><Icon size={19} aria-hidden="true" />
              <h3>{label}</h3><p>{detail}</p>
            </article>
          ))}
        </Reveal>
      </div>
      <Reveal className="metric-row" delay={0.12}>
        {metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </Reveal>
    </Container>
  </section>
)
