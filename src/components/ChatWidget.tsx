"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

type Channel = "whatsapp" | "web" | "instagram";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

interface ResponseResult {
  text: string;
  suggestions: string[];
}

function normalize(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function processConversationalIntent(userText: string): ResponseResult {
  const t = normalize(userText.toLowerCase().trim());

  // 1. Saludos iniciales
  if (
    t.includes("hola") ||
    t.includes("buenas") ||
    t.includes("buen dia") ||
    t.includes("que tal") ||
    t === "hola!"
  ) {
    return {
      text: "¡Hola, cómo estás! 😊 Qué gusto saludarte. Soy Sofi. Estoy acá para ayudarte a consultar productos, precios, envíos o agendar turnos. ¿De qué te gustaría hablar hoy?",
      suggestions: [
        "🛍️ Ver Productos & Catálogo",
        "🚚 Envíos y Retiros",
        "💳 Medios de Pago & Cuotas",
        "🗓️ Agendar un Turno",
      ],
    };
  }

  // 2. Productos y Catálogo
  if (
    t.includes("producto") ||
    t.includes("catalogo") ||
    t.includes("comida") ||
    t.includes("ropa") ||
    t.includes("flores") ||
    t.includes("combo") ||
    t.includes("que tienen")
  ) {
    return {
      text: "¡Buenísimo! 📦 Te cuento: tenemos nuestro catálogo estrella de la temporada. Por ejemplo: el Combo Regalo ($12.500), Arreglos Especiales ($18.000) o Pases Libres ($22.000/mes). ¿Te interesa saber los detalles o precios de alguno?",
      suggestions: [
        "🎁 Ver Combo Regalo ($12.500)",
        "🌸 Ver Arreglo Especial ($18.000)",
        "💸 Ver Promociones 15% OFF",
      ],
    };
  }

  // 3. Confirmación de compra / reserva
  if (
    t.includes("quiero") ||
    t.includes("reservame") ||
    t.includes("comprar") ||
    t.includes("si, reservame") ||
    t.includes("me interesa") ||
    t.includes("combo regalo")
  ) {
    return {
      text: "¡Excelente elección! 🎉 El Combo Regalo es nuestro favorito. Incluye envoltorio especial, tarjeta dedicatoria y envío express. ¿A qué nombre te anoto la reserva y por qué zona te gustaría recibirlo?",
      suggestions: [
        "🛵 Enviar a Palermo / CABA hoy",
        "🏪 Retirar por el local",
        "💳 Ver opciones de pago",
      ],
    };
  }

  // 4. Envíos y Retiros
  if (
    t.includes("envio") ||
    t.includes("rappi") ||
    t.includes("pedidosya") ||
    t.includes("palermo") ||
    t.includes("caba") ||
    t.includes("gba") ||
    t.includes("domicilio")
  ) {
    return {
      text: "¡Hacemos envíos en el día! 🚚 Si estás en CABA o GBA y pedís antes de las 15hs, te llega hoy en moto ($2.500). Sino podés enviar un Rappi o PedidosYa a retirar por nuestro local en Palermo sin cargo. ¿Te paso el CBU o preferís cuotas?",
      suggestions: [
        "📋 Pasar CBU / Transferencia (15% OFF)",
        "💳 Pagar en 3 o 6 Cuotas",
        "🏪 Ver dirección del local",
      ],
    };
  }

  // 5. Medios de Pago y Cuotas
  if (
    t.includes("pago") ||
    t.includes("cuota") ||
    t.includes("efectivo") ||
    t.includes("tarjeta") ||
    t.includes("descuento") ||
    t.includes("cbu") ||
    t.includes("transferencia") ||
    t.includes("mercado pago")
  ) {
    return {
      text: "Aceptamos todas las tarjetas de crédito con 3 y 6 cuotas sin interés 💳. Y si abonás por transferencia o efectivo en el local, ¡tenés un 15% OFF de regalo! ($10.625 final). ¿Anotamos tu pedido?",
      suggestions: [
        "¡Sí, anotame el pedido!",
        "📋 Enviar datos del CBU",
        "⏰ Ver horarios de atención",
      ],
    };
  }

  // 6. Turnos / Agenda
  if (
    t.includes("turno") ||
    t.includes("agenda") ||
    t.includes("reserva") ||
    t.includes("cita") ||
    t.includes("hora")
  ) {
    return {
      text: "¡Genial! 🗓️ Atendemos turnos de Lunes a Sábados. Tenemos disponibilidad hoy a las 16:00 hs o mañana a las 11:30 hs. ¿Qué horario te queda más cómodo?",
      suggestions: [
        "⏰ Hoy a las 16:00 hs",
        "⏰ Mañana a las 11:30 hs",
        "📍 Ver ubicación del local",
      ],
    };
  }

  // 7. Horarios y Ubicación
  if (
    t.includes("horario") ||
    t.includes("local") ||
    t.includes("direccion") ||
    t.includes("donde") ||
    t.includes("abren")
  ) {
    return {
      text: "Estamos en Av. Santa Fe 1820, Palermo (CABA) 🏪. Atendemos de corrido de Lunes a Sábados de 9:30 a 19:30 hs. Si venís medio justo cerca del cierre avisame y te aguardamos 10 minutos. ¡Te esperamos!",
      suggestions: [
        "🛵 Consultar Envíos a domicilio",
        "🛍️ Ver Productos en stock",
        "🙌 Hablar con un humano",
      ],
    };
  }

  // 8. Atención humana
  if (
    t.includes("humano") ||
    t.includes("persona") ||
    t.includes("operador") ||
    t.includes("hablar")
  ) {
    return {
      text: "¡Obvio! 🙌 En Easybot, cuando una consulta requiere toque humano, el bot transfiere la conversación en 1 segundo a un operador de tu equipo con todo el historial guardado. ¿Querés que probemos la prueba de 14 días?",
      suggestions: [
        "🚀 Probar Easybot Gratis 14 Días",
        "🔄 Reiniciar conversación",
      ],
    };
  }

  // 9. Agradecimiento / Cierre
  if (
    t.includes("gracias") ||
    t.includes("genial") ||
    t.includes("buenisimo") ||
    t.includes("joya") ||
    t.includes("barbaro") ||
    t.includes("chau")
  ) {
    return {
      text: "¡De nada! Fue un gustazo charlar con vos. 🥰 Como pudiste comprobar, podés mantener una conversación fluida, amable y con alta tasa de ventas 100% en automático. ¿Querés probarlo en tu negocio?",
      suggestions: [
        "🚀 Probar 14 Días Gratis sin Tarjeta",
        "🔄 Reiniciar la charla",
      ],
    };
  }

  // Fallback Inteligente y Cálido para cualquier otro texto
  return {
    text: `¡Entendido! 👌 Sobre eso que comentás, podés cargar las respuestas exactas de tu negocio en Easybot subiendo un PDF o link en 3 minutos. ¿Te gustaría que probemos cotizar un envío o ver los medios de pago?`,
    suggestions: [
      "🛍️ Ver Productos en Stock",
      "🚚 Consultar Envíos en el día",
      "💳 Medios de Pago & Cuotas",
    ],
  };
}

export function ChatWidget() {
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "¡Hola! 👋 Qué bueno tenerte por acá. Soy Sofi de atención al cliente. ¿En qué te puedo dar una mano hoy?",
      time: "",
    },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([
    "🛍️ Ver Productos & Catálogo",
    "🚚 Envíos y Retiros",
    "💳 Medios de Pago & Cuotas",
    "🗓️ Agendar un Turno",
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) =>
        m.time === ""
          ? {
              ...m,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : m,
      ),
    );
  }, []);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Reset Chat Trigger
    if (textToSend.includes("Reiniciar")) {
      setMessages([
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "¡Hola de nuevo! 👋 Soy Sofi. ¿En qué te puedo ayudar?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setSuggestions([
        "🛍️ Ver Productos & Catálogo",
        "🚚 Envíos y Retiros",
        "💳 Medios de Pago & Cuotas",
        "🗓️ Agendar un Turno",
      ]);
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      const result = processConversationalIntent(textToSend);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: result.text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setSuggestions(result.suggestions);
      setIsTyping(false);
    }, 850);
  };

  const channelStyles = {
    whatsapp: {
      headerBg: "bg-emerald-700 dark:bg-emerald-900",
      userBubble: "bg-emerald-600 text-white rounded-tr-none shadow-sm",
      botBubble: "bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-700/60 shadow-sm",
      name: "WhatsApp PyME • Sofi",
      status: "Responde al instante • Charla Fluida",
    },
    web: {
      headerBg: "bg-indigo-700 dark:bg-indigo-900",
      userBubble: "bg-indigo-600 text-white rounded-tr-none shadow-sm",
      botBubble: "bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-700/60 shadow-sm",
      name: "Web Chat • Sofi",
      status: "Asistente Virtual en Vivo",
    },
    instagram: {
      headerBg: "bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500",
      userBubble: "bg-pink-600 text-white rounded-tr-none shadow-sm",
      botBubble: "bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-700/60 shadow-sm",
      name: "Instagram Direct • Sofi",
      status: "Respuesta en DM con Buena Onda",
    },
  };

  const currentTheme = channelStyles[channel];

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-zinc-700/80 bg-zinc-950 shadow-2xl overflow-hidden transition-all duration-300 flex flex-col h-[560px]">
      {/* Top Channel Selector */}
      <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between shrink-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Probar Canal:
        </span>
        <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          <button
            type="button"
            onClick={() => setChannel("whatsapp")}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              channel === "whatsapp"
                ? "bg-emerald-600 text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>💬</span> WhatsApp
          </button>
          <button
            type="button"
            onClick={() => setChannel("web")}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              channel === "web"
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>🌐</span> Web
          </button>
          <button
            type="button"
            onClick={() => setChannel("instagram")}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              channel === "instagram"
                ? "bg-pink-600 text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>📸</span> Instagram
          </button>
        </div>
      </div>

      {/* Header Chat Window */}
      <div className={`${currentTheme.headerBg} px-5 py-3.5 text-white flex items-center justify-between shadow-md transition-colors duration-300 shrink-0`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center font-bold text-lg border border-white/30">
              👩‍💼
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h4 className="font-semibold text-sm leading-tight">{currentTheme.name}</h4>
            <p className="text-xs text-white/90">{currentTheme.status}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border bg-white/10 border-white/20 backdrop-blur">
            ✨ Demo Conversacional
          </span>
          <button
            type="button"
            onClick={() =>
              handleSendMessage("Reiniciar")
            }
            title="Reiniciar chat"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-zinc-950/90"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? currentTheme.userBubble
                    : currentTheme.botBubble
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-zinc-500 mt-1 px-1">
                {msg.time}
              </span>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 rounded-2xl text-zinc-300 text-xs border border-zinc-800 w-fit"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-1 text-zinc-400">Sofi está escribiendo...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic Suggested Action Chips */}
      <div className="px-3 py-2 bg-zinc-900/80 border-t border-zinc-800 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[11px] text-zinc-400 font-medium shrink-0 pl-1">
          Responder con 1 clic:
        </span>
        {suggestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => handleSendMessage(q)}
            disabled={isTyping}
            className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-all disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputVal);
        }}
        className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Escribí libremente (ej: 'cuánto sale el combo regalo', 'horarios', 'quiero comprar')..."
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-zinc-950 text-zinc-100 placeholder-zinc-500 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isTyping}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
        >
          Enviar 🚀
        </button>
      </form>
    </div>
  );
}
