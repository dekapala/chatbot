"use client";

import { motion } from "motion/react";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-zinc-950">
      {/* 1. Animated Radial Mesh Orbs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[140px]"
        animate={{
          x: [0, 80, 0],
          y: [0, 60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[35%] right-[-10%] w-[650px] h-[650px] rounded-full bg-emerald-500/15 blur-[150px]"
        animate={{
          x: [0, -90, 0],
          y: [0, -70, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-teal-500/15 blur-[130px]"
        animate={{
          x: [0, 70, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. Designer Tech Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-70"></div>

      {/* 3. Floating Animated Chat Nodes & Data Beams (Service Reference) */}
      <div className="absolute inset-0">
        {/* Floating Chat Node 1 */}
        <motion.div
          className="absolute top-[15%] left-[10%] px-3 py-1.5 rounded-2xl bg-zinc-900/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono flex items-center gap-2 backdrop-blur-md shadow-lg shadow-emerald-950/20"
          animate={{
            y: [0, -18, 0],
            x: [0, 10, 0],
            opacity: [0.4, 0.85, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>WhatsApp API: Connected • 24/7</span>
        </motion.div>

        {/* Floating Chat Node 2 */}
        <motion.div
          className="absolute top-[45%] left-[5%] px-3.5 py-2 rounded-2xl bg-zinc-900/80 border border-indigo-500/30 text-indigo-300 text-[11px] font-mono flex items-center gap-2 backdrop-blur-md shadow-lg shadow-indigo-950/20"
          animate={{
            y: [0, 22, 0],
            x: [0, -12, 0],
            opacity: [0.35, 0.8, 0.35],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <span>🤖 Response Latency &lt; 1.2s</span>
        </motion.div>

        {/* Floating Chat Node 3 */}
        <motion.div
          className="absolute top-[65%] right-[8%] px-3.5 py-2 rounded-2xl bg-zinc-900/80 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono flex items-center gap-2 backdrop-blur-md shadow-lg shadow-cyan-950/20"
          animate={{
            y: [0, -25, 0],
            x: [0, -15, 0],
            opacity: [0.4, 0.85, 0.4],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        >
          <span>📊 CSAT Score: 4.9/5 ★</span>
        </motion.div>

        {/* Floating Chat Node 4 */}
        <motion.div
          className="absolute bottom-[15%] left-[12%] px-3.5 py-2 rounded-2xl bg-zinc-900/80 border border-pink-500/30 text-pink-300 text-[11px] font-mono flex items-center gap-2 backdrop-blur-md shadow-lg shadow-pink-950/20"
          animate={{
            y: [0, 18, 0],
            x: [0, 15, 0],
            opacity: [0.3, 0.75, 0.3],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        >
          <span>📸 Instagram Direct: Active</span>
        </motion.div>

        {/* Constellation Ambient Light Beams */}
        <motion.div
          className="absolute top-[25%] left-[30%] w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981]"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[75%] left-[70%] w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_14px_#6366f1]"
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
    </div>
  );
}
