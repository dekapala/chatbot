"use client";

import { motion } from "motion/react";
import { ChatWidget } from "./ChatWidget";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-[85vh] pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 overflow-hidden bg-zinc-950 font-sans text-white flex items-center justify-center">
      {/* Background Animated Glows */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-24 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-24 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold w-fit backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Chatbots Autónomos para PyMEs • Calidez Humana 100%
          </motion.div>

          <motion.h1
            custom={0.1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white"
          >
            Automatizá la atención de tu PyME{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              con la calidez de un recepcionista real.
            </span>
          </motion.h1>

          <motion.p
            custom={0.2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl"
          >
            Configurá tu bot para WhatsApp, Instagram y Web en 3 minutos. Responde con buena onda, resuelve envíos, formas de pago y turnos, 100% solo sin vendedores.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={0.3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <a
              href="#demo"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm sm:text-base shadow-xl shadow-emerald-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Probar gratis 14 días 🚀
            </a>
            <a
              href="#como-funciona"
              className="px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-medium text-sm sm:text-base transition-all"
            >
              Ver cómo funciona →
            </a>
          </motion.div>

          {/* Trust Guarantees */}
          <motion.div
            custom={0.4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-400 pt-4 border-t border-zinc-900"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span> Sin tarjeta de crédito
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span> Setup en 3 min
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span> Cancelación con 1 clic
            </div>
          </motion.div>
        </div>

        {/* Right Column: Live Chat Widget Demo */}
        <div id="demo" className="lg:col-span-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative z-10"
          >
            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-emerald-500 to-teal-500 opacity-25 blur-xl"></div>
            <ChatWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
