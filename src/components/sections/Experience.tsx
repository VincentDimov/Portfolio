import { ArrowUpRight } from 'lucide-react'
import { experience } from '../../data/experience'
import { Container } from '../ui/Container'
import { Badge } from '../ui/Badge'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export const Experience = () => (
  <section className="section section--experience" id="experience" aria-labelledby="experience-title">
    <Container>
      <SectionHeading
        index="04"
        eyebrow="Experience"
        title={<><span id="experience-title">A trail of useful</span> momentum.</>}
        description="I’ve worked independently and inside teams that care deeply about their customers, craft and pace."
      />
      <div className="experience-list">
        {experience.map((item, index) => (
          <Reveal className="experience-item" delay={index * 0.06} key={item.period}>
            <div className="experience-item__period">{item.period}</div>
            <div className="experience-item__role"><h3>{item.role}</h3><span>{item.company}</span></div>
            <div className="experience-item__description"><p>{item.description}</p><strong>{item.impact}</strong></div>
            <div className="experience-item__tools">{item.technologies.map((technology) => <Badge key={technology}>{technology}</Badge>)}</div>
            <a href="#contact" className="experience-item__link" aria-label={`Discuss ${item.role}`}><ArrowUpRight size={18} aria-hidden="true" /></a>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
)
