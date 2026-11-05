import test from 'node:test'
import assert from 'node:assert/strict'
import { buildContactMail, CONTACT_RECIPIENT, createContactLimiter, createContactResponse, getSmtpConfiguration, validateContactInput } from '../scripts/contact.mjs'
import contactApi from '../api/contact.mjs'
import githubApi from '../api/github-activity.mjs'

const env = { SMTP_USER: 'sender@example.test', SMTP_PASS: 'test-only-password' }
const message = { name: 'Test Visitor', email: 'visitor@example.test', message: 'A test message for validating the form, without sending any email.', website: '' }
const logger = { info() {}, error() {} }
const options = { env, logger, limiter: () => false }
const request = (body = message, headers = {}, method = 'POST') => new Request('https://ventsislavdimov.vercel.app/api/contact', {
  method,
  headers: { Origin: 'https://ventsislavdimov.vercel.app', 'Content-Type': 'application/json', ...headers },
  ...(method === 'POST' ? { body: JSON.stringify(body) } : {}),
})

test('Vercel Web handler entrypoints import and enforce their HTTP methods', async () => {
  assert.equal((await contactApi.fetch(request(undefined, {}, 'GET'))).status, 405)
  assert.equal((await githubApi.fetch(request())).status, 405)
})

test('uses the same one.com transport defaults and SMTP_PASS names as DSPWEBB', () => {
  assert.deepEqual(getSmtpConfiguration(env), { host: 'send.one.com', port: 465, user: env.SMTP_USER, password: env.SMTP_PASS, from: env.SMTP_USER })
  assert.equal(getSmtpConfiguration({ SMTP_USER: env.SMTP_USER }), null)
})

test('validates name, reply address and message on the server', () => {
  assert.ok(validateContactInput({ name: 'x', email: 'bad', message: 'short' }).errors)
  assert.ok(validateContactInput({ ...message, name: 'A\r\nBcc: other@example.test' }).errors.name)
  assert.ok(validateContactInput({ ...message, email: 'x@example.test\r\nBcc:a@example.test' }).errors.email)
  assert.ok(validateContactInput({ ...message, message: 'x'.repeat(5001) }).errors.message)
})

test('the recipient and sender are controlled by the server, reply-to is the visitor', () => {
  const mail = buildContactMail({ ...message, to: 'other@example.test' }, getSmtpConfiguration(env))
  assert.equal(mail.to, CONTACT_RECIPIENT)
  assert.deepEqual(mail.envelope.to, [CONTACT_RECIPIENT])
  assert.equal(mail.from.address, env.SMTP_USER)
  assert.equal(mail.replyTo.address, message.email)
  assert.ok(mail.text.includes(message.message))
  assert.equal(mail.html, undefined)
})

test('rejects unsupported method, cross-origin requests, honeypots and malformed data before SMTP', async () => {
  const never = async () => { throw new Error('Transport must not be used') }
  assert.equal((await createContactResponse(request(undefined, {}, 'GET'), { ...options, createTransport: never })).status, 405)
  assert.equal((await createContactResponse(request(message, { Origin: 'https://other.example' }), { ...options, createTransport: never })).status, 403)
  assert.equal((await createContactResponse(request(message, { 'sec-fetch-site': 'cross-site' }), { ...options, createTransport: never })).status, 403)
  assert.equal((await createContactResponse(request({ ...message, website: 'bot' }), { ...options, createTransport: never })).status, 403)
  assert.equal((await createContactResponse(request({ ...message, email: 'invalid' }), { ...options, createTransport: never })).status, 400)
  assert.equal((await createContactResponse(request(message, { 'Content-Type': 'text/plain' }), options)).status, 415)
})

test('caps declared and streamed payloads and rejects invalid JSON', async () => {
  assert.equal((await createContactResponse(request(message, { 'Content-Length': '20000' }), options)).status, 413)
  assert.equal((await createContactResponse(request({ ...message, message: 'x'.repeat(17000) }), options)).status, 413)
  const invalid = new Request('https://ventsislavdimov.vercel.app/api/contact', { method: 'POST', headers: { Origin: 'https://ventsislavdimov.vercel.app', 'Content-Type': 'application/json' }, body: '{not json}' })
  assert.equal((await createContactResponse(invalid, options)).status, 400)
})

test('missing SMTP credentials returns 503 and never a false success', async () => {
  let calls = 0
  const response = await createContactResponse(request(), { ...options, env: {}, createTransport: () => { calls++; return {} } })
  assert.equal(response.status, 503)
  assert.deepEqual(await response.json(), { ok: false, code: 'NOT_CONFIGURED' })
  assert.equal(calls, 0)
  assert.equal(response.headers.get('cache-control'), 'no-store')
})

test('only acknowledges success after the fixed recipient is accepted by SMTP', async () => {
  let captured
  let closed = false
  const response = await createContactResponse(request(), { ...options, createTransport: transportOptions => {
    assert.equal(transportOptions.host, 'send.one.com')
    assert.equal(transportOptions.secure, true)
    return { sendMail: async mail => { captured = mail; return { accepted: [CONTACT_RECIPIENT], rejected: [] } }, close() { closed = true } }
  } })
  assert.equal(response.status, 200)
  assert.equal((await response.json()).ok, true)
  assert.equal(captured.to, CONTACT_RECIPIENT)
  assert.equal(closed, true)
})

test('rejected delivery and transport failure remain errors without exposing internal messages', async () => {
  for (const delivery of [{ accepted: [], rejected: [CONTACT_RECIPIENT] }, { accepted: ['someone@example.test'] }, { accepted: [CONTACT_RECIPIENT], rejected: [CONTACT_RECIPIENT] }]) {
    const response = await createContactResponse(request(), { ...options, createTransport: () => ({ sendMail: async () => delivery }) })
    assert.equal(response.status, 502)
    assert.equal((await response.json()).ok, false)
  }
  const response = await createContactResponse(request(), { ...options, createTransport: () => { throw new Error('secret credentials must not appear in response') } })
  assert.equal(response.status, 502)
  assert.ok(!(await response.text()).includes('credentials'))
})

test('per-instance rate backstop expires and API returns Retry-After', async () => {
  const limiter = createContactLimiter()
  for (let i = 0; i < 5; i++) assert.equal(limiter(request(), {}, 1000), false)
  assert.equal(limiter(request(), {}, 1000), true)
  assert.equal(limiter(request(), {}, 602000), false)
  const response = await createContactResponse(request(), { ...options, limiter: () => true })
  assert.equal(response.status, 429)
  assert.equal(response.headers.get('retry-after'), '600')
})
