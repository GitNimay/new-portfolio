import { Code2, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const projects = [
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
    link: "https://interviewxpert-ai.netlify.app/"
  }
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Projects</h2>
        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`p-6 bg-card border-border hover:border-primary/50 transition-all duration-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Code2 className="w-6 h-6 text-primary" />
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
                    <span className="text-primary mr-2">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <Button 
                asChild 
                className="w-full"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Project <ExternalLink className="w-4 h-4" />
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