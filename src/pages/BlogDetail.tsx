import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Calendar, Clock, ChevronRight, Hash, Bookmark } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useEffect, useState, useMemo } from "react";
import { useMagicBackground } from "@/context/MagicBackgroundContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SEO from "@/components/SEO";

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

  const tocItems = useMemo(() => {
    if (!post) return [];
    const sections = post.content.split(/\n##\s+/);
    return sections.slice(1).map(section => {
      const title = section.split('\n')[0].trim();
      return {
        id: title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
        text: title
      };
    });
  }, [post]);

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

  const renderContent = () => {
    const sections = post.content.split(/\n##\s+/);
    return sections.map((section, index) => {
      const [title, ...contentLines] = section.split('\n');
      const sectionContent = contentLines.join('\n').trim();
      const paragraphs = sectionContent.split('\n\n');
      const sectionId = index === 0 ? '' : title.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

      if (index === 0) {
        return (
          <div key={index} className="animate-fade-in">
            {paragraphs.map((para, pIndex) => (
              <p key={pIndex} className="text-lg md:text-xl leading-relaxed mb-6 text-foreground/90 font-medium">
                {para}
              </p>
            ))}
          </div>
        );
      }

      return (
        <section
          key={index}
          id={sectionId}
          className="mb-12 scroll-mt-24"
        >
          <div className="flex items-center gap-2 mb-6 group cursor-pointer">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {title.trim()}
            </h2>
          </div>
          
          <div className="space-y-6">
            {paragraphs.map((para, pIndex) => {
              const imgMatch = para.match(/!\[(.*?)\]\((.*?)\)/);
              if (imgMatch) {
                return (
                  <div key={pIndex} className="my-10 flex flex-col items-center group animate-fade-in">
                    <div className="max-w-sm w-full overflow-hidden rounded-xl shadow-sm border border-border/50 bg-muted/20">
                      <img
                        src={imgMatch[2]}
                        alt={imgMatch[1]}
                        className="w-full max-h-[400px] object-contain mx-auto"
                      />
                    </div>
                    {imgMatch[1] && (
                      <div className="mt-3 text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-60">
                        {imgMatch[1]}
                      </div>
                    )}
                  </div>
                );
              }

              if (para.startsWith('**') && para.endsWith('**')) {
                const cleanText = para.replace(/\*\*/g, '');
                return (
                  <h3 key={pIndex} className="text-xl font-bold mb-4 mt-8 text-foreground tracking-tight underline decoration-primary/20 underline-offset-4">
                    {cleanText}
                  </h3>
                );
              }

              return (
                <p key={pIndex} className="text-base md:text-lg leading-relaxed text-foreground/80 font-normal">
                  {para}
                </p>
              );
            })}
          </div>
        </section>
      );
    });
  };

  return (
    <div className={`min-h-screen ${isLoaded ? 'animate-fade-in' : ''} ${isMagicActive ? "bg-transparent" : "bg-background"}`}>
      <SEO 
        title={post.title}
        description={post.summary}
        ogImage={post.image}
        ogType="article"
      />
      {/* Navigation */}
      <header className={`border-b sticky top-0 z-50 transition-all duration-500 ${isMagicActive ? "bg-card/30 backdrop-blur-lg border-white/10" : "border-border bg-background/95 backdrop-blur-sm shadow-sm"}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <AnimatedLogo />
            </Link>
            <nav className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link to="/blogs">
                <Button variant="outline" size="sm" className="rounded-full font-bold h-8 text-xs border-primary/20 text-primary">
                  <ArrowLeft className="w-3 h-3 mr-2" />
                  BACK
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-10">
          
          {/* Article */}
          <article className="min-w-0">
            <div ref={headerRef} className={`mb-10 transition-all duration-1000 ${headerVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-2 mb-6">
                {post.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} className="bg-primary text-primary-foreground rounded-sm text-[10px] font-black uppercase tracking-tighter">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight text-foreground">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 py-4 border-y border-border text-xs text-muted-foreground mb-10">
                <div className="flex items-center gap-3 pr-6 border-r border-border">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground text-[10px]">
                    NK
                  </div>
                  <span className="text-foreground font-bold tracking-tight">Nimesh Kulkarni</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Featured Image - Shorter & Clean */}
              <div className="mb-10 rounded-xl overflow-hidden shadow-lg border border-border max-w-2xl mx-auto">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-[300px] md:h-[350px] object-cover" 
                />
              </div>
            </div>

            <div ref={contentRef} className={`prose prose-neutral dark:prose-invert max-w-none transition-all duration-1000 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
              {renderContent()}
            </div>

            <div ref={footerRef} className={`mt-16 pt-8 border-t border-border transition-all duration-1000 ${footerVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-secondary/20 border border-border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm font-bold text-foreground tracking-tight text-center md:text-left">Enjoyed the read? Explore more stories from my hackathon experiences.</p>
                <Link to="/blogs">
                  <Button size="sm" className="rounded-full font-bold shadow-md">
                    Explore Blogs
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </article>

          {/* TOC Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <div className="space-y-4">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary underline decoration-primary/50 underline-offset-4">
                  Navigation
                </div>
                <nav className="flex flex-col gap-4">
                  {tocItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      className="text-xs font-bold text-muted-foreground hover:text-primary transition-all flex items-center gap-2 group"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <Hash className="w-3 h-3 opacity-30 group-hover:opacity-100" />
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="py-10 px-6 border-t border-border mt-16 transition-colors duration-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-muted-foreground">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <AnimatedLogo />
          </Link>
          <p className="text-[10px] font-black uppercase tracking-widest text-center">© 2026 Nimesh Kulkarni</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/blogs" className="hover:text-primary transition-colors">Portfolio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetail;
