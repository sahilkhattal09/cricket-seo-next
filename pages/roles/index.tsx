import Link from "next/link";
import players from "../../data/players.json";
import Head from "next/head";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function RolesPage() {
  const roles = Array.from(new Set(players.map((p) => p.role)));

  return (
    <>
      <Head>
        <title>Browse Roles | Cricket Stats</title>
        <meta
          name="description"
          content="Browse cricket players by roles like Batsman, Bowler, All-Rounder."
        />
        <link rel="canonical" href={`${SITE_URL}/roles`} />
      </Head>

      <main className="bg-gradient-to-b from-blue-50 to-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-8 text-center">
            Browse by Role
          </h1>

          <div className="flex flex-wrap gap-4 justify-center">
            {roles.map((r) => (
              <Link
                key={r}
                href={`/roles/${r.toLowerCase()}`}
                className="bg-white border border-gray-200 rounded-xl px-6 py-3 hover:shadow-md transition"
              >
                {r}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
