import { Mail, FileText, Linkedin, Github, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/download.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import { useState, useEffect, useRef } from "react";
import { TextScramble } from "@/components/ui/text-scramble";
import { useMagicBackground } from "@/context/MagicBackgroundContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { MatrixText } from "@/components/ui/matrix-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { SparklesText } from "@/components/ui/sparkles-text";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";


const email = "nimesh.kulkarni2004@gmail.com";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState("");
  const { isMagicActive } = useMagicBackground();
  const reducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (reducedMotion) return;

    const tl = gsap.timeline();

    // Image Setup & Entrance
    tl.fromTo(imageRef.current,
      { scale: 0, rotation: -10, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
    );



    // Content Entrance (Staggered)
    // Note: targeting standard HTML elements inside contentRef
    const contentElements = contentRef.current?.children;
    if (contentElements) {
      tl.fromTo(contentElements,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out" },
        "-=1" // Overlap with image animation
      );
    }

    // Social Buttons Entrance
    const socialButtons = socialRef.current?.children;
    if (socialButtons) {
      tl.fromTo(socialButtons,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.5"
      );
    }

  }, { scope: containerRef, dependencies: [reducedMotion] });

  useEffect(() => {
    if (reducedMotion) return;

    const greetings = [
      "What's up",
      "How are you",
      "How's it going",
      "How you doing",
      "All good?",
      "Yo",
      "Sup",
      "Hey yo"
    ];
    let currentIndex = 0;

    const showNextGreeting = () => {
      setGreetingMessage(greetings[currentIndex]);
      setShowGreeting(true);

      setTimeout(() => {
        setShowGreeting(false);
      }, 5000);

      currentIndex = (currentIndex + 1) % greetings.length;
    };

    const initialTimeout = setTimeout(showNextGreeting, 1000);
    const interval = setInterval(showNextGreeting, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 md:px-6 py-16 md:py-24 overflow-hidden"
      id="home"
      aria-labelledby="hero-title"
    >
      <div className="max-w-6xl w-full">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image Section */}
          <div className="relative z-10 perspective-1000">
            {/* Greeting Popup */}
            <div
              className={`absolute -top-6 -right-0 z-20 transition-all duration-700 ease-in-out transform ${showGreeting ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
                }`}
            >
              <div className="bg-popover/90 backdrop-blur-sm text-popover-foreground px-5 py-2.5 rounded-2xl shadow-xl border border-border/50 relative">
                <TextScramble className="text-sm font-medium whitespace-nowrap tracking-wide">{greetingMessage}</TextScramble>
                <div className="absolute -bottom-2 left-4 w-4 h-4 bg-popover/90 border-b border-r border-border/50 transform rotate-45 backdrop-blur-sm"></div>
              </div>
            </div>

            <div
              ref={imageRef}
              className="w-48 h-60 md:w-64 md:h-80 rounded-[50%] border-4 border-primary/30 overflow-hidden shadow-2xl relative cursor-pointer will-change-transform"
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
                  preload="none"
                  poster={profileImage}
                />
              ) : (
                <img
                  src={profileImage}
                  alt="Nimesh Kulkarni Profile"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              )}
            </div>

            {/* Decorative Elements (Optional - can be added via CSS or GSAP too) */}
            <div className={`absolute inset-0 -z-10 bg-primary/20 blur-3xl rounded-full opacity-50 ${isMagicActive ? 'animate-pulse' : ''}`}></div>
          </div>

          {/* Content Section */}
          <div
            ref={contentRef}
            className="flex-1 text-center md:text-left"
          >
            <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-foreground">
              <MatrixText
                text="Nimesh Kulkarni"
                className="justify-center md:justify-start"
              />
            </h1>
            <BlurFade delay={0.3} direction="up">
              <p className="text-xl md:text-2xl mb-6 block">
                <SparklesText className="text-primary" sparklesCount={8}>
                  DevOps Engineer
                </SparklesText>
              </p>
            </BlurFade>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0">
              Driven DevOps engineer with hands-on experience in CI/CD, containerization,
              cloud infrastructure, and automation. Skilled in Docker, Jenkins, Git/GitHub,
              Linux, AWS, and infrastructure-as-code workflows.
            </p>

            {/* Contact Links */}
            <nav
              ref={socialRef}
              className="flex flex-wrap gap-4 justify-center md:justify-start mb-8"
              aria-label="Contact links"
            >
              <Button variant="outline" size="lg" asChild className={cn(
                "hover:scale-110 transition-transform duration-200",
                isMagicActive ? "bg-black/20 border-white/20 hover:bg-black/40 text-white" : ""
              )}>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2"
                  aria-label="Send email to Nimesh Kulkarni"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className={cn(
                "hover:scale-110 transition-transform duration-200",
                isMagicActive ? "bg-black/20 border-white/20 hover:bg-black/40 text-white" : ""
              )}>
                <a
                  href="https://docs.google.com/document/d/1vdAgBVN_NtRVD_xuQ0jGvg1Cmpwm_6GS/edit?usp=sharing&ouid=116826189459599851989&rtpof=true&sd=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  aria-label="View CV/Resume"
                >
                  <FileText className="w-4 h-4" />
                  <span>CV</span>
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className={cn(
                "hover:scale-110 transition-transform duration-200",
                isMagicActive ? "bg-black/20 border-white/20 hover:bg-black/40 text-white" : ""
              )}>
                <a
                  href="https://www.linkedin.com/in/nimesh-kulkarni-526401266/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className={cn(
                "hover:scale-110 transition-transform duration-200",
                isMagicActive ? "bg-black/20 border-white/20 hover:bg-black/40 text-white" : ""
              )}>
                <a
                  href="https://github.com/GitNimay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  aria-label="Visit GitHub profile"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2 cursor-pointer z-20",
          !reducedMotion && "animate-bounce"
        )}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </div>
    </section>
  );
};

export default Hero;
