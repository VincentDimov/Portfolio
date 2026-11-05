import { Braces, Database, Layers3, Route } from 'lucide-react'
import { useLanguage } from '../../lib/locale'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const icons = [Layers3, Braces, Database, Route]

export const About = () => {
  const { copy } = useLanguage()
  return (
  <section className="section section--about" id="about" aria-labelledby="about-title">
    <Container>
      <SectionHeading index="02" eyebrow={copy.about.eyebrow} title={<span id="about-title">{copy.about.title}<br /><em>{copy.about.accent}</em></span>} />
      <div className="about-layout">
        <Reveal className="about-copy">
          <p className="about-copy__lead">{copy.about.lead}</p>
          <p>{copy.about.background}</p>
          <p>{copy.about.education}</p>
          <p>{copy.about.interests}</p>
          <a className="text-link" href="#contact">{copy.about.connect} <span aria-hidden="true">↗</span></a>
        </Reveal>
        <Reveal className="discipline-grid" delay={0.08}>
          {copy.about.disciplines.map(({ label, detail }, index) => {
            const Icon = icons[index]
            return (
            <article className="discipline-card" key={label}>
              <span>0{index + 1}</span><Icon size={19} aria-hidden="true" />
              <h3>{label}</h3><p>{detail}</p>
            </article>
          )})}
        </Reveal>
      </div>
    </Container>
  </section>
)
}
