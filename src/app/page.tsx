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
        {/* Gradient overlays to hide watermark */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/80 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-[#0a0a0b]" />
      </div>
      
      {/* Content layer - pointer-events-none allows shader interaction in empty areas */}
      <div className="pointer-events-none relative z-10">
        <Navbar />
        <MusicPlayer autoPlay />
        <main>
          <Hero />
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
        </main>
        <Footer />
      </div>
    </>
  );
}
