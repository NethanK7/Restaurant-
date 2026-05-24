'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'

const categories = [
  'Mezze & Starters',
  'Mains',
  'Tandoor',
  'Grills',
  'Desserts',
  'Drinks',
]

const menuData: Record<string, MenuItem[]> = {
  'Mezze & Starters': [
    {
      name: 'Mezze Al Zafran',
      description: 'Hand-rolled kibbeh, truffle hummus, pomegranate muhammara, saffron labneh, sumac-dusted pita',
      price: 'AED 145',
      tags: ['V'],
      isChef: false,
      note: 'Feeds two to share',
    },
    {
      name: 'Saffron Labneh',
      description: 'Strained labneh, Kashmiri saffron, toasted pine nuts, cold-pressed olive oil, warm flatbread',
      price: 'AED 75',
      tags: ['V', 'GF'],
      isChef: false,
    },
    {
      name: 'Truffle Kibbeh',
      description: 'Hand-rolled lamb and bulgur, black truffle shaving, pomegranate molasses, micro parsley',
      price: 'AED 95',
      tags: ['Chef'],
      isChef: true,
    },
    {
      name: 'Spiced Calamari',
      description: 'Cornish squid, Kashmiri chili crisp, lemon verbena aioli, saffron ink drizzle',
      price: 'AED 110',
      tags: ['GF'],
      isChef: false,
    },
    {
      name: 'Foie Gras Samosa',
      description: 'Duck foie gras, medjool date jam, crispy pastry, cardamom-spiced mango chutney',
      price: 'AED 130',
      tags: ['Chef'],
      isChef: true,
    },
    {
      name: 'Burrata al Oud',
      description: 'Hand-pulled burrata, oud-smoked tomato concassé, sumac, torn basil, aged balsamic pearls',
      price: 'AED 115',
      tags: ['V', 'GF'],
      isChef: false,
    },
  ],
  'Mains': [
    {
      name: 'Saffron Rogan Josh',
      description: '36-hour slow-braised Kashmiri lamb, saffron jus, crispy lotus root, smoked cardamom oil, roti',
      price: 'AED 185',
      tags: ['Chef', 'GF'],
      isChef: true,
      note: 'Signature dish',
    },
    {
      name: 'Oud-Smoked Biryani',
      description: 'Aged basmati, slow-cooked short rib, dried lime, rose petal, 24-karat gold leaf, raita',
      price: 'AED 210',
      tags: ['Chef'],
      isChef: true,
    },
    {
      name: 'Tandoor-Smoked Hamour',
      description: 'Gulf hamour fillet, tandoor char, green chutney, pickled radish, turmeric beurre blanc',
      price: 'AED 195',
      tags: ['GF'],
      isChef: false,
    },
    {
      name: 'Lamb Mansaf',
      description: 'Jordanian-style slow-cooked lamb shoulder, jameed sauce, aged basmati, fresh herbs',
      price: 'AED 175',
      tags: ['GF'],
      isChef: false,
    },
    {
      name: 'Malabar Crab Curry',
      description: 'Fresh blue swimmer crab, coconut milk reduction, curry leaf, fresh mango, appam',
      price: 'AED 200',
      tags: ['GF', 'Spicy'],
      isChef: false,
    },
    {
      name: 'Paneer Makhani Royale',
      description: 'Cultured paneer, smoked tomato makhani, cashew cream, micro herbs, stone-baked naan',
      price: 'AED 145',
      tags: ['V'],
      isChef: false,
    },
  ],
  'Tandoor': [
    {
      name: 'Seekh Kebab Royale',
      description: 'Minced lamb, aromatic spice blend, saffron glaze, pickled onions, mint chutney',
      price: 'AED 140',
      tags: ['Chef', 'GF'],
      isChef: true,
    },
    {
      name: 'Chicken Tikka Malabar',
      description: '24-hour marinated free-range chicken, coconut tikka masala, charred peppers, coriander oil',
      price: 'AED 135',
      tags: ['GF'],
      isChef: false,
    },
    {
      name: 'Tandoori Broccoli',
      description: 'Crown broccoli, yoghurt marinade, chaat masala, green chutney, pomegranate',
      price: 'AED 90',
      tags: ['V', 'GF'],
      isChef: false,
    },
    {
      name: 'Lobster Tandoori',
      description: 'Whole Canadian lobster, ajwain butter, pickled cucumber ribbons, saffron aioli',
      price: 'AED 280',
      tags: ['Chef', 'GF'],
      isChef: true,
      note: 'Market price may vary',
    },
  ],
  'Grills': [
    {
      name: 'Wagyu Kofta',
      description: 'A5 wagyu beef kofta, baharat spice, truffle labne, crispy shallots, jus gras',
      price: 'AED 245',
      tags: ['Chef'],
      isChef: true,
    },
    {
      name: 'Whole Sea Bass Chermoula',
      description: 'Line-caught sea bass, Moroccan chermoula, preserved lemon, harissa oil',
      price: 'AED 175',
      tags: ['GF'],
      isChef: false,
    },
    {
      name: 'Rack of Lamb Harissa',
      description: 'Frenched rack of lamb, harissa crust, pomegranate jus, charred aubergine cream',
      price: 'AED 220',
      tags: ['GF'],
      isChef: false,
    },
    {
      name: 'Mixed Grill Al Zafran',
      description: 'Selection of the day\'s finest: shish taouk, kofta, lamb chops, grilled vegetables',
      price: 'AED 195',
      tags: ['Feeds 2'],
      isChef: false,
      note: 'For two guests',
    },
  ],
  'Desserts': [
    {
      name: 'Cardamom Crème Brûlée',
      description: 'Green cardamom custard, pistachio praline, rose water gel, micro herbs, gold leaf',
      price: 'AED 75',
      tags: ['V', 'GF', 'Chef'],
      isChef: true,
    },
    {
      name: 'Baklava Mille-Feuille',
      description: 'Layers of filo, wild honey, rose-scented cream, pistachio dust, orange blossom ice cream',
      price: 'AED 70',
      tags: ['V'],
      isChef: false,
    },
    {
      name: 'Mango Kulfi Royale',
      description: 'Alphonso mango kulfi, saffron toffee sauce, candied fennel seeds, micro mint',
      price: 'AED 65',
      tags: ['V', 'GF'],
      isChef: false,
    },
    {
      name: 'Dark Chocolate Oud',
      description: '75% Valrhona ganache, oud smoke infusion, sesame tuile, salted caramel, gold leaf',
      price: 'AED 80',
      tags: ['V', 'GF', 'Chef'],
      isChef: true,
    },
  ],
  'Drinks': [
    {
      name: 'Saffron Rose Martini',
      description: 'Saffron-infused vodka, rose water, lychee, prosecco foam, edible gold flakes',
      price: 'AED 90',
      tags: ['Signature'],
      isChef: true,
    },
    {
      name: 'Cardamom Old Fashioned',
      description: 'Bourbon, cardamom bitters, smoked cinnamon, orange peel, single ice sphere',
      price: 'AED 95',
      tags: ['Signature'],
      isChef: false,
    },
    {
      name: 'Oud Negroni',
      description: 'Gin, Campari, sweet vermouth, oud wood smoke, dried orange wheel',
      price: 'AED 95',
      tags: ['Signature'],
      isChef: true,
    },
    {
      name: 'Zafran Mocktail',
      description: 'Cold-pressed pomegranate, saffron cordial, rose water, sparkling water, dried petals',
      price: 'AED 55',
      tags: ['Non-Alcoholic'],
      isChef: false,
    },
    {
      name: 'Arabic Coffee Service',
      description: 'Traditional qahwa, cardamom, saffron, served with medjool dates',
      price: 'AED 45',
      tags: ['Non-Alcoholic'],
      isChef: false,
    },
    {
      name: 'Masala Chai Ceremony',
      description: 'Artisanal spiced chai, milk-brewed, cinnamon, ginger, cardamom, served tableside',
      price: 'AED 45',
      tags: ['Non-Alcoholic'],
      isChef: false,
    },
  ],
}

