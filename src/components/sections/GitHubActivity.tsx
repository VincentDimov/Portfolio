import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { ArrowUpRight, Github, RefreshCw } from 'lucide-react'
import { dayDescription, formatActivityDate, isGitHubActivityData, readSavedActivity, saveActivity } from '../../lib/github-activity'
import type { ContributionDay, GitHubActivityData } from '../../lib/github-activity'
import { useLanguage } from '../../lib/locale'
import { activityCopy } from '../../data/activity-copy'

const profileUrl = 'https://github.com/VincentDimov'

export const GitHubActivity = () => {
  const { language, locale } = useLanguage()
  const copy = activityCopy[language]
  const [data, setData] = useState<GitHubActivityData | null>(readSavedActivity)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<'rateLimit' | 'refreshError' | 'readError' | 'unavailable' | null>(null)
  const [reload, setReload] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const buttons = useRef<Array<HTMLButtonElement | null>>([])
  const descriptionId = useId()
  const dateInputId = useId()

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetch('/api/github-activity', { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then(async (response) => {
        if (!response.ok) {
          const body: unknown = await response.json().catch(() => null)
          const code = body && typeof body === 'object' && 'code' in body ? body.code : undefined
          throw new Error(code === 'RATE_LIMITED' ? 'rateLimit' : 'refreshError')
        }
        const body: unknown = await response.json()
        if (!isGitHubActivityData(body)) throw new Error('readError')
        if (controller.signal.aborted) return
        setData(body)
        saveActivity(body)
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return
        const message = cause instanceof Error ? cause.message : ''
        setError(message === 'rateLimit' || message === 'refreshError' || message === 'readError' ? message : 'unavailable')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [reload])

  const calendar = useMemo(() => {
    const days = data?.days ?? []
    const offset = days.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0
    const columns = Math.ceil((offset + days.length) / 7)
    const months: { label: string; column: number; key: string }[] = []
    let previousMonth = ''
    days.forEach((day, index) => {
      const month = day.date.slice(0, 7)
      if (month !== previousMonth) {
        const column = Math.floor((offset + index) / 7) + 1
        // A partial first month can occupy one column; avoid overlapping labels.
        if (months.length && column - months[months.length - 1].column < 2) months.pop()
        months.push({ key: month, label: new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' }).format(new Date(`${day.date}T00:00:00Z`)), column })
        previousMonth = month
      }
    })
    return { days, offset, columns, months }
  }, [data, locale])

  const selectedIndex = Math.max(0, calendar.days.findIndex((day) => day.date === selectedDate))
  const activeIndex = selectedDate && calendar.days.some((day) => day.date === selectedDate) ? selectedIndex : calendar.days.length - 1
  const selectedDay = calendar.days[activeIndex]
  const focusDay = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keyOffsets: Record<string, number> = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1, PageUp: -28, PageDown: 28 }
    const offset = keyOffsets[event.key]
    if (offset === undefined && event.key !== 'Home' && event.key !== 'End') return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? calendar.days.length - 1 : Math.min(calendar.days.length - 1, Math.max(0, index + offset))
    setSelectedDate(calendar.days[next].date)
    buttons.current[next]?.focus()
  }

  const chooseDay = (day: ContributionDay) => setSelectedDate(day.date)

  return (
    <article className="github-card" aria-labelledby="github-title" aria-busy={loading}>
      <div className="github-header">
        <div className="github-title"><Github size={20} aria-hidden="true" /><div><h3 id="github-title">{copy.title}</h3><p>{copy.subtitle}</p></div></div>
        <a className="text-link" href={profileUrl} target="_blank" rel="noreferrer">@VincentDimov <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>

      {loading && !data && <div className="github-loading" role="status"><RefreshCw size={18} aria-hidden="true" /><span>{copy.loading}</span></div>}

      {error && (
        <div className="github-error" role="status">
          <p>{copy[error]} {data ? copy.savedFallback : copy.noActivityDisclaimer}</p>
          <button className="text-link" onClick={() => setReload((count) => count + 1)} disabled={loading}><RefreshCw size={14} aria-hidden="true" />{loading ? copy.refreshing : copy.retry}</button>
        </div>
      )}

      {data && (
        <>
          <div className="github-summary">
            <p><strong>{data.total.toLocaleString(locale)}</strong> {copy.contributions} <span>{copy.period}</span></p>
            <span>{formatActivityDate(data.period.from, undefined, locale)} — {formatActivityDate(data.period.to, undefined, locale)}</span>
          </div>
          <p className="sr-only" id={descriptionId}>{copy.instructions}</p>
          <div className="github-calendar-scroll" role="region" aria-label={copy.calendarLabel} tabIndex={0}>
            <div className="github-calendar" style={{ '--github-columns': calendar.columns } as CSSProperties}>
              <div className="github-months" aria-hidden="true">{calendar.months.map((month) => <span key={month.key} style={{ gridColumn: `${month.column} / span ${Math.min(3, calendar.columns - month.column + 1)}` }}>{month.label}</span>)}</div>
              <div className="github-weekdays" aria-hidden="true">{[1, 3, 5].map((day) => <span key={day}>{new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' }).format(new Date(Date.UTC(2026, 0, 4 + day)))}</span>)}</div>
              <div className="github-days" role="group" aria-label={copy.daysLabel} aria-describedby={descriptionId}>
                {calendar.days.map((day, index) => (
                  <button
                    type="button"
                    key={day.date}
                    className={`github-day github-day--${day.level}${index === activeIndex ? ' github-day--selected' : ''}`}
                    style={{ gridColumn: Math.floor((calendar.offset + index) / 7) + 1, gridRow: (calendar.offset + index) % 7 + 1 }}
                    aria-label={dayDescription(day, locale)}
                    title={dayDescription(day, locale)}
                    tabIndex={index === activeIndex ? 0 : -1}
                    onMouseEnter={() => chooseDay(day)}
                    onFocus={() => chooseDay(day)}
                    onClick={() => chooseDay(day)}
                    onKeyDown={(event) => focusDay(event, index)}
                    ref={(element) => { buttons.current[index] = element }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="github-date-picker">
            <label htmlFor={dateInputId}>{copy.inspectDate}</label>
            <input
              id={dateInputId}
              type="date"
              lang={language}
              min={data.period.from}
              max={data.period.to}
              value={selectedDay?.date ?? data.period.to}
              onChange={(event) => {
                const index = calendar.days.findIndex((day) => day.date === event.target.value)
                if (index < 0) return
                chooseDay(calendar.days[index])
                buttons.current[index]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' })
              }}
            />
          </div>
          <div className="github-calendar-footer">
            <p className="github-selection" aria-live="polite" aria-atomic="true">{selectedDay ? dayDescription(selectedDay, locale) : copy.noSelection}</p>
            <div className="github-legend" aria-label={copy.intensityLabel}><span>{copy.less}</span>{[0, 1, 2, 3, 4].map((level) => <i className={`github-day github-day--${level}`} key={level} aria-hidden="true" />)}<span>{copy.more}</span></div>
          </div>
          {data.total === 0 && <p className="github-empty">{copy.empty}</p>}
          <div className="github-meta"><span>{copy.source}</span><span>{error ? copy.lastUpdated : copy.updated} <time dateTime={data.fetchedAt}>{formatActivityDate(data.fetchedAt, { hour: '2-digit', minute: '2-digit' }, locale)} UTC</time>{loading && ` · ${copy.refreshing}`}</span></div>
        </>
      )}
      {!loading && !data && <a className="github-fallback text-link" href={profileUrl} target="_blank" rel="noreferrer">{copy.fallback} <ArrowUpRight size={15} aria-hidden="true" /></a>}
    </article>
  )
}
