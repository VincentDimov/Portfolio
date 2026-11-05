import { createHmac, randomBytes } from 'node:crypto'

export const CONTACT_RECIPIENT = 'vincent@dspab.se'
export const CONTACT_BODY_LIMIT = 16 * 1024

const BASE_ORIGINS = [
  'https://ventsislavdimov.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
]

const response = (status, code, extra = {}) => Response.json({ ok: status === 200, code, ...extra }, {
  status,
  headers: {
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...(status === 405 ? { Allow: 'POST' } : {}),
    ...(status === 429 ? { 'Retry-After': '600' } : {}),
  },
})

class ContactRequestError extends Error {
  constructor(status, code) {
    super(code)
    this.status = status
    this.code = code
  }
}

// A bounded, per-instance backstop. The hosting firewall can add a distributed
// limit if needed; process memory is intentionally not treated as global state.
export function createContactLimiter() {
  const salt = randomBytes(32)
  const entries = new Map()
  return (request, env, now = Date.now()) => {
    for (const [key, entry] of entries) if (entry.expires <= now) entries.delete(key)
    const address = env.VERCEL ? (request.headers.get('x-vercel-forwarded-for') || '').split(',')[0].trim() : 'local'
    const key = createHmac('sha256', salt).update(address || 'unknown').digest('hex')
    const entry = entries.get(key)
    if (entry) { entry.count += 1; return entry.count > 5 }
    if (entries.size >= 5000) return true
    entries.set(key, { count: 1, expires: now + 600_000 })
    return false
  }
}
const limitContactRequests = createContactLimiter()

const hasHeaderBreak = (value) => /[\r\n\u0000]/.test(value)

export function isContactEmail(value) {
  if (typeof value !== 'string' || value.length > 254 || hasHeaderBreak(value)) return false
  const parts = value.split('@')
  if (parts.length !== 2 || !parts[0] || parts[0].length > 64 || parts[0].startsWith('.') || parts[0].endsWith('.') || parts[0].includes('..')) return false
  return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(value)
}

export function validateContactInput(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { errors: { form: 'INVALID_INPUT' } }
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  const email = typeof input.email === 'string' ? input.email.trim() : ''
  const message = typeof input.message === 'string' ? input.message.trim() : ''
  const errors = {}
  if (name.length < 2 || name.length > 100 || hasHeaderBreak(name)) errors.name = 'INVALID_NAME'
  if (!isContactEmail(email)) errors.email = 'INVALID_EMAIL'
  if (message.length < 20 || message.length > 5000 || /\u0000/.test(message)) errors.message = 'INVALID_MESSAGE'
  if (Object.keys(errors).length) return { errors }
  return { data: { name, email, message } }
}

export function getContactOrigins(env = process.env) {
  const origins = new Set(BASE_ORIGINS)
  if (env.CONTACT_SITE_URL) {
    try {
      const site = new URL(env.CONTACT_SITE_URL)
      if (site.protocol === 'https:' && !site.username && !site.password) origins.add(site.origin)
    } catch { /* Invalid optional origins are never trusted. */ }
  }
  return origins
}

export function getSmtpConfiguration(env = process.env) {
  const host = env.SMTP_HOST?.trim() || 'send.one.com'
  const port = env.SMTP_PORT ? Number(env.SMTP_PORT) : 465
  const user = env.SMTP_USER?.trim()
  const password = env.SMTP_PASS || env.SMTP_PASSWORD
  const from = env.SMTP_FROM?.trim() || user
  if (!host || !/^[a-z0-9.-]+$/i.test(host) || !Number.isInteger(port) || port < 1 || port > 65535 || !user || hasHeaderBreak(user) || !password || !isContactEmail(from)) return null
  return { host, port, user, password, from }
}

export function smtpTransportOptions(config) {
  return {
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    requireTLS: config.port !== 465,
    ignoreTLS: false,
    auth: { user: config.user, pass: config.password },
    tls: { rejectUnauthorized: true, minVersion: 'TLSv1.2' },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  }
}

