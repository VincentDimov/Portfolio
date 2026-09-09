import { ArrowUpRight, Box, Cpu, Database, Workflow } from 'lucide-react'
import { skillGroups } from '../../data/skills'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const icons = [Cpu, Workflow, Database, Box]

export const Stack = () => (
  <section className="section section--stack" id="stack" aria-labelledby="stack-title">
    <Container>
      <SectionHeading
        index="03"
        eyebrow="Technical range"
        title={<><span id="stack-title">A stack in service</span> of the product.</>}
        description="Tools change. The instinct to choose the clearest, smallest useful solution does not."
      />
      <div className="stack-layout">
        <div className="skill-grid">
          {skillGroups.map((group, index) => {
            const Icon = icons[index]
            return (
              <Reveal className={`skill-card skill-card--${group.tone}`} delay={index * 0.05} key={group.label}>
                <div className="skill-card__top"><span>0{index + 1}</span><Icon size={20} aria-hidden="true" /></div>
                <h3>{group.label}</h3><p>{group.description}</p>
                <div className="skill-card__tools">{group.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              </Reveal>
            )
          })}
        </div>
        <Reveal className="system-principle" delay={0.16}>
          <div className="system-principle__top"><span>HOW I CHOOSE</span><i /></div>
          <p>Right-sized systems<br />have a kind of <em>quiet confidence.</em></p>
          <div className="system-principle__diagram" aria-hidden="true">
            <span>people</span><i /><span>product</span><i /><span>systems</span>
          </div>
          <a href="#experience" className="text-link">See experience <ArrowUpRight size={15} aria-hidden="true" /></a>
        </Reveal>
      </div>
    </Container>
  </section>
)
