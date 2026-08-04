"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface BusinessCase {
  id: string;
  rubro: string;
  emoji: string;
  image: string;
  badge: string;
  problem: string;
  solution: string;
  sampleChat: string;
}

const BUSINESS_CASES: BusinessCase[] = [
  {
    id: "floreria",
    rubro: "Florerías & Botánicas",
    emoji: "🌸",
    image: "/images/flower_shop.jpg",
    badge: "Envíos & Pedidos",
    problem: "Consultas repetitivas sobre fotos de arreglos, stock del día y costo de envío por zona a última hora.",
    solution: "Easybot envía el catálogo actualizado en PDF/fotos, cotiza el envío por código postal y toma el pedido por WhatsApp.",
    sampleChat: "— '¿Tienen arreglos con rosas blancas para entregar hoy?' → '¡Hola! Sí, nos quedan 4 ramos disponibles. Cotizamos tu envío en 20 segundos...'",
  },
  {
    id: "restaurante",
    rubro: "Restaurantes & Gastronomía",
    emoji: "🍽️",
    image: "/images/restaurant.jpg",
    badge: "Reservas & Menú",
    problem: "Llamadas telefónicas constantes durante la hora pico para consultar reservas, menú o si aceptan mascotas.",
    solution: "Atiende reservas automáticas conectadas a tu agenda, envía el menú digital y aclara medios de pago sin interrumpir a los mozos.",
    sampleChat: "— '¿Quisiera reservar mesa para 4 hoy a las 21hs' → '¡Perfecto! Mesa confirmada a nombre de Juan para 4 personas a las 21:00 hs. Te esperamos.'",
  },
  {
    id: "consultorio",
    rubro: "Consultorios & Odontología",
    emoji: "🦷",
    image: "/images/medical_clinic.jpg",
    badge: "Turnos & Pacientes",
    problem: "Recepcionistas desbordadas respondiendo obras sociales, disponibilidad de turnos y preparación previa a estudios.",
    solution: "Informa requisitos de cada obra social, responde dudas pre-consulta y gestiona solicitudes de turnos 24/7.",
    sampleChat: "— '¿Aceptan OSDE para limpiezas dentales?' → '¡Sí! Atendemos OSDE 210, 310 y 410. ¿Te gustaría ver la disponibilidad de la Dra. Gómez esta semana?'",
  },
  {
    id: "inmobiliaria",
    rubro: "Inmobiliarias & Desarrollos",
    emoji: "🏠",
    image: "/images/real_estate.jpg",
    badge: "Precalificación de Leads",
    problem: "Consultas masivas por alquileres o ventas que requieren preguntas de filtro antes de agendar una visita presencial.",
    solution: "Precalifica interesados según presupuesto, envía fichas técnicas con fotos/videos y agenda visitas con el corredor.",
    sampleChat: "— '¿Está disponible el departamento de 2 ambientes en Palermo?' → '¡Hola! Sí, sigue disponible. USD 650/mes. ¿Buscás alquiler temporal o contrato tradicional?'",
  },
  {
    id: "gimnasio",
    rubro: "Gimnasios & Studios Fitness",
    emoji: "🏋️",
    image: "/images/gym_fitness.jpg",
    badge: "Pases & Horarios",
    problem: "Nuevos clientes preguntando precios de pases libres, horarios de clases grupales y promociones mensuales.",
    solution: "Envía la grilla de actividades actualizada, precios de planes e inscribe automáticamente a la clase de prueba gratis.",
    sampleChat: "— '¿Cuáles son los horarios de Spinning los martes?' → 'Martes a las 08:00, 18:00 y 19:30 hs. ¿Te anoto en la clase de prueba sin cargo?'",
  },
  {
    id: "estetica",
    rubro: "Estéticas & Salones de Belleza",
    emoji: "💇",
    image: "/images/beauty_salon.jpg",
    badge: "Agenda & Servicios",
    problem: "Mensajes constantes por Instagram preguntando costos de tratamientos, duración y disponibilidad de fin de semana.",
    solution: "Easybot responde precios de cada servicio, recomendaciones previas al tratamiento y reserva el turno.",
    sampleChat: "— '¿Cuánto sale el perfilado de cejas y turno para el sábado?' → 'El perfilado es de USD 15. Para el sábado nos queda espacio a las 11:30 hs o 16:00 hs.'",
  },
];

export function UseCases() {
  return (
    <section id="casos-de-uso" className="relative py-36 lg:py-44 bg-zinc-950 text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
            Imágenes y Casos Reales • Soluciones por Rubro
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Un chatbot optimizado para cada tipo de negocio
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Mirá cómo comercios reales automatizan sus consultas repetitivas de forma autónoma con Easybot.
          </p>
        </div>

        {/* 6 Real Business Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BUSINESS_CASES.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-3xl bg-zinc-900 border border-zinc-800/80 overflow-hidden shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Real Photographic Header Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={b.image}
                    alt={b.rubro}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur border border-zinc-800 text-xs font-semibold text-white">
                    <span>{b.emoji}</span>
                    <span>{b.rubro}</span>
                  </div>
                  <span className="absolute bottom-3 right-4 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-500 text-zinc-950 shadow-md">
                    {b.badge}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      El problema diario:
                    </h4>
                    <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                      {b.problem}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/60">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <span>⚡</span> Solución con Easybot:
                    </h4>
                    <p className="text-xs text-zinc-200 mt-1 leading-relaxed font-medium">
                      {b.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample Simulated Interaction */}
              <div className="p-4 mx-6 mb-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 leading-normal italic">
                {b.sampleChat}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
