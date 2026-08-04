"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const bentoFeatures = [
  {
    id: "base",
    title: "Plan Base & Respuestas Simples",
    tag: "Núcleo Incluido",
    desc: "Tu bot atiende a cada cliente al instante con mensaje de bienvenida y respuestas preguntas frecuentes (horarios, medios de pago, ubicación y envíos).",
    icon: "🤖",
    cols: "lg:col-span-7",
    highlights: ["Mensaje de bienvenida automático", "Respuestas a +50 preguntas frecuentes", "1.000 chats/mes incluidos"],
    accent: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
  },
  {
    id: "channels",
    title: "Omnicanalidad Real",
    tag: "WhatsApp + Web + Insta",
    desc: "Responde con la misma personalidad y memoria en WhatsApp Business, Mensajes Directos de Instagram y tu Web.",
    icon: "💬",
    cols: "lg:col-span-5",
    highlights: ["WhatsApp Cloud API", "Instagram Direct Auto-reply", "Widget Web Flotante"],
    accent: "from-indigo-500/20 to-purple-500/10 border-indigo-500/30",
  },
  {
    id: "analytics",
    title: "Métricas CSAT & Ahorro",
    tag: "Panel Ejecutivo",
    desc: "Mide la satisfacción promedio (4.8/5), la tasa de contención sin intervención humana y detectá consultas sin resolver.",
    icon: "📊",
    cols: "lg:col-span-5",
    highlights: ["CSAT Score: 4.8 / 5", "Contención: 84% automática", "Ahorro: ~42 hs/mes"],
    accent: "from-cyan-500/20 to-emerald-500/10 border-cyan-500/30",
  },
  {
    id: "modules",
    title: "Módulos a la Carta",
    tag: "Flexibilidad 100%",
    desc: "Agregá módulos de toma de pedidos, agenda de turnos o derivación humana a operadores solo cuando la demanda lo requiera.",
    icon: "🧩",
    cols: "lg:col-span-7",
    highlights: ["Módulo eCommerce & Envíos", "Módulo Agenda Google Calendar", "Módulo Multi-Agente Humano"],
    accent: "from-fuchsia-500/20 to-pink-500/10 border-fuchsia-500/30",
  },
];

export function FeatureTabs() {
  const [activeCard, setActiveCard] = useState<string>("base");

  return (
    <section id="como-funciona" className="relative py-32 lg:py-40 text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Designer Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ARQUITECTURA DE SERVICIO • TODO LO QUE NECESITÁS SABER
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Elegí tu configuración ideal
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            La mayoría de las PyMEs arranca con Plan Base + Canales unificados, y suma Analítica o Módulos cuando quiere medir resultados o crecer. Armá la combinación que se ajuste a tu negocio.
          </p>
          <a
            href="#precios"
            className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            Ver precios y valor de cada configuración
            <span aria-hidden>→</span>
          </a>
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {bentoFeatures.map((feat) => (
            <motion.div
              key={feat.id}
              onClick={() => setActiveCard(feat.id)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4 }}
              className={`cursor-pointer rounded-3xl bg-zinc-900/70 border backdrop-blur-xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                feat.cols
              } ${
                activeCard === feat.id
                  ? `bg-gradient-to-br ${feat.accent} shadow-2xl shadow-emerald-950/40 ring-1 ring-emerald-500/40`
                  : "border-zinc-800/80 hover:border-zinc-700"
              }`}
            >
              {/* Card Ambient Glow */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-white/5 blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur">
                    {feat.icon}
                  </span>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-950/90 text-emerald-300 border border-zinc-800">
                    {feat.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                {/* Checklist Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-zinc-800/80 text-xs">
                  {feat.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-xl bg-zinc-950/70 border border-zinc-800/90 text-zinc-300 font-medium flex items-center gap-2"
                    >
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span className="text-[11px] leading-tight">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
