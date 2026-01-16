import { useState, useEffect } from "react";
import { Moon, Sun, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useTheme } from "@/hooks/use-theme";
import BottomNavbar from "@/components/BottomNavbar";
import MobileNavbar from "@/components/MobileNavbar";
import Playlist from "@/components/Playlist";
import { useMagicBackground } from "@/context/MagicBackgroundContext";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";


const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme, resolvedTheme } = useTheme();
    const { isMagicActive, toggleMagic } = useMagicBackground();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent hydration mismatch by using resolvedTheme only after mount if needed, 
    // but here we just want to avoid showing the wrong icon. 
    // resolvedTheme is undefined on server, so 'dark' fallback is okay for initial state if strictly needed,
    // but usually better to wait for mount to show toggle to avoid flicker.
    // For this specific snippets, let's keep it simple.
    const currentTheme = mounted ? resolvedTheme : "dark";

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-transparent pointer-events-none">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 pointer-events-auto">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex-shrink-0 z-50">
                            <AnimatedLogo />
                        </div>

                        {/* Center Navbar */}
                        <div className="flex-1 flex justify-center z-50">
                            <BottomNavbar />
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2 md:gap-3 z-50 flex-shrink-0 mr-1 md:mr-0">
                            {/* Mobile Playlist Trigger (Visible only on mobile) */}
                            <div className="md:hidden">
                                <Playlist />
                            </div>

                            {/* Mobile Magic Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMagic}
                                aria-label="Toggle magic background"
                                className={`md:hidden h-8 w-8 rounded-full transition-all duration-300 backdrop-blur-sm border ${isMagicActive
                                    ? 'bg-gradient-to-r from-orange-500/30 to-amber-500/30 border-orange-400/50 shadow-md shadow-orange-500/25'
                                    : 'bg-background/80 border-border/50 hover:bg-primary/20 animate-magic-sparkle'
                                    }`}
                            >
                                <Sparkles className={`w-4 h-4 transition-colors duration-300 ${isMagicActive ? 'text-orange-400' : 'text-amber-500 animate-magic-icon-spin'}`} />
                            </Button>

                            {/* Desktop Magic Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMagic}
                                aria-label="Toggle magic background"
                                className={`hidden md:flex rounded-full transition-all duration-300 backdrop-blur-sm border ${isMagicActive
                                    ? 'bg-gradient-to-r from-orange-500/30 to-amber-500/30 border-orange-400/50 shadow-lg shadow-orange-500/25 animate-pulse-glow'
                                    : 'bg-background/80 border-border/50 hover:bg-primary/20 animate-magic-sparkle'
                                    }`}
                            >
                                <Sparkles className={`w-5 h-5 transition-colors duration-300 ${isMagicActive ? 'text-orange-400' : 'text-amber-500 animate-magic-icon-spin'}`} />
                            </Button>

                            {/* Theme Toggle */}
                            {/* Theme Toggle - Animated */}
                            <AnimatedThemeToggler
                                className={cn(
                                    "hidden md:flex items-center justify-center rounded-full w-10 h-10 hover:bg-primary/20 transition-colors backdrop-blur-sm border border-border/50",
                                    isMagicActive ? "bg-black/20 border-white/20" : "bg-background/80"
                                )}
                            />

                            {/* Mobile Hamburger Menu Trigger */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMenuOpen(true)}
                                aria-label="Open menu"
                                className={cn(
                                    "md:hidden h-8 w-8 rounded-full hover:bg-primary/20 transition-colors backdrop-blur-sm border border-border/50",
                                    isMagicActive ? "bg-black/20 border-white/20" : "bg-background/80"
                                )}
                            >
                                <Menu className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
            <MobileNavbar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Navigation;