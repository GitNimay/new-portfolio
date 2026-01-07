
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
    X,
    Sun,
    Moon,
    Award
} from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

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
    const { scrollTo } = useSmoothScroll();
    const { theme, toggleTheme } = useTheme();

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

    const handleNavClick = (href: string, external?: boolean) => {
        if (!external) {
            setActiveTab(href);
            scrollTo(href);
        }
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                    />

                    {/* Menu Content */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
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

                        <div className="flex flex-col gap-2">
                            {navItems.map((item, index) => {
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
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 + 0.1 }}
                                    >
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
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
                            <span className="font-medium text-muted-foreground">Theme</span>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-muted transition-colors border border-border"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                            </button>
                        </div>

                        <div className="mt-auto">
                            <p className="text-sm text-center text-muted-foreground opacity-50">
                                © 2026 Nimesh Kulkarni
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileNavbar;
