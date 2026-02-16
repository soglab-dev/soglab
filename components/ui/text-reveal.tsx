"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const words = children.split(" ");

    return (
        <span className={className} ref={ref}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : { y: "100%" }}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.03,
                            ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                    >
                        {word}
                    </motion.span>
                    <span className="inline-block">&nbsp;</span>
                </span>
            ))}
        </span>
    );
}
