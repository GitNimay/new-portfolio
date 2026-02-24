import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Star, GitFork, Users, BookOpen, ExternalLink, RefreshCw, Calendar } from "lucide-react";
import { useMagicBackground } from "@/context/MagicBackgroundContext";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

interface GitHubRepo {
    stargazers_count: number;
    forks_count: number;
}

interface ContributionDay {
    contributionCount: number;
    date: string;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

interface ContributionData {
    totalContributions: number;
    weeks: ContributionWeek[];
}

// Comprehensive GraphQL data structure
interface GitHubComprehensiveData {
    user: {
        login: string;
        name: string;
        avatarUrl: string;
        bio: string;
        url: string;
        repositories: {
            totalCount: number;
        };
        followers: {
            totalCount: number;
        };
        following: {
            totalCount: number;
        };
        contributionsCollection: {
            contributionCalendar: ContributionData;
            totalCommitContributions: number;
            totalPullRequestContributions: number;
            totalIssueContributions: number;
            totalRepositoryContributions: number;
        };
        pullRequests: {
            totalCount: number;
        };
        starredRepositories: {
            totalCount: number;
        };
    };
}

const GitHubStats = () => {
    const { isMagicActive } = useMagicBackground();
    const username = "GitNimay";
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    // Generate last 5 years
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    // GitHub API authentication headers
    const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
    const headers = githubToken
        ? {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
        }
        : {
            'Accept': 'application/vnd.github.v3+json'
        };

    // Comprehensive GraphQL query to fetch ALL data at once
    const { data: githubData, isLoading, error, refetch } = useQuery<GitHubComprehensiveData>({
        queryKey: ["githubComprehensive", username, selectedYear],
        queryFn: async () => {
            const fromDate = `${selectedYear}-01-01T00:00:00Z`;
            const toDate = `${selectedYear}-12-31T23:59:59Z`;

            const query = `
                query($userName:String!, $from:DateTime!, $to:DateTime!) {
                    user(login: $userName) {
                        login
                        name
                        avatarUrl(size: 200)
                        bio
                        url
                        repositories(first: 1) {
                            totalCount
                        }
                        followers {
                            totalCount
                        }
                        following {
                            totalCount
                        }
                        contributionsCollection(from: $from, to: $to) {
                            contributionCalendar {
                                totalContributions
                                weeks {
                                    contributionDays {
                                        contributionCount
                                        date
                                    }
                                }
                            }
                            totalCommitContributions
                            totalPullRequestContributions
                            totalIssueContributions
                            totalRepositoryContributions
                        }
                        pullRequests(first: 1) {
                            totalCount
                        }
                        starredRepositories(first: 1) {
                            totalCount
                        }
                    }
                }
            `;

            const res = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${githubToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        userName: username,
                        from: fromDate,
                        to: toDate,
                    },
                }),
            });

            if (!res.ok) throw new Error("Failed to fetch GitHub data");
            const data = await res.json();

            if (data.errors) {
                console.error('❌ GraphQL Errors:', data.errors);
                throw new Error(data.errors[0]?.message || "GraphQL query failed");
            }

