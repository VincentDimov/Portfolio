import { ArrowDown, ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { ButtonLink } from '../ui/Button'
import { HeroSystemVisual } from '../visuals/HeroSystemVisual'
import { socials } from '../../data/socials'
import { profile } from '../../data/profile'

export const Hero = () => {
  const reduceMotion = useReducedMotion()
  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0.01 : 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <motion.div className="hero__kicker" {...reveal(0.05)}>
            <span className="availability-dot" />
            <span>Available for select projects — 2026</span>
          </motion.div>
          <motion.p className="hero__role" {...reveal(0.11)}>{profile.name} <i /> {profile.role} <i /> Stockholm, Sweden</motion.p>
          <motion.h1 id="hero-title" {...reveal(0.17)}>
            Digital products,<br />
            <em>made deliberate.</em>
          </motion.h1>
          <motion.p className="hero__lede" {...reveal(0.25)}>
            I pair product thinking with meticulous engineering to turn complex ideas into useful, unmistakably human software.
          </motion.p>
          <motion.div className="hero__actions" {...reveal(0.32)}>
            <ButtonLink href="#work" icon>Explore selected work</ButtonLink>
            <ButtonLink href="#contact" variant="quiet">Start a conversation <ArrowUpRight size={15} aria-hidden="true" /></ButtonLink>
          </motion.div>
          <motion.div className="hero__footnote" {...reveal(0.39)}>
            <div className="hero__socials" aria-label="Social links">
              <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} aria-hidden="true" /></a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} aria-hidden="true" /></a>
            </div>
            <a href="#work" className="scroll-cue"><ArrowDown size={15} aria-hidden="true" /> Scroll to explore</a>
          </motion.div>
        </div>
        <div className="hero__visual-wrap"><HeroSystemVisual /></div>
      </div>
    </section>
  )
}
