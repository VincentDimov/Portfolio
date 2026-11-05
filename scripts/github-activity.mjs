const DAY = 86_400_000
export const GITHUB_USER = 'VincentDimov'
export const GITHUB_PROFILE = `https://github.com/${GITHUB_USER}`

export class GitHubActivityError extends Error {
  constructor(message, code = 'UPSTREAM_ERROR', status = 502) {
    super(message)
    this.name = 'GitHubActivityError'
    this.code = code
    this.status = status
  }
}

const isoDay = (date) => date.toISOString().slice(0, 10)

export function rollingPeriod(now = new Date()) {
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const previousYear = end.getUTCFullYear() - 1
  const lastDayInPriorMonth = new Date(Date.UTC(previousYear, end.getUTCMonth() + 1, 0)).getUTCDate()
  const start = new Date(Date.UTC(previousYear, end.getUTCMonth(), Math.min(end.getUTCDate(), lastDayInPriorMonth) + 1))
  return { from: isoDay(start), to: isoDay(end) }
}

const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`))?.[1]

// Counts are read from GitHub's accessible tooltip text; colour intensity alone
// cannot tell us an exact contribution count.
export function parseContributionYear(html) {
  const tooltips = new Map()
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/gi)) {
    const id = attribute(match[1], 'for')
    const text = match[2].replace(/<[^>]+>/g, '').replace(/&nbsp;|&#160;/g, ' ').trim()
    if (id) tooltips.set(id, text)
  }

  const days = []
  for (const match of html.matchAll(/<(?:td|rect)\b[^>]*\bdata-date=["'][^"']+["'][^>]*>/gi)) {
    const tag = match[0]
    const date = attribute(tag, 'data-date')
    const level = Number(attribute(tag, 'data-level'))
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isInteger(level) || level < 0 || level > 4) continue

    const tooltip = tooltips.get(attribute(tag, 'id'))
    const directCount = attribute(tag, 'data-count')
    const countMatch = tooltip?.match(/^(No|[\d,]+) contributions?\b/i)
    const countText = directCount ?? countMatch?.[1]
    if (countText === undefined) {
      throw new GitHubActivityError('GitHub calendar counts could not be read.', 'SOURCE_CHANGED')
    }
    const count = /^No$/i.test(countText) ? 0 : Number(countText.replaceAll(',', ''))
    if (!Number.isInteger(count) || count < 0) throw new GitHubActivityError('Invalid contribution count.', 'SOURCE_CHANGED')
    days.push({ date, count, level })
  }
  if (!days.length) throw new GitHubActivityError('GitHub did not return a contribution calendar.', 'SOURCE_CHANGED')
  return days
}

export function combineContributionYears(years, period) {
  const lookup = new Map(years.flat().map((day) => [day.date, day]))
  const days = []
  for (let cursor = new Date(`${period.from}T00:00:00Z`); isoDay(cursor) <= period.to; cursor = new Date(cursor.getTime() + DAY)) {
    const day = lookup.get(isoDay(cursor))
    if (!day) throw new GitHubActivityError('GitHub returned an incomplete contribution calendar.', 'INCOMPLETE_DATA')
    days.push(day)
  }
  return days
}

export async function fetchGitHubActivity({ now = new Date(), fetchImpl = fetch } = {}) {
  const period = rollingPeriod(now)
  const firstYear = Number(period.from.slice(0, 4))
  const lastYear = Number(period.to.slice(0, 4))
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, index) => firstYear + index)
  let calendars
  try {
    calendars = await Promise.all(years.map(async (year) => {
      const url = `https://github.com/users/${GITHUB_USER}/contributions?from=${year}-01-01&to=${year}-12-31`
      const response = await fetchImpl(url, {
        headers: { Accept: 'text/html', 'Accept-Language': 'en-US,en;q=0.9', 'User-Agent': 'VincentDimov-Portfolio' },
        signal: AbortSignal.timeout(12_000),
      })
      if (response.status === 429 || response.status === 403) {
        throw new GitHubActivityError('GitHub is temporarily limiting requests. Please try again later.', 'RATE_LIMITED', 503)
      }
      if (!response.ok) throw new GitHubActivityError('GitHub is temporarily unavailable.', 'UPSTREAM_ERROR')
      return parseContributionYear(await response.text())
    }))
  } catch (error) {
    if (error instanceof GitHubActivityError) throw error
    throw new GitHubActivityError('The connection to GitHub could not be completed.', 'NETWORK_ERROR', 503)
  }
  const days = combineContributionYears(calendars, period)
  return {
    user: GITHUB_USER,
    profileUrl: GITHUB_PROFILE,
    source: 'GitHub public contribution calendar',
    period,
    days,
    total: days.reduce((sum, day) => sum + day.count, 0),
    fetchedAt: now.toISOString(),
  }
}

export async function createActivityResponse(request, options = {}) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return Response.json({ error: 'Method not allowed.', code: 'METHOD_NOT_ALLOWED' }, { status: 405, headers: { Allow: 'GET, HEAD', 'Cache-Control': 'no-store' } })
  }
  try {
    const data = await fetchGitHubActivity(options)
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=21600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    }
    return new Response(request.method === 'HEAD' ? null : JSON.stringify(data), { status: 200, headers })
  } catch (error) {
    const known = error instanceof GitHubActivityError
    console.error('[github-activity]', known ? error.code : 'UNEXPECTED_ERROR')
    return Response.json({
      error: known ? error.message : 'GitHub activity is temporarily unavailable.',
      code: known ? error.code : 'UPSTREAM_ERROR',
    }, { status: known ? error.status : 502, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } })
  }
}
