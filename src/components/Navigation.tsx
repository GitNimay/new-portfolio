import { useState, useEffect } from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useTheme } from "@/hooks/use-theme";
import BottomNavbar from "@/components/BottomNavbar";
import MobileNavbar from "@/components/MobileNavbar";
import Playlist from "@/components/Playlist";

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme, resolvedTheme } = useTheme();

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
                        <div className="flex items-center gap-3 z-50 flex-shrink-0 mr-2 md:mr-0">
                            {/* Mobile Playlist Trigger (Visible only on mobile) */}
                            <div className="md:hidden">
                                <Playlist />
                            </div>

                            {/* Theme Toggle */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                                className="hidden md:flex rounded-full hover:bg-primary/20 transition-colors bg-background/80 backdrop-blur-sm border border-border/50"
                            >
                                {currentTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                            </Button>

                            {/* Mobile Hamburger Menu Trigger */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMenuOpen(true)}
                                aria-label="Open menu"
                                className="md:hidden rounded-full hover:bg-primary/20 transition-colors bg-background/80 backdrop-blur-sm border border-border/50"
                            >
                                <Menu className="w-5 h-5" />
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