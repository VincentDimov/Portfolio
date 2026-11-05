import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Github, Globe2, Linkedin, Menu, Moon, Sun, X } from 'lucide-react'
import { ButtonLink } from '../ui/Button'
import { cn } from '../../lib/utils'
import { socials } from '../../data/socials'
import { profile } from '../../data/profile'
import { useLanguage } from '../../lib/locale'

const navigation = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Activity & Tech', id: 'stack' },
  { label: 'Contact', id: 'contact' },
] as const

type NavbarProps = {
  activeSection: string
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  isProjectPage?: boolean
}

export const Navbar = ({ activeSection, theme, onToggleTheme, isProjectPage = false }: NavbarProps) => {
  const { copy, language, toggleLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const closeMenu = useCallback(() => {
    setIsOpen(false)
    window.setTimeout(() => menuButtonRef.current?.focus(), 0)
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeMenu, isOpen])

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen)
    return () => document.body.classList.remove('menu-open')
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined
    const menu = menuRef.current
    const focusable = menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    const first = focusable?.[0]
    const last = focusable?.[focusable.length - 1]
    window.setTimeout(() => first?.focus(), 0)

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', trapFocus)
    return () => window.removeEventListener('keydown', trapFocus)
  }, [isOpen])

  return (
    <header className={cn('site-header', isScrolled && 'site-header--scrolled')}>
      <nav className="navbar container" aria-label={copy.menu.title}>
        <a className="brand" href="/" aria-label={`${profile.name} — ${copy.home}`}>
          <span className="brand__mark">{profile.initials}</span>
          <span className="brand__name">{profile.name}</span>
        </a>

        <div className="nav-links">
          {navigation.map((item) => (
            <a
              className={cn('nav-link', activeSection === item.id && 'nav-link--active')}
              href={isProjectPage ? `/#${item.id}` : `#${item.id}`}
              key={item.id}
              aria-current={!isProjectPage && activeSection === item.id ? 'location' : undefined}
            >
              {copy.nav[item.id]}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a className="icon-button nav-social" href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={16} aria-hidden="true" />
          </a>
          <a className="icon-button nav-social" href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={16} aria-hidden="true" />
          </a>
          <button className="icon-button language-toggle" onClick={toggleLanguage} aria-label={language === 'en' ? 'Byt till svenska' : 'Switch to English'} title={language === 'en' ? 'Byt till svenska' : 'Switch to English'}>
            <Globe2 size={17} aria-hidden="true" /><span aria-hidden="true">{language.toUpperCase()}</span>
          </button>
          <button className="icon-button" onClick={onToggleTheme} aria-label={copy.theme[theme === 'dark' ? 'light' : 'dark']}>
            {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>
          <ButtonLink className="nav-contact" href={isProjectPage ? '/#contact' : '#contact'} variant="secondary">{copy.talk}</ButtonLink>
          <button
            className="icon-button menu-button"
            ref={menuButtonRef}
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? copy.menu.close : copy.menu.open}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={copy.menu.title}
            initial={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
          >
            <div className="container mobile-menu__inner">
              <button className="mobile-menu__close icon-button" onClick={closeMenu} aria-label={copy.menu.closeNavigation}><X size={20} aria-hidden="true" /></button>
              <div className="mobile-menu__links">
                {navigation.map((item, index) => (
                  <motion.a
                    href={isProjectPage ? `/#${item.id}` : `#${item.id}`}
                    key={item.id}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.04 * index }}
                  >
                    <span>0{index + 1}</span>
                    {copy.nav[item.id]}
                  </motion.a>
                ))}
              </div>
              <div className="mobile-menu__footer">
                <a href={`mailto:${socials.email}`}>{socials.email}</a>
                <span>{socials.location}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
