import Stat from "@/components/Stat";
import players from "../../data/players.json";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function getServerSideProps(context: {
  params: { slug: string };
}) {
  const { slug } = context.params;
  const player = players.find((p) => p.slug === slug);

  if (!player) {
    return { notFound: true };
  }

  return {
    props: { player },
  };
}

export default function PlayerPage({ player }: any) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: player.name,
    description: player.description,
    nationality: player.country,
    jobTitle: player.role || "Cricket Player",
    image: `${SITE_URL}${player.image}`,
    url: `${SITE_URL}/players/${player.slug}`,
  };

  return (
    <>
      <Head>
        <title>{`${player.name} Profile | Cricket Stats`}</title>
        <meta
          name="description"
          content={
            player.description ||
            `${player.name} is a professional cricketer. View profile, role, matches, and career stats.`
          }
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/players/${player.slug}`} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={player.name} />
        <meta
          property="og:description"
          content={
            player.description || `${player.name} cricket profile and stats`
          }
        />
        <meta property="og:image" content={`${SITE_URL}${player.image}`} />
        <meta
          property="og:url"
          content={`${SITE_URL}/players/${player.slug}`}
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* PAGE */}
      <main className=" bg-gradient-to-b from-blue-50 to-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-gray-800">
              Home
            </Link>
            <span>/</span>
            <Link href="/countries" className="hover:text-gray-800">
              Countries
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{player.name}</span>
          </nav>

          {/* Player Card */}
          <section className="bg-white shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transition-shadow duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-md">
                {player.name}
              </h1>
              <p className="mt-1 text-sm sm:text-base text-gray-200">
                {player.role} · {player.country}
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Image */}
                <div className="flex justify-center md:justify-start">
                  <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src={player.image}
                      alt={`Profile of ${player.name}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    Player Overview
                  </h2>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">
                    {player.description || "Player biography coming soon."}
                  </p>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <Stat label="Country" value={player.country} />
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <Stat label="Role" value={player.role} />
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <Stat label="Matches" value={player.matches} animate />
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <Stat label="Runs" value={player.runs} animate />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
