"use client";

import { motion } from "motion/react";

const testimonials = [
  {
    name: "Marina",
    biz: "Florería Girasol",
    quote:
      "Antes contestaba WhatsApp hasta la medianoche. Ahora el bot resuelve el 80% de las consultas solo.",
  },
  {
    name: "Diego",
    biz: "Pizzería El Horno",
    quote:
      "Lo configuré en una tarde, sin ayuda de nadie. Las reservas ya no se me pasan más.",
  },
  {
    name: "Luciana",
    biz: "Consultorio Dental Sonrisas",
    quote:
      "Los pacientes agendan turno solos y yo veo todo resuelto en el panel, sin llamar a nadie.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="relative w-full bg-zinc-100 py-36 lg:py-44 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-semibold tracking-tight text-black dark:text-zinc-50"
        >
          Clientes que ya automatizaron su atención
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900"
            >
              <div className="text-amber-400" aria-hidden>
                ★★★★★
              </div>
              <blockquote className="mt-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-black dark:text-zinc-50">
                {t.name}{" "}
                <span className="font-normal text-zinc-500">— {t.biz}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-600">
          *Testimonios ilustrativos — producto en desarrollo.
        </p>
      </div>
    </section>
  );
}
