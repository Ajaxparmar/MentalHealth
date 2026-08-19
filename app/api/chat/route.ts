import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
You are a friendly mental health support assistant.

Your job is to:
- Listen to the user's feelings.
- Respond with empathy and kindness.
- Give general wellness and self-care suggestions.
- Encourage the user to talk to a trusted person or qualified professional when appropriate.
- Never claim to diagnose a mental health condition.
- Keep responses simple, supportive and easy to understand.
        `,
        },
        {
          role: "user",
          content: message,
        },
      ],

      model: "openai/gpt-oss-20b",
    });

    const reply =
      chatCompletion.choices[0]?.message?.content ||
      "I'm here to listen. Tell me how you're feeling.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Groq Error:", error);

    return NextResponse.json(
      { error: "Something went wrong with the AI assistant." },
      { status: 500 }
    );
  }
}