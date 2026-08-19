import Link from "next/link";


export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-purple-100 bg-white shadow-sm">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-500 text-2xl shadow-md">
            🧠
          </div>

          <div>
            <h1 className="text-xl font-bold">
              <span className="text-purple-600">
                Mental
              </span>
              <span className="text-gray-800">
                Health
              </span>
            </h1>

            <p className="text-[9px] tracking-widest text-gray-400">
              WELL-BEING ASSISTANT
            </p>
          </div>

        </Link>


        {/* Menu */}
        <div className="hidden items-center gap-2 md:flex">

          <Link
            href="/pages/Home"
            className="rounded-xl px-4 py-2 font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-600"
          >
            🏠 Home
          </Link>

          <Link
            href="/pages/Contact"
            className="rounded-xl px-4 py-2 font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-600"
          >
            💬 Contact
          </Link>

          <Link
            href="/login"
            className="rounded-xl px-4 py-2 font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-600"
          >
            🔐 Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 font-semibold text-white shadow-md hover:from-purple-700 hover:to-indigo-700"
          >
            ✨ Register
          </Link>

        </div>

      </div>

    </nav>
  );
}