import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useTheme } from "@/hooks/use-theme";
import BottomNavbar from "@/components/BottomNavbar";

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
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

                        {/* Theme Toggle */}
                        <div className="flex items-center gap-4 z-50 flex-shrink-0">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                                className="rounded-full hover:bg-primary/20 transition-colors bg-background/80 backdrop-blur-sm border border-border/50"
                            >
                                {currentTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;