import React from "react";
import { motion } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen relative overflow-hidden selection:bg-[var(--accent)] selection:text-white">

            {/* CONTINUOUS ANIMATED BACKGROUND BLOB (Framer Motion Only) */}
            <motion.div
                className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--accent)] pointer-events-none opacity-[0.07] blur-[120px]"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div
                className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[var(--accent)] pointer-events-none opacity-[0.05] blur-[100px]"
                animate={{
                    x: [0, -70, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2
                }}
            />

            <motion.main
                className="relative z-10 w-full min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {children}
            </motion.main>
        </div>
    );
}
