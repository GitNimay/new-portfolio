import { Users, Award, Trophy, Sparkles, Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useMagicBackground } from "@/context/MagicBackgroundContext";

const volunteerExperience = [
    {
        id: 1,
        organization: "Google Developer Group Nashik",
        role: "Volunteer",
        description: "Actively contributed to the local tech community, fostering engagement and knowledge sharing.",
        icon: Users,
        gradient: "from-blue-500/20 to-purple-500/20",
        iconColor: "text-blue-500",
    },
    {
        id: 2,
        organization: "Google Gemini Student Ambassador",
        company: "Google India",
        role: "Student Ambassador",
        period: "November 2025 - Present",
        location: "Remote",
        description: "As a Google Gemini Student Ambassador, I was selected by Google to lead the adoption of generative AI on my campus. In this 6-month leadership program, I hosted workshops, ran hands-on tech events, and built a community of AI enthusiasts, acting as the primary liaison between the student body and the Google Gemini team.",
        highlights: [
            "Selected for a 6-month leadership program to represent Google and drive the adoption of Gemini AI on campus.",
            "Organized and hosted technical workshops, hands-on \"prompt battles,\" and seminars to educate over 150 students on generative AI applications.",
            "Built and managed a vibrant campus community for AI enthusiasts, fostering peer-to-peer learning and collaboration.",
            "Served as the direct point of contact for student feedback, reporting insights on AI use-cases and challenges to the Google team."
        ],
        icon: Sparkles,
        gradient: "from-yellow-500/20 to-red-500/20",
        iconColor: "text-yellow-500",
    },
];

const achievements = [
    {
        id: 1,
        title: "Finalist in NEC 2025",
        organization: "IIT Bombay",
        description: "Represented the IEDC Cell as a finalist in the National Entrepreneurship Challenge NEC 2025, organized by IIT Bombay.",
        icon: Trophy,
        gradient: "from-amber-500/20 to-orange-500/20",
        iconColor: "text-amber-500",
    },
    {
        id: 2,
        title: "Award from GeeksforGeeks",
        organization: "GeeksforGeeks",
        description: "Enhanced problem-solving abilities in algorithms and data structures, recognized with an award from GeeksforGeeks.",
        icon: Award,
        gradient: "from-green-500/20 to-emerald-500/20",
        iconColor: "text-green-500",
    },
];

const VolunteerAchievements = () => {
    const { ref, isVisible } = useScrollAnimation();
    const { isMagicActive } = useMagicBackground();

    return (
        <section id="volunteer-achievements" className="py-16 md:py-24 px-4 md:px-6">
            <div className={`max-w-6xl mx-auto transition-all duration-500 ${isMagicActive ? "bg-card/30 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl" : ""}`}>
                <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Volunteer & Achievements</h2>

                <div ref={ref} className="space-y-12">
                    {/* Volunteer Experience */}
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                            <Users className="w-7 h-7 text-primary" />
                            Volunteer Experience
                        </h3>
                        <div className="space-y-6">
                            {volunteerExperience.map((experience, index) => (
                                <Card
                                    key={experience.id}
                                    className={`p-6 border-border hover:border-primary/50 transition-all duration-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} ${isMagicActive ? "bg-white/5 backdrop-blur-md border-white/10" : "bg-card"}`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 bg-gradient-to-br ${experience.gradient} rounded-lg border border-border/50`}>
                                            <experience.icon className={`w-6 h-6 ${experience.iconColor}`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                                                <h4 className="text-xl md:text-2xl font-bold">{experience.organization}</h4>
                                                {experience.period && (
                                                    <Badge variant="secondary" className="w-fit text-xs">
                                                        <Calendar className="w-3 h-3 mr-1" />
                                                        {experience.period}
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-sm mb-3">
                                                <span className="text-primary font-semibold">{experience.role}</span>
                                                {experience.company && (
                                                    <>
                                                        <span className="text-muted-foreground">•</span>
                                                        <span className="text-muted-foreground">{experience.company}</span>
                                                    </>
                                                )}
                                                {experience.location && (
                                                    <>
                                                        <span className="text-muted-foreground">•</span>
                                                        <span className="text-muted-foreground flex items-center gap-1">
                                                            <MapPin className="w-3 h-3" />
                                                            {experience.location}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <p className="text-muted-foreground mb-4">{experience.description}</p>
                                            {experience.highlights && (
                                                <ul className="space-y-2">
                                                    {experience.highlights.map((highlight, idx) => (
                                                        <li key={idx} className="text-muted-foreground flex items-start">
                                                            <span className="text-primary mr-2">•</span>
                                                            <span>{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                            <Trophy className="w-7 h-7 text-primary" />
                            Achievements
                        </h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            {achievements.map((achievement, index) => (
                                <Card
                                    key={achievement.id}
                                    className={`p-6 border-border hover:border-primary/50 transition-all duration-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${isMagicActive ? "bg-white/5 backdrop-blur-md border-white/10" : "bg-card"}`}
                                    style={{ transitionDelay: `${(volunteerExperience.length + index) * 150}ms` }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 bg-gradient-to-br ${achievement.gradient} rounded-lg border border-border/50`}>
                                            <achievement.icon className={`w-6 h-6 ${achievement.iconColor}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xl font-bold mb-2">{achievement.title}</h4>
                                            <Badge variant="secondary" className="mb-3 text-xs">
                                                {achievement.organization}
                                            </Badge>
                                            <p className="text-muted-foreground">{achievement.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VolunteerAchievements;
