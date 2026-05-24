import HeroSection from '@/components/sections/HeroSection'
import PlateRevealSection from '@/components/sections/PlateRevealSection'
import HorizontalStory from '@/components/sections/HorizontalStory'
import MenuTeaser from '@/components/sections/MenuTeaser'
import ReservationCTA from '@/components/sections/ReservationCTA'
import SectionReveal from '@/components/ui/SectionReveal'

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      {/* About teaser */}
      <section className="py-32 md:py-40 px-8 bg-deep-noir relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(201,168,76,0.04),transparent)]" />
        <div className="max-w-3xl mx-auto text-center relative">
          <SectionReveal>
            <div className="w-8 h-[1px] bg-gold/30 mx-auto mb-10" />
            <p
              className="font-display italic font-light text-ivory/90 leading-relaxed"
              style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}
            >
              &ldquo;Born from the ancient spice routes that once connected Mumbai to Muscat, ZAFRAN is not a restaurant — it is a rite of passage. Every dish is a dialogue between two of the world&rsquo;s great culinary civilizations. Come hungry. Leave transformed.&rdquo;
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="w-8 h-[1px] bg-gold/30" />
              <span className="font-body text-[10px] tracking-[0.4em] text-gold/50 uppercase">Our Story</span>
              <div className="w-8 h-[1px] bg-gold/30" />
            </div>
          </SectionReveal>
        </div>
      </section>

      <PlateRevealSection />
      <HorizontalStory />
      <MenuTeaser />
      <ReservationCTA />
    </main>
  )
}