export function buildContactMail(data, configuration) {
  return {
    from: { name: 'Ventsislav Dimov · Portfolio', address: configuration.from },
    to: CONTACT_RECIPIENT,
    envelope: { from: configuration.from, to: [CONTACT_RECIPIENT] },
    replyTo: { name: data.name, address: data.email },
    subject: 'New message from your portfolio',
    text: [
      'A visitor sent a message through your portfolio.',
      '',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      '',
      'Message:',
      data.message,
    ].join('\n'),
    disableFileAccess: true,
    disableUrlAccess: true,
  }
}

async function readContactJson(request) {
  const declaredLength = request.headers.get('content-length')
  if (declaredLength !== null && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > CONTACT_BODY_LIMIT)) {
    throw new ContactRequestError(413, 'PAYLOAD_TOO_LARGE')
  }
  if (!request.body) throw new ContactRequestError(400, 'INVALID_JSON')
  const reader = request.body.getReader()
  const chunks = []
  let total = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      total += value.byteLength
      if (total > CONTACT_BODY_LIMIT) {
        await reader.cancel().catch(() => {})
        throw new ContactRequestError(413, 'PAYLOAD_TOO_LARGE')
      }
      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }
  const bytes = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
  try {
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes))
  } catch {
    throw new ContactRequestError(400, 'INVALID_JSON')
  }
}

const defaultCreateTransport = async (options) => {
  const { default: nodemailer } = await import('nodemailer')
  return nodemailer.createTransport(options)
}

const acceptedAddress = (value) => typeof value === 'string' ? value.trim().toLowerCase() : value?.address?.trim().toLowerCase()

/** Web Request/Response entrypoint, shared by Vercel and local middleware.
 * Inject createTransport in tests; never send test messages to a real mailbox.
 */
export async function createContactResponse(request, { env = process.env, createTransport = defaultCreateTransport, logger = console, limiter = limitContactRequests } = {}) {
  if (request.method !== 'POST') return response(405, 'METHOD_NOT_ALLOWED')
  const origin = request.headers.get('origin')
  if (!origin || !getContactOrigins(env).has(origin) || request.headers.get('sec-fetch-site') === 'cross-site') return response(403, 'FORBIDDEN_ORIGIN')
  if (limiter(request, env)) return response(429, 'RATE_LIMITED')
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return response(415, 'UNSUPPORTED_MEDIA_TYPE')

  let transport
  try {
    const input = await readContactJson(request)
    if (input && typeof input === 'object' && 'website' in input && (typeof input.website !== 'string' || input.website.trim())) return response(403, 'REQUEST_REJECTED')
    const validation = validateContactInput(input)
    if (validation.errors) return response(400, 'VALIDATION_ERROR', { errors: validation.errors })
    const configuration = getSmtpConfiguration(env)
    if (!configuration) return response(503, 'NOT_CONFIGURED')
    transport = await createTransport(smtpTransportOptions(configuration))
    const delivery = await transport.sendMail(buildContactMail(validation.data, configuration))
    const accepted = Array.isArray(delivery?.accepted) && delivery.accepted.some(item => acceptedAddress(item) === CONTACT_RECIPIENT)
    const rejected = Array.isArray(delivery?.rejected) && delivery.rejected.some(item => acceptedAddress(item) === CONTACT_RECIPIENT)
    if (!accepted || rejected) throw new Error('RECIPIENT_NOT_ACCEPTED')
    logger.info?.('[contact] SMTP_ACCEPTED')
    return response(200, 'ACCEPTED')
  } catch (error) {
    if (error instanceof ContactRequestError) return response(error.status, error.code)
    // Never log SMTP responses, request values, addresses, or credentials.
    logger.error?.('[contact] SEND_FAILED')
    return response(502, 'SEND_FAILED')
  } finally {
    try { transport?.close?.() } catch { /* A closed transport must not change an acknowledged delivery. */ }
  }
}
