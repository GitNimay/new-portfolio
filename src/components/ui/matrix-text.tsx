import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
        const timer = setTimeout(startAnimation, initialDelay);

        const interval = setInterval(() => {
            startAnimation();
        }, triggerInterval);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [startAnimation, initialDelay, triggerInterval]);

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

    const words = useMemo(() => {
        let currentWord: LetterState[] = [];
        const result: LetterState[][] = [];

        letters.forEach((letter, index) => {
            // Attach the original index to the letter object for keying if needed, or just iterate linearly
            // Actually, we can just slice the array. But 'letters' is the state.
            // Let's rebuild the structure based on letters array state.
            if (letter.isSpace) {
                if (currentWord.length > 0) {
                    result.push(currentWord);
                    currentWord = [];
                }
                result.push([letter]); // Space is its own "word" or separated
            } else {
                currentWord.push(letter);
            }
        });
        if (currentWord.length > 0) {
            result.push(currentWord);
        }
        return result;
    }, [letters]);

    return (
        <div
            className={cn(
                "flex flex-wrap items-center justify-center text-foreground gap-y-2", // Added gap-y for wrapped lines
                className
            )}
            aria-label="Matrix text animation"
        >
            {/* Iterate through words instead of flat letters */}
            {text.split(" ").map((wordStr, wordIndex) => {
                // We need to map back to the flat letters array.
                // This is tricky because "text" splits vs "letters" state index.
                // Let's assume text structure doesn't change.
                // Calculate start index for this word.
                // Actually, simpler loop:
                let charCount = 0;
                const wordsWithIndices = text.split(" ").map(w => {
                    const start = charCount;
                    charCount += w.length + 1; // +1 for space (except last? text.split separates by space)
                    // Actually, generic splitting might be safer by just iterating 'letters'
                    return { word: w, start };
                });

                /* 
                   Better approach: Just iterate 'letters' state and buffer words.
                   But we need to render them wrapped in divs.
                */
                return null;
            })}

            {(() => {
                let globalIndex = 0;
                return text.split(" ").map((wordText, wordIndex) => {
                    const currentWordLetters = letters.slice(globalIndex, globalIndex + wordText.length);
                    globalIndex += wordText.length;

                    // Determine if there is a space after this word (unless it's the last one)
                    const hasSpaceDiff = (globalIndex < letters.length && letters[globalIndex].isSpace);
                    const spaceLetter = hasSpaceDiff ? letters[globalIndex] : null;
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
