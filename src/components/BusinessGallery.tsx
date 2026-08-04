"use client";

import { motion } from "motion/react";
import Image from "next/image";

const HIGHLIGHTS = [
  {
    title: "Florerías & Ramos",
    stat: "90% pedidos en piloto automático",
    desc: "El cliente envía la zona, el bot calcula el envío y pasa el link de pago sin intervención humana.",
    image: "/images/flower_shop.jpg",
  },
  {
    title: "Restaurantes & Pizzerías",
    stat: "0 llamadas perdidas en hora pico",
    desc: "Tomador de reservas e información del menú en WhatsApp mientras el equipo atiende el salón.",
    image: "/images/restaurant.jpg",
  },
  {
    title: "Salud & Consultorios",
    stat: "-70% mensajes por turnos",
    desc: "Derivación fluida según obra social y agenda sincronizada para médicos y odontólogos.",
    image: "/images/medical_clinic.jpg",
  },
];

export function BusinessGallery() {
  return (
    <section className="relative bg-zinc-900/60 border-y border-zinc-800 py-36 lg:py-44 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
            Resultados Reales
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Comercios que transformaron su atención
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            PyMEs reales ahorrando más de 40 horas al mes en consultas repetitivas.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="relative h-44 w-full rounded-2xl overflow-hidden">
                <Image
                  src={h.image}
                  alt={h.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500 text-zinc-950">
                  {h.stat}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{h.title}</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {h.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
