'use client'

import SectionReveal from '@/components/ui/SectionReveal'
import GoldButton from '@/components/ui/GoldButton'
import DishCard from '@/components/ui/DishCard'

const teaserDishes = [
  {
    name: 'Saffron Rogan Josh',
    description: '36-hour slow-braised Kashmiri lamb, saffron jus, crispy lotus root, smoked cardamom oil',
    price: 'AED 185',
    tags: ['Chef\'s Selection', 'Gluten Free'],
    isChef: true,
  },
  {
    name: 'Mezze Al Zafran',
    description: 'Hand-rolled kibbeh, truffle hummus, pomegranate muhammara, saffron labneh, sumac-dusted pita',
    price: 'AED 145',
    tags: ['Vegetarian Option'],
    isChef: false,
  },
  {
    name: 'Oud-Smoked Biryani',
    description: 'Aged basmati, slow-cooked short rib, dried lime, rose petal, 24-karat gold leaf',
    price: 'AED 210',
    tags: ['Chef\'s Selection', 'Signature'],
    isChef: true,
  },
]

export default function MenuTeaser() {
  return (
    <section className="py-32 md:py-40 px-8 bg-obsidian">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal className="text-center mb-20">
          <span className="font-body text-[10px] tracking-[0.5em] text-gold/60 uppercase block mb-4">The Kitchen</span>
          <h2
            className="font-display font-light text-ivory mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            Signature Plates
          </h2>
          <p className="font-body text-ivory-dim/60 text-sm max-w-md mx-auto leading-loose">
            Each dish is a dialogue between continents. A conversation that has been waiting centuries to begin.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {teaserDishes.map((dish, i) => (
            <SectionReveal key={dish.name} delay={i * 0.12}>
              <DishCard {...dish} />
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="text-center">
          <GoldButton href="/menu">Explore Full Menu</GoldButton>
        </SectionReveal>
      </div>
    </section>
  )
}
