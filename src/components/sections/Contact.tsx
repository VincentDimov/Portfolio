import { useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Github, Linkedin, LoaderCircle, Mail } from 'lucide-react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { socials } from '../../data/socials'
import { useLanguage } from '../../lib/locale'

type Fields = { name: string; email: string; message: string; website: string }
type Field = 'name' | 'email' | 'message'
const emptyFields: Fields = { name: '', email: '', message: '', website: '' }

export const Contact = () => {
  const { copy, language } = useLanguage()
  const [fields, setFields] = useState<Fields>(emptyFields)
  const [errors, setErrors] = useState<Field[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [failure, setFailure] = useState<'unavailable' | 'failed' | 'network' | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const update = (field: keyof Fields, value: string) => {
    setFields(current => ({ ...current, [field]: value }))
    setErrors(current => current.filter(item => item !== field))
    setFailure(null)
  }
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    const invalid: Field[] = []
    if (fields.name.trim().length < 2 || fields.name.trim().length > 100 || /[\r\n\u0000]/.test(fields.name)) invalid.push('name')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()) || fields.email.trim().length > 254) invalid.push('email')
    if (fields.message.trim().length < 20 || fields.message.trim().length > 5000) invalid.push('message')
    setErrors(invalid)
    setFailure(null)
    if (invalid.length) {
      const input = formRef.current?.elements.namedItem(invalid[0])
      if (input instanceof HTMLElement) input.focus()
      return
    }
    setStatus('sending')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 45_000)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept-Language': language },
        body: JSON.stringify(fields), signal: controller.signal,
      })
      const body: unknown = await response.json().catch(() => null)
      if (response.ok && body && typeof body === 'object' && 'ok' in body && body.ok === true) {
        setStatus('success')
        setFields(emptyFields)
      } else if (response.status === 400 && body && typeof body === 'object' && 'errors' in body && body.errors && typeof body.errors === 'object') {
        const serverErrors = body.errors
        const invalidFields = (['name', 'email', 'message'] as const).filter(field => field in serverErrors)
        setErrors([...invalidFields])
        if (!invalidFields.length) setFailure('failed')
        setStatus('idle')
        const input = formRef.current?.elements.namedItem(invalidFields[0])
        if (input instanceof HTMLElement) input.focus()
      } else {
        setFailure(response.status === 503 ? 'unavailable' : 'failed')
        setStatus('idle')
      }
    } catch {
      setFailure('network')
      setStatus('idle')
    } finally { window.clearTimeout(timeout) }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <Container>
        <div className="contact__shell">
          <Reveal className="contact__copy">
            <span className="eyebrow">{copy.contact.eyebrow}</span>
            <h2 id="contact-title">{copy.contact.title}<br /><em>{copy.contact.titleEnd}</em></h2>
            <p>{copy.contact.description}</p>
            <div className="contact__details">
              <a href={`mailto:${socials.email}`} aria-label={`${copy.contact.openEmail}: ${socials.email}`}><Mail size={16} aria-hidden="true" />{socials.email}</a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true" />LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a>
              <a href={socials.github} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" />GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
            </div>
          </Reveal>
          <Reveal className="contact-panel" delay={0.08}>
            {status === 'success' ? (
              <div className="form-success" role="status" aria-live="polite">
                <Check size={27} aria-hidden="true" /><h3>{copy.contact.successTitle}</h3><p>{copy.contact.successText}</p>
                <Button variant="secondary" onClick={() => setStatus('idle')}>{copy.contact.another}</Button>
              </div>
            ) : (
              <form className="contact-form" ref={formRef} onSubmit={submit} noValidate aria-busy={status === 'sending'} aria-labelledby="contact-form-title">
                <h3 id="contact-form-title">{copy.contact.formTitle}</h3>
                <div className="form-field">
                  <label htmlFor="contact-name">{copy.contact.name}</label>
                  <input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder={copy.contact.namePlaceholder} value={fields.name} onChange={event => update('name', event.target.value)} aria-invalid={errors.includes('name')} aria-describedby={errors.includes('name') ? 'contact-name-error' : undefined} />
                  {errors.includes('name') && <span className="field-error" id="contact-name-error">{copy.contact.nameError}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">{copy.contact.email}</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder={copy.contact.emailPlaceholder} value={fields.email} onChange={event => update('email', event.target.value)} aria-invalid={errors.includes('email')} aria-describedby={errors.includes('email') ? 'contact-email-error' : undefined} />
                  {errors.includes('email') && <span className="field-error" id="contact-email-error">{copy.contact.emailError}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="contact-message">{copy.contact.message}</label>
                  <textarea id="contact-message" name="message" rows={5} required minLength={20} maxLength={5000} placeholder={copy.contact.messagePlaceholder} value={fields.message} onChange={event => update('message', event.target.value)} aria-invalid={errors.includes('message')} aria-describedby={errors.includes('message') ? 'contact-message-error' : undefined} />
                  {errors.includes('message') && <span className="field-error" id="contact-message-error">{copy.contact.messageError}</span>}
                </div>
                <div hidden aria-hidden="true"><label htmlFor="contact-website">{copy.contact.website}</label><input id="contact-website" name="website" autoComplete="off" tabIndex={-1} value={fields.website} onChange={event => update('website', event.target.value)} /></div>
                {errors.length > 0 && <p className="form-error" role="alert">{copy.contact.errorsTitle}</p>}
                {failure && <p className="form-error" role="alert">{copy.contact[failure]}</p>}
                <Button type="submit" disabled={status === 'sending'} icon={status !== 'sending'}>{status === 'sending' && <LoaderCircle className="form-spinner" size={16} aria-hidden="true" />}{status === 'sending' ? copy.contact.sending : copy.contact.send}</Button>
                <p className="contact-form__note">{copy.contact.note}<br />{copy.contact.privacy}</p>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
