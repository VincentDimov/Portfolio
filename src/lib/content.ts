import type { Project } from '../data/projects'
import { projectTranslations } from '../data/projects.sv'
import type { Language } from './locale'

export const localizeProject = (project: Project, language: Language): Project => language === 'sv' ? { ...project, ...projectTranslations[project.slug] } : project
