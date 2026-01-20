import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    Home,
    Briefcase,
    FolderGit2,
    Cpu,
    GraduationCap,
    BookOpen,
    Award,
    Github,
} from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { cn } from "@/lib/utils";
import { useMagicBackground } from "@/context/MagicBackgroundContext";
import Playlist from "./Playlist";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navItems = [
    { label: "Home", href: "home", icon: Home },
    { label: "Experience", href: "experience", icon: Briefcase },
    { label: "GitHub", href: "github-stats", icon: Github },
    { label: "Projects", href: "projects", icon: FolderGit2 },
    { label: "Skills", href: "skills", icon: Cpu },
    { label: "Volunteer", href: "volunteer-achievements", icon: Award },
    { label: "Education", href: "education", icon: GraduationCap },
    { label: "Blogs", href: "/blogs", icon: BookOpen, external: true }
];

const MOBILE_LABEL_WIDTH = 90;

const BottomNavbar = () => {
    const [activeTab, setActiveTab] = useState("home");
    const { scrollTo } = useSmoothScroll();
    const { isMagicActive } = useMagicBackground();
    const navRef = useRef<HTMLDivElement>(null);
    const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
    const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleScroll = () => {
        const sections = navItems.map(item => item.href).filter(href => !href.startsWith("/"));
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < 300) {
                    setActiveTab(section);
                    break;
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        // Initial Entry Animation
        gsap.fromTo(navRef.current,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );

        const icons = iconRefs.current.filter((el): el is HTMLDivElement => el !== null);

        if (icons.length > 0) {
            gsap.fromTo(icons,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(2)",
                    delay: 0.3
                }
            );
        }
    }, { scope: navRef });

    useGSAP(() => {
        // Active Tab Animation
        navItems.forEach((item, index) => {
            const isActive = activeTab === item.href;
            const labelEl = labelRefs.current[index];
            const iconEl = iconRefs.current[index];

            if (labelEl) {
                gsap.to(labelEl, {
                    width: isActive ? MOBILE_LABEL_WIDTH : 0,
                    opacity: isActive ? 1 : 0,
                    marginLeft: isActive ? 8 : 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }

            // Icon Animation for Blogs (Special Case)
            if (item.label === "Blogs") {
                if (isActive || item.label === "Blogs") { // Always animate blogs if that was the intention, or just when active
                    // The original code animated Blogs icon continuously?
                    // "animate={item.label === "Blogs" ? { rotate: ... } : {}}"
                    // It seems it was always animating for "Blogs".
                    // Let's recreate that separately.
                }
            }
        });
    }, [activeTab]);

    useGSAP(() => {
        // Continuous animation for Blogs icon
        const blogsIndex = navItems.findIndex(i => i.label === "Blogs");
        if (blogsIndex !== -1 && iconRefs.current[blogsIndex]) {
            const el = iconRefs.current[blogsIndex];
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
            tl.to(el, { rotate: -10, scale: 1.1, duration: 0.2 })
                .to(el, { rotate: 10, scale: 1.1, duration: 0.2 })
                .to(el, { rotate: -10, scale: 1.1, duration: 0.2 })
                .to(el, { rotate: 10, scale: 1.1, duration: 0.2 })
                .to(el, { rotate: 0, scale: 1, duration: 0.2 });
        }
    }, { scope: navRef });

    const handleNavClick = (href: string, external?: boolean) => {
        if (!external) {
            setActiveTab(href);
            scrollTo(href);
        }
    };

    return (
        <div className="hidden md:flex items-center justify-center gap-4 px-4">
            {/* Main Navigation Dock */}
            <nav
                ref={navRef}
                className={cn(
                    "backdrop-blur-sm border border-border rounded-full flex items-center p-2 shadow-2xl space-x-1 h-[52px]",
                    isMagicActive ? "bg-black/20 border-white/20" : "bg-background/80"
                )}
            >
                {navItems.map((item, index) => {
                    const isActive = activeTab === item.href;
                    // Common content
                    const content = (
                        <>
                            <div
                                ref={el => iconRefs.current[index] = el}
                                className="transition-transform duration-200"
                            >
                                <item.icon
                                    size={22}
                                    strokeWidth={2}
                                    className="transition-colors duration-200"
                                />
                            </div>
                            <div
                                ref={el => labelRefs.current[index] = el}
                                className="overflow-hidden flex items-center w-0 opacity-0 ml-0" // Initial state for GSAP to pick up
                            >
                                <span className={cn(
                                    "font-medium text-xs whitespace-nowrap select-none transition-opacity duration-200 overflow-hidden text-ellipsis",
                                    isActive ? "text-primary" : "opacity-0"
                                )}>
                                    {item.label}
                                </span>
                            </div>
                        </>
                    );

                    const containerClasses = cn(
                        "flex items-center gap-0 px-3 py-2 rounded-full transition-colors duration-200 relative h-10 min-w-[44px] min-h-[40px] max-h-[44px] focus:outline-none",
                        isActive
                            ? "bg-primary/10 text-primary"
                            : "bg-transparent text-muted-foreground hover:bg-muted"
                    );

                    return item.external ? (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={containerClasses}
                        >
                            {content}
                        </Link>
                    ) : (
                        <button
                            key={item.href}
                            onClick={() => handleNavClick(item.href)}
                            className={containerClasses}
                            aria-label={item.label}
                        >
                            {content}
                        </button>
                    );
                })}
            </nav>

            <Playlist />
        </div>
    );
};

export default BottomNavbar;
