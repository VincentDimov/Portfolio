export type ContributionDay = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export type GitHubActivityData = {
  user: string
  profileUrl: string
  source: string
  period: { from: string; to: string }
  days: ContributionDay[]
  total: number
  fetchedAt: string
}

export const formatActivityDate = (date: string, options?: Intl.DateTimeFormatOptions, locale = 'en-GB') =>
  new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC', ...options }).format(new Date(date))

export const dayDescription = (day: ContributionDay, locale = 'en-GB') => {
  const count = day.count.toLocaleString(locale)
  const date = formatActivityDate(day.date, undefined, locale)
  return locale.startsWith('sv')
    ? `${count} bidrag den ${date}`
    : `${count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${date}`
}

export const isGitHubActivityData = (value: unknown): value is GitHubActivityData => {
  if (!value || typeof value !== 'object') return false
  const data = value as Partial<GitHubActivityData>
  if (data.user !== 'VincentDimov' || !data.period || typeof data.period.from !== 'string' || typeof data.period.to !== 'string' || !Array.isArray(data.days) || !data.days.length || !Number.isFinite(data.total) || typeof data.fetchedAt !== 'string' || Number.isNaN(Date.parse(data.fetchedAt))) return false
  const start = Date.parse(`${data.period.from}T00:00:00Z`)
  const end = Date.parse(`${data.period.to}T00:00:00Z`)
  const count = Math.floor((end - start) / 86_400_000) + 1
  if (!Number.isFinite(start) || !Number.isFinite(end) || count < 365 || count > 366 || data.days.length !== count) return false
  const validDays = data.days.every((day, index) => /^\d{4}-\d{2}-\d{2}$/.test(day.date) && Date.parse(`${day.date}T00:00:00Z`) === start + index * 86_400_000 && Number.isInteger(day.count) && day.count >= 0 && Number.isInteger(day.level) && day.level >= 0 && day.level <= 4)
  return validDays && data.total === data.days.reduce((sum, day) => sum + day.count, 0)
}

const CACHE_KEY = 'vincent-github-calendar-v1'
const MAX_SAVED_AGE = 7 * 24 * 60 * 60 * 1000

export const readSavedActivity = (): GitHubActivityData | null => {
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY)
    const value: unknown = raw ? JSON.parse(raw) : null
    if (!isGitHubActivityData(value) || Date.now() - Date.parse(value.fetchedAt) > MAX_SAVED_AGE || Date.parse(value.fetchedAt) > Date.now() + 60_000) return null
    return value
  } catch {
    return null
  }
}

export const saveActivity = (data: GitHubActivityData) => {
  try {
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    // Activity remains usable when browser storage is unavailable.
  }
}
