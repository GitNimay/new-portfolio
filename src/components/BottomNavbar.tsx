import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    Briefcase,
    FolderGit2,
    Cpu,
    GraduationCap,
    BookOpen,
    Music2,
    ChevronDown,
    Play,
    Pause
} from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useMusic } from "@/context/MusicContext";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Home", href: "home", icon: Home },
    { label: "Experience", href: "experience", icon: Briefcase },
    { label: "Projects", href: "projects", icon: FolderGit2 },
    { label: "Skills", href: "skills", icon: Cpu },
    { label: "Education", href: "education", icon: GraduationCap },
    { label: "Blogs", href: "/blogs", icon: BookOpen, external: true }
];

const MOBILE_LABEL_WIDTH = 90; // Adjusted for "Experience" length

const BottomNavbar = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
    const { scrollTo } = useSmoothScroll();
    const { isPlaying, togglePlay, songs, currentSongIndex, playSong } = useMusic();

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
        <div className="flex items-center justify-center gap-2 sm:gap-4 px-4">
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

            {/* Playlist Controls */}
            <div className="relative h-[52px] flex items-center">
                <AnimatePresence>
                    {isPlaylistOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute top-full mt-4 right-0 w-72 bg-background/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-4 overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                                <h3 className="text-sm font-semibold flex items-center gap-2">
                                    <Music2 className="w-4 h-4 text-primary" />
                                    Playlist
                                </h3>

                            </div>

                            <div className="space-y-1 max-h-56 overflow-y-auto pr-1 scrollbar-hide">
                                {songs.map((song, index) => (
                                    <button
                                        key={index}
                                        onClick={() => playSong(index)}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-200",
                                            currentSongIndex === index
                                                ? "bg-primary/20 text-primary shadow-sm"
                                                : "hover:bg-muted/50 text-muted-foreground"
                                        )}
                                    >
                                        <div className={cn(
                                            "relative w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden transition-colors",
                                            currentSongIndex === index ? "bg-background/50" : "bg-muted"
                                        )}>
                                            {currentSongIndex === index && isPlaying ? (
                                                <div className="flex items-end gap-0.5 h-4 pb-1">
                                                    {[...Array(4)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="w-1 bg-primary rounded-full"
                                                            animate={{ height: [4, 16, 4] }}
                                                            transition={{
                                                                duration: 0.6,
                                                                repeat: Infinity,
                                                                repeatType: "reverse",
                                                                delay: i * 0.15 + Math.random() * 0.2
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <Music2 className="w-5 h-5 opacity-50" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold truncate">{song.title}</p>
                                            <p className="text-xs opacity-70 truncate">{song.artist}</p>
                                        </div>
                                        {currentSongIndex === index && (
                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 26, delay: 0.1 }}
                    className={cn(
                        "h-full flex items-center gap-1 pl-2 pr-4 rounded-full bg-background/80 backdrop-blur-xl border border-border shadow-2xl transition-all duration-300 hover:brightness-110",
                        isPlaylistOpen ? "bg-primary text-primary-foreground border-primary" : "hover:bg-background/90"
                    )}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            togglePlay();
                        }}
                        className={cn(
                            "p-2 rounded-full hover:bg-black/10 transition-colors",
                            isPlaylistOpen ? "hover:bg-white/20" : "hover:bg-primary/10"
                        )}
                    >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>

                    <button
                        onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
                        className="flex items-center gap-2 h-full pl-1"
                    >
                        <div className="flex flex-col items-start leading-none min-w-[60px] max-w-[100px] hidden sm:flex">
                            <span className="text-xs font-bold truncate w-full text-left">
                                {songs[currentSongIndex]?.title || "Select Song"}
                            </span>
                        </div>
                        <ChevronDown className={cn("w-4 h-4 transition-transform duration-300 opacity-70", isPlaylistOpen && "rotate-180")} />
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default BottomNavbar;
