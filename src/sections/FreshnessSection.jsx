import { useState } from 'react'
import { Leaf, MoveUpRight, CheckCircle2, Shield, RefreshCw, Award, Info } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { frameSrc } from '../lib/frames'

const WOOD_FINISHES = [
  {
    id: 'oak',
    name: 'European Natural Oak',
    code: 'OAK-EU-01',
    colorBg: 'bg-[#d8c3a5]',
    colorBorder: 'border-[#b8a283]',
    origin: 'Black Forest, Germany (FSC-Certified)',
    oil: 'Organic Linseed & Carnauba Wax',
    durability: 'Grade A Hardwood · Janka 1,360 lbf',
    image: frameSrc('frame-0024', { width: 1200 }),
  },
  {
    id: 'walnut',
    name: 'Smoked American Walnut',
    code: 'WAL-US-02',
    colorBg: 'bg-[#4a3728]',
    colorBorder: 'border-[#2d2117]',
    origin: 'Appalachian Valley, USA',
    oil: 'Thermal Smoked Natural Resin',
    durability: 'Grade A Hardwood · Janka 1,010 lbf',
    image: frameSrc('frame-0048', { width: 1200 }),
  },
  {
    id: 'ash',
    name: 'Bleached Scandinavian Ash',
    code: 'ASH-SE-03',
    colorBg: 'bg-[#ece4d0]',
    colorBorder: 'border-[#c9bea7]',
    origin: 'Småland, Sweden',
    oil: 'White Linseed Lye Finish',
    durability: 'Grade A Hardwood · Janka 1,320 lbf',
    image: frameSrc('frame-0078', { width: 1200 }),
  },
]

const LEATHER_FINISHES = [
  {
    id: 'saddle',
    name: 'Bespoke Saddle Tan',
    code: 'LTH-SD-88',
    colorBg: 'bg-[#a35c37]',
    origin: 'Tuscany, Italy (Vegetable Tanned)',
    patina: 'High patina potential · Softens over 20+ years',
  },
  {
    id: 'obsidian',
    name: 'Deep Obsidian Black',
    code: 'LTH-OB-09',
    colorBg: 'bg-[#1c1d1f]',
    origin: 'Bavaria, Germany (Full Grain)',
    patina: 'Matte executive finish · Water-resistant coating',
  },
  {
    id: 'olive',
    name: 'Forest Olive Drab',
    code: 'LTH-OL-42',
    colorBg: 'bg-[#3b4435]',
    origin: 'Tuscany, Italy (Organic Olive Leaf Tanned)',
    patina: 'Rich earthy patina · 100% chrome-free',
  },
]

