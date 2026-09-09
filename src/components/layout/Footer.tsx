import { ArrowUp, Github, Linkedin } from 'lucide-react'
import { socials } from '../../data/socials'

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>Built with React, TypeScript &amp; a considered amount of coffee.</p>
        <div className="footer__links">
          <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} aria-hidden="true" /></a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} aria-hidden="true" /></a>
          <a href="#top" aria-label="Back to top"><ArrowUp size={16} aria-hidden="true" /></a>
        </div>
        <span>© {year}</span>
      </div>
    </footer>
  )
}
