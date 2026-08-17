import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">

      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-16">

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>

            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-5 py-2 rounded-full font-medium mb-6">
              🌿 A Safe Space For Your Well-Being
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900">

              Welcome to
              <br />

              <span className="text-purple-600">
                MentalHealth
              </span>

            </h1>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-5">
              Your mind matters.
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mt-6 max-w-xl">
              Take a moment for yourself. Understand your emotions,
              reflect on your feelings, and discover simple ways to
              support your mental well-being.
            </p>

            <p className="text-gray-500 mt-4 max-w-xl">
              Our platform provides a comfortable space where you can
              answer thoughtful questions, understand your responses,
              and receive supportive guidance.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                href="/register"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition duration-300"
              >
                Get Started →
              </Link>

              <Link
                href="/login"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-xl font-semibold text-lg transition duration-300"
              >
                Login
              </Link>

            </div>

            {/* TRUST MESSAGE */}
            <div className="flex flex-wrap gap-6 mt-8 text-gray-500">

              <div className="flex items-center gap-2">
                <span className="text-xl">🔒</span>
                <span>Private & Secure</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xl">💜</span>
                <span>Supportive Environment</span>
              </div>

            </div>

          </div>


          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">

            {/* Background Circle */}
            <div className="absolute w-80 h-80 md:w-[480px] md:h-[480px] bg-purple-200 rounded-full opacity-50 blur-2xl">
            </div>

            {/* Image Card */}
            <div className="relative bg-white p-4 rounded-[35px] shadow-2xl max-w-lg">

              <img
                src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80"
                alt="Person relaxing and taking care of mental wellness"
                className="rounded-[25px] w-full h-[400px] object-cover"
              />

              {/* Floating Card */}
              <div className="absolute -left-8 top-16 bg-white shadow-xl rounded-2xl px-5 py-4 flex items-center gap-3">

                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                  💜
                </div>

                <div>
                  <p className="font-bold text-gray-800">
                    You are not alone
                  </p>

                  <p className="text-sm text-gray-500">
                    Your feelings matter
                  </p>
                </div>

              </div>


              {/* Bottom Card */}
              <div className="absolute -right-6 bottom-10 bg-white shadow-xl rounded-2xl px-5 py-4">

                <p className="font-semibold text-gray-800">
                  🌱 One step at a time
                </p>

                <p className="text-sm text-gray-500">
                  Take care of yourself
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= ABOUT SECTION ================= */}
      <section className="bg-white py-20 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <p className="text-purple-600 font-semibold tracking-widest">
            UNDERSTANDING MENTAL HEALTH
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            Your mental health deserves attention.
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
            Mental health affects how we think, feel, behave, manage
            stress, build relationships, and respond to everyday
            experiences. Taking care of your mental well-being is
            an important part of living a healthy and balanced life.
          </p>


          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">

            {/* CARD 1 */}
            <div className="bg-purple-50 rounded-3xl p-8 hover:shadow-xl transition">

              <div className="text-5xl mb-5">
                🧠
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Understand Your Mind
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Learn to recognize your emotions, thoughts and
                everyday experiences.
              </p>

            </div>


            {/* CARD 2 */}
            <div className="bg-blue-50 rounded-3xl p-8 hover:shadow-xl transition">

              <div className="text-5xl mb-5">
                🌿
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Manage Stress
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Discover healthy habits that can help you manage
                everyday stress and challenges.
              </p>

            </div>


            {/* CARD 3 */}
            <div className="bg-pink-50 rounded-3xl p-8 hover:shadow-xl transition">

              <div className="text-5xl mb-5">
                💬
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Express Your Feelings
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Taking time to acknowledge and express your feelings
                can be an important part of self-care.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-50 to-blue-50">

        <div className="max-w-6xl mx-auto text-center">

          <p className="text-purple-600 font-semibold tracking-widest">
            HOW IT WORKS
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            A simple journey toward self-awareness
          </h2>


          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <div className="bg-white rounded-3xl p-8 shadow-md">

              <div className="text-4xl font-bold text-purple-600">
                01
              </div>

              <h3 className="text-xl font-bold mt-4">
                Create Your Account
              </h3>

              <p className="text-gray-600 mt-3">
                Register to begin your personal well-being journey.
              </p>

            </div>


            <div className="bg-white rounded-3xl p-8 shadow-md">

              <div className="text-4xl font-bold text-purple-600">
                02
              </div>

              <h3 className="text-xl font-bold mt-4">
                Answer Questions
              </h3>

              <p className="text-gray-600 mt-3">
                Answer simple questions about your thoughts,
                emotions and daily experiences.
              </p>

            </div>


            <div className="bg-white rounded-3xl p-8 shadow-md">

              <div className="text-4xl font-bold text-purple-600">
                03
              </div>

              <h3 className="text-xl font-bold mt-4">
                Understand Your Results
              </h3>

              <p className="text-gray-600 mt-3">
                Reflect on your responses and receive supportive
                guidance.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="py-24 px-6 bg-purple-600 text-white text-center">

        <div className="max-w-3xl mx-auto">

          <div className="text-5xl">
            💜
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mt-5">
            Take the first step today.
          </h2>

          <p className="text-purple-100 text-lg mt-5">
            Give yourself a few moments to reflect, understand
            and care for your mental well-being.
          </p>

          <Link
            href="/register"
            className="inline-block mt-8 bg-white text-purple-600 px-9 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
          >
            Start Your Journey →
          </Link>

        </div>

      </section>


      {/* ================= DISCLAIMER ================= */}
      <section className="bg-gray-50 py-8 px-6">

        <div className="max-w-4xl mx-auto text-center">

          <p className="text-sm text-gray-500 leading-relaxed">
            <strong>Important:</strong> This website is designed for
            self-reflection and general well-being awareness. It is
            not intended to diagnose, treat, or replace professional
            mental-health care.
          </p>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-white py-10 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <div className="text-2xl font-bold">
            🧠 MentalHealth
          </div>

          <p className="text-gray-400 mt-3">
            Your mind matters. Take care of yourself.
          </p>

          <div className="border-t border-gray-700 mt-8 pt-6">

            <p className="text-gray-500 text-sm">
              © 2026 MentalHealth. All rights reserved.
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
}