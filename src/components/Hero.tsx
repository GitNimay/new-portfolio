import { Mail, FileText, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import profileImage from "@/assets/download.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import { useState, useEffect } from "react";
import { TextScramble } from "@/components/ui/text-scramble";

const email = "nimesh.kulkarni2004@gmail.com";
const obscuredEmail = email.replace(/([a-z0-9._-]+)@([a-z0-9._-]+\.[a-z]+)/gi, (match, user, domain) => {
  return user.replace(/./g, '*') + '@' + domain;
});

const Hero = () => {
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState("");

  useEffect(() => {
    const greetings = [
      "What’s up",
      "How are you",
      "How’s it going",
      "How you doing",
      "All good?",
      "Yo",
      "Sup",
      "Hey yo"
    ];
    let currentIndex = 0;

    // Function to show greeting
    const showNextGreeting = () => {
      setGreetingMessage(greetings[currentIndex]);
      setShowGreeting(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setShowGreeting(false);
      }, 5000);

      // Update index for next time
      currentIndex = (currentIndex + 1) % greetings.length;
    };

    // Initial greeting after 1 second
    const initialTimeout = setTimeout(showNextGreeting, 1000);

    // Loop every 8 seconds (5s visible + 3s gap)
    const interval = setInterval(showNextGreeting, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

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
            {/* Greeting Popup */}
            <div
              className={`absolute -top-6 -right-0 z-20 transition-all duration-700 ease-in-out transform ${showGreeting ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
                }`}
            >
              <div className="bg-popover/90 backdrop-blur-sm text-popover-foreground px-5 py-2.5 rounded-2xl shadow-xl border border-border/50 relative animate-in fade-in zoom-in duration-500">
                <TextScramble className="text-sm font-medium whitespace-nowrap tracking-wide">{greetingMessage}</TextScramble>
                {/* Speech Bubble Tail */}
                <div className="absolute -bottom-2 left-4 w-4 h-4 bg-popover/90 border-b border-r border-border/50 transform rotate-45 backdrop-blur-sm"></div>
              </div>
            </div>

            <div
              className="w-48 h-60 md:w-64 md:h-80 rounded-[50%] border-4 border-primary/30 overflow-hidden transition-transform duration-500 hover:scale-105 hover:border-primary/50 relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? (
                <video
                  src={heroVideo}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={profileImage}
                  alt="Nimesh Kulkarni Profile"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
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