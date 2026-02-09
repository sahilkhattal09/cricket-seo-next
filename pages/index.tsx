import Link from "next/link";
import Head from "next/head";
import players from "../data/players.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Pick the first 6 players as featured (or top by runs)
const featuredPlayers = [...players]
  .sort((a, b) => b.runs - a.runs)
  .slice(0, 6);

export default function Home() {
  // Unique countries & roles for navigation
  const countries = Array.from(new Set(players.map((p) => p.country)));
  const roles = Array.from(new Set(players.map((p) => p.role)));

  // JSON-LD for featured players
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Cricket Players",
    description: "SEO optimized list of featured cricket players.",
    url: SITE_URL,
    itemListElement: featuredPlayers.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: p.name,
      url: `${SITE_URL}/players/${p.slug}`,
    })),
  };

  return (
    <>
      <Head>
        <title>Cricket Player Stats & Profiles | Programmatic SEO</title>
        <meta
          name="description"
          content="Explore cricket player profiles, statistics, and career records. SEO optimized Next.js SSR project."
        />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:title" content="Cricket Player Profiles" />
        <meta
          property="og:description"
          content="SEO optimized cricket player stats pages built with Next.js SSR."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content="/og-image.png" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* HERO SECTION */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-10 pt-24">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Cricket Player Profiles
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl">
            Discover international cricket players, their roles, and career
            statistics through SEO-optimized server-side rendered pages.
          </p>
        </div>
      </section>

      {/* FEATURED PLAYERS */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Featured Players
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPlayers.map((p) => (
            <article key={p.slug}>
              <Link
                href={`/players/${p.slug}`}
                aria-label={`View profile of ${p.name}`}
                className="group bg-white rounded-2xl border border-gray-200 p-6
                           hover:shadow-xl hover:-translate-y-1 hover:bg-gray-50
                           transition-all duration-300 block"
              >
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-full bg-blue-100 text-blue-700
                             flex items-center justify-center font-semibold text-lg mb-4"
                >
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                {/* Name */}
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                  {p.name}
                </h3>

                {/* Country */}
                <p className="mt-1 text-sm text-gray-500">{p.country}</p>

                {/* Stats */}
                <p className="mt-3 text-sm text-gray-600">
                  Matches played:{" "}
                  <span className="font-medium text-gray-800">{p.matches}</span>
                </p>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                    {p.role}
                  </span>

                  <span className="text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition">
                    View →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* BROWSE BY COUNTRY */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Browse by Country</h2>
        <div className="flex flex-wrap gap-4">
          {countries.map((c) => (
            <Link
              key={c}
              href={`/countries/${c.toLowerCase()}`}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 hover:shadow-md transition"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* BROWSE BY ROLE */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Browse by Role</h2>
        <div className="flex flex-wrap gap-4">
          {roles.map((r) => (
            <Link
              key={r}
              href={`/roles/${r.toLowerCase()}`}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 hover:shadow-md transition"
            >
              {r}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
