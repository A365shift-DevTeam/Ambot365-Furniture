import { useState } from 'react'
import { ArrowUpRight, Sun, Sunset, Moon, Sliders, X, Ruler, Sparkles, Check, ChevronRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { frameSrc } from '../lib/frames'

const CATEGORIES = ['All Pieces', 'Rest / Lounge', 'Gather / Dining', 'Focus / Studio', 'Pause / Low']

const PIECES = [
  {
    id: 'lounge-01',
    name: 'Ambot Lounge Chair 01',
    category: 'Rest / Lounge',
    use: 'Rest / Read / Reflect',
    image: 'frame-0024.webp',
    dimensions: { w: '78 cm', d: '84 cm', h: '76 cm', seatH: '41 cm' },
    weight: '14.2 kg',
    price: '$3,850',
    leadTime: '3-4 Weeks',
    desc: 'Low-slung ergonomically sculpted lounge chair with 104° reclining angle, hand-finished European Oak frame, and full-grain Italian saddle leather cushion.',
    materials: ['Solid European Oak', 'Natural Linseed Finish', 'Vegetable Tanned Saddle Leather', 'Stainless Steel Dowels'],
  },
  {
    id: 'dining-02',
    name: 'Ambot Dining Armchair 02',
    category: 'Gather / Dining',
    use: 'Gather / Share / Dine',
    image: 'frame-0048.webp',
    dimensions: { w: '62 cm', d: '64 cm', h: '82 cm', seatH: '46 cm' },
    weight: '9.8 kg',
    price: '$2,950',
    leadTime: '2-3 Weeks',
    desc: 'Upright dining armchair designed for extended dinner conversations. Sculpted steam-bent backrest provides firm thoracic support.',
    materials: ['Smoked American Walnut', 'Vegetable Tanned Leather', 'Concealed Mechanical Dovetails'],
  },
  {
    id: 'studio-03',
    name: 'Ambot Studio Workchair 03',
    category: 'Focus / Studio',
    use: 'Focus / Make / Create',
    image: 'frame-0078.webp',
    dimensions: { w: '64 cm', d: '66 cm', h: '88 cm', seatH: '48 cm' },
    weight: '11.4 kg',
    price: '$3,400',
    leadTime: '3-4 Weeks',
    desc: 'Architectural studio chair optimized for creative focus. Features smooth 360-degree silent swivel and adjustable leather lumbar cushion.',
    materials: ['Bleached Scandinavian Ash', 'Obsidian Black Leather', 'Precision Brass Swivel Mechanism'],
  },
  {
    id: 'low-04',
    name: 'Ambot Low Ottoman 04',
    category: 'Pause / Low',
    use: 'Pause / Reset / Unwind',
    image: 'frame-0104.webp',
    dimensions: { w: '58 cm', d: '52 cm', h: '38 cm', seatH: '38 cm' },
    weight: '7.6 kg',
    price: '$1,800',
    leadTime: '2 Weeks',
    desc: 'Versatile low footrest and occasional seating bench. Precision joinery frame with high-density organic wool padding.',
    materials: ['European Natural Oak', 'Organic Wool Padding', 'Forest Olive Leather'],
  },
]

const LIGHTING_MODES = [
  { id: 'daylight', label: 'Daylight 5500K', icon: Sun, filterClass: 'lighting-daylight' },
  { id: 'golden', label: 'Golden Hour 3000K', icon: Sunset, filterClass: 'lighting-golden' },
  { id: 'night', label: 'Night Gallery 2700K', icon: Moon, filterClass: 'lighting-night' },
]

export function CollectionSection() {
  const [activeCategory, setActiveCategory] = useState('All Pieces')
  const [activeLighting, setActiveLighting] = useState(LIGHTING_MODES[0])
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filteredPieces = activeCategory === 'All Pieces'
    ? PIECES
    : PIECES.filter((p) => p.category === activeCategory)

  return (
    <section id="collection" className="bg-golden-section py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="section-wrap">
        {/* Header */}
        <Reveal className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-border pb-8">
          <div>
            <div className="flex items-center gap-3 text-accent mb-3">
              <span className="h-px w-8 bg-accent" />
              <span className="label">The Furniture Collection · 2026 Edition</span>
            </div>
            <h2 className="display-heading text-ink">
              One form. <em className="text-accent italic font-normal">Many rituals.</em>
            </h2>
          </div>

          {/* Spatial Lighting Simulator Controller */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-2xl border border-border bg-parchment/60 p-2 backdrop-blur-md">
            <span className="font-mono text-[10px] text-ink/50 uppercase tracking-widest px-3 hidden sm:inline">Room Atmosphere:</span>
            <div className="flex gap-1">
              {LIGHTING_MODES.map((mode) => {
                const Icon = mode.icon
                const isActive = activeLighting.id === mode.id
                return (
                  <button
                    key={mode.id}
                    onClick={() => setActiveLighting(mode)}
                    className={`focus-ring flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-mono transition-all ${
                      isActive
                        ? 'bg-ink text-surface shadow-sm font-medium'
                        : 'text-ink/60 hover:text-ink hover:bg-surface/80'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-gold' : ''} />
                    <span>{mode.label.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Category Filters Bar */}
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`focus-ring min-h-10 rounded-full px-5 font-display text-xs font-medium tracking-wide transition-all ${
                activeCategory === cat
                  ? 'bg-ink text-surface shadow-md'
                  : 'border border-border bg-surface text-ink/70 hover:border-ink/40 hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Collection Grid */}
        <div className="grid grid-adaptive-4 gap-6">
          {filteredPieces.map((piece, index) => (
            <Reveal
              key={piece.name}
              delay={index * 0.05}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:border-accent hover:shadow-xl"
              onClick={() => setSelectedProduct(piece)}
            >
              {/* Product Image Card with Spatial Lighting Filter */}
              <div className="relative overflow-hidden bg-parchment">
                <img
                  src={frameSrc(piece.image, { width: 900 })}
                  alt={`${piece.name} - Ambot365 luxury furniture`}
                  className={`aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105 ${activeLighting.filterClass}`}
                  loading="lazy"
                />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="font-mono text-[10px] font-semibold text-ink/60 bg-surface/80 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    0{index + 1}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-ink bg-surface/90 px-3 py-1 rounded-full backdrop-blur-sm">
                    {piece.price}
                  </span>
                </div>

                {/* Hover Quick-View Trigger Overlay */}
                <div className="absolute inset-0 bg-ink/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <span className="rounded-full bg-surface px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-ink shadow-lg flex items-center gap-2">
                    Inspect Specifications <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="font-display text-sm font-semibold text-ink group-hover:text-accent transition-colors">{piece.name}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink/50">{piece.use}</p>
                </div>
                <span className="grid size-8 place-items-center rounded-full border border-border text-ink transition-transform group-hover:rotate-45 group-hover:border-accent group-hover:text-accent">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Quick View Product Drawer / Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-100 grid place-items-center bg-black/65 backdrop-blur-md p-4">
            <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
              {/* Modal Top Header */}
              <div className="flex items-center justify-between border-b border-border p-6 bg-parchment/60">
                <div>
                  <span className="label text-accent">{selectedProduct.category}</span>
                  <h3 className="font-serif text-2xl font-medium text-ink mt-1">{selectedProduct.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="focus-ring grid size-10 place-items-center rounded-full border border-ink/20 text-ink hover:bg-ink hover:text-surface transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content Scrollable Area */}
              <div className="overflow-y-auto p-6 space-y-6">
                {/* Image Preview & Description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div className="rounded-2xl overflow-hidden border border-border bg-parchment">
                    <img
                      src={frameSrc(selectedProduct.image, { width: 900 })}
                      alt={selectedProduct.name}
                      className={`w-full aspect-[4/5] object-cover ${activeLighting.filterClass}`}
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="font-mono text-xs text-ink/50 uppercase">Investment Value</p>
                      <p className="font-serif text-3xl font-semibold text-ink mt-0.5">{selectedProduct.price}</p>
                      <p className="font-mono text-[10px] text-accent mt-1">Lead Time: {selectedProduct.leadTime} (Bespoke Handcrafted)</p>
                    </div>

                    <p className="text-xs font-light leading-relaxed text-ink/80 border-t border-border pt-4">
                      {selectedProduct.desc}
                    </p>

                    <div className="rounded-xl border border-border bg-parchment/40 p-4 space-y-2 font-mono text-xs">
                      <div className="flex items-center gap-2 text-ink font-medium">
                        <Ruler size={16} className="text-accent" />
                        <span>SPECIFICATION DIMENSIONS</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-ink/75 pt-1">
                        <p><strong>Width:</strong> {selectedProduct.dimensions.w}</p>
                        <p><strong>Depth:</strong> {selectedProduct.dimensions.d}</p>
                        <p><strong>Height:</strong> {selectedProduct.dimensions.h}</p>
                        <p><strong>Seat Height:</strong> {selectedProduct.dimensions.seatH}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Material Breakdown List */}
                <div className="border-t border-border pt-4">
                  <p className="font-mono text-xs text-ink/60 uppercase tracking-wider mb-3">Certified Materials</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProduct.materials.map((mat) => (
                      <div key={mat} className="flex items-center gap-2 text-xs text-ink/80 rounded-lg bg-parchment/60 p-2.5">
                        <Check size={14} className="text-accent shrink-0" />
                        <span>{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-6 border-t border-border bg-parchment/40 flex items-center justify-between">
                <span className="font-mono text-xs text-ink/60">Serialized Build No. AMB-2026</span>
                <button
                  onClick={() => {
                    setSelectedProduct(null)
                    const contactNode = document.getElementById('contact')
                    if (contactNode) contactNode.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="focus-ring flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-xs font-medium uppercase tracking-wider text-surface transition-transform hover:scale-105 active:scale-95"
                >
                  <span>Request Commission Inquiries</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
