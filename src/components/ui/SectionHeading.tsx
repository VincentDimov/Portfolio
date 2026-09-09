import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: ReactNode
  description?: string
  action?: ReactNode
}

export const SectionHeading = ({ index, eyebrow, title, description, action }: SectionHeadingProps) => (
  <Reveal className="section-heading">
    <div className="section-heading__eyebrow">
      <span>{index}</span>
      <span>{eyebrow}</span>
    </div>
    <div className="section-heading__content">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="section-heading__action">{action}</div>}
    </div>
  </Reveal>
)
