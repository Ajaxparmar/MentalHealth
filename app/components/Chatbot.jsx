"use client";

import { useEffect, useRef, useState } from "react";

export default function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi 💜 I'm here to listen. You can share whatever is on your mind.",
    },
  ]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Automatically scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Close chatbot with Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Send message to backend
  const sendMessage = async (event) => {
    event?.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    const userMessage = {
      role: "user",
      content: trimmedMessage,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to get a response right now."
        );
      }

      const assistantMessage = {
        role: "assistant",
        content:
          data?.reply ||
          "I'm here to listen. Tell me what's on your mind.",
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content:
            "I'm sorry, I couldn't respond right now. Please check the connection and try again. 💜",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Chatbot window */}
      <div
        className="
          fixed
          z-[100]
          bottom-4
          right-4
          sm:bottom-6
          sm:right-6
          w-[calc(100%-2rem)]
          sm:w-[420px]
          h-[620px]
          max-h-[calc(100vh-2rem)]
          bg-white
          rounded-3xl
          shadow-2xl
          border
          border-gray-100
          overflow-hidden
          flex
          flex-col
        "
      >
        {/* ================= HEADER ================= */}

        <div
          className="
            bg-gradient-to-r
            from-purple-600
            to-indigo-500
            text-white
            px-5
            py-4
            flex
            items-center
            justify-between
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-white/20
                flex
                items-center
                justify-center
                text-2xl
              "
            >
              🤖
            </div>

            <div>
              <h2 className="font-bold text-lg">
                AI Companion
              </h2>

              <p className="text-xs text-purple-100">
                Here to listen and support you
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close chatbot"
            className="
              w-9
              h-9
              rounded-full
              bg-white/10
              hover:bg-white/20
              flex
              items-center
              justify-center
              text-xl
              transition
            "
          >
            ✕
          </button>
        </div>

        {/* ================= DISCLAIMER ================= */}

        <div
          className="
            px-4
            py-3
            bg-purple-50
            border-b
            border-purple-100
            text-xs
            text-purple-700
          "
        >
          💜 This is a general wellness assistant, not a doctor
          or therapist.
        </div>

        {/* ================= MESSAGES ================= */}

        <div
          className="
            flex-1
            overflow-y-auto
            p-4
            space-y-4
            bg-gray-50
          "
        >
          {messages.map((item, index) => {
            const isUser = item.role === "user";

            return (
              <div
                key={`${item.role}-${index}`}
                className={`flex ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[82%]
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    leading-relaxed
                    ${
                      isUser
                        ? "bg-purple-600 text-white rounded-br-md"
                        : "bg-white text-gray-700 border border-gray-100 shadow-sm rounded-bl-md"
                    }
                  `}
                >
                  {item.content}
                </div>
              </div>
            );
          })}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start">
              <div
                className="
                  bg-white
                  border
                  border-gray-100
                  shadow-sm
                  rounded-2xl
                  rounded-bl-md
                  px-4
                  py-3
                  text-sm
                  text-gray-500
                "
              >
                <div className="flex items-center gap-1">
                  <span className="animate-bounce">●</span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  >
                    ●
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  >
                    ●
                  </span>

                  <span className="ml-2">
                    Thinking...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ================= INPUT ================= */}

        <form
          onSubmit={sendMessage}
          className="
            p-3
            bg-white
            border-t
            border-gray-100
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              bg-gray-50
              border
              border-gray-200
              rounded-2xl
              p-2
              focus-within:border-purple-400
              focus-within:ring-2
              focus-within:ring-purple-100
              transition
            "
          >
            <input
              type="text"
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Share what's on your mind..."
              disabled={loading}
              className="
                flex-1
                bg-transparent
                outline-none
                px-2
                py-2
                text-sm
                text-gray-700
                placeholder:text-gray-400
                disabled:opacity-50
              "
            />

            <button
              type="submit"
              disabled={!message.trim() || loading}
              className="
                w-10
                h-10
                rounded-xl
                bg-purple-600
                hover:bg-purple-700
                disabled:bg-gray-300
                disabled:cursor-not-allowed
                text-white
                flex
                items-center
                justify-center
                transition
              "
              aria-label="Send message"
            >
              ➤
            </button>
          </div>

          <p className="text-[10px] text-gray-400 text-center mt-2">
            For general wellness support only.
          </p>
        </form>
      </div>
    </>
  );
}