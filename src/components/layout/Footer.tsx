import { ArrowUp, Github, Linkedin } from 'lucide-react'
import { socials } from '../../data/socials'
import { useLanguage } from '../../lib/locale'

export const Footer = () => {
  const { copy } = useLanguage()
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>{copy.footer}</p>
        <div className="footer__links">
          <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} aria-hidden="true" /></a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} aria-hidden="true" /></a>
          <a href="#top" aria-label={copy.backTop}><ArrowUp size={16} aria-hidden="true" /></a>
        </div>
        <span>© {year}</span>
      </div>
    </footer>
  )
}
