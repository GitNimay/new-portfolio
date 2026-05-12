import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
  rootMargin?: string;
  minHeight?: number | string;
}

const LazySection = ({
  children,
  fallback,
  className = "",
  rootMargin = "450px 0px",
  minHeight,
}: LazySectionProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || shouldRender) return;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={sectionRef} className={className} style={{ minHeight }}>
      {shouldRender ? children : fallback}
    </div>
  );
};

export default LazySection;
