import { ArrowDown, ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { ButtonLink } from '../ui/Button'
import { HeroSystemVisual } from '../visuals/HeroSystemVisual'
import { socials } from '../../data/socials'
import { profile } from '../../data/profile'
import { useLanguage } from '../../lib/locale'

export const Hero = () => {
  const { copy } = useLanguage()
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
            <span className="hero__kicker-mark" aria-hidden="true">↳</span>
            <span>{copy.hero.kicker}</span>
          </motion.div>
          <motion.p className="hero__role" {...reveal(0.11)}>{profile.name} <i /> {copy.role}</motion.p>
          <motion.h1 id="hero-title" {...reveal(0.17)}>
            {copy.hero.title}<br />
            <em>{copy.hero.accent}</em>
          </motion.h1>
          <motion.p className="hero__lede" {...reveal(0.25)}>
            {copy.hero.intro}
          </motion.p>
          <motion.div className="hero__actions" {...reveal(0.32)}>
            <ButtonLink href="#work" icon>{copy.hero.explore}</ButtonLink>
            <ButtonLink href="#contact" variant="quiet">{copy.talk} <ArrowUpRight size={15} aria-hidden="true" /></ButtonLink>
          </motion.div>
          <motion.div className="hero__footnote" {...reveal(0.39)}>
            <div className="hero__socials">
              <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} aria-hidden="true" /></a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} aria-hidden="true" /></a>
            </div>
            <a href="#work" className="scroll-cue"><ArrowDown size={15} aria-hidden="true" /> {copy.hero.scroll}</a>
          </motion.div>
        </div>
        <div className="hero__visual-wrap"><HeroSystemVisual /></div>
      </div>
    </section>
  )
}
