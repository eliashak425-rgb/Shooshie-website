import {
  Navbar,
  Hero,
  GeometricShowcase,
  GlobeSection,
  Skills,
  About,
  Projects,
  Contact,
  Footer,
} from "~/components";
import AnimatedSection from "~/components/AnimatedSection";
import MusicPlayer from "~/components/MusicPlayer";

export default function HomePage() {
  return (
    <>
      {/* Unicorn Studio Shader Background */}
      <div className="fixed inset-0 z-0">
        <iframe
          src="https://www.unicorn.studio/embed/N45lpJuTcAnB7hkRmv54"
          className="h-full w-full border-0 opacity-40 md:opacity-50"
          style={{ filter: "hue-rotate(270deg)" }}
          loading="lazy"
          title="Background shader"
        />
      </div>
      
      {/* Watermark cover - separate fixed layer to survive scroll bounce */}
      {/* Tall solid bar + gradient to fully hide watermark on all devices */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[1] h-28 bg-[#0a0a0b] sm:h-24" />
      <div className="pointer-events-none fixed bottom-28 left-0 right-0 z-[1] h-32 bg-gradient-to-t from-[#0a0a0b] to-transparent sm:bottom-24 sm:h-24" />
      
      {/* Content layer - pointer-events-none allows shader interaction in empty areas */}
      <div className="pointer-events-none relative z-10">
        <Navbar />
        <MusicPlayer autoPlay />
        <main>
          <Hero />
          {/* Solid background starts after hero to cover watermark when scrolling */}
          <div className="bg-[#0a0a0b]">
          <AnimatedSection>
            <GeometricShowcase />
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <GlobeSection />
          </AnimatedSection>
          <AnimatedSection delay={50}>
            <Skills />
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <About />
          </AnimatedSection>
          <AnimatedSection delay={50}>
            <Projects />
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <Contact />
          </AnimatedSection>
          <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
