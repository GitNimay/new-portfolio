import { Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const experiences = [
  {
    title: "Web Technology Intern",
    company: "Gurado India Private Limited",
    location: "Nashik",
    period: "December 2024 - January 2025",
    achievements: [
      "Configured and deployed applications on AWS EC2 using IAM, S3, EBS, Elastic IP, and secure SSH access to ensure reliable and secure infrastructure.",
      "Implemented Docker containers and Auto Scaling Groups to enable scalable application environments and improve system performance."
    ]
  }
];

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Experience</h2>
        <div ref={ref} className="space-y-6">
          {experiences.map((exp, index) => (
            <Card 
              key={index} 
              className={`p-6 bg-card border-border hover:border-primary/50 transition-all duration-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                  <p className="text-primary mb-2">{exp.company} • {exp.location}</p>
                  <p className="text-sm text-muted-foreground mb-4">{exp.period}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;