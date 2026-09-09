import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Menu, Moon, Sun, X } from 'lucide-react'
import { ButtonLink } from '../ui/Button'
import { cn } from '../../lib/utils'
import { socials } from '../../data/socials'
import { profile } from '../../data/profile'

const navigation = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Stack', id: 'stack' },
]

type NavbarProps = {
  activeSection: string
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  isProjectPage?: boolean
}

export const Navbar = ({ activeSection, theme, onToggleTheme, isProjectPage = false }: NavbarProps) => {
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
      if (event.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeMenu])

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
      <nav className="navbar container" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label={`${profile.name} — home`}>
          <span className="brand__mark">NL</span>
          <span className="brand__name">{profile.name}</span>
        </a>

        <div className="nav-links" aria-label="Section navigation">
          {navigation.map((item) => (
            <a
              className={cn('nav-link', activeSection === item.id && 'nav-link--active')}
              href={isProjectPage ? `/#${item.id}` : `#${item.id}`}
              key={item.id}
              aria-current={!isProjectPage && activeSection === item.id ? 'location' : undefined}
            >
              {item.label}
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
          <button className="icon-button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>
          <ButtonLink className="nav-contact" href={isProjectPage ? '/#contact' : '#contact'} variant="secondary">Let’s talk</ButtonLink>
          <button
            className="icon-button menu-button"
            ref={menuButtonRef}
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
          >
            <div className="container mobile-menu__inner">
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
                    {item.label}
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
