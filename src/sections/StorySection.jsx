import { useState } from 'react'
import { ArrowDownRight, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { frameSrc } from '../lib/frames'

const PHILOSOPHIES = [
  {
    id: 'conviction',
    tag: 'No. 01 · Essentialism',
    title: 'Quiet in presence. Resolute in purpose.',
    body: 'Ambot365 is built around a singular conviction: objects closest to us should gain character with time. Every plane, joint, and curve is resolved for daily living—never for temporary showroom applause.',
    highlight: 'Zero redundant fasteners. Pure timber joinery.',
  },
  {
    id: 'ergonomics',
    tag: 'No. 02 · Human Geometry',
    title: 'Engineered for posture and stillness.',
    body: 'Sculpted through 14 iterations of physical prototyping. The lumbar angle of 104 degrees relieves micro-tensions during extended reading sessions while keeping the eye line naturally relaxed.',
    highlight: '104° precision incline for optimal lumbar support.',
  },
  {
    id: 'heritage',
    tag: 'No. 03 · 30-Year Guarantee',
    title: 'Built to outlast the generational cycle.',
    body: 'Every chair carries a serialized brass coin embedded in the underframe. If a joint ever shifts or a finish fades, our studio restores it to original specifications free of charge.',
    highlight: 'Full lifetime joint restoration guarantee.',
  },
]

const STATS = [
  {
    value: '27',
    label: 'Hand-finished components',
    detail: 'Machined to ±0.2mm tolerances and hand-scraped using traditional Japanese draw-knives.',
  },
  {
    value: '08',
    label: 'Master craftspeople',
    detail: 'Over 140 combined years of bespoke furniture joinery experience in our London studio.',
  },
  {
    value: '30yr',
    label: 'Structural guarantee',
    detail: 'Full lifetime repair pledge covering frame integrity, mechanical dowels, and leather seats.',
  },
]

export function StorySection({ compact = false }) {
  const [activeTab, setActiveTab] = useState(0)
  const [expandedStat, setExpandedStat] = useState(null)

  const currentPhilosophy = PHILOSOPHIES[activeTab]

  return (
    <section id={compact ? undefined : 'story-desktop'} className={`${compact ? 'bg-golden-section py-12' : 'hidden bg-golden-section py-16 sm:py-20 md:py-24 lg:block lg:py-32'}`}>
      <div className="section-wrap">
        {/* Section Tag Header */}
        <Reveal className="mb-8 flex items-center justify-between border-b border-border/80 pb-5">
          <div className="flex items-center gap-3 text-accent">
            <span className="h-px w-8 bg-accent" />
            <span className="label">The Object · Design Narrative</span>
          </div>
          <span className="font-mono text-xs text-ink/40">EST. 2026</span>
        </Reveal>

        {/* Main Content Grid */}
        <div className="grid grid-adaptive-2 items-stretch gap-10 sm:gap-12 lg:gap-20">
          {/* Left Column: Philosophy Explorer */}
          <Reveal className="flex flex-col justify-between lg:pr-4">
            <div>
              {/* Interactive Tab Switcher */}
              <div className="mb-8 flex flex-wrap gap-2 rounded-full border border-border bg-parchment/50 p-1.5 backdrop-blur-sm">
                {PHILOSOPHIES.map((philosophy, index) => (
                  <button
                    key={philosophy.id}
                    onClick={() => setActiveTab(index)}
                    className={`focus-ring flex-1 min-h-10 rounded-full px-4 text-xs font-medium transition-all duration-300 ${
                      activeTab === index
                        ? 'bg-ink text-surface shadow-md'
                        : 'text-ink/60 hover:text-ink hover:bg-surface/50'
                    }`}
                  >
                    {philosophy.tag.split('·')[1].trim()}
                  </button>
                ))}
              </div>

              {/* Dynamic Content */}
              <div className="min-h-[260px] transition-all duration-500">
                <span className="label text-accent">{currentPhilosophy.tag}</span>
                <h2 className="display-heading mt-4 text-ink">
                  {currentPhilosophy.title}
                </h2>
                <p className="mt-6 text-[15px] font-light leading-relaxed text-ink/75 sm:text-[16px]">
                  {currentPhilosophy.body}
                </p>

                {/* Highlight Badge */}
                <div className="mt-6 flex items-center gap-3 rounded-lg border border-accent/20 bg-accent/5 p-3.5 text-xs text-accent">
                  <Sparkles size={16} className="shrink-0" />
                  <span className="font-medium">{currentPhilosophy.highlight}</span>
                </div>
              </div>
            </div>

            {/* CTA Link */}
            <div className="mt-8 pt-6 border-t border-border/60">
              <a
                href="#craft"
                className="focus-ring group inline-flex min-h-12 items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:text-accent"
              >
                <span>Read the technical blueprint</span>
                <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          {/* Right Column: Hero Visual Card */}
          {!compact && (
            <Reveal delay={0.08} className="group relative flex items-center overflow-hidden rounded-2xl border border-border bg-parchment shadow-xl md:rounded-3xl">
              <img
                src={frameSrc('frame-0120', { width: 1200 })}
                alt="Ambot365 signature lounge chair in solid oak and saddle leather"
                className="aspect-[4/3] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] md:aspect-[4/5]"
                loading="lazy"
              />
              
              {/* Floating Quality Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-2 rounded-full border border-white/40 bg-surface/80 px-4 py-2 text-xs backdrop-blur-md shadow-lg">
                <ShieldCheck size={16} className="text-gold" />
                <span className="font-mono text-[11px] font-medium tracking-wide text-ink">30-YEAR WARRANTY</span>
              </div>

              {/* Bottom Spec Tag */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl border border-white/30 bg-surface/90 px-5 py-3.5 backdrop-blur-md">
                <div>
                  <p className="font-display text-xs font-semibold tracking-wider text-ink">Oak & Saddle Leather</p>
                  <p className="font-mono text-[10px] text-ink/50 uppercase tracking-widest mt-0.5">Hand-assembled · London Studio</p>
                </div>
                <span className="grid size-8 place-items-center rounded-full bg-ink text-surface text-xs font-mono">01</span>
              </div>
            </Reveal>
          )}
        </div>

        {/* Expandable Stats Bar */}
        <div className={`${compact ? 'mt-10' : 'mt-16 lg:mt-24'} grid grid-adaptive-3 gap-4 border-t border-border pt-10`}>
          {STATS.map((stat, index) => {
            const isExpanded = expandedStat === index
            return (
              <Reveal
                key={stat.label}
                delay={index * 0.05}
                className={`group cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
                  isExpanded
                    ? 'border-accent bg-parchment shadow-md'
                    : 'border-border bg-surface hover:border-ink/30 hover:bg-parchment/40'
                }`}
                onClick={() => setExpandedStat(isExpanded ? null : index)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[32px] font-semibold tabular-nums text-ink sm:text-[38px] group-hover:text-accent transition-colors">
                      {stat.value}
                    </p>
                    <p className="mt-1 font-display text-xs font-medium tracking-wide text-ink/80">{stat.label}</p>
                  </div>
                  <span className={`grid size-7 place-items-center rounded-full border border-border transition-transform ${isExpanded ? 'rotate-90 bg-ink text-surface' : 'group-hover:border-ink'}`}>
                    <ChevronRight size={14} />
                  </span>
                </div>
                {isExpanded && (
                  <p className="mt-4 border-t border-border/60 pt-3 font-sans text-xs font-light leading-relaxed text-ink/70">
                    {stat.detail}
                  </p>
                )}
                {!isExpanded && (
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ink/40 group-hover:text-accent">
                    Click for spec details +
                  </p>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
