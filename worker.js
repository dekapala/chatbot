const SYSTEM_PROMPT =
  "Sos Sofi, la asistente virtual de Easybot, un chatbot para PyMEs (WhatsApp, Instagram y web). " +
  "Respondé en español rioplatense, con buena onda y breve (2 a 4 líneas máximo). " +
  "Ayudás con consultas típicas de un negocio: productos, envíos, medios de pago, turnos y horarios. " +
  "Si te preguntan algo muy específico del negocio que no sabés, decilo con onda y sugerí dejar el dato " +
  "para que el equipo lo cargue en Easybot.";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/chat" && request.method === "POST") {
      return handleChat(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleChat(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { message, history } = body;
  if (!message || typeof message !== "string") {
    return Response.json({ error: "Falta 'message'" }, { status: 400 });
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...(Array.isArray(history) ? history.slice(-6) : []),
    { role: "user", content: message },
  ];

  try {
    const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      messages,
    });

    return Response.json({ reply: result.response ?? "" });
  } catch (err) {
    return Response.json(
      { error: "No se pudo generar la respuesta", detail: String(err?.message ?? err) },
      { status: 502 },
    );
  }
}
