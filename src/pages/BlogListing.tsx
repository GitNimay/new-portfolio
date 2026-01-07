import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Clock, Search, Filter, Sparkles } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useMagicBackground } from "@/context/MagicBackgroundContext";

const BlogListing = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const { isMagicActive } = useMagicBackground();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");

  // Extract unique tags for categories
  const categories = useMemo(() => {
    const allTags = blogPosts.flatMap(post => post.tags);
    const uniqueTags = Array.from(new Set(allTags));
    return ["All Articles", ...uniqueTags].slice(0, 6); // Limit to 6 categories for UI balance
  }, []);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All Articles" || post.tags.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isMagicActive ? "bg-transparent" : "bg-background"}`}>
      {/* Navigation Bar */}
      <header className={`border-b sticky top-0 z-50 transition-all duration-500 ${isMagicActive ? "bg-card/30 backdrop-blur-lg border-white/10" : "border-border bg-background/95 backdrop-blur-sm"}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <AnimatedLogo />
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105">
                  <ArrowRight className="w-4 h-4 rotate-180 mr-2" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className={`max-w-6xl mx-auto px-4 md:px-6 py-12 transition-all duration-500`}>

        {/* Dynamic Background Wrapper for Magic Mode */}
        {isMagicActive && (
          <div className="fixed inset-0 pointer-events-none z-[-1]" />
        )}

        {/* Hero Section */}
        <div
          ref={headerRef}
          className={`flex flex-col items-center text-center mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <Badge variant="outline" className={`mb-6 px-4 py-1.5 rounded-full text-sm font-medium border-2 ${isMagicActive ? "border-white/20 bg-white/5 text-white" : "bg-secondary/50"}`}>
            <Sparkles className="w-3 h-3 mr-2 inline-block" />
            Blog
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Insight and <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Updates</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A collection of hand-picked articles for developers, by developers. Deep dives,
            insights, and honest advice to navigate the modern tech landscape.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className={`pl-10 ${isMagicActive ? "bg-white/5 border-white/10 text-white placeholder:text-white/50 focus-visible:ring-white/20" : ""}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full transition-all duration-300 ${isMagicActive && selectedCategory !== category ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : ""}`}
                >
                  {category === "All Articles" ? <Filter className="w-3 h-3 mr-2" /> : null}
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div
          ref={gridRef}
          className={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-1000 delay-200 ${gridVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={`/blogs/${post.slug}`} className="block h-full group">
                  <Card className={`h-full flex flex-col overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isMagicActive ? "bg-white/5 backdrop-blur-md border border-white/10 shadow-none ring-1 ring-white/10" : "bg-card border border-border"}`}>

                    {/* Card Image Area */}
                    <div className="aspect-[16/10] overflow-hidden relative bg-muted">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${index % 2 === 0 ? 'from-indigo-500/20 via-purple-500/20 to-pink-500/20' : 'from-blue-500/20 via-teal-500/20 to-emerald-500/20'}`}>
                          <Sparkles className="w-12 h-12 text-muted-foreground/20" />
                        </div>
                      )}

                      {/* Floating Badges */}
                      <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-0 text-xs font-semibold shadow-sm">
                          {post.tags[0]}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="flex-grow space-y-3 p-6">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded-md">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded-md">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <CardTitle className="text-xl md:text-2xl leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </CardTitle>

                      <CardDescription className="text-sm line-clamp-3 leading-relaxed">
                        {post.summary}
                      </CardDescription>
                    </CardHeader>

                    <CardFooter className="p-6 pt-0 mt-auto">
                      <span className="text-sm font-semibold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <div className="bg-secondary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any articles matching "{searchQuery}" or the selected category.
              </p>
              <Button
                variant="link"
                onClick={() => { setSearchQuery(""); setSelectedCategory("All Articles"); }}
                className="mt-4 text-primary"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-8 px-6 border-t mt-12 transition-colors duration-500 ${isMagicActive ? "border-white/10 bg-black/20 backdrop-blur-md" : "border-border bg-background"}`}>
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>© 2026 Nimesh Kulkarni. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogListing;
