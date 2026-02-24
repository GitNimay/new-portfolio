import { Award, Code, Cloud, Container, Settings, Shield, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useMagicBackground } from "@/context/MagicBackgroundContext";

const skillCategories = [
  {
    icon: Code,
    title: "Programming",
    skills: ["Python", "Go"]
  },
  {
    icon: Cloud,
    title: "Cloud",
    skills: ["AWS EC2", "IAM", "S3", "VPC", "EKS"]
  },
  {
    icon: Container,
    title: "Containers & Orchestration",
    skills: ["Docker", "Kubernetes"]
  },
  {
    icon: Settings,
    title: "CI/CD & IaC",
    skills: ["Jenkins", "Terraform", "Ansible"]
  },
  {
    icon: Shield,
    title: "Security & Monitoring",
    skills: ["DevSecOps", "Prometheus", "Grafana", "Vulnerability Scanning"]
  }
];

const certifications = [
  {
    title: "DevOps: Planning to Production",
    issuer: "Geeks for Geeks",
    year: "2025",
    description: "Validated knowledge in DevOps fundamentals, CI/CD, automation, infrastructure, and deployment workflows",
    link: "https://drive.google.com/drive/u/0/folders/1_clr45J0Kw7c_dWpdiVBDHP26RuOuptg?ths=true"
  },
  {
    title: "Jenkins Pipeline",
    issuer: "KodeKloud",
    year: "2025",
    description: "Hands-on experience in building automated CI/CD pipelines and secure deployment workflows",
    link: "https://drive.google.com/drive/u/0/folders/1_clr45J0Kw7c_dWpdiVBDHP26RuOuptg?ths=true"
  },
  {
    title: "Kubernetes for Absolute Beginners",
    issuer: "KodeKloud",
    year: "2025",
    description: "Foundational skills in deploying and managing containerized applications",
    link: "https://drive.google.com/drive/u/0/folders/1_clr45J0Kw7c_dWpdiVBDHP26RuOuptg?ths=true"
  },
  {
    title: "DevOps Short Course",
    issuer: "IT Masters & Charles Sturt University",
    year: "2025",
    description: "Completed an industry-aligned DevOps program with a strong 90.00 grade. Gained hands-on exposure to CI/CD concepts, automation workflows, and modern DevOps practices. Earned certification under the guidance of Brenton Burchmore.",
    link: "https://drive.google.com/drive/folders/1_clr45J0Kw7c_dWpdiVBDHP26RuOuptg?usp=sharing"
  }
];

const Skills = () => {
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation();
  const { ref: certsRef, isVisible: certsVisible } = useScrollAnimation();
  const { isMagicActive } = useMagicBackground();

  return (
    <section id="skills" className="py-16 md:py-24 px-4 md:px-6">
      <div className={`max-w-6xl mx-auto transition-all duration-500 ${isMagicActive ? "bg-card/30 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl" : ""}`}>
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Skills & Certifications</h2>

        {/* Skills */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-primary">Technical Skills</h3>
          <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((category, index) => (
              <MagicCard
                key={index}
                className={`p-6 border-border transition-all duration-700 ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${isMagicActive ? "bg-white/5 backdrop-blur-md border-white/10" : "bg-card"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                gradientColor={isMagicActive ? "#A07CFE" : "#262626"}
              >
                <div className="flex items-center gap-3 mb-4">
                  <category.icon className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">{category.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </MagicCard>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-primary">Certifications</h3>
          <div ref={certsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className={`p-6 border-border hover:border-primary/50 transition-all duration-700 md:hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 ${certsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${isMagicActive ? "bg-white/5 backdrop-blur-md border-white/10" : "bg-card"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{cert.title}</h4>
                    <p className="text-sm text-primary">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
                <Button
                  asChild
                  size="sm"
                  className="w-full"
                >
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    View Certificate <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;