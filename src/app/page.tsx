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
    </>
  );
}
