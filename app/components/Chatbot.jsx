"use client";

import { useState } from "react";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! 💜 I'm your mental health assistant. How are you feeling today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            data.reply ||
            "Sorry, I couldn't respond right now.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">

      <div className="max-w-3xl mx-auto">

        {/* Header */}

        <div className="text-center mb-8">

          <div className="text-5xl mb-3">
            🧠
          </div>

          <h1 className="text-3xl font-bold text-purple-700">
            Mental Health AI Assistant
          </h1>

          <p className="text-gray-500 mt-2">
            A safe space to share your thoughts and feelings 💜
          </p>

        </div>


        {/* Chat Box */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100">

          {/* Messages */}

          <div className="h-[500px] overflow-y-auto p-6 space-y-4">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] px-5 py-3 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-purple-50 text-gray-800 rounded-bl-none"
                  }`}
                >

                  {msg.role === "assistant" && (
                    <div className="text-sm font-semibold text-purple-600 mb-1">
                      🧠 AI Assistant
                    </div>
                  )}

                  <p className="leading-relaxed">
                    {msg.text}
                  </p>

                </div>

              </div>

            ))}


            {loading && (
              <div className="flex justify-start">

                <div className="bg-purple-50 px-5 py-3 rounded-2xl">
                  <span className="animate-pulse">
                    🧠 Thinking...
                  </span>
                </div>

              </div>
            )}

          </div>


          {/* Input */}

          <div className="border-t p-4 bg-gray-50">

            <div className="flex gap-3">

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="How are you feeling today?"
                className="flex-1 px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                {loading ? "..." : "Send 💜"}
              </button>

            </div>

          </div>

        </div>


        {/* Disclaimer */}

        <p className="text-center text-xs text-gray-400 mt-5">
          This AI assistant provides general support and
          self-reflection guidance. It is not a substitute
          for professional mental-health care.
        </p>

      </div>

    </div>
  );
}