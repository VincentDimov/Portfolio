import test from 'node:test'
import assert from 'node:assert/strict'
import { combineContributionYears, createActivityResponse, fetchGitHubActivity, parseContributionYear, rollingPeriod } from '../scripts/github-activity.mjs'

const cell = (date, count = 0, level = 0) => `<td id="day-${date}" data-date="${date}" data-level="${level}"></td><tool-tip for="day-${date}">${count ? count.toLocaleString('en-US') : 'No'} contributions on a day.</tool-tip>`

test('rolling period spans the last 12 months inclusively and handles leap years', () => {
  assert.deepEqual(rollingPeriod(new Date('2026-11-05T12:00:00Z')), { from: '2025-11-06', to: '2026-11-05' })
  assert.deepEqual(rollingPeriod(new Date('2024-02-29T12:00:00Z')), { from: '2023-03-01', to: '2024-02-29' })
})

test('reads exact counts from accessible tooltips, including zero and thousands', () => {
  assert.deepEqual(parseContributionYear(cell('2026-01-01') + cell('2026-01-02', 1234, 4)), [
    { date: '2026-01-01', count: 0, level: 0 }, { date: '2026-01-02', count: 1234, level: 4 },
  ])
})

test('fails if calendar markup or exact counts are missing rather than inventing zero', () => {
  assert.throws(() => parseContributionYear('<html>unavailable</html>'), { code: 'SOURCE_CHANGED' })
  assert.throws(() => parseContributionYear('<td data-date="2026-01-01" data-level="0"></td>'), { code: 'SOURCE_CHANGED' })
})

test('merges calendar years, filters out dates outside the range and rejects missing days', () => {
  const years = [[{ date: '2025-12-31', count: 2, level: 1 }], [{ date: '2026-01-01', count: 3, level: 2 }, { date: '2026-01-02', count: 9, level: 3 }]]
  assert.equal(combineContributionYears(years, { from: '2025-12-31', to: '2026-01-01' }).length, 2)
  assert.throws(() => combineContributionYears(years, { from: '2025-12-30', to: '2026-01-01' }), { code: 'INCOMPLETE_DATA' })
})

test('request failures remain errors and do not become empty activity', async () => {
  await assert.rejects(fetchGitHubActivity({ fetchImpl: async () => new Response('', { status: 429 }) }), { code: 'RATE_LIMITED' })
  await assert.rejects(fetchGitHubActivity({ fetchImpl: async () => { throw new TypeError('offline') } }), { code: 'NETWORK_ERROR' })
  const response = await createActivityResponse(new Request('http://localhost/api/github-activity'), { fetchImpl: async () => new Response('', { status: 403 }) })
  assert.equal(response.status, 503)
  assert.equal(response.headers.get('Cache-Control'), 'no-store')
  const body = await response.json()
  assert.equal(body.code, 'RATE_LIMITED')
  assert.equal('total' in body, false)
})

test('API only permits reads', async () => {
  const response = await createActivityResponse(new Request('http://localhost/api/github-activity', { method: 'POST' }))
  assert.equal(response.status, 405)
  assert.equal(response.headers.get('Allow'), 'GET, HEAD')
})

test('complete upstream data uses the exact rolling period, summed total and CDN cache', async () => {
  const now = new Date('2026-11-05T12:00:00Z')
  const period = rollingPeriod(now)
  const markup = []
  for (let day = new Date(`${period.from}T00:00:00Z`); day.toISOString().slice(0, 10) <= period.to; day.setUTCDate(day.getUTCDate() + 1)) markup.push(cell(day.toISOString().slice(0, 10), 1, 1))
  const response = await createActivityResponse(new Request('http://localhost/api/github-activity'), { now, fetchImpl: async () => new Response(markup.join('')) })
  const body = await response.json()
  assert.equal(response.status, 200)
  assert.equal(body.days.length, 365)
  assert.equal(body.total, 365)
  assert.equal(body.fetchedAt, '2026-11-05T12:00:00.000Z')
  assert.match(response.headers.get('Cache-Control'), /s-maxage=21600/)
})
