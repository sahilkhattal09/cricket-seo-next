// pages/roles/[role].tsx
import players from "../../data/players.json";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function getServerSideProps(context: {
  params: { role: string };
}) {
  const { role } = context.params;

  const rolePlayers = players.filter(
    (p) => p.role.toLowerCase() === role.toLowerCase(),
  );

  if (rolePlayers.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      role: rolePlayers[0].role, // display role properly
      players: rolePlayers,
    },
  };
}

export default function RolePage({ role, players }: any) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${role} Cricket Players`,
    description: `List of cricket players with role: ${role}.`,
    url: `${SITE_URL}/roles/${role.toLowerCase()}`,
    itemListElement: players.map((p: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      name: p.name,
      url: `${SITE_URL}/players/${p.slug}`,
    })),
  };

  return (
    <>
      <Head>
        <title>{role} Cricket Players | Player Stats</title>
        <meta
          name="description"
          content={`View all cricket players who are ${role}, with their matches, runs, and stats.`}
        />
        <link
          rel="canonical"
          href={`${SITE_URL}/roles/${role.toLowerCase()}`}
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${role} Cricket Players`} />
        <meta
          property="og:description"
          content={`View all cricket players who are ${role}, with their matches, runs, and stats.`}
        />
        <meta
          property="og:url"
          content={`${SITE_URL}/roles/${role.toLowerCase()}`}
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="bg-gradient-to-b from-blue-50 to-white py-10">
        <div className="max-w-6xl mx-auto px-6 pt-12">
          {/* Adjusted header */}
          <h1 className="text-3xl sm:text-3xl font-semibold text-gray-900 mb-8 text-center">
            {role} Players
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {players.map((player: any) => (
              <motion.div
                key={player.slug}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <Link href={`/players/${player.slug}`} className="block p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-36 h-36 relative rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                      <img
                        src={player.image}
                        alt={player.name}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <h2 className="text-lg font-medium text-gray-900 text-center">
                      {player.name}
                    </h2>
                    <p className="text-gray-500 mt-1">{player.country}</p>

                    <div className="mt-3 flex flex-col gap-1 text-gray-600 text-sm text-center">
                      <span>🏏 {player.runs} Runs</span>
                      <span>🗓 {player.matches} Matches</span>
                    </div>

                    <span className="mt-4 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                      {player.role}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
