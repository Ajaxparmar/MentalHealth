import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();

    const messages = body.messages;

    // Check messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    // Keep only valid messages
    const validMessages = messages
      .filter(
        (item) =>
          item &&
          (item.role === "user" || item.role === "assistant") &&
          typeof item.content === "string" &&
          item.content.trim()
      )
      .map((item) => ({
        role: item.role,
        content: item.content,
      }));

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
You are a friendly Mental Health AI Assistant.

Your purpose is to provide general emotional support and
wellness guidance.

Rules:
- Be kind, calm and empathetic.
- Listen carefully to what the user says.
- Give simple and practical wellness suggestions.
- Do not diagnose mental health conditions.
- Do not pretend to be a doctor or therapist.
- Encourage professional help when appropriate.
- Never judge the user.
- Keep responses understandable and supportive.
          `,
        },

        ...validMessages,
      ],

      model: "openai/gpt-oss-20b",
    });

    const reply =
      chatCompletion.choices?.[0]?.message?.content ||
      "I'm here to listen. Tell me what's on your mind. 💜";

    return NextResponse.json({
      reply,
    });

  } catch (error) {
    console.error("Groq API Error:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to get a response from the AI assistant.",
      },
      { status: 500 }
    );
  }
}