"use client"

import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { motion, type Variants } from "motion/react"

interface SparklesTextProps {
    /**
     * The text content to animate with sparkles
     */
    children: string
    /**
     * Optional CSS class name
     */
    className?: string
    /**
     * The duration of the sparkle animation in seconds
     * @default 2
     */
    sparklesCount?: number
    /**
     * Colors for the sparkles
     */
    colors?: {
        first: string
        second: string
    }
}

const sparkleVariants: Variants = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    animate: {
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
    },
}

export function SparklesText({
    children,
    className,
    sparklesCount = 10,
    colors = { first: "#A07CFE", second: "#FE8FB5" },
}: SparklesTextProps) {
    const reducedMotion = useReducedMotion()
    const sparkles = Array.from({ length: sparklesCount })

    return (
        <span className={cn("relative inline-block", className)}>
            {!reducedMotion && sparkles.map((_, index) => (
                <motion.span
                    key={index}
                    variants={sparkleVariants}
                    initial="initial"
                    animate="animate"
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute z-20"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 160 160"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
                            fill={index % 2 === 0 ? colors.first : colors.second}
                        />
                    </svg>
                </motion.span>
            ))}
            <span className="relative z-10">{children}</span>
        </span>
    )
}
