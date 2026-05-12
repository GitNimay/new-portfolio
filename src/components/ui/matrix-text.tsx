import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface LetterState {
    char: string;
    isMatrix: boolean;
    isSpace: boolean;
}

interface MatrixTextProps {
    text?: string;
    className?: string;
    initialDelay?: number;
    letterAnimationDuration?: number;
    letterInterval?: number;
    triggerInterval?: number;
}

export const MatrixText = ({
    text = "HelloWorld!",
    className,
    initialDelay = 200,
    letterAnimationDuration = 500,
    letterInterval = 100,
    triggerInterval = 5000,
}: MatrixTextProps) => {
    const [letters, setLetters] = useState<LetterState[]>(() =>
        text.split("").map((char) => ({
            char,
            isMatrix: false,
            isSpace: char === " ",
        }))
    );
    const isAnimatingRef = useRef(false);
    const reducedMotion = useReducedMotion();

    const getRandomChar = useCallback(
        () => (Math.random() > 0.5 ? "1" : "0"),
        []
    );

    const animateLetter = useCallback(
        (index: number) => {
            if (index >= text.length) return;

            requestAnimationFrame(() => {
                setLetters((prev) => {
                    const newLetters = [...prev];
                    if (!newLetters[index].isSpace) {
                        newLetters[index] = {
                            ...newLetters[index],
                            char: getRandomChar(),
                            isMatrix: true,
                        };
                    }
                    return newLetters;
                });

                setTimeout(() => {
                    setLetters((prev) => {
                        const newLetters = [...prev];
                        newLetters[index] = {
                            ...newLetters[index],
                            char: text[index],
                            isMatrix: false,
                        };
                        return newLetters;
                    });
                }, letterAnimationDuration);
            });
        },
        [getRandomChar, text, letterAnimationDuration]
    );

    const startAnimation = useCallback(() => {
        if (isAnimatingRef.current) return;

        isAnimatingRef.current = true;
        let currentIndex = 0;

        const animate = () => {
            if (currentIndex >= text.length) {
                isAnimatingRef.current = false;
                return;
            }

            animateLetter(currentIndex);
            currentIndex++;
            setTimeout(animate, letterInterval);
        };

        animate();
    }, [animateLetter, text, letterInterval]);

    useEffect(() => {
        if (reducedMotion) return;

        const timer = setTimeout(startAnimation, initialDelay);

        const interval = setInterval(() => {
            startAnimation();
        }, triggerInterval);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [startAnimation, initialDelay, triggerInterval, reducedMotion]);

    const motionVariants = useMemo(
        () => ({
            matrix: {
                color: "#FFD700", // Gold
                textShadow: "0 2px 4px rgba(255, 215, 0, 0.5)",
            },
            normal: {
                color: "currentColor",
                textShadow: "none",
            }
        }),
        []
    );

    return (
        <div
            className={cn(
                "flex flex-wrap items-center justify-center text-foreground gap-y-2", // Added gap-y for wrapped lines
                className
            )}
            aria-label="Matrix text animation"
        >
            {(() => {
                let globalIndex = 0;
                return text.split(" ").map((wordText, wordIndex) => {
                    const currentWordLetters = letters.slice(globalIndex, globalIndex + wordText.length);
                    globalIndex += wordText.length;

                    // Determine if there is a space after this word (unless it's the last one)
                    const hasSpaceDiff = (globalIndex < letters.length && letters[globalIndex].isSpace);
                    if (hasSpaceDiff) globalIndex++;

                    return (
                        <div key={`word-${wordIndex}`} className="flex items-center whitespace-nowrap mx-[0.25ch]">
                            {currentWordLetters.map((letter, localIndex) => (
                                <motion.div
                                    key={`${wordIndex}-${localIndex}-${letter.char}`}
                                    className="font-mono text-center overflow-hidden"
                                    initial="initial"
                                    animate={letter.isMatrix ? "matrix" : "normal"}
                                    variants={motionVariants}
                                    transition={{
                                        duration: 0.1,
                                        ease: "easeInOut",
                                    }}
                                    style={{
                                        display: "inline-block",
                                        fontVariantNumeric: "tabular-nums",
                                        width: "auto",
                                        minWidth: "1ch",
                                    }}
                                >
                                    {letter.char}
                                </motion.div>
                            ))}
                            {/* Render space if needed, or just use margin/flex gap. The space char is in 'letters' state though. 
                                    If we want the SPACE to also animate (it might turn into 0/1?), we should render it.
                                    The original code had spaces turn into matrix? No, `isSpace` check prevented matrix on spaces.
                                    `isSpace: char === " "`
                                    `if (!newLetters[index].isSpace)` -> space never animates.
                                    So we can just use margin for separation.
                                */}
                        </div>
                    );
                });
            })()}
        </div>
    );
};
