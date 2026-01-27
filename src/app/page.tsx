import {
  Navbar,
  Hero,
  GeometricShowcase,
  GlobeSection,
  Skills,
  About,
  Edits,
  Projects,
  Contact,
  Footer,
} from "~/components";
import AnimatedSection from "~/components/AnimatedSection";
import MusicPlayer from "~/components/MusicPlayer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <Navbar />
      <MusicPlayer autoPlay />
      <main>
        <Hero />
        <AnimatedSection>
          <Projects />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <Edits />
        </AnimatedSection>
        <AnimatedSection delay={50}>
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
          <Contact />
        </AnimatedSection>
        <Footer />
      </main>
    </div>
  );
}
