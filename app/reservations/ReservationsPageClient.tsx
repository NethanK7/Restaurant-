'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldButton from '@/components/ui/GoldButton'

// --- Custom Calendar ---
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function Calendar({
  selected,
  onSelect,
}: {
  selected: Date | null
  onSelect: (d: Date) => void
}) {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d
  })

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  return (
    <div className="bg-deep-noir border border-gold/15 p-6">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="w-11 h-11 flex items-center justify-center text-ivory-dim/40 hover:text-gold transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </button>
        <h3 className="font-display text-ivory text-lg tracking-wider">
          {MONTHS[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="w-11 h-11 flex items-center justify-center text-ivory-dim/40 hover:text-gold transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center font-body text-[10px] tracking-widest text-ivory-dim/30 uppercase py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const date = new Date(year, month, day)
          date.setHours(0, 0, 0, 0)
          const isPast = date < today
          const isSelected = selected?.toDateString() === date.toDateString()
          const isToday = date.toDateString() === today.toDateString()

          return (
            <button
              key={day}
              disabled={isPast}
              onClick={() => onSelect(date)}
              className={`
                relative aspect-square flex items-center justify-center font-body text-sm transition-all duration-200
                ${isPast ? 'text-ivory-dim/15 cursor-not-allowed' : 'hover:text-gold cursor-pointer'}
                ${isSelected ? 'text-obsidian' : isToday ? 'text-gold' : 'text-ivory-dim/60'}
              `}
            >
              {isSelected && (
                <motion.div
                  layoutId="selectedDay"
                  className="absolute inset-0 bg-gold"
                  style={{ borderRadius: 0 }}
                />
              )}
              <span className="relative z-10">{day}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// --- Step components ---

function StepOne({
  data,
  onChange,
}: {
  data: { date: Date | null; time: string }
  onChange: (k: string, v: Date | string) => void
}) {
  const times = [
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      className="space-y-8"
    >
      <div>
        <label className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/60 block mb-4">
          Select Date
        </label>
        <Calendar
          selected={data.date}
          onSelect={(d) => onChange('date', d)}
        />
      </div>

      <div>
        <label className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/60 block mb-4">
          Select Time
        </label>
        <div className="grid grid-cols-4 gap-2">
          {times.map((t) => (
            <button
              key={t}
              onClick={() => onChange('time', t)}
              className={`py-3.5 font-body text-sm tracking-wider border transition-all duration-300 ${
                data.time === t
                  ? 'border-gold bg-gold text-obsidian'
                  : 'border-ivory/10 text-ivory-dim/50 hover:border-gold/50 hover:text-ivory'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function StepTwo({
  data,
  onChange,
}: {
  data: { name: string; email: string; phone: string; guests: number; occasion: string; requests: string }
  onChange: (k: string, v: string | number) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { key: 'name', label: 'Full Name', type: 'text' },
          { key: 'email', label: 'Email Address', type: 'email' },
          { key: 'phone', label: 'Phone Number', type: 'tel' },
        ].map(({ key, label, type }) => (
          <div key={key} className="float-label-group">
            <input
              type={type}
              placeholder=" "
              value={data[key as keyof typeof data] as string}
              onChange={(e) => onChange(key, e.target.value)}
              className="input-gold"
              id={key}
            />
            <label
              htmlFor={key}
              className="absolute top-3 left-0 font-body text-xs text-ivory-dim/40 pointer-events-none"
            >
              {label}
            </label>
          </div>
        ))}

        <div>
          <label className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/60 block mb-3">
            Number of Guests
          </label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <button
                key={n}
                onClick={() => onChange('guests', n)}
                className={`w-11 h-11 font-body text-sm border transition-all duration-300 ${
                  data.guests === n
                    ? 'border-gold bg-gold text-obsidian'
                    : 'border-ivory/10 text-ivory-dim/50 hover:border-gold/50 hover:text-ivory'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/60 block mb-3">
          Occasion (optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {['Birthday', 'Anniversary', 'Business', 'Proposal', 'Date Night', 'Other'].map((occ) => (
            <button
              key={occ}
              onClick={() => onChange('occasion', occ === data.occasion ? '' : occ)}
              className={`px-4 py-3 font-body text-xs tracking-wider border transition-all duration-300 ${
                data.occasion === occ
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-ivory/10 text-ivory-dim/40 hover:border-gold/30 hover:text-ivory-dim'
              }`}
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      <div className="float-label-group">
        <textarea
          placeholder=" "
          rows={3}
          value={data.requests}
          onChange={(e) => onChange('requests', e.target.value)}
          id="requests"
          className="input-gold resize-none"
        />
        <label
          htmlFor="requests"
          className="absolute top-3 left-0 font-body text-xs text-ivory-dim/40 pointer-events-none"
        >
          Dietary requirements or special requests
        </label>
      </div>
    </motion.div>
  )
}

function StepThree({
  formData,
}: {
  formData: {
    date: Date | null; time: string; name: string; email: string;
    phone: string; guests: number; occasion: string; requests: string
  }
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      className="space-y-8"
    >
      <div className="border border-gold/15 p-6 md:p-8 space-y-6">
        <h3 className="font-display text-xl text-ivory mb-6">Reservation Summary</h3>

        {[
          {
            label: 'Date',
            value: formData.date
              ? formData.date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
              : '—',
          },
          { label: 'Time', value: formData.time || '—' },
          { label: 'Guests', value: `${formData.guests} ${formData.guests === 1 ? 'person' : 'people'}` },
          { label: 'Name', value: formData.name || '—' },
          { label: 'Email', value: formData.email || '—' },
          { label: 'Phone', value: formData.phone || '—' },
          ...(formData.occasion ? [{ label: 'Occasion', value: formData.occasion }] : []),
          ...(formData.requests ? [{ label: 'Special Requests', value: formData.requests }] : []),
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col sm:flex-row sm:justify-between sm:items-start sm:gap-6 gap-1 border-b border-ivory/5 pb-4">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-ivory-dim/40 flex-shrink-0">{label}</span>
            <span className="font-body text-sm text-ivory-dim sm:text-right">{value}</span>
          </div>
        ))}
      </div>

      <p className="font-body text-xs text-ivory-dim/40 leading-loose">
        By confirming, you agree to our cancellation policy. Reservations cancelled within 24 hours may incur a charge. A credit card is required to hold your booking.
      </p>
    </motion.div>
  )
}

function ConfirmationScreen({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="text-center py-16"
    >
      {/* Animated checkmark */}
      <div className="w-20 h-20 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-8 relative">
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.path
            d="M6 16L13 23L26 10"
            stroke="#C9A84C"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.svg>
        <motion.div
          className="absolute inset-0 rounded-full border border-gold/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.3, opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
        />
      </div>

      <h2 className="font-display text-3xl text-ivory mb-4">
        Reservation Confirmed
      </h2>
      <p className="font-body text-ivory-dim/50 text-sm mb-2">
        Thank you, {name || 'valued guest'}. We look forward to welcoming you.
      </p>
      <p className="font-body text-xs text-ivory-dim/30 mb-12">
        A confirmation has been sent to your email address.
      </p>

      <div className="border border-gold/10 inline-block px-10 py-6 mb-10">
        <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/40 mb-2">Confirmation Code</p>
        <p className="font-display text-2xl text-gold tracking-[0.3em]">ZFR-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
      </div>

      <div className="flex justify-center">
        <GoldButton href="/">Return Home</GoldButton>
      </div>
    </motion.div>
  )
}

export default function ReservationsPageClient() {
  const [step, setStep] = useState(1)
  const [confirmed, setConfirmed] = useState(false)
  const [formData, setFormData] = useState({
    date: null as Date | null,
    time: '',
    name: '',
    email: '',
    phone: '',
    guests: 2,
    occasion: '',
    requests: '',
  })

  const updateField = (key: string, value: string | number | Date) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const canProceedStep1 = formData.date !== null && formData.time !== ''
  const canProceedStep2 = formData.name.trim() !== '' && formData.email.trim() !== ''

  const handleConfirm = () => {
    setConfirmed(true)
  }

  return (
    <main className="min-h-screen bg-obsidian pt-24 md:pt-32 pb-16 md:pb-32">
      <div className="max-w-[900px] mx-auto px-5 md:px-8">
        {/* Header */}
        <SectionReveal className="text-center mb-20">
          <span className="font-body text-[10px] tracking-[0.5em] text-gold/50 uppercase block mb-4">
            An Evening Awaits
          </span>
          <h1
            className="font-display font-light text-ivory mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Reserve Your Table
          </h1>
          <div className="w-16 h-[1px] bg-gold/40 mx-auto" />
        </SectionReveal>

        {!confirmed ? (
          <>
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-4 mb-16">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 flex items-center justify-center border font-body text-xs transition-all duration-500 ${
                        s === step
                          ? 'border-gold bg-gold text-obsidian'
                          : s < step
                          ? 'border-gold/50 text-gold/50'
                          : 'border-ivory/10 text-ivory-dim/30'
                      }`}
                    >
                      {s < step ? '✓' : s}
                    </div>
                    <span className={`font-body text-[10px] tracking-[0.2em] uppercase hidden sm:block transition-colors duration-300 ${
                      s === step ? 'text-gold' : 'text-ivory-dim/30'
                    }`}>
                      {s === 1 ? 'Date & Time' : s === 2 ? 'Your Details' : 'Confirm'}
                    </span>
                  </div>
                  {s < 3 && <div className={`w-16 h-[1px] transition-colors duration-500 ${s < step ? 'bg-gold/30' : 'bg-ivory/5'}`} />}
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <StepOne
                    key="step1"
                    data={{ date: formData.date, time: formData.time }}
                    onChange={updateField}
                  />
                )}
                {step === 2 && (
                  <StepTwo
                    key="step2"
                    data={{
                      name: formData.name,
                      email: formData.email,
                      phone: formData.phone,
                      guests: formData.guests,
                      occasion: formData.occasion,
                      requests: formData.requests,
                    }}
                    onChange={updateField}
                  />
                )}
                {step === 3 && (
                  <StepThree key="step3" formData={formData} />
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-ivory/5">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="font-body text-xs tracking-[0.2em] uppercase text-ivory-dim/40 hover:text-ivory transition-colors duration-300 flex items-center gap-2"
                >
                  <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                    <path d="M16 4H2M2 4L5 1M2 4L5 7" stroke="currentColor" strokeWidth="0.8"/>
                  </svg>
                  Back
                </button>
              ) : <div />}

              {step < 3 ? (
                <GoldButton
                  onClick={() => setStep(step + 1)}
                  className={step === 1 && !canProceedStep1 ? 'opacity-40 pointer-events-none' : step === 2 && !canProceedStep2 ? 'opacity-40 pointer-events-none' : ''}
                >
                  Continue
                </GoldButton>
              ) : (
                <GoldButton onClick={handleConfirm}>
                  Confirm Reservation
                </GoldButton>
              )}
            </div>
          </>
        ) : (
          <ConfirmationScreen name={formData.name} />
        )}
      </div>
    </main>
  )
}
