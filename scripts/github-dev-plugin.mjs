import { createActivityResponse } from './github-activity.mjs'
import { createContactResponse } from './contact.mjs'

// Vite does not run Vercel Functions. Reuse the same handler locally so the
// calendar works in both `npm run dev` and `npm run preview`.
export default function githubActivityPlugin(env = {}) {
  let saved = null
  const handler = async (incoming, outgoing, next) => {
    const path = incoming.url?.split('?')[0]
    if (path !== '/api/github-activity' && path !== '/api/contact') return next()
    if (path === '/api/contact') {
      try {
        const headers = new Headers()
        for (const [name, value] of Object.entries(incoming.headers)) if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(', ') : value)
        const method = incoming.method ?? 'GET'
        const request = new Request('http://localhost/api/contact', {
          method, headers,
          ...(['GET', 'HEAD'].includes(method) ? {} : { body: incoming, duplex: 'half' }),
        })
        const response = await createContactResponse(request, { env: { ...process.env, ...env } })
        outgoing.writeHead(response.status, Object.fromEntries(response.headers))
        outgoing.end(await response.text())
      } catch {
        outgoing.writeHead(502, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
        outgoing.end(JSON.stringify({ ok: false, code: 'SEND_FAILED' }))
      }
      return
    }
    const method = incoming.method ?? 'GET'
    if (saved && Date.now() - saved.at < 21_600_000 && ['GET', 'HEAD'].includes(method)) {
      outgoing.writeHead(200, saved.headers)
      outgoing.end(method === 'HEAD' ? undefined : saved.body)
      return
    }
    try {
      const response = await createActivityResponse(new Request('http://localhost/api/github-activity', { method }))
      const headers = Object.fromEntries(response.headers)
      const body = await response.text()
      if (response.ok && method === 'GET') saved = { at: Date.now(), body, headers }
      outgoing.writeHead(response.status, headers)
      outgoing.end(method === 'HEAD' ? undefined : body)
    } catch {
      outgoing.writeHead(503, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
      outgoing.end(JSON.stringify({ code: 'NETWORK_ERROR', error: 'GitHub activity is temporarily unavailable.' }))
    }
  }
  return {
    name: 'local-github-activity',
    configureServer(server) { server.middlewares.use(handler) },
    configurePreviewServer(server) { server.middlewares.use(handler) },
  }
}
