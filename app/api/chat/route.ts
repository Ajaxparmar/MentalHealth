import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `
You are a friendly mental wellness assistant.

Your job is to:
- Listen carefully and respond with empathy.
- Help users reflect on their feelings.
- Suggest simple healthy coping strategies such as breathing,
  taking a break, journaling, talking to someone trusted, or relaxing.
- Never diagnose mental health conditions.
- Do not pretend to be a doctor or therapist.
- Encourage users to talk to a trusted adult or qualified professional
  when they need additional support.
- Keep responses clear, warm and not too long.
          `,
        },
        ...messages,
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "I'm here to listen. Tell me what's on your mind.";

    return Response.json({ reply });
  } catch (error) {
    console.error("Groq error:", error);

    return Response.json(
      { error: "Unable to get a response right now." },
      { status: 500 }
    );
  }
}