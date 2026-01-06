import { Mail, FileText, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import profileImage from "@/assets/download.jpg";

const email = "nimesh.kulkarni2004@gmail.com";
const obscuredEmail = email.replace(/([a-z0-9._-]+)@([a-z0-9._-]+\.[a-z]+)/gi, (match, user, domain) => {
  return user.replace(/./g, '*') + '@' + domain;
});

const Hero = () => {
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-6 py-16 md:py-24" id="home" aria-labelledby="hero-title">
      <div className="max-w-6xl w-full">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image */}
          <div
            ref={imageRef}
            className={`relative transition-all duration-1000 ${imageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <div className="w-48 h-60 md:w-64 md:h-80 rounded-[50%] border-4 border-primary/30 overflow-hidden transition-transform duration-500 hover:scale-105 hover:border-primary/50">
              <img
                src={profileImage}
                alt="Nimesh Kulkarni Profile"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className={`flex-1 text-center md:text-left transition-all duration-1000 delay-200 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-foreground animate-fade-in">
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
            <nav className="flex flex-wrap gap-4 justify-center md:justify-start mb-8" aria-label="Contact links">
              <Button variant="outline" size="lg" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary dark:hover:bg-accent dark:hover:text-accent-foreground">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2"
                  aria-label="Send email to Nimesh Kulkarni"
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Email</span>
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary dark:hover:bg-accent dark:hover:text-accent-foreground">
                <a
                  href="https://drive.google.com/file/d/1IQliZDS4lBg8EX1JfefYlmytioWiIqMc/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  aria-label="View CV/Resume"
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">CV</span>
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary dark:hover:bg-accent dark:hover:text-accent-foreground">
                <a
                  href="https://www.linkedin.com/in/nimesh-kulkarni-526401266/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary dark:hover:bg-accent dark:hover:text-accent-foreground">
                <a
                  href="https://github.com/GitNimay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  aria-label="Visit GitHub profile"
                >
                  <Github className="w-4 h-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;