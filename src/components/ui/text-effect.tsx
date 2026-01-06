import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import React from "react";

type PresetType = "blur" | "shake" | "scale" | "fade" | "slide";

type TextEffectProps = {
    children: string;
    per?: "word" | "char";
    as?: keyof JSX.IntrinsicElements;
    variants?: {
        container?: Variants;
        item?: Variants;
    };
    className?: string;
    preset?: PresetType;
};

const defaultContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
    exit: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const presetVariants: Record<
    PresetType,
    { container: Variants; item: Variants }
> = {
    blur: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, filter: "blur(12px)", y: -8 },
            visible: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: { type: "spring", bounce: 0, duration: 0.4 }
            },
            exit: {
                opacity: 0,
                filter: "blur(12px)",
                y: 8,
                transition: { type: "spring", bounce: 0, duration: 0.4 }
            },
        },
    },
    fade: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
            exit: { opacity: 0 },
        },
    },
    slide: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
        },
    },
    scale: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0 },
        },
    },
    shake: {
        container: defaultContainerVariants,
        item: {
            hidden: { x: 0 },
            visible: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } },
            exit: { x: 0 },
        },
    },
};

export function TextEffect({
    children,
    per = "word",
    as: Component = "p",
    variants,
    className,
    preset = "blur",
}: TextEffectProps) {
    const selectedVariants = preset
        ? presetVariants[preset]
        : { container: defaultContainerVariants, item: { hidden: { opacity: 0 }, visible: { opacity: 1 } } };

    const container = variants?.container || selectedVariants.container;
    const item = variants?.item || selectedVariants.item;

    if (per === "word") {
        const words = children.split(/(\s+)/);
        return (
            <motion.div
                className={cn("flex flex-wrap", className)}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={container}
            >
                {words.map((word, index) => (
                    <motion.span
                        key={`${word}-${index}`}
                        variants={item}
                        className="inline-block whitespace-pre"
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.div>
        );
    }

    // char
    return (
        <motion.div
            className={cn("inline-block", className)}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={container}
        >
            {children.split("").map((char, index) => (
                <motion.span key={`${char}-${index}`} variants={item} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.div>
    );
}
