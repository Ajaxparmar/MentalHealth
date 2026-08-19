"use client";

import { useState } from "react";
import Chatbot from "../../components/Chatbot";

export default function Home() {
  const [selectedMood, setSelectedMood] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const moods = [
    { emoji: "😊", name: "Happy" },
    { emoji: "😌", name: "Calm" },
    { emoji: "🙂", name: "Good" },
    { emoji: "😐", name: "Okay" },
    { emoji: "😔", name: "Sad" },
    { emoji: "😟", name: "Stressed" },
  ];

  const activities = [
    {
      icon: "🎨",
      title: "Color Game",
      description:
        "Relax your mind with a simple color activity.",
      bg: "bg-purple-100",
      iconBg: "bg-purple-200",
    },
    {
      icon: "🧩",
      title: "Mind Game",
      description:
        "Give your mind a little challenge and have fun.",
      bg: "bg-blue-100",
      iconBg: "bg-blue-200",
    },
    {
      icon: "💚",
      title: "Calm Game",
      description:
        "Take a peaceful moment and slow things down.",
      bg: "bg-green-100",
      iconBg: "bg-green-200",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-gray-800">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Your safe space
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Home
            </h1>
          </div>

          <button
            type="button"
            className="
              w-11
              h-11
              rounded-full
              bg-white
              shadow-sm
              flex
              items-center
              justify-center
              hover:shadow-md
              transition
            "
          >
            🔍
          </button>
        </div>

        {/* ================= WELCOME CARD ================= */}

        <section
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-r
            from-purple-600
            to-indigo-500
            text-white
            p-7
            sm:p-10
            shadow-lg
            mb-8
          "
        >
          <div
            className="
              absolute
              -right-16
              -top-16
              w-44
              h-44
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              -right-5
              -bottom-20
              w-48
              h-48
              rounded-full
              bg-white/10
            "
          />

          <div className="relative z-10 max-w-2xl">
            <p className="text-purple-100 text-sm font-medium mb-2">
              🌿 A moment for yourself
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold">
              Welcome to your
              <br />
              Mental Health Space 💜
            </h2>

            <p className="mt-4 text-purple-100 leading-relaxed">
              Take a moment to check in with yourself.
              Understanding how you feel is the first step
              toward taking better care of your mind.
            </p>
          </div>
        </section>

        {/* ================= QUOTE ================= */}

        <section
          className="
            bg-white
            rounded-3xl
            p-6
            sm:p-8
            shadow-sm
            border
            border-gray-100
            mb-8
          "
        >
          <div className="flex gap-5 items-start">
            <div
              className="
                w-12
                h-12
                flex-shrink-0
                rounded-2xl
                bg-purple-100
                flex
                items-center
                justify-center
                text-2xl
              "
            >
              💜
            </div>

            <div>
              <p
                className="
                  text-lg
                  sm:text-xl
                  font-medium
                  text-gray-800
                  leading-relaxed
                "
              >
                “Your mental health is a priority.
                Your happiness is essential.
                Your self-care is necessary.”
              </p>

              <p className="text-sm text-gray-400 mt-3">
                — Take care of yourself, one day at a time.
              </p>
            </div>
          </div>
        </section>

        {/* ================= MOOD ================= */}

        <section className="mb-10">
          <div className="text-center mb-6">
            <p
              className="
                text-purple-600
                font-semibold
                text-sm
                uppercase
                tracking-wider
              "
            >
              Daily Check-In
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
              How do you feel today?
            </h2>

            <p className="text-gray-500 mt-2">
              Choose the feeling that best describes your mood.
            </p>
          </div>

          <div
            className="
              flex
              justify-center
              gap-3
              sm:gap-5
              flex-wrap
            "
          >
            {moods.map((mood) => (
              <button
                key={mood.name}
                type="button"
                onClick={() => setSelectedMood(mood.name)}
                className={`
                  w-20
                  h-24
                  sm:w-24
                  sm:h-28
                  rounded-2xl
                  flex
                  flex-col
                  items-center
                  justify-center
                  border-2
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:shadow-md
                  ${
                    selectedMood === mood.name
                      ? "bg-purple-100 border-purple-500 shadow-lg scale-105"
                      : "bg-white border-gray-100"
                  }
                `}
              >
                <span className="text-4xl sm:text-5xl">
                  {mood.emoji}
                </span>

                <span
                  className="
                    text-xs
                    sm:text-sm
                    font-medium
                    text-gray-600
                    mt-2
                  "
                >
                  {mood.name}
                </span>
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className="mt-6 text-center">
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-purple-50
                  text-purple-700
                  px-5
                  py-3
                  rounded-full
                  text-sm
                  font-medium
                "
              >
                💜 You're feeling{" "}
                {selectedMood.toLowerCase()} today
              </span>
            </div>
          )}
        </section>

        {/* ================= ACTIVITIES ================= */}

        <section className="mb-10">
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-purple-600 text-sm font-semibold">
                ACTIVITIES
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                Take a mindful break
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {activities.map((activity) => (
              <button
                key={activity.title}
                type="button"
                className={`
                  ${activity.bg}
                  text-left
                  rounded-3xl
                  p-6
                  border
                  border-white
                  hover:shadow-lg
                  hover:-translate-y-1
                  transition-all
                  duration-300
                `}
              >
                <div
                  className={`
                    ${activity.iconBg}
                    w-16
                    h-16
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    text-3xl
                    mb-5
                  `}
                >
                  {activity.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {activity.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {activity.description}
                </p>

                <div className="mt-5 text-sm font-semibold text-purple-700">
                  Start activity →
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ================= AI ASSISTANT ================= */}

        <section
          className="
            rounded-3xl
            bg-gradient-to-br
            from-green-50
            to-emerald-100
            border
            border-green-100
            p-7
            sm:p-9
            mb-10
          "
        >
          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              gap-6
            "
          >
            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-white
                shadow-sm
                flex
                items-center
                justify-center
                text-5xl
                flex-shrink-0
              "
            >
              🤖
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="text-green-600 text-sm font-semibold">
                YOUR AI COMPANION
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                Need someone to talk to?
              </h2>

              <p className="text-gray-600 mt-2">
                Share what you're feeling and take a moment
                to reflect. Your thoughts deserve to be heard.
              </p>
            </div>

            {/* ⭐ THIS BUTTON NOW OPENS THE CHATBOT */}

            <button
              type="button"
              onClick={() => setChatOpen(true)}
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                shadow-sm
                transition
                hover:shadow-md
                active:scale-95
              "
            >
              Talk to AI 💬
            </button>
          </div>
        </section>

        {/* ================= SELF CARE ================= */}

        <section className="mb-10">
          <div className="text-center mb-6">
            <p className="text-purple-600 text-sm font-semibold">
              SELF CARE
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Small things can make a difference
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              className="
                bg-white
                rounded-2xl
                p-5
                text-center
                shadow-sm
                border
                border-gray-100
              "
            >
              <div className="text-3xl">😴</div>
              <p className="font-medium mt-3 text-sm">
                Get enough sleep
              </p>
            </div>

            <div
              className="
                bg-white
                rounded-2xl
                p-5
                text-center
                shadow-sm
                border
                border-gray-100
              "
            >
              <div className="text-3xl">🚶</div>
              <p className="font-medium mt-3 text-sm">
                Stay active
              </p>
            </div>

            <div
              className="
                bg-white
                rounded-2xl
                p-5
                text-center
                shadow-sm
                border
                border-gray-100
              "
            >
              <div className="text-3xl">💧</div>
              <p className="font-medium mt-3 text-sm">
                Stay hydrated
              </p>
            </div>

            <div
              className="
                bg-white
                rounded-2xl
                p-5
                text-center
                shadow-sm
                border
                border-gray-100
              "
            >
              <div className="text-3xl">🧘</div>
              <p className="font-medium mt-3 text-sm">
                Take a breath
              </p>
            </div>
          </div>
        </section>

        {/* ================= FINAL MESSAGE ================= */}

        <section className="text-center py-8">
          <div className="text-4xl mb-4">
            🌱
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Be patient with yourself.
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Healing and growth take time. You don't have to
            have everything figured out today.
          </p>

          <p className="text-purple-600 font-semibold mt-5">
            “One small step is still a step forward.” 💜
          </p>
        </section>

        {/* ================= FOOTER ================= */}

        <footer
          className="
            border-t
            border-gray-200
            pt-6
            pb-4
            text-center
          "
        >
          <p className="text-sm text-gray-400">
            🧠 Mental Health Assistant
          </p>

          <p className="text-xs text-gray-400 mt-2">
            A space for reflection and general well-being.
          </p>
        </footer>
      </div>

      {/* ================= CHATBOT ================= */}

      <Chatbot
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </main>
  );
}