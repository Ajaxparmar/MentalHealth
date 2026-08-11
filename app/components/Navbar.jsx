import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <h1 className="text-xl font-bold">
          <Link href="/">Mental Health</Link>
        </h1>

        <div className="flex gap-6">
          <Link href="/pages/Home" className="hover:text-blue-200">
            Home
          </Link>

          <Link href="/pages/Contact" className="hover:text-blue-200">
            Contact
          </Link>

          <a href="/login" className="hover:text-blue-200">
            Login
          </a>

          <a
            href="/register"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
          >
            Register
          </a>
        </div>

      </div>
    </nav>
  );
}