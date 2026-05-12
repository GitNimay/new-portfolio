import { cn } from "@/lib/utils";

interface LazyLoadingFallbackProps {
  minHeight?: number | string;
  className?: string;
  compact?: boolean;
}

const LazyLoadingFallback = ({
  minHeight = "100vh",
  className,
  compact = false,
}: LazyLoadingFallbackProps) => (
  <div
    className={cn(
      "flex items-center justify-center overflow-hidden bg-background text-foreground",
      compact ? "px-4 py-16 md:py-24" : "min-h-screen px-6",
      className
    )}
    style={{ minHeight }}
    aria-label="Loading content"
    role="status"
  >
    <div className="relative flex h-24 w-24 items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-primary/20" />
      <div className="absolute inset-2 rounded-full border border-primary/15" />
      <div className="absolute h-full w-full rounded-full border-2 border-transparent border-t-primary animate-spin" />
      <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_32px_hsl(var(--primary)/0.8)]" />
    </div>
  </div>
);

export default LazyLoadingFallback;
