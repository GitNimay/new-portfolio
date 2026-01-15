import { Code2, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMagicBackground } from "@/context/MagicBackgroundContext";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Personal Portfolio",
    period: "January 2026 - Present",
    type: "Personal Project",
    description: "Modern developer portfolio showcasing skills, projects, and professional journey with interactive elements.",
    highlights: [
      "Designed with a focus on immersive UI/UX using glassmorphism and animations",
      "Integrated smart AI chatbot for specific portfolio-related queries",
      "Optimized for performance and responsiveness across all devices"
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Shadcn UI"],
    link: "https://nimesh-portfolio-iota.vercel.app/"
  },
  {
    title: "SaaS Validator - AI-Powered Startup Blueprint",
    period: "December 2025 - Present",
    type: "Personal Project",
    description: "Interactive platform for validating and architecting SaaS ideas using AI agents",
    highlights: [
      "Built AI-driven project generation pipeline with Google Gemini and animated UI",
      "Developed interactive node-based architecture diagrams using React Flow",
      "Implemented real-time diagrams, charts, and drag-and-drop roadmaps"
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Google GenAI", "Supabase", "React Flow"],
    link: "https://saa-s-val-lp.vercel.app/"
  },
  {
    title: "Lumino CRM - Real-time Sales Dashboard",
    period: "November 2025 - December 2025",
    type: "Personal Project",
    description: "Modern CRM with real-time collaboration and glassmorphism UI",
    highlights: [
      "Built responsive SPA with React, TypeScript, Tailwind, and dark mode",
      "Implemented real-time sync and notifications via Supabase",
      "Designed Kanban pipelines, charts, and sales tools"
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Real-time"],
    link: "https://lumino-crm-vc.vercel.app/"
  },
  {
    title: "Jenkins CI/CD Pipeline",
    period: "October 2025 - November 2025",
    type: "Personal Project",
    description: "Complete Jenkins-based CI/CD pipeline for Node.js microservice with DevSecOps practices",
    highlights: [
      "Automated build, test, code coverage, and deployment workflows across feature branches",
      "Implemented npm audit, OWASP dependency scanning, Docker security checks",
      "Deployed to AWS EC2/Kubernetes with automated vulnerability checks and rollback protection"
    ],
    tags: ["Jenkins", "Docker", "AWS", "Kubernetes", "DevSecOps"],
    link: "https://dev.to/nimesh_kulkarni_2f7a2057e/solar-app-deployment-from-nodejs-to-multi-cloud-cicd-4g9"
  },
  {
    title: "AI Powered Interview Platform",
    period: "October 2024 - November 2025",
    type: "GCOERC",
    description: "AI-powered interview analysis platform evaluating communication and behavioral cues",
    highlights: [
      "Achieved Top-10 position in GenAI Hackathon",
      "Built using Gemini, AssemblyAI, React.js, Cloudinary, Firebase",
      "Enabled real-time candidate assessment and report generation"
    ],
    tags: ["React.js", "AI/ML", "Firebase", "Cloudinary", "Gemini"],
    link: "https://landing-page-interview-expert.vercel.app/"
  }
];

const Projects = () => {
  const { isMagicActive } = useMagicBackground();
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Heading Animation
    gsap.from(headingRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Stacking Cards Animation
    // We want the cards to visually stack. CSS 'sticky' handles the positioning.
    // GSAP handles the scaling/fading/blurring of the *previous* card as the new one comes in.
    const cards = gsap.utils.toArray<HTMLElement>(".project-card-container");

    cards.forEach((card, index) => {
      // Scale down current card as the next one scrolls overlapping it
      // triggers when the NEXT card hits the viewport
      if (index === cards.length - 1) return; // Last card doesn't need to scale down for a next one

      gsap.to(card, {
        scale: 0.9, // More noticeable scale down to look like it's going away
        opacity: 0, // Fade out completely so the background card disappears
        filter: "blur(10px)", // Add blur for depth and to hide detail
        // For mobile, maybe we want a subtler effect or faster transition?
        scrollTrigger: {
          trigger: cards[index + 1], // The NEXT card triggers this one's exit
          start: "top bottom", // When next card top hits bottom of viewport (starts entering)
          end: "top 0%", // Was "top 20%". Extending this to 0% (or even negative) makes it last until the next card is FULLY on top.
          scrub: true,
          toggleActions: "play none none reverse"
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section id="projects" className={`py-16 md:py-24 px-4 md:px-6 ${isMagicActive ? "" : "bg-secondary/30"}`} aria-labelledby="projects-heading">
      <div
        ref={containerRef}
        className={`max-w-6xl mx-auto transition-all duration-500 ${isMagicActive ? "bg-card/30 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl" : ""}`}
      >
        <h2
          ref={headingRef}
          id="projects-heading"
          className="text-3xl md:text-5xl font-bold mb-12 md:mb-16 text-center"
        >
          Projects
        </h2>

        {/* Adjusted gap for mobile (gap-8) vs desktop (gap-12) */}
        <div className="flex flex-col gap-8 md:gap-12 relative" role="list" aria-label="Portfolio projects">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card-container sticky top-20 md:top-32"
              style={{
                // Increase z-index so newer cards are on top of older ones
                zIndex: index + 1,
              }}
            >
              <Card
                role="listitem"
                // Magic Mode: Darker background, stronger blur, lighter border for "premium" feel
                // Mobile: Adjusted padding (p-5) vs Desktop (p-8)
                className={`project-card w-full flex flex-col md:flex-row p-5 md:p-8 gap-5 md:gap-6 border-border hover:border-primary/50 transition-all duration-300 shadow-xl md:shadow-2xl ${isMagicActive
                  ? "bg-black/60 backdrop-blur-xl border-white/20" // Premium Magic Look
                  : "bg-card/95 backdrop-blur-md"
                  }`}
              >
                {/* Icon Section */}
                <div className="shrink-0 hidden md:block">
                  <div className="p-4 bg-primary/10 rounded-xl inline-flex">
                    <Code2 className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col">
                  {/* Header: Title + tags */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 md:hidden bg-primary/10 rounded-lg inline-flex mt-1">
                        <Code2 className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-3xl font-bold leading-tight">{project.title}</h3>
                        <p className="text-sm md:text-base text-primary/80 font-medium mt-1">{project.type} • {project.period}</p>
                      </div>
                    </div>

                    {/* Tags: wrapped, scrollable on very small if needed, but wrap is safer */}
                    <div className="flex flex-wrap gap-2 mt-1 md:mt-0 pl-10 md:pl-0">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2.5 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary text-[10px] md:text-xs rounded-full whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2.5 py-0.5 md:px-3 md:py-1 bg-primary/5 text-muted-foreground text-[10px] md:text-xs rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/90 text-sm md:text-lg mb-4 md:mb-6 leading-relaxed pl-10 md:pl-0">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6 grid grid-cols-1 md:grid-cols-2 gap-x-4 pl-10 md:pl-0">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-xs md:text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-2 mt-1 shrink-0" aria-hidden="true">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="mt-auto pt-2 md:pt-0 pl-10 md:pl-0">
                    <Button
                      asChild
                      className="w-full md:w-auto min-w-[140px] md:min-w-[200px]"
                      size="default" // Default size on mobile, lg on desktop via className if needed but responsive size variant is better handled by utility classes or keeping it simple
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} project`}
                      >
                        View Project <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;