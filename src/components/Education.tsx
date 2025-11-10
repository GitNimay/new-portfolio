import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const education = [
  {
    degree: "Bachelor of Engineering",
    institution: "Guru Gobind Singh College of Engineering and Research Center",
    location: "Nashik",
    year: "2026",
    grade: "7.2 (Overall Average)"
  },
  {
    degree: "Higher Secondary",
    institution: "Sukhdev College",
    location: "Nashik",
    year: "2022",
    grade: "73%",
    minor: "Minor in Science"
  }
];

const Education = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="education" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Education</h2>
        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <Card 
              key={index} 
              className={`p-6 bg-card border-border hover:border-primary/50 transition-all duration-700 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                  {edu.minor && <p className="text-sm text-muted-foreground mb-1">{edu.minor}</p>}
                  <p className="text-primary mb-2">{edu.institution} • {edu.location}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{edu.year}</span>
                    <span>•</span>
                    <span>{edu.grade}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;