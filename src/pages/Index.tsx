import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import VolunteerAchievements from "@/components/VolunteerAchievements";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background" id="home">
      <SEO />
      <Navigation />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <VolunteerAchievements />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border" role="contentinfo">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>© 2026 Nimesh Kulkarni. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
