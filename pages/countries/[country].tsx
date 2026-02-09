// pages/countries/[country].tsx
import players from "../../data/players.json";
import Head from "next/head";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function getServerSideProps(context: {
  params: { country: string };
}) {
  const { country } = context.params;

  const countryPlayers = players.filter(
    (p) => p.country.toLowerCase() === country.toLowerCase(),
  );

  if (countryPlayers.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      country: countryPlayers[0].country, // display country name properly
      players: countryPlayers,
    },
  };
}

export default function CountryPage({ country, players }: any) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${country} Cricket Players`,
    description: `List of cricket players from ${country}.`,
    url: `${SITE_URL}/countries/${country.toLowerCase()}`,
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
        <title>{country} Cricket Players | Player Stats</title>
        <meta
          name="description"
          content={`View all cricket players from ${country}, their roles, matches, and career stats.`}
        />
        <link
          rel="canonical"
          href={`${SITE_URL}/countries/${country.toLowerCase()}`}
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${country} Cricket Players`} />
        <meta
          property="og:description"
          content={`View all cricket players from ${country}, their roles, matches, and career stats.`}
        />
        <meta
          property="og:url"
          content={`${SITE_URL}/countries/${country.toLowerCase()}`}
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-8 text-center">
            {country} Cricket Players
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {players.map((player: any) => (
              <Link
                key={player.slug}
                href={`/players/${player.slug}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center"
              >
                <div className="w-32 h-32 relative rounded-full overflow-hidden mb-4 border border-gray-200">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-center">
                  {player.name}
                </h2>
                <span className="text-sm text-gray-500 mt-1">
                  {player.role}
                </span>
                <div className="mt-2 flex gap-4 text-sm text-gray-600">
                  <span>🏏 {player.runs} Runs</span>
                  <span>🗓 {player.matches} Matches</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
