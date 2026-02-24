import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

/**
 * Apple-style scroll reveal wrapper.
 * Each section fades in + slides up smoothly as it enters the viewport.
 */
const SectionReveal = ({ children, delay = 0, className = "" }: SectionRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        gsap.fromTo(
            ref.current,
            {
                opacity: 0,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 85%",
                    end: "top 20%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, { scope: ref });

    return (
        <div ref={ref} className={`section-reveal ${className}`}>
            {children}
        </div>
    );
};

export default SectionReveal;
