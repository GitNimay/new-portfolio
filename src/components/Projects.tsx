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
    const cards = gsap.utils.toArray<HTMLElement>(".project-card");

    // Heading Animation
    gsap.from(headingRef.current, {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Cards Stagger Animation
    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="projects" className={`py-16 md:py-24 px-4 md:px-6 ${isMagicActive ? "" : "bg-secondary/30"}`} aria-labelledby="projects-heading">
      <div
        ref={containerRef}
        className={`max-w-6xl mx-auto transition-all duration-500 ${isMagicActive ? "bg-card/30 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl" : ""}`}
      >
        <h2
          ref={headingRef}
          id="projects-heading"
          className="text-3xl md:text-5xl font-bold mb-12 text-center"
        >
          Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-6" role="list" aria-label="Portfolio projects">
          {projects.map((project, index) => (
            <Card
              key={index}
              role="listitem"
              className={`project-card h-full flex flex-col p-6 border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 ${isMagicActive ? "bg-white/5 backdrop-blur-md border-white/10" : "bg-card"
                }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Code2 className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                  <p className="text-sm text-primary">{project.type} • {project.period}</p>
                </div>
              </div>

              <p className="text-foreground mb-4">{project.description}</p>

              <ul className="space-y-2 mb-4">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start">
                    <span className="text-primary mr-2" aria-hidden="true">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label={`Technologies used in ${project.title}`}>
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full" role="listitem">
                    {tag}
                  </span>
                ))}
              </div>

              <Button
                asChild
                className="w-full mt-auto"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} project`}
                >
                  View Project <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;