export function FreshnessSection() {
  const [selectedWood, setSelectedWood] = useState(WOOD_FINISHES[0])
  const [selectedLeather, setSelectedLeather] = useState(LEATHER_FINISHES[0])
  const [showCertModal, setShowCertModal] = useState(false)

  return (
    <section id="freshness" className="bg-parchment py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="section-wrap">
        {/* Header */}
        <Reveal className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-ink/15 pb-8">
          <div>
            <div className="flex items-center gap-3 text-accent mb-3">
              <Leaf size={18} />
              <span className="label">Material Intelligence & Circularity</span>
            </div>
            <h2 className="display-heading">
              Designed to belong.<br />
              <em className="text-accent italic font-normal">Made to return.</em>
            </h2>
          </div>
          <p className="max-w-md text-sm font-light leading-relaxed text-ink/70">
            Every component is individually cataloged, completely non-toxic, and designed for infinite repairability or clean separation into natural material loops.
          </p>
        </Reveal>

        {/* Interactive Material Swatch Selector Grid */}
        <div className="grid grid-adaptive-2 gap-8 lg:gap-14 items-start">
          {/* Swatch Controller Box */}
          <Reveal className="rounded-2xl border border-ink/15 bg-surface/80 p-6 sm:p-8 backdrop-blur-md shadow-lg">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <span className="label text-ink">Interactive Tactile Swatch Studio</span>
              <span className="font-mono text-[10px] text-accent font-semibold">LIVE PREVIEW</span>
            </div>

            {/* Timber Selector */}
            <div className="mt-6">
              <label className="font-mono text-xs text-ink/60 uppercase tracking-wider block mb-3">
                Select Timber Species
              </label>
              <div className="grid grid-cols-3 gap-3">
                {WOOD_FINISHES.map((wood) => {
                  const isActive = selectedWood.id === wood.id
                  return (
                    <button
                      key={wood.id}
                      onClick={() => setSelectedWood(wood)}
                      className={`focus-ring relative flex flex-col items-center gap-2 rounded-xl border p-3 text-left transition-all ${
                        isActive
                          ? 'border-accent bg-parchment shadow-sm ring-1 ring-accent'
                          : 'border-ink/15 bg-surface hover:border-ink/40'
                      }`}
                    >
                      <span className={`size-8 rounded-full border shadow-inner ${wood.colorBg} ${wood.colorBorder}`} />
                      <span className="font-display text-[11px] font-medium text-center line-clamp-1 text-ink">{wood.name.split(' ')[1] || wood.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Leather Selector */}
            <div className="mt-8">
              <label className="font-mono text-xs text-ink/60 uppercase tracking-wider block mb-3">
                Select Full-Grain Leather Hide
              </label>
              <div className="grid grid-cols-3 gap-3">
                {LEATHER_FINISHES.map((leather) => {
                  const isActive = selectedLeather.id === leather.id
                  return (
                    <button
                      key={leather.id}
                      onClick={() => setSelectedLeather(leather)}
                      className={`focus-ring relative flex flex-col items-center gap-2 rounded-xl border p-3 text-left transition-all ${
                        isActive
                          ? 'border-accent bg-parchment shadow-sm ring-1 ring-accent'
                          : 'border-ink/15 bg-surface hover:border-ink/40'
                      }`}
                    >
                      <span className={`size-8 rounded-full border border-black/20 shadow-inner ${leather.colorBg}`} />
                      <span className="font-display text-[11px] font-medium text-center line-clamp-1 text-ink">{leather.name.replace('Bespoke ', '').replace('Deep ', '')}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active Combination Specs */}
            <div className="mt-8 rounded-xl border border-ink/10 bg-parchment/60 p-4 text-xs">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink/60 mb-2">
                <span>COMBO SPECIFICATION</span>
                <span className="text-accent">{selectedWood.code} + {selectedLeather.code}</span>
              </div>
              <div className="space-y-1.5 text-ink/80">
                <p className="flex justify-between">
                  <span className="font-medium text-ink">Timber Origin:</span>
                  <span className="text-right font-light">{selectedWood.origin}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium text-ink">Oil & Sealant:</span>
                  <span className="text-right font-light">{selectedWood.oil}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium text-ink">Leather Tannage:</span>
                  <span className="text-right font-light">{selectedLeather.origin}</span>
                </p>
              </div>
            </div>

            {/* Certificate Trigger Button */}
            <button
              onClick={() => setShowCertModal(true)}
              className="focus-ring mt-6 w-full flex items-center justify-center gap-2 rounded-xl border border-ink/20 py-3 text-xs font-display font-medium uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-surface"
            >
              <Award size={16} />
              <span>Verify Timber Traceability Certificate</span>
            </button>
          </Reveal>

          {/* Right Preview Card */}
          <Reveal delay={0.08} className="flex flex-col justify-between rounded-2xl border border-ink/15 bg-surface p-6 sm:p-8 lg:p-10 shadow-lg">
            <div>
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-full bg-brand-forest text-gold">
                  <Leaf size={22} strokeWidth={1.5} />
                </span>
                <span className="font-mono text-xs text-ink/50">CIRCULAR STANDARD 100%</span>
              </div>

              <div className="mt-8">
                <span className="label text-accent">Active Material Pairing</span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal mt-2 text-ink">
                  {selectedWood.name} <br />
                  <span className="text-accent font-light">& {selectedLeather.name}</span>
                </h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-ink/75">
                  Harvested with reverence from regenerative forestry plots where trees are allowed to mature for 80+ years. Treated exclusively with organic botanical oils, eliminating all synthetic polyurethane off-gassing.
                </p>
              </div>

              {/* Circular Feature List */}
              <div className="mt-8 space-y-3 border-t border-ink/10 pt-6">
                {[
                  '100% Repairable mechanical joint system',
                  'Zero volatile organic compounds (VOC-free)',
                  'Biodegradable at natural lifecycle conclusion',
                  'FSC-C149204 certified supply chain tracking',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-xs text-ink/80">
                    <CheckCircle2 size={16} className="text-accent shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-ink/15 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] text-ink/50 uppercase">Patina Expectation</p>
                <p className="text-xs font-medium text-ink mt-0.5">{selectedLeather.patina}</p>
              </div>
              <a
                href="#craft"
                className="focus-ring grid size-10 place-items-center rounded-full border border-ink/20 text-ink transition-all hover:bg-ink hover:text-surface"
                aria-label="Learn about craftsmanship"
              >
                <MoveUpRight size={18} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Certificate Modal */}
        {showCertModal && (
          <div className="fixed inset-0 z-100 grid place-items-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl border border-ink/20 bg-surface p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                <div className="flex items-center gap-2 text-accent">
                  <Shield size={20} />
                  <span className="font-display text-sm font-semibold tracking-wider">CERTIFICATE OF ORIGIN</span>
                </div>
                <button
                  onClick={() => setShowCertModal(false)}
                  className="font-mono text-xs text-ink/50 hover:text-ink"
                >
                  [CLOSE]
                </button>
              </div>

              <div className="mt-6 space-y-4 font-mono text-xs">
                <div className="rounded-lg bg-parchment p-3 space-y-1">
                  <p className="text-[10px] text-ink/50 uppercase">Certificate Registry ID</p>
                  <p className="font-semibold text-ink">FSC-AMB-2026-994810</p>
                </div>
                <div className="space-y-2 text-ink/80">
                  <p><strong className="text-ink">Timber Species:</strong> {selectedWood.name}</p>
                  <p><strong className="text-ink">Harvest Co-Ordinates:</strong> 48.1351° N, 8.2041° E (Black Forest)</p>
                  <p><strong className="text-ink">Kiln Drying Cycle:</strong> 120 Days Natural Air-Drying + Solar Kiln</p>
                  <p><strong className="text-ink">Moisture Content:</strong> 8.2% Equilibrium</p>
                </div>
                <div className="border-t border-ink/10 pt-4 flex items-center gap-3 text-[11px] text-accent">
                  <Award size={18} className="shrink-0" />
                  <span>Guaranteed 100% traceable to sustainable forest management plots.</span>
                </div>
              </div>

              <button
                onClick={() => setShowCertModal(false)}
                className="mt-6 w-full rounded-xl bg-ink py-3 text-xs font-display font-medium text-surface uppercase tracking-wider"
              >
                Close Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
