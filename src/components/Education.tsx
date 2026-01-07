import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useMagicBackground } from "@/context/MagicBackgroundContext";

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
  const { isMagicActive } = useMagicBackground();

  return (
    <section id="education" className={`py-16 md:py-24 px-4 md:px-6 ${isMagicActive ? "" : "bg-secondary/30"}`}>
      <div className={`max-w-6xl mx-auto transition-all duration-500 ${isMagicActive ? "bg-card/30 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl" : ""}`}>
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Education</h2>
        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <Card
              key={index}
              className={`p-6 border-border hover:border-primary/50 transition-all duration-700 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} ${isMagicActive ? "bg-white/5 backdrop-blur-md border-white/10" : "bg-card"}`}
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