            return data.data;
        },
        staleTime: 0,
        gcTime: 0,
        refetchInterval: 60000,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        enabled: !!githubToken,
    });

    // Fetch total stars by aggregating all repositories (GraphQL doesn't provide this directly)
    const { data: starsData, isLoading: starsLoading } = useQuery({
        queryKey: ["githubStars", username],
        queryFn: async () => {
            let allRepos: GitHubRepo[] = [];
            let page = 1;
            let hasMore = true;

            while (hasMore) {
                const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`, { headers });
                if (!res.ok) throw new Error("Failed to fetch repos");
                const repos: GitHubRepo[] = await res.json();
                allRepos = [...allRepos, ...repos];

                if (repos.length < 100) {
                    hasMore = false;
                } else {
                    page++;
                }
            }

            const stars = allRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

            return { stars };
        },
        staleTime: 0,
        gcTime: 0,
        refetchInterval: 60000,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    if (error) {
        console.error('❌ Failed to load GitHub data:', error);
        return null;
    }

    const totalLoading = isLoading || starsLoading;

    // Extract data from the comprehensive query
    const user = githubData?.user;
    const contributions = user?.contributionsCollection.contributionCalendar;

    const stats = [
        { label: "Public Repos", value: user?.repositories.totalCount || 0, icon: BookOpen, delay: 0.1 },
        { label: "Total Stars", value: starsData?.stars || 0, icon: Star, delay: 0.2 },
        { label: "Followers", value: user?.followers.totalCount || 0, icon: Users, delay: 0.3 },
        { label: "Total Forks", value: "50+", icon: GitFork, delay: 0.4 },
    ];

    return (
        <section id="github-stats" className={`py-16 md:py-24 px-4 md:px-6 relative overflow-hidden max-w-full ${isMagicActive ? "" : "bg-card/30"}`}>
            {/* Background override for "Magic Mode" is handled by the context/standard layout, 
                 but we ensure we aren't forcing the github dark mode anymore */}

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">
                            Open Source <span className="text-primary">Activity</span>
                        </h2>
                        <p className="text-muted-foreground text-sm md:text-base max-w-lg">
                            My continuous contributions to the developer ecosystem.
                        </p>
                    </div>
                    <div className="flex gap-3 items-center">
                        {/* Profile Picture */}
                        {user?.avatarUrl && (
                            <motion.a
                                href={user.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className={cn(
                                    "relative rounded-full ring-2 transition-all hover:scale-105 active:scale-95",
                                    isMagicActive
                                        ? "ring-primary/50 hover:ring-primary"
                                        : "ring-primary/30 hover:ring-primary/60"
                                )}
                            >
                                <img
                                    src={user.avatarUrl}
                                    alt={user.name || user.login}
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                                />
                                {totalLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
                                        <RefreshCw className="w-3 h-3 text-primary animate-spin" />
                                    </div>
                                )}
                            </motion.a>
                        )}
                        {/* GitHub Profile Button */}
                        <Button
                            variant="outline"
                            className={cn(
                                "hidden md:flex gap-2 transition-all shadow-md group border-primary/20",
                                isMagicActive
                                    ? "bg-black/40 text-primary hover:bg-primary/20 hover:border-primary"
                                    : "hover:bg-primary/10 hover:text-primary hover:border-primary"
                            )}
                            asChild
                        >
                            <a href={user?.url || `https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" />
                                <span>Visit GitHub</span>
                                <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: stat.delay, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className={cn(
                                "p-3 md:p-6 flex flex-col items-center justify-center text-center gap-2 border transition-all duration-300 group touch-manipulation",
                                // Golden & Black Theme: Dark cards, Gold accents
                                isMagicActive
                                    ? "bg-black/40 backdrop-blur-md border-white/10 hover:border-primary/50 hover:bg-black/60"
                                    : "bg-card hover:border-primary/50 shadow-sm hover:shadow-md"
                            )}>
                                <div className={cn(
                                    "p-2 md:p-3 rounded-full mb-1 transition-colors",
                                    isMagicActive ? "bg-primary/10 group-hover:bg-primary/20" : "bg-primary/10 group-hover:bg-primary/20"
                                )}>
                                    <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                </div>
                                {totalLoading ? (
                                    <RefreshCw className="w-5 h-5 md:w-6 md:h-6 animate-spin text-muted-foreground" />
                                ) : (
                                    <span className="text-2xl md:text-3xl font-bold">{stat.value}</span>
                                )}
                                <span className="text-xs md:text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">{stat.label}</span>
                            </Card>
                        </motion.div>
                    ))}
                </div>


                {/* Graph Section with Year Selector */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Graph Container */}
                    <motion.div
                        className="lg:col-span-10 order-2 lg:order-1"
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Card className={cn(
                            "p-2 md:p-6 overflow-hidden border transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] md:min-h-[300px]",
                            isMagicActive
                                ? "bg-black/40 backdrop-blur-md border-white/10"
                                : "bg-card"
                        )}>
                            {totalLoading ? (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    <span>Loading contributions...</span>
                                </div>
                            ) : contributions ? (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedYear}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full"
                                    >
                                        {/* Contribution Calendar */}
                                        <div className="mb-4 text-center">
                                            <div className="text-sm text-muted-foreground mb-2">
                                                {contributions.totalContributions} contributions in {selectedYear}
                                            </div>
                                        </div>
                                        <div className="w-full overflow-x-auto scrollbar-hide -mx-2 px-2">
                                            <div className="inline-flex flex-col gap-1 min-w-max">
                                                {/* Days of week labels */}
                                                <div className="flex gap-1">
                                                    <div className="w-8"></div>
                                                    {contributions.weeks.map((week, weekIdx) => (
                                                        <div key={weekIdx} className="flex flex-col gap-1">
                                                            {week.contributionDays.slice(0, 1).map((day) => (
                                                                <div key={day.date} className="text-[10px] text-muted-foreground text-center w-3">
                                                                    {weekIdx % 4 === 0 ? new Date(day.date).toLocaleDateString('en-US', { month: 'short' }) : ''}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* Contribution grid */}
                                                {[0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => (
                                                    <div key={dayOfWeek} className="flex gap-1 items-center">
                                                        <div className="text-[10px] text-muted-foreground w-8 text-right pr-1">
                                                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek]}
                                                        </div>
                                                        {contributions.weeks.map((week, weekIdx) => {
                                                            const day = week.contributionDays[dayOfWeek];
                                                            if (!day) return <div key={weekIdx} className="w-3 h-3"></div>;

                                                            const count = day.contributionCount;
                                                            const level = count === 0 ? 0 : count < 5 ? 1 : count < 10 ? 2 : count < 15 ? 3 : 4;
                                                            const colors = [
                                                                isMagicActive ? "bg-white/5 border border-white/10" : "bg-muted border border-border",
                                                                "bg-[#eab308]/20",
                                                                "bg-[#eab308]/40",
                                                                "bg-[#eab308]/70",
                                                                "bg-[#eab308]"
                                                            ];

                                                            return (
                                                                <div
                                                                    key={weekIdx}
                                                                    className={cn(
                                                                        "w-3 h-3 rounded-[2px] transition-all hover:ring-2 hover:ring-primary/50 cursor-pointer group relative",
                                                                        colors[level]
                                                                    )}
                                                                    title={`${count} contributions on ${new Date(day.date).toLocaleDateString()}`}
                                                                >
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            ) : (
                                <div className="text-muted-foreground text-sm">
                                    No contribution data available
                                </div>
                            )}
                            <div className="mt-4 w-full flex justify-between items-center text-xs text-muted-foreground px-2 md:px-4">
                                <a href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-statistics/viewing-contributions-on-your-profile" target="_blank" rel="noreferrer" className="hover:text-primary">
                                    Learn how we count contributions
                                </a>
                                <div className="flex items-center gap-1">
                                    <span>Less</span>
                                    <div className="flex gap-1">
                                        {/* Custom Legend to match Gold Theme */}
                                        <div className={cn("w-2.5 h-2.5 rounded-[2px]", isMagicActive ? "bg-white/5 border border-white/10" : "bg-muted border border-border")}></div>
                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#eab308]/20"></div>
                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#eab308]/40"></div>
                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#eab308]/70"></div>
                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#eab308]"></div>
                                    </div>
                                    <span>More</span>
                                </div>
                            </div>
                        </Card>

                    </motion.div>

                    {/* Year Selector */}
                    <div className="lg:col-span-2 order-1 lg:order-2 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                        {years.map((year) => (
                            <Button
                                key={year}
                                variant={selectedYear === year ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setSelectedYear(year)}
                                className={cn(
                                    "rounded-md text-sm font-medium transition-all w-full justify-center lg:justify-start touch-manipulation min-w-[60px]",
                                    selectedYear === year
                                        ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                                )}
                            >
                                {year}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GitHubStats;
