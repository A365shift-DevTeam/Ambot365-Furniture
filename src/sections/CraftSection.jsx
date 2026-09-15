import { useState } from 'react'
import { CircleGauge, Fingerprint, Recycle, Trees, Volume2, VolumeX, Crosshair } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { frameSrc } from '../lib/frames'

const HOTSPOTS = [
  {
    id: 'dovetail',
    x: '38%',
    y: '42%',
    label: 'Mortise & Tenon',
    title: '±0.2mm Precision Dovetail Joinery',
    detail: 'CNC milled to sub-millimeter tolerances then hand-tuned by master joiners using traditional Japanese chisels.',
  },
  {
    id: 'oil',
    x: '65%',
    y: '28%',
    label: '14-Coat Finish',
    title: 'Hand-Rubbed Organic Oil Seal',
    detail: 'Layered over 14 days using natural linseed and carnauba wax, enhancing the natural grain without synthetic film.',
  },
  {
    id: 'leather',
    x: '52%',
    y: '68%',
    label: 'Italian Saddle Leather',
    title: 'Dual-Needle Saddle Stitching',
    detail: 'Stitched by hand with waxed linen thread to ensure maximum tensile strength along all stress vectors.',
  },
  {
    id: 'dowel',
    x: '25%',
    y: '75%',
    label: 'Hidden Dowel',
    title: 'Solid Brass Reinforcing Pin',
    detail: 'Provides invisible mechanical locking that can be disassembled cleanly during studio refurbishment.',
  },
]

const PARAMETERS = [
  { number: '01', title: 'Forest Sourcing', detail: '100% FSC-certified European Oak from managed sustainable plots.' },
  { number: '02', title: 'Tactile Finish', detail: '14 coats of organic botanical oil, hand-rubbed over 14 consecutive days.' },
  { number: '03', title: 'Mechanical Assembly', detail: 'Disassemblable joints with zero permanent adhesives.' },
  { number: '04', title: 'Acoustic Tuning', detail: 'Solid timber density tuned for zero structural creaking under pressure.' },
]

const FEATURES = [
  { icon: Trees, title: 'Regenerative Forest Sourcing', sub: '3 saplings planted per chair' },
  { icon: Fingerprint, title: 'Individually Serialized Coin', sub: 'Stamped brass underframe ID' },
  { icon: Recycle, title: 'Designed for Disassembly', sub: '6-minute unbolting protocol' },
  { icon: CircleGauge, title: 'Lifetime Service Pledge', sub: 'Free joint recalibration' },
]

export function CraftSection() {
  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS[0])

  return (
    <section id="craft" className="grain relative overflow-hidden bg-golden-parchment py-16 text-ink sm:py-20 md:py-24 lg:py-32 border-t border-border">
      <div className="section-wrap relative z-10">
        {/* Section Title Bar */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between border-b border-ink/15 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-3 text-accent">
              <span className="h-px w-8 bg-accent" />
              <span className="label">The Craftsmanship · 03</span>
            </div>
            <h2 className="display-heading mt-4 text-ink">
              Precision you can <em className="text-accent italic font-normal">feel.</em>
            </h2>
          </div>
          

        </div>

        {/* Hotspot Visualizer Section */}
        <div className="grid grid-adaptive-2 gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14 items-center">
          {/* Interactive Photo Canvas with Hotspots */}
          <Reveal className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
            <img
              src={frameSrc('frame-0060', { width: 1200 })}
              alt="Detailed view of Ambot365 chair during its assembly sequence"
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/11]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-black/10" />

            {/* Hotspot Buttons */}
            {HOTSPOTS.map((spot) => {
              const isActive = activeHotspot.id === spot.id
              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot)}
                  style={{ left: spot.x, top: spot.y }}
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 focus-ring z-20 flex items-center gap-2 rounded-full p-1.5 transition-all ${
                    isActive ? 'bg-accent text-surface ring-4 ring-accent/30 scale-110 shadow-lg' : 'bg-surface/90 text-ink border border-ink/30 hover:border-accent hover:scale-105 shadow-md'
                  }`}
                  aria-label={spot.label}
                >
                  <span className={`size-3 rounded-full ${isActive ? 'bg-surface' : 'bg-accent animate-ping'}`} />
                  <span className={`hidden sm:inline font-mono text-[10px] font-medium px-1.5 ${isActive ? 'text-surface' : 'text-ink'}`}>
                    {spot.label}
                  </span>
                </button>
              )
            })}

            {/* Active Hotspot Info Overlay Banner */}
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-ink/15 bg-surface/95 p-4 backdrop-blur-md shadow-lg">
              <div className="flex items-center justify-between font-mono text-[10px] text-accent mb-1">
                <span className="flex items-center gap-1.5"><Crosshair size={12} /> HOTSPOT INSPECTION</span>
                <span>±0.2 MM PRECISION</span>
              </div>
              <p className="font-display text-sm font-semibold text-ink">{activeHotspot.title}</p>
              <p className="mt-1 font-sans text-xs font-light leading-relaxed text-ink/75">{activeHotspot.detail}</p>
            </div>
          </Reveal>

          {/* Features Vertical Cards */}
          <Reveal delay={0.08} className="space-y-3">
            <p className="font-mono text-xs text-accent uppercase tracking-wider mb-4">Craftsmanship Features</p>
            {FEATURES.map(({ icon: Icon, title, sub }, index) => (
              <div
                key={title}
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-all duration-300 hover:border-accent/50 hover:shadow-md"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-accent/30 text-accent transition-colors group-hover:bg-accent group-hover:text-surface">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-ink/40">0{index + 1}</span>
                    <h3 className="font-display text-sm font-medium text-ink">{title}</h3>
                  </div>
                  <p className="mt-0.5 font-sans text-xs font-light text-ink/65">{sub}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Precision Parameters 4-Grid */}
        <div className="mt-14 grid grid-adaptive-4 gap-4 pt-10 border-t border-ink/15">
          {PARAMETERS.map(({ number, title, detail }) => (
            <Reveal key={title} className="rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:shadow-md">
              <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                <span className="label text-accent">{title}</span>
                <span className="font-mono text-[11px] text-ink/40">{number}</span>
              </div>
              <p className="mt-4 font-sans text-xs font-light leading-relaxed text-ink/75">{detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
