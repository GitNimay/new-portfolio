
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    Home,
    Briefcase,
    FolderGit2,
    Cpu,
    GraduationCap,
    BookOpen,
    X,
    Sun,
    Moon,
    Award,
    Sparkles
} from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { useMagicBackground } from "@/context/MagicBackgroundContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navItems = [
    { label: "Home", href: "home", icon: Home },
    { label: "Experience", href: "experience", icon: Briefcase },
    { label: "Projects", href: "projects", icon: FolderGit2 },
    { label: "Skills", href: "skills", icon: Cpu },
    { label: "Volunteer", href: "volunteer-achievements", icon: Award },
    { label: "Education", href: "education", icon: GraduationCap },
    { label: "Blogs", href: "/blogs", icon: BookOpen, external: true }
];

interface MobileNavbarProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileNavbar = ({ isOpen, onClose }: MobileNavbarProps) => {
    const [activeTab, setActiveTab] = useState("home");
    // State to handle mounting/unmounting for animations
    const [shouldRender, setShouldRender] = useState(isOpen);

    const { scrollTo } = useSmoothScroll();
    const { theme, toggleTheme } = useTheme();
    const { isMagicActive, toggleMagic } = useMagicBackground();

    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);

    // Handle mounting/unmounting logic
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        }
    }, [isOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useGSAP(() => {
        if (!shouldRender) return;

        const tl = gsap.timeline({
            onReverseComplete: () => {
                setShouldRender(false);
            }
        });

        if (isOpen) {
            // Animate In
            tl.set(backdropRef.current, { opacity: 0 })
                .set(menuRef.current, { x: "100%" })
                .to(backdropRef.current, { opacity: 1, duration: 0.3 })
                .to(menuRef.current, { x: "0%", duration: 0.5, ease: "power3.out" }, "-=0.3");

            // Stagger items
            if (itemsRef.current) {
                tl.from(itemsRef.current.children, {
                    x: 50,
                    opacity: 0,
                    stagger: 0.05,
                    duration: 0.4,
                    ease: "back.out(1.2)"
                }, "-=0.2");
            }

        } else {
            // Animate Out manually
            // We need to create a new timeline or reverse the logic?
            // Actually, simply running a new animation is easier than reversing complex timelines sometimes.
            gsap.to(menuRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
            gsap.to(backdropRef.current, {
                opacity: 0,
                duration: 0.3,
                delay: 0.1,
                onComplete: () => setShouldRender(false)
            });
        }

    }, { dependencies: [isOpen, shouldRender], scope: containerRef });

    const handleNavClick = (href: string, external?: boolean) => {
        if (!external) {
            setActiveTab(href);
            scrollTo(href);
        }
        onClose();
    };

    if (!shouldRender) return null;

    return (
        <div ref={containerRef} className="relative z-50">
            {/* Backdrop */}
            <div
                ref={backdropRef}
                onClick={onClose}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Content */}
            <div
                ref={menuRef}
                className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-background border-l border-border shadow-2xl z-50 md:hidden flex flex-col p-6"
            >
                <div className="flex justify-between items-center mb-8">
                    <span className="text-lg font-bold">Menu</span>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div ref={itemsRef} className="flex flex-col gap-2">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.href;
                        const Icon = item.icon;

                        const content = (
                            <div className={cn(
                                "flex items-center gap-4 p-3 rounded-xl transition-all duration-200",
                                isActive ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
                            )}>
                                <div className={cn(
                                    "p-2 rounded-lg transition-colors",
                                    isActive ? "bg-primary/20" : "bg-muted"
                                )}>
                                    <Icon size={20} />
                                </div>
                                <span className="font-medium text-lg">
                                    {item.label}
                                </span>
                            </div>
                        );

                        return (
                            <div key={item.href}>
                                {item.external ? (
                                    <Link
                                        to={item.href}
                                        onClick={onClose}
                                        className="block"
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => handleNavClick(item.href)}
                                        className="w-full text-left"
                                    >
                                        {content}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 pt-8 border-t border-border space-y-4">
                    {/* Magic Background Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-muted-foreground">Magic Background</span>
                        <button
                            onClick={toggleMagic}
                            className={cn(
                                "p-2 rounded-full transition-all duration-300 border",
                                isMagicActive
                                    ? "bg-gradient-to-r from-orange-500/30 to-amber-500/30 border-orange-400/50 shadow-lg shadow-orange-500/25"
                                    : "hover:bg-muted border-border"
                            )}
                        >
                            <Sparkles className={cn(
                                "w-5 h-5 transition-colors duration-300",
                                isMagicActive ? "text-orange-400" : "text-amber-500"
                            )} />
                        </button>
                    </div>

                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-muted-foreground">Theme</span>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-muted transition-colors border border-border"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                        </button>
                    </div>
                </div>

                <div className="mt-auto">
                    <p className="text-sm text-center text-muted-foreground opacity-50">
                        © 2026 Nimesh Kulkarni
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MobileNavbar;
