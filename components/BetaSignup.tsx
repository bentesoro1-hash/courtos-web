'use client'
import { createClient } from '@supabase/supabase-js';
import { useState, type ChangeEvent, type FormEvent } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type FormData = { name: string; email: string; club: string; level: string; message: string }
type FormErrors = Partial<Record<keyof FormData, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'
const INITIAL: FormData = { name: '', email: '', club: '', level: '', message: '' }

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim() || data.name.trim().length < 2) errors.name = 'Name is required'
  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Enter a valid email address'
  if (!data.level) errors.level = 'Please select a coaching level'
  re'use client'
import { createClient } from '@supabase/supabast [formData, setFormData] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return }
    setStatus('submitting')
    try {
      const { error } = await supabase.from('beta_signups').insert([{
        name: formData.name,
        email: formData.email,
        organization: formData.club,
        coaching_level: formData.level,
        frustration: formData.message,
        source: 'courtos.co/beta',
      }])
      if (error) throw error

      await fetch('/api/notify-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          organization: formData.club,
          coaching_level: formData.level,
          frustration: formData.message,
        }),
      })

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (field: keyof FormData) =>
    `w-full bg-court-bg border rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors[field] ? 'border-red-500/60 focus:ring-red-500' : 'border-court-border focus:border-blue-500'}`

  if (status === 'success') {
    return (
      <section id="beta" className="py-20 sm:py-28 bg-court-surface relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-white mb-3">You&apos;re on the beta list.</h3>
          <p className="text-slate-400 text-lg">We&apos;ll reach out soon.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="beta" className="py-20 sm:py-28 bg-court-surface relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(37,99,235,0.08)_0%,transparent_70%)]" />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse block" />
            <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">Limited beta</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 text-balance">Help shape CourtOS before launch</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">We&apos;re inviting a small group of volleyball coaches to test CourtOS during real practices, scrimmages, and tournaments.</p>
        </div>
        <div className="bg-court-bg border border-court-border rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="name">Name <span className="text-blue-500">*</span></label>
              <input id="name" name="name" type="text" autoComplete="name" placeholder="Coach Sarah" value={formData.name} onChange={handleChange} className={inputClass('name')} />
              {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="email">Email <span className="text-blue-500">*</span></label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="coach@clubname.com" value={formData.email} onChange={handleChange} className={inputClass('email')} />
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="club">Club / School / Team</label>
              <input id="club" name="club" type="text" placeholder="Riverside Volleyball Club" value={formData.club} onChange={handleChange} className={inputClass('club')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="level">Coaching Level <span className="text-blue-500">*</span></label>
              <div className="relative">
                <select id="level" name="level" value={formData.level} onChange={handleChange} className={`${inputClass('level')} appearance-none cursor-pointer pr-10`}>
                  <option value="" disabled>Select coaching level</option>
                  <option value="youth">Youth Coach (12U-16U)</option>
                  <option value="club">Club / AAU Coach</option>
                  <option value="high-school">High School Coach (JV / Varsity)</option>
                  <option value="collegiate-club">Collegiate Club Coach</option>
                  <option value="private">Private / Independent Coach</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              {errors.level && <p className="mt-1.5 text-xs text-red-400">{errors.level}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="message">Message / Notes <span className="text-slate-500 font-normal">(optional)</span></label>
              <textarea id="message" name="message" rows={3} placeholder="Tell us about your program..." value={formData.message} onChange={handleChange} className={`${inputClass('message')} resize-none`} />
            </div>
            <button type="submit" disabled={status === 'submitting'} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-[0_0_32px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2 mt-2">
              {status === 'submitting' ? 'Submitting...' : 'Request Beta Access'}
            </button>
            {status === 'error' && <p className="text-center text-sm text-red-400 mt-2">Something went wrong. Please try again or email <a href="mailto:courtos@courtos.co" className="underline hover:text-red-300">courtos@courtos.co</a>.</p>}
            <p className="text-center text-xs text-slate-600 mt-3">We&apos;ll never share your info. No spam, no pressure.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
