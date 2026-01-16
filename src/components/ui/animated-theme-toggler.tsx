"use client"

import { useCallback } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
    duration?: number
}

export const AnimatedThemeToggler = ({
    className,
    duration = 400,
    ...props
}: AnimatedThemeTogglerProps) => {
    const { theme, setTheme, resolvedTheme } = useTheme()

    const toggleTheme = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget
        if (!button) return

        // Fallback for browsers that don't support view transitions
        if (!document.startViewTransition) {
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
            return
        }

        await document.startViewTransition(() => {
            flushSync(() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
            })
        }).ready

        const { top, left, width, height } = button.getBoundingClientRect()
        const x = left + width / 2
        const y = top + height / 2
        const maxRadius = Math.hypot(
            Math.max(left, window.innerWidth - left),
            Math.max(top, window.innerHeight - top)
        )

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        )
    }, [resolvedTheme, setTheme, duration])

    return (
        <button
            onClick={toggleTheme}
            className={cn("relative", className)}
            {...props}
        >
            {resolvedTheme === "dark" ? (
                <Sun className="size-5" />
            ) : (
                <Moon className="size-5" />
            )}
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
