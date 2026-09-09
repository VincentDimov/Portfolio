import { useState } from 'react'
import { ArrowUpRight, Check, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { socials } from '../../data/socials'

type FormValues = { name: string; email: string; message: string }
type FormErrors = Partial<Record<keyof FormValues, string>>

const emptyForm: FormValues = { name: '', email: '', message: '' }

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Please tell me your name.'
  if (!values.email.trim()) errors.email = 'An email address helps me reply.'
  else if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'That email address does not look quite right.'
  if (values.message.trim().length < 12) errors.message = 'A little more context would be helpful (12 characters minimum).'
  return errors
}

export const Contact = () => {
  const [values, setValues] = useState<FormValues>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setStatus('sending')
    window.setTimeout(() => {
      setStatus('success')
      setValues(emptyForm)
    }, 650)
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <Container>
        <div className="contact__shell">
          <Reveal className="contact__copy">
            <span className="eyebrow">06 / Contact</span>
            <h2 id="contact-title">Have an ambitious problem?<br /><em>Let’s make it clear.</em></h2>
            <p>Whether you’re shaping a new product or refining one people already rely on, I’d love to hear where you’re headed.</p>
            <div className="contact__details">
              <a href={`mailto:${socials.email}`}><Mail size={16} aria-hidden="true" />{socials.email}</a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true" />LinkedIn</a>
              <a href={socials.github} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" />GitHub</a>
            </div>
          </Reveal>
          <Reveal className="contact__form-wrap" delay={0.1}>
            {status === 'success' ? (
              <div className="form-success" role="status" aria-live="polite">
                <span><Check size={21} aria-hidden="true" /></span>
                <h3>Your note is on its way.</h3>
                <p>Thanks for reaching out. I’ll get back to you soon.</p>
                <Button variant="secondary" onClick={() => setStatus('idle')}>Send another</Button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit} noValidate>
                <div className="form-field">
                  <label htmlFor="contact-name">Your name</label>
                  <input id="contact-name" name="name" autoComplete="name" value={values.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="Ada Lovelace" />
                  {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Email address</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="ada@company.com" />
                  {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="contact-message">What are you working on?</label>
                  <textarea id="contact-message" name="message" rows={4} value={values.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} placeholder="A little about the challenge, the people and what success would look like…" />
                  {errors.message && <span className="field-error" id="message-error">{errors.message}</span>}
                </div>
                <div className="form-submit-row">
                  <Button type="submit" icon disabled={status === 'sending'}>{status === 'sending' ? 'Sending note…' : 'Send a note'}</Button>
                  <span>Usually replies within two days <ArrowUpRight size={13} aria-hidden="true" /></span>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
