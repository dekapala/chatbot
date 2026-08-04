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

const DEFAULT_SUGGESTIONS = [
  "🛍️ Ver Productos & Catálogo",
  "🚚 Envíos y Retiros",
  "💳 Medios de Pago & Cuotas",
  "🗓️ Agendar un Turno",
];

async function askAssistant(
  message: string,
  history: { role: "user" | "assistant"; content: string }[],
): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!res.ok) {
    throw new Error("chat request failed");
  }

  const data: { reply?: string } = await res.json();
  return (
    data.reply?.trim() ||
    "Perdón, no te pude responder eso. ¿Probamos con otra pregunta?"
  );
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
  const [suggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);
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

  const handleSendMessage = async (textToSend: string) => {
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
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const history = messages.map((m) => ({
      role: (m.sender === "user" ? "user" : "assistant") as "user" | "assistant",
      content: m.text,
    }));

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    let replyText: string;
    try {
      replyText = await askAssistant(textToSend, history);
    } catch {
      replyText =
        "Uy, tuve un problema para responder. ¿Podés intentar de nuevo en un momento?";
    }

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
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
