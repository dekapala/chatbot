"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface ModuleOption {
  id: string;
  name: string;
  badge: string;
  desc: string;
  price: number;
  icon: string;
  popular?: boolean;
}

const MODULES: ModuleOption[] = [
  {
    id: "ecommerce",
    name: "Módulo eCommerce & Envíos",
    badge: "Ventas",
    desc: "Permite enviar el catálogo de productos, cotizar envíos por código postal y tomar pedidos por WhatsApp.",
    price: 8,
    icon: "📦",
    popular: true,
  },
  {
    id: "agenda",
    name: "Módulo Agenda & Turnos",
    badge: "Reservas",
    desc: "Sincronización automática con Google Calendar para agendar turnos y enviar recordatorios anti-ausentismo.",
    price: 10,
    icon: "🗓️",
    popular: true,
  },
  {
    id: "analytics",
    name: "Módulo Analítica Pro & CSAT",
    badge: "Control",
    desc: "Dashboard ejecutivo con métricas de satisfacción (CSAT), tasa de resolución y reporte de temas sin resolver.",
    price: 9,
    icon: "📊",
  },
  {
    id: "multiagent",
    name: "Módulo Derivación Multi-Agente",
    badge: "Soporte Híbrido",
    desc: "Transfiere la conversación a un operador humano cuando el bot detecta casos complejos o solicitudes VIP.",
    price: 12,
    icon: "👥",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Official Cloud API",
    badge: "Meta Verified",
    desc: "Conexión nativa de tu número con la API oficial de Meta para estabilidad 100% y envío de plantillas.",
    price: 15,
    icon: "💬",
  },
  {
    id: "knowledge",
    name: "Módulo PDFs & IA Avanzada",
    badge: "Capacitación",
    desc: "Entrená a tu bot subiendo archivos PDF, listas de precios en Excel o links de tu tienda sin límite.",
    price: 7,
    icon: "🧠",
  },
];

export function PricingCalculator() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "ecommerce",
    "agenda",
  ]);

  const basePrice = billingCycle === "yearly" ? 15 : 19;

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const modulesTotal = selectedModules.reduce((acc, modId) => {
    const mod = MODULES.find((m) => m.id === modId);
    return acc + (mod ? mod.price : 0);
  }, 0);

  const grandTotal = basePrice + modulesTotal;

  return (
    <section id="precios" className="relative py-36 lg:py-44 bg-zinc-950 text-white overflow-hidden border-t border-zinc-800">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
            Arquitectura de Precios Autoservicio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Plan Base + Módulos a la Carta
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Empieza con el Plan Base para mensajes de bienvenida y respuestas simples. Sumá solo los módulos que tu PyME necesite.
          </p>

          {/* Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-medium ${
                billingCycle === "monthly" ? "text-white" : "text-zinc-400"
              }`}
            >
              Facturación Mensual
            </span>
            <button
              onClick={() =>
                setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
              }
              className="relative w-14 h-8 bg-zinc-800 rounded-full p-1 border border-zinc-700 transition-colors"
            >
              <motion.div
                layout
                className="w-6 h-6 bg-emerald-400 rounded-full shadow-md"
                animate={{ x: billingCycle === "yearly" ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={`text-sm font-medium flex items-center gap-1.5 ${
                billingCycle === "yearly" ? "text-white" : "text-zinc-400"
              }`}
            >
              Anual{" "}
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Ahorrá 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Layout */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Plan Base Details (Left Column) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-emerald-500/40 rounded-3xl p-8 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Incluido Siempre
              </span>
              <span className="text-xs text-zinc-400">14 días de prueba gratis</span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">Plan Base: Bienvenida & Respuestas Simples</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                El núcleo fundamental para que tu negocio empiece a automatizar sin demoras.
              </p>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-4xl font-extrabold text-white">${basePrice}</span>
                <span className="text-zinc-400 text-sm">/ mes</span>
              </div>
            </div>

            {/* Base Features Checklist */}
            <div className="space-y-3 pt-4 border-t border-zinc-800 text-xs">
              <p className="font-semibold text-white uppercase tracking-wider text-[11px]">
                Características del Plan Base:
              </p>
              <div className="flex items-start gap-2.5 text-zinc-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Mensaje de bienvenida</strong> automático con botones interactivos.</span>
              </div>
              <div className="flex items-start gap-2.5 text-zinc-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Respuestas simples a FAQs:</strong> horarios, ubicación, formas de pago y envíos.</span>
              </div>
              <div className="flex items-start gap-2.5 text-zinc-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Hasta 1.000 conversaciones/mes</strong> atendidas 24/7.</span>
              </div>
              <div className="flex items-start gap-2.5 text-zinc-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Widget Web Flotante</strong> + Conector WhatsApp Básico.</span>
              </div>
            </div>

            <button className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all">
              Probar Plan Base Gratis 🚀
            </button>
          </div>

          {/* Module Selector & Real-Time Price Estimator (Right Column) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🧩</span> Sumá Módulos a la Carta:
              </h3>
              <span className="text-xs text-zinc-400">
                {selectedModules.length} módulos seleccionados
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MODULES.map((mod) => {
                const isSelected = selectedModules.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className={`cursor-pointer p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? "bg-zinc-900 border-emerald-500/60 shadow-lg shadow-emerald-950/30"
                        : "bg-zinc-950/80 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{mod.icon}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                          {mod.badge}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-white">{mod.name}</h4>
                      <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-zinc-800/60">
                      <span className="text-xs font-bold text-emerald-400">
                        +${mod.price}/mes
                      </span>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${
                          isSelected
                            ? "bg-emerald-500 text-zinc-950"
                            : "bg-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {isSelected ? "✓ Sumado" : "+ Agregar"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Estimation Box */}
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-zinc-400">Costo total estimado:</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-white">${grandTotal}</span>
                  <span className="text-xs text-zinc-400">/ mes (Plan Base + {selectedModules.length} módulos)</span>
                </div>
              </div>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-xs shadow-lg transition-all shrink-0">
                Contratar Configuración →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
