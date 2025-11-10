import { Mail, FileText, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import profileImage from "@/assets/download.jpg";

const Hero = () => {
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image */}
          <div 
            ref={imageRef}
            className={`relative transition-all duration-1000 ${
              imageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="w-64 h-80 rounded-[50%] border-4 border-primary/30 overflow-hidden transition-transform duration-500 hover:scale-105 hover:border-primary/50">
              <img 
                src={profileImage} 
                alt="Nimesh Kulkarni Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div 
            ref={contentRef}
            className={`flex-1 text-center md:text-left transition-all duration-1000 delay-200 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground animate-fade-in">
              Nimesh Kulkarni
            </h1>
            <p className="text-xl md:text-2xl text-primary mb-6">
              DevOps Engineer
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Driven DevOps engineer with hands-on experience in CI/CD, containerization, 
              cloud infrastructure, and automation. Skilled in Docker, Jenkins, Git/GitHub, 
              Linux, AWS, and infrastructure-as-code workflows.
            </p>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
              <Button variant="outline" size="lg" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                <a href="mailto:nimesh.kulkarni2004@gmail.com" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                <a href="https://drive.google.com/file/d/1IQliZDS4lBg8EX1JfefYlmytioWiIqMc/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  CV
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                <a href="https://linkedin.com/in/nimesh-kulkarni" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                <a href="https://github.com/nimeshkulkarni" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;