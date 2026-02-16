"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
}

export function ScrollReveal({
    children,
    className = "",
    delay = 0,
    duration = 0.5,
    direction = "up",
    distance = 30
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const getInitialPosition = () => {
        switch (direction) {
            case "up": return { y: distance, opacity: 0 };
            case "down": return { y: -distance, opacity: 0 };
            case "left": return { x: distance, opacity: 0 };
            case "right": return { x: -distance, opacity: 0 };
            case "none": return { opacity: 0, scale: 0.95 };
            default: return { y: distance, opacity: 0 };
        }
    };

    const getTargetPosition = () => {
        switch (direction) {
            case "up":
            case "down": return { y: 0, opacity: 1 };
            case "left":
            case "right": return { x: 0, opacity: 1 };
            case "none": return { opacity: 1, scale: 1 };
            default: return { y: 0, opacity: 1 };
        }
    };

    return (
        <motion.div
            ref={ref}
            initial={getInitialPosition()}
            animate={isInView ? getTargetPosition() : getInitialPosition()}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
