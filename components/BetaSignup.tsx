'use client'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { createClient } from '@supabase/supabase-js'
import { HAS_INSTALL, INSTALL_URL } from '@/lib/links'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ROLES = [
  { value: 'head_coach', label: '🏐 Head Coach' },
  { value: 'new_coach', label: '🆕 First-Year / New Coach' },
  { value: 'parent_volunteer', label: '👨‍👧 Parent Volunteer' },
  { value: 'athletic_director', label: '🏫 Athletic Director / Admin' },
  { value: 'player', label: '🏃 Player (my own stats)' },
  { value: 'just_interested', label: '👀 Just Interested' },
]

type FormData = { name: string; email: string; organization: string; role: string; message: string }
type FormErrors = Partial<Record<'name' | 'email' | 'role', string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMPTY: FormData = { name: '', email: '', organization: '', role: '', message: '' }

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim() || data.name.trim().length < 2) errors.name = 'Name is required'
  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Enter a valid email'
  if (!data.role) errors.role = 'Please select a role'
  return errors
}

const INPUT_BASE: React.CSSProperties = {
  width: '100%',
  background: '#0C0C0C',
  border: '1px solid #2a2a2a',
  borderRadius: 8,
  padding: '12px 14px',
  color: '#F0F0F0',
  fontSize: 14,
  outline: 'none',
  transition: 'border-color 0.2s',
}

