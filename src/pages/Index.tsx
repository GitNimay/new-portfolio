import { lazy, Suspense, type ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import GitHubStats from "@/components/GitHubStats";
import SectionReveal from "@/components/SectionReveal";
import LazySection from "@/components/LazySection";
import LazyLoadingFallback from "@/components/LazyLoadingFallback";
import { useMagicBackground } from "@/context/MagicBackgroundContext";

const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
const Skills = lazy(() => import("@/components/Skills"));
const VolunteerAchievements = lazy(() => import("@/components/VolunteerAchievements"));
const Education = lazy(() => import("@/components/Education"));
const Contact = lazy(() => import("@/components/Contact"));

const sectionHeights = {
  experience: 520,
  projects: 620,
  skills: 520,
  achievements: 620,
  education: 480,
  contact: 520,
  footer: 140,
};

const LazyHomeSection = ({
  children,
  height,
}: {
  children: ReactNode;
  height: number;
}) => (
  <SectionReveal>
    <LazySection fallback={<LazyLoadingFallback compact minHeight={height} />} minHeight={height}>
      <Suspense fallback={<LazyLoadingFallback compact minHeight={height} />}>
        {children}
      </Suspense>
    </LazySection>
  </SectionReveal>
);

const Index = () => {
  const { isMagicActive } = useMagicBackground();

  return (
    <div className={`min-h-screen ${isMagicActive ? "bg-transparent" : "bg-background"}`} id="home">
      <SEO />
      <Navigation />
      <main>
        <Hero />
        <SectionReveal>
          <GitHubStats />
        </SectionReveal>
        <LazyHomeSection height={sectionHeights.experience}>
          <Experience />
        </LazyHomeSection>
        <LazyHomeSection height={sectionHeights.projects}>
          <Projects />
        </LazyHomeSection>
        <LazyHomeSection height={sectionHeights.skills}>
          <Skills />
        </LazyHomeSection>
        <LazyHomeSection height={sectionHeights.achievements}>
          <VolunteerAchievements />
        </LazyHomeSection>
        <LazyHomeSection height={sectionHeights.education}>
          <Education />
        </LazyHomeSection>
        <LazyHomeSection height={sectionHeights.contact}>
          <Contact />
        </LazyHomeSection>
      </main>

      <LazyHomeSection height={sectionHeights.footer}>
        <footer className={`py-8 px-6 border-t transition-all duration-500 ${isMagicActive ? "border-white/10" : "border-border"}`} role="contentinfo">
          <div className="max-w-6xl mx-auto text-center text-muted-foreground">
            <p>&copy; 2026 Nimesh Kulkarni. All rights reserved.</p>
          </div>
        </footer>
      </LazyHomeSection>
    </div>
  );
};

export default Index;
