import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts, blogDiagrams } from "@/data/blogPosts";
import AnimatedLogo from "@/components/AnimatedLogo";
import { ReactFlow, Background, Controls, Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useEffect, useState } from "react";
import { useMagicBackground } from "@/context/MagicBackgroundContext";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isMagicActive } = useMagicBackground();

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation();

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link to="/blogs">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const diagram = slug ? blogDiagrams[slug] : undefined;

  const renderContent = () => {
    const sections = post.content.split(/\n##\s+/);
    return sections.map((section, index) => {
      const [title, ...content] = section.split('\n');
      const sectionContent = content.join('\n').trim();
      const paragraphs = sectionContent.split('\n\n');

      if (index === 0) {
        return (
          <div key={index} className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {paragraphs.map((para, pIndex) => (
              <p key={pIndex} className="text-lg leading-relaxed mb-6 text-muted-foreground hover:text-foreground transition-colors duration-300">
                {para}
              </p>
            ))}
            {diagram && (
              <Card className={`my-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 ${isMagicActive ? "bg-white/5 backdrop-blur-md border-white/10" : "border-border bg-card"}`}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Architecture Diagram
                  </h3>
                  <div style={{ width: '100%', height: '500px' }}>
                    <ReactFlow
                      nodes={diagram.nodes as Node[]}
                      edges={diagram.edges as Edge[]}
                      fitView
                    >
                      <Background />
                      <Controls />
                    </ReactFlow>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );
      }

      return (
        <section
          key={index}
          className={`mb-10 transition-all duration-1000 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {title.trim()}
          </h2>
          {paragraphs.map((para, pIndex) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              const cleanText = para.replace(/\*\*/g, '');
              return (
                <h3 key={pIndex} className="text-xl font-semibold mb-3 mt-6 text-foreground">
                  {cleanText}
                </h3>
              );
            }
            return (
              <p key={pIndex} className="text-lg leading-relaxed mb-6 text-muted-foreground hover:text-foreground transition-colors duration-300">
                {para}
              </p>
            );
          })}
        </section>
      );
    });
  };

  return (
    <div className={`min-h-screen ${isLoaded ? 'animate-fade-in' : ''} ${isMagicActive ? "bg-transparent" : "bg-background"}`}>
      <header className={`border-b sticky top-0 z-50 transition-all duration-500 ${isMagicActive ? "bg-card/30 backdrop-blur-lg border-white/10" : "border-border bg-background/95 backdrop-blur-sm"}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <AnimatedLogo />
            </Link>
            <div className="flex items-center gap-2">
              <Link to="/blogs">
                <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Blogs
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105">
                  Home
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <article className={`max-w-4xl mx-auto px-4 md:px-6 py-12 overflow-visible transition-all duration-500 ${isMagicActive ? "bg-card/30 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl my-8" : ""}`}>
        <div
          ref={headerRef}
          className={`mb-8 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <Link to="/blogs" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6 hover:translate-x-[-5px] transform transition-transform duration-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all posts
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-gradient bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <Badge
                key={tag}
                variant="secondary"
                className="hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div ref={contentRef} className="prose prose-lg dark:prose-invert max-w-none overflow-visible">
          {renderContent()}
        </div>

        <div
          ref={footerRef}
          className={`mt-16 pt-8 border-t border-border transition-all duration-1000 ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <Link to="/blogs">
            <Button
              variant="outline"
              size="lg"
              className="group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Read More Posts
            </Button>
          </Link>
        </div>
      </article>

      <footer className="py-8 px-6 border-t border-border mt-12">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>© 2026 Nimesh Kulkarni. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetail;
