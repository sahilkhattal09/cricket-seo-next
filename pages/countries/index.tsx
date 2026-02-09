import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

interface Player {
  country: string;
}

interface CountriesPageProps {
  countries: string[];
  playerCounts: Record<string, number>; // Number of players per country
}

// Import your JSON data
const players: Player[] = require("../../data/players.json");

export default function CountriesPage({
  countries,
  playerCounts,
}: CountriesPageProps) {
  return (
    <>
      <Head>
        <title>All Countries | Cricket Players</title>
        <meta
          name="description"
          content="Explore cricket players by country."
        />
      </Head>

      <main className="bg-gradient-to-b from-blue-50 to-white p-8 sm:p-10">
        {/* Header / Hero */}
        <div className="max-w-5xl mx-auto text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
            Explore Countries
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Discover cricket players by country. Click a country to view
            detailed player stats.
          </p>
        </div>

        {/* Grid of Country Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {countries.map((country) => (
            <Link
              key={country}
              href={`/countries/${country.toLowerCase()}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {country}
                  </h2>
                  <p className="text-gray-500 mt-2">
                    {playerCounts[country]} Player
                    {playerCounts[country] > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium group-hover:bg-blue-200 transition-colors duration-300">
                    View Players
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

// SSR
export const getServerSideProps: GetServerSideProps = async () => {
  const countries = Array.from(new Set(players.map((p) => p.country)));

  // Count number of players per country
  const playerCounts: Record<string, number> = {};
  players.forEach((p) => {
    if (!playerCounts[p.country]) playerCounts[p.country] = 0;
    playerCounts[p.country]++;
  });

  return {
    props: { countries, playerCounts },
  };
};
