import { Users, Award, Trophy, Sparkles, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useMagicBackground } from "@/context/MagicBackgroundContext";
import { MagicCard } from "@/components/ui/magic-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { Meteors } from "@/components/ui/meteors";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

const volunteerExperience = [
    {
        id: 1,
        organization: "Google Developer Group Nashik",
        role: "Volunteer",
        description: "Actively contributed to the local tech community, fostering engagement.",
        icon: Users,
        gradient: "from-blue-500/20 to-purple-500/20",
        iconColor: "text-blue-500",
        className: "col-span-1 md:col-span-1",
    },
    {
        id: 2,
        organization: "Google Gemini Student Ambassador",
        company: "Google India",
        role: "Student Ambassador",
        period: "November 2025 - Present",
        location: "Remote",
        description: "Leading generative AI adoption on campus. Hosted workshops, prompt battles, and built an AI community.",
        highlights: [
            "Selected for 6-month leadership program.",
            "Educated 150+ students on GenAI.",
            "Built a vibrant AI community.",
        ],
        icon: Sparkles,
        // gradient: "from-yellow-500/20 to-red-500/20",
        iconColor: "text-yellow-500",
        className: "col-span-1 md:col-span-2 row-span-2",
        featured: true,
    },
];

const achievements = [
    {
        id: 3,
        title: "Finalist in NEC 2025",
        organization: "IIT Bombay",
        description: "National Entrepreneurship Challenge finalist.",
        icon: Trophy,
        gradient: "from-amber-500/20 to-orange-500/20",
        iconColor: "text-amber-500",
        className: "col-span-1",
    },
    {
        id: 4,
        title: "Award from GeeksforGeeks",
        organization: "GeeksforGeeks",
        description: "Recognized for problem-solving in DSA.",
        icon: Award,
        gradient: "from-green-500/20 to-emerald-500/20",
        iconColor: "text-green-500",
        className: "col-span-1",
    },
];

const organizations = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" },
    { name: "Google Gemini", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
    { name: "GDG", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/GDG-program-logo.png" }, // Placeholder, verify link
    { name: "IIT Bombay", logo: "https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg" },
    { name: "GeeksforGeeks", logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg" },
];

const VolunteerAchievements = () => {
    const { ref, isVisible } = useScrollAnimation();
    const { isMagicActive } = useMagicBackground();

    return (
        <section id="volunteer-achievements" className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <BlurFade delay={0.2} inView>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            Volunteer & <span className="text-primary">Achievements</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Leading communities and achieving excellence in the tech ecosystem.
                        </p>
                    </div>
                </BlurFade>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">

                    {/* Google Gemini Ambassador - Featured */}
                    {volunteerExperience.filter(v => v.featured).map((item, idx) => (
                        <BlurFade key={item.id} delay={0.1} inView className="md:col-span-2 md:row-span-2 h-full">
                            <MagicCard
                                className={cn(
                                    "flex flex-col h-full bg-black/40 border-white/10 overflow-hidden group relative",
                                    item.className
                                )}
                                gradientColor={isMagicActive ? "#262626" : "#D9D9D955"}
                            >
                                <div className="absolute inset-0 pointer-events-none hidden md:block">
                                    <Meteors number={20} />
                                </div>
                                <BorderBeam size={250} duration={12} delay={9} />

                                <div className="p-5 md:p-8 relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-red-500/20 rounded-xl border border-white/10">
                                            <item.icon className={cn("w-8 h-8", item.iconColor)} />
                                        </div>
                                        <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                                            Featured Role
                                        </Badge>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">{item.role}</h3>
                                    <p className="text-lg text-primary font-medium mb-4">{item.company}</p>

                                    <p className="text-muted-foreground mb-6 text-base leading-relaxed flex-grow">
                                        {item.description}
                                    </p>

                                    <div className="space-y-3 mt-auto">
                                        {item.highlights && item.highlights.map((highlight, hIdx) => (
                                            <div key={hIdx} className="flex items-start gap-3 text-sm text-gray-300">
                                                <Sparkles className="w-4 h-4 text-yellow-500 mt-1 shrink-0" />
                                                <span>{highlight}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/5">
                                        <Badge variant="secondary" className="gap-1">
                                            <Calendar className="w-3 h-3" /> {item.period}
                                        </Badge>
                                        <Badge variant="secondary" className="gap-1">
                                            <MapPin className="w-3 h-3" /> {item.location}
                                        </Badge>
                                    </div>
                                </div>
                            </MagicCard>
                        </BlurFade>
                    ))}

                    {/* Other Volunteer & Achievements */}
                    <div className="md:col-span-1 flex flex-col gap-6">
                        {volunteerExperience.filter(v => !v.featured).concat(achievements as any).map((item: any, idx) => (
                            <BlurFade key={item.id} delay={0.2 + (idx * 0.1)} inView className="flex-1">
                                <MagicCard
                                    className="h-full bg-black/40 border-white/10"
                                    gradientColor={isMagicActive ? "#262626" : "#D9D9D955"}
                                >
                                    <div className="p-6 h-full flex flex-col justify-center">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`p-2.5 bg-gradient-to-br ${item.gradient || "from-gray-500/20 to-slate-500/20"} rounded-lg border border-white/10`}>
                                                <item.icon className={cn("w-5 h-5", item.iconColor)} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg leading-tight">{item.role || item.title}</h4>
                                                <p className="text-xs text-primary">{item.organization}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {item.description}
                                        </p>
                                    </div>
                                </MagicCard>
                            </BlurFade>
                        ))}
                    </div>
                </div>

                {/* Marquee Section */}
                <div className="mt-20">
                    <p className="text-center text-muted-foreground text-sm mb-6 uppercase tracking-widest">Recognized By</p>
                    <Marquee pauseOnHover className="[--duration:20s]">
                        {organizations.map((org, idx) => (
                            <div key={idx} className="mx-8 flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default">
                                {/* Use simple text if logos fail to load or are placeholders, but trying some reliable ones or just styled text */}
                                {/* For safety, using text with icons or just styled text if images are risky. Using text for now as placeholders might be broken. */}
                                <div className="text-xl font-bold text-white flex items-center gap-2">
                                    {/* <img src={org.logo} alt={org.name} className="h-6 w-auto" onError={(e) => e.currentTarget.style.display = 'none'} /> */}
                                    {/* Fallback to text + icon style */}
                                    <span className="text-2xl">✨</span>
                                    {org.name}
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </div>

            </div>
        </section>
    );
};

export default VolunteerAchievements;