export default function BetaSignup() {
  const [formData, setFormData] = useState<FormData>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function selectRole(value: string) {
    setFormData(prev => ({ ...prev, role: value }))
    if (errors.role) setErrors(prev => ({ ...prev, role: undefined }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const v = validate(formData)
    if (Object.keys(v).length > 0) { setErrors(v); return }
    setStatus('submitting')
    try {
      const { error } = await supabase.from('beta_signups').insert([{
        name: formData.name.trim(),
        email: formData.email.trim(),
        organization: formData.organization.trim() || null,
        coaching_level: formData.role,
        frustration: formData.message.trim() || null,
        source: 'courtos.co/beta',
      }])
      if (error) throw error
      await fetch('/api/notify-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          coaching_level: formData.role,
          frustration: formData.message,
        }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://courtos.co'
    if (navigator.share) {
      await navigator.share({ title: 'CourtOS Beta', url })
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (status === 'success') {
    return (
      <section id="beta" style={{ background: '#090909', padding: '100px 24px', borderTop: '1px solid #181818' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'rgba(61,190,107,0.1)',
            border: '2px solid rgba(61,190,107,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px', fontSize: 32,
          }}>
            ✓
          </div>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(48px, 6vw, 72px)',
              lineHeight: 1,
              color: '#3DBE6B',
              letterSpacing: '0.02em',
              marginBottom: 12,
            }}
          >
            YOU&apos;RE IN.
          </h2>

          {HAS_INSTALL ? (
            <>
              <p style={{ color: '#888', fontSize: 17, marginBottom: 28 }}>
                Tap below to install CourtOS now — we also emailed you the link.
              </p>
              <a
                href={INSTALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#3DBE6B',
                  color: '#000',
                  padding: '16px 40px',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                  marginBottom: 14,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#4FD080')}
                onMouseLeave={e => (e.currentTarget.style.background = '#3DBE6B')}
              >
                📲 Install CourtOS
              </a>
              <p style={{ color: '#555', fontSize: 12, marginBottom: 32, maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
                First time? The link opens in Apple&apos;s free TestFlight app, then installs CourtOS inside it.
              </p>
            </>
          ) : (
            <p style={{ color: '#888', fontSize: 17, marginBottom: 32 }}>
              Check your inbox — your beta install link is on its way.
            </p>
          )}

          <button
            onClick={handleShare}
            style={{
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              color: '#F0F0F0',
              padding: '12px 28px',
              borderRadius: 8,
              fontSize: 14, fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#3DBE6B'
              e.currentTarget.style.color = '#3DBE6B'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#2a2a2a'
              e.currentTarget.style.color = '#F0F0F0'
            }}
          >
            {copied ? '✓ Link Copied!' : '🔗 Share CourtOS'}
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="beta" style={{ background: '#090909', padding: '100px 24px', borderTop: '1px solid #181818' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(61,190,107,0.08)',
            border: '1px solid rgba(61,190,107,0.2)',
            borderRadius: 100, padding: '6px 14px', marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3DBE6B', display: 'inline-block' }} />
            <span style={{ color: '#3DBE6B', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Limited Beta Spots
            </span>
          </div>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(44px, 6vw, 72px)',
              lineHeight: 1,
              color: '#F0F0F0',
              letterSpacing: '0.02em',
              marginBottom: 16,
            }}
          >
            JOIN THE BETA.
          </h2>
          <p style={{ color: '#888', fontSize: 16, maxWidth: 460, margin: '0 auto' }}>
            We&apos;re inviting a small group of coaches to test CourtOS before launch.
            Free to join. No credit card. Just real games.
          </p>
        </div>

        <div style={{
          background: '#141414',
          border: '1px solid #242424',
          borderRadius: 20,
          padding: '36px 32px',
        }}>
          <form onSubmit={handleSubmit} noValidate>

            {/* Name */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                Name <span style={{ color: '#3DBE6B' }}>*</span>
              </label>
              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Coach Sarah"
                value={formData.name}
                onChange={handleChange}
                style={{
                  ...INPUT_BASE,
                  borderColor: errors.name ? '#ef4444' : '#2a2a2a',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = errors.name ? '#ef4444' : '#3DBE6B')}
                onBlur={e => (e.currentTarget.style.borderColor = errors.name ? '#ef4444' : '#2a2a2a')}
              />
              {errors.name && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                Email <span style={{ color: '#3DBE6B' }}>*</span>
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="coach@clubname.com"
                value={formData.email}
                onChange={handleChange}
                style={{
                  ...INPUT_BASE,
                  borderColor: errors.email ? '#ef4444' : '#2a2a2a',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = errors.email ? '#ef4444' : '#3DBE6B')}
                onBlur={e => (e.currentTarget.style.borderColor = errors.email ? '#ef4444' : '#2a2a2a')}
              />
              {errors.email && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>{errors.email}</p>}
            </div>

            {/* Role selector */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                I am a... <span style={{ color: '#3DBE6B' }}>*</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {ROLES.map(role => {
                  const selected = formData.role === role.value
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => selectRole(role.value)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        background: selected ? 'rgba(61,190,107,0.12)' : '#1a1a1a',
                        border: `1px solid ${selected ? '#3DBE6B' : '#2a2a2a'}`,
                        color: selected ? '#3DBE6B' : '#888',
                      }}
                    >
                      {role.label}
                    </button>
                  )
                })}
              </div>
              {errors.role && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 8 }}>{errors.role}</p>}
            </div>

            {/* Organization */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                Club / School / Team <span style={{ color: '#555', fontWeight: 400 }}>(optional)</span>
              </label>
              <input
                name="organization"
                type="text"
                placeholder="Riverside Volleyball Club"
                value={formData.organization}
                onChange={handleChange}
                style={INPUT_BASE}
                onFocus={e => (e.currentTarget.style.borderColor = '#3DBE6B')}
                onBlur={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                What&apos;s your biggest headache on game day? <span style={{ color: '#555', fontWeight: 400 }}>(optional)</span>
              </label>
              <textarea
                name="message"
                rows={3}
                placeholder="Tell us what drives you crazy..."
                value={formData.message}
                onChange={handleChange}
                style={{ ...INPUT_BASE, resize: 'none' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#3DBE6B')}
                onBlur={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              style={{
                width: '100%',
                background: '#3DBE6B',
                color: '#000',
                padding: '16px 0',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                border: 'none',
                cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                opacity: status === 'submitting' ? 0.7 : 1,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                if (status !== 'submitting') e.currentTarget.style.background = '#4FD080'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#3DBE6B'
              }}
            >
              {status === 'submitting' ? 'Submitting...' : 'Get Early Access →'}
            </button>

            {status === 'error' && (
              <p style={{ color: '#ef4444', fontSize: 13, textAlign: 'center', marginTop: 16 }}>
                Something went wrong. Please try again.
              </p>
            )}

            <p style={{ color: '#444', fontSize: 12, textAlign: 'center', marginTop: 16 }}>
              Free during beta · No credit card · No spam
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
