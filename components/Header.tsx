import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 tracking-tight hover:text-blue-600 transition"
        >
          CricketStats
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          {/* Optional tagline */}
          <span className="hidden sm:inline text-gray-500">
            Programmatic SEO Demo
          </span>

          {/* Main Links */}
          <Link
            href="/"
            className="font-medium text-blue-600 hover:text-blue-700 transition"
          >
            Players
          </Link>

          <Link
            href="/countries"
            className="font-medium text-blue-600 hover:text-blue-700 transition"
          >
            Countries
          </Link>

          <Link
            href="/roles"
            className="font-medium text-blue-600 hover:text-blue-700 transition"
          >
            Roles
          </Link>
        </nav>
      </div>
    </header>
  );
}
