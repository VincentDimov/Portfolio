import { ArrowDownRight } from 'lucide-react'
import { principles } from '../../data/skills'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

export const Philosophy = () => (
  <section className="philosophy" aria-labelledby="philosophy-title">
    <Container>
      <Reveal className="philosophy__intro">
        <span className="eyebrow">05 / Engineering philosophy</span>
        <h2 id="philosophy-title">A few things I try to keep <em>non-negotiable.</em></h2>
      </Reveal>
      <div className="principle-list">
        {principles.map(([number, title, description], index) => (
          <Reveal className="principle" delay={index * 0.05} key={number}>
            <span>{number}</span><h3>{title}</h3><p>{description}</p><ArrowDownRight size={18} aria-hidden="true" />
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
)