interface MenuItem {
  name: string
  description: string
  price: string
  tags: string[]
  isChef: boolean
  note?: string
}

const tagStyles: Record<string, string> = {
  'Chef': 'border-gold/40 text-gold',
  'V': 'border-green-800/50 text-green-600',
  'GF': 'border-ivory/20 text-ivory-dim/50',
  'Spicy': 'border-ember/40 text-ember',
  'Signature': 'border-gold/40 text-gold',
  'Non-Alcoholic': 'border-ivory/20 text-ivory-dim/50',
  'Feeds 2': 'border-ivory/20 text-ivory-dim/50',
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div
      className={`group relative p-8 border border-ivory/5 hover:border-gold/30 transition-all duration-500 overflow-hidden ${
        item.isChef ? 'bg-deep-noir' : 'bg-transparent'
      }`}
    >
      {item.isChef && <div className="absolute inset-0 chef-selection-shimmer pointer-events-none" />}

      {/* Hover top line */}
      <div className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-gold to-ember w-0 group-hover:w-full transition-all duration-700" />

      <div className="relative flex justify-between items-start gap-6">
        <div className="flex-1 min-w-0">
          {item.isChef && (
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-[1px] bg-gold/60" />
              <span className="font-body text-[9px] tracking-[0.3em] text-gold/60 uppercase">Chef&apos;s Selection</span>
            </div>
          )}
          <h3 className="font-display text-xl text-ivory mb-2 group-hover:text-gold-light transition-colors duration-300">
            {item.name}
          </h3>
          <p className="font-body text-xs text-ivory-dim/50 leading-loose mb-4 max-w-lg">{item.description}</p>
          {item.note && (
            <p className="font-body text-[10px] italic text-gold/40 mb-3">{item.note}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {item.tags.filter(t => t !== 'Chef').map((tag) => (
              <span
                key={tag}
                className={`font-body text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 border ${tagStyles[tag] || 'border-ivory/10 text-ivory-dim/40'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="font-display text-gold text-xl font-light">{item.price}</span>
        </div>
      </div>
    </div>
  )
}

export default function MenuPageClient() {
  const [activeCategory, setActiveCategory] = useState('Mezze & Starters')

  return (
    <main className="min-h-screen bg-obsidian pt-32 pb-32">
      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-8 mb-20">
        <SectionReveal className="text-center">
          <span className="font-body text-[10px] tracking-[0.5em] text-gold/50 uppercase block mb-4">The Repertoire</span>
          <h1
            className="font-display font-light text-ivory mb-6"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
          >
            Our Menu
          </h1>
          <div className="w-16 h-[1px] bg-gold/40 mx-auto mb-6" />
          <p className="font-body text-ivory-dim/50 text-sm max-w-md mx-auto leading-loose">
            Every ingredient is sourced with intention. Every dish is a story. Every meal, a memory.
          </p>
        </SectionReveal>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[72px] z-50 bg-obsidian/95 backdrop-blur-md border-b border-gold/10 mb-16">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-5 font-body text-xs tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-300 flex-shrink-0 ${
                  activeCategory === cat ? 'text-gold' : 'text-ivory-dim/40 hover:text-ivory-dim'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-[1400px] mx-auto px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-ivory/5">
              {(menuData[activeCategory] || []).map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                  className="bg-obsidian"
                >
                  <MenuItemCard item={item} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Chef's note */}
        <SectionReveal className="mt-24 text-center">
          <div className="inline-block border border-gold/10 px-12 py-10 max-w-2xl">
            <div className="w-8 h-[1px] bg-gold/30 mx-auto mb-6" />
            <p className="font-display italic text-ivory-dim/70 text-lg mb-4">
              &ldquo;Fire does not distinguish between cultures. Neither do we.&rdquo;
            </p>
            <p className="font-body text-[11px] tracking-[0.3em] text-gold/50 uppercase">
              Chef Arjun Al-Rashid — Executive Chef
            </p>
          </div>
        </SectionReveal>
      </div>
    </main>
  )
}
