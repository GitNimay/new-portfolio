import { useEffect, useState } from "react";

interface TextScrambleProps {
    children: string;
    duration?: number;
    speed?: number;
    characterSet?: string;
    className?: string;
}

const DEFAULT_CHARACTER_SET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const TextScramble = ({
    children,
    duration = 800,
    speed = 30,
    characterSet = DEFAULT_CHARACTER_SET,
    className,
}: TextScrambleProps) => {
    const [displayText, setDisplayText] = useState(children);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let frame = 0;
        const length = children.length;
        let currentIteration = 0;

        // Total number of iterations needed
        // We want the animation to take roughly 'duration' ms
        // and each frame takes roughly 'speed' ms (interval)
        // But setting interval is easier. 

        const maxIterations = Math.floor(duration / speed);

        const interval = setInterval(() => {
            let result = "";
            // Calculate how many characters should be revealed at this point
            // This is a simple linear progression
            const progress = currentIteration / maxIterations;

            for (let i = 0; i < length; i++) {
                // calculated "reveal index"
                // If the progress * length is greater than i, reveal the char
                // For a "matrix" style, we can just randomly scramble untargeted chars

                if (i < Math.floor(progress * length)) {
                    result += children[i];
                } else {
                    result += characterSet[Math.floor(Math.random() * characterSet.length)];
                }
            }

            setDisplayText(result);

            if (currentIteration >= maxIterations) {
                setDisplayText(children); // Ensure final state is correct
                clearInterval(interval);
            }

            currentIteration++;
        }, speed);


        return () => clearInterval(interval);
    }, [children, duration, speed, characterSet]);

    return <span className={className}>{displayText}</span>;
};
