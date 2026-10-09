import { NextRequest } from "next/server";
import { answerRoleClarification, buildAssistantContext, sanitizeConversation } from "@/lib/assistant-context";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = sanitizeConversation(body.messages);
    if (!messages.length || messages.at(-1)?.role !== "user") return Response.json({ error: "A user question is required." }, { status: 400 });
    const clarification = answerRoleClarification(messages);
    if (clarification) return new Response(`data: 0:${JSON.stringify(clarification)}\n\n`, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" } });
    const context = buildAssistantContext();

    const backendUrl = process.env.BACKEND_API_URL || "http://127.0.0.1:8000/chat";

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // A leading server-owned system message also updates older deployed backends
        // that ignore the newer portfolio_context field.
        messages: [{ role: "system", content: context }, ...messages],
        portfolio_context: context,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: `Backend failed: ${errorText}` }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Stream the response back directly to the client
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "x-vercel-ai-data-stream": "v1",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown chat error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
