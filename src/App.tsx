import { useCallback, useEffect, useState } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { Contact } from './components/sections/Contact'
import { About } from './components/sections/About'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Philosophy } from './components/sections/Philosophy'
import { Stack } from './components/sections/Stack'
import { Work } from './components/sections/Work'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { getProject } from './data/projects'
import { useActiveSection } from './hooks/useActiveSection'
import { useKonami } from './hooks/useKonami'
import { ProjectCaseStudy } from './pages/ProjectCaseStudy'

const sectionIds = ['work', 'about', 'experience', 'stack', 'contact']

const getStoredTheme = (): 'dark' | 'light' => {
  const stored = window.localStorage.getItem('ventsislav-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return 'light'
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(getStoredTheme)
  const [easterEgg, setEasterEgg] = useState(false)
  const activeSection = useActiveSection(sectionIds)
  const projectSlug = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1]
  const project = projectSlug ? getProject(projectSlug) : undefined

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0b0e' : '#f6f5f2')
    window.localStorage.setItem('ventsislav-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!window.location.hash) return undefined
    const timer = window.setTimeout(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 40)
    return () => window.clearTimeout(timer)
  }, [projectSlug])

  const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark')
  const unlock = useCallback(() => {
    setEasterEgg(true)
    window.setTimeout(() => setEasterEgg(false), 3600)
  }, [])
  useKonami(unlock)

  useEffect(() => {
    // A small greeting for people who inspect the work closely.
    console.info('%cHello, curious developer. Build with care.', 'color:#a7b5ff;font-size:14px;font-weight:600;')
  }, [])

  const isProjectPage = Boolean(projectSlug)
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="app-shell">
          <Navbar activeSection={project ? '' : activeSection} theme={theme} onToggleTheme={toggleTheme} isProjectPage={isProjectPage} />
          {project ? (
            <ProjectCaseStudy project={project} />
          ) : (
            <main id="main">
              <Hero />
              <Work />
              <About />
              <Stack />
              <Experience />
              <Philosophy />
              <Contact />
            </main>
          )}
          <Footer />
          {easterEgg && <div className="easter-egg" role="status"><span>✦</span> Ship mode unlocked. Nicely done.</div>}
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
