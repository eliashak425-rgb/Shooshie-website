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
      <iframe
        src="https://www.unicorn.studio/embed/N45lpJuTcAnB7hkRmv54"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full border-0 opacity-30"
        style={{ filter: "hue-rotate(270deg)" }}
        loading="lazy"
        title="Background shader"
      />
      
      <Navbar />
      <MusicPlayer autoPlay />
      <main className="relative z-10">
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
    </>
  );
}
