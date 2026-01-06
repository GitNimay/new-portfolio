import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Home,
    Briefcase,
    FolderGit2,
    Cpu,
    GraduationCap,
    BookOpen,
} from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { cn } from "@/lib/utils";
import Playlist from "./Playlist";

const navItems = [
    { label: "Home", href: "home", icon: Home },
    { label: "Experience", href: "experience", icon: Briefcase },
    { label: "Projects", href: "projects", icon: FolderGit2 },
    { label: "Skills", href: "skills", icon: Cpu },
    { label: "Education", href: "education", icon: GraduationCap },
    { label: "Blogs", href: "/blogs", icon: BookOpen, external: true }
];

const MOBILE_LABEL_WIDTH = 90;

const BottomNavbar = () => {
    const [activeTab, setActiveTab] = useState("home");
    const { scrollTo } = useSmoothScroll();

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

    const handleNavClick = (href: string, external?: boolean) => {
        if (!external) {
            setActiveTab(href);
            scrollTo(href);
        }
    };

    return (
        <div className="hidden md:flex items-center justify-center gap-4 px-4">
            {/* Main Navigation Dock */}
            <motion.nav
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center p-2 shadow-2xl space-x-1 h-[52px]"
            >
                {navItems.map((item) => {
                    const isActive = activeTab === item.href;
                    // Common content for both Link and Button
                    const content = (
                        <>
                            <motion.div
                                animate={item.label === "Blogs" ? {
                                    rotate: [0, -10, 10, -10, 10, 0],
                                    scale: [1, 1.1, 1.1, 1.1, 1.1, 1],
                                    filter: [
                                        "drop-shadow(0 0 0px rgba(255, 215, 0, 0))",
                                        "drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))",
                                        "drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))",
                                        "drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))",
                                        "drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))",
                                        "drop-shadow(0 0 0px rgba(255, 215, 0, 0))"
                                    ]
                                } : {}}
                                transition={item.label === "Blogs" ? {
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 3,
                                    ease: "easeInOut"
                                } : {}}
                            >
                                <item.icon
                                    size={22}
                                    strokeWidth={2}
                                    className="transition-colors duration-200"
                                />
                            </motion.div>
                            <motion.div
                                initial={false}
                                animate={{
                                    width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
                                    opacity: isActive ? 1 : 0,
                                    marginLeft: isActive ? "8px" : "0px",
                                }}
                                transition={{
                                    width: { type: "spring", stiffness: 350, damping: 32 },
                                    opacity: { duration: 0.19 },
                                    marginLeft: { duration: 0.19 },
                                }}
                                className="overflow-hidden flex items-center"
                            >
                                <span className={cn(
                                    "font-medium text-xs whitespace-nowrap select-none transition-opacity duration-200 overflow-hidden text-ellipsis",
                                    isActive ? "text-primary" : "opacity-0"
                                )}>
                                    {item.label}
                                </span>
                            </motion.div>
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
            </motion.nav>

            <Playlist />
        </div>
    );
};

export default BottomNavbar;
