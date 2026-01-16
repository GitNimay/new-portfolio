"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionTemplate, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
    gradientSize?: number
    gradientColor?: string
    gradientOpacity?: number
    gradientFrom?: string
    gradientTo?: string
    children?: React.ReactNode
}

export function MagicCard({
    children,
    className,
    gradientSize = 200,
    gradientColor = "#262626",
    gradientOpacity = 0.8,
    gradientFrom = "#9E7AFF",
    gradientTo = "#FE8BBB",
}: MagicCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)

    const mouseX = useSpring(0, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(0, { stiffness: 500, damping: 100 })

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }

    const gradientBackground = useMotionTemplate`
    radial-gradient(
      ${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom},
      ${gradientTo},
      transparent 100%
    )
  `

    const overlayBackground = useMotionTemplate`
    radial-gradient(
      ${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 100%
    )
  `

    return (
        <motion.div
            ref={cardRef}
            className={cn(
                "group relative rounded-xl border bg-card text-card-foreground",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: gradientBackground,
                    opacity: isHovering ? gradientOpacity : 0,
                }}
            />
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: overlayBackground,
                    opacity: isHovering ? 0.15 : 0,
                }}
            />
            <div className="relative z-10">{children}</div>
        </motion.div>
    )
}
