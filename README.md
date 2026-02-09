Cricket Player Stats – Next.js SSR Project
Project Overview

This project is a server-side rendered (SSR) React website built with Next.js. It dynamically generates SEO-friendly pages for cricket players, countries, and roles using a JSON dataset.

The website is fully optimized for SEO with:

Dynamic titles and meta descriptions

OpenGraph metadata for social sharing

JSON-LD structured data

Server-side rendering for faster indexing

The UI is premium, responsive, and interactive, using Tailwind CSS and Framer Motion for animations.

Features

Dynamic Pages:

/players/[slug] – Individual player profile

/countries/[country] – List of players by country

/roles/[role] – List of players by role

SEO Optimization:

Dynamic <title> and <meta> description

Canonical URLs

OpenGraph metadata for social sharing

JSON-LD structured data for rich results

Premium UI:

Responsive grid layouts for players

Hover effects and card animations using Framer Motion

Profile images with rounded, shadowed styles

Breadcrumb navigation

Data-driven:

Uses a JSON file (players.json) containing player stats

Programmatic generation of SEO-friendly pages

Folder Structure
cricket-stats/
├── public/                  # Static images
│   ├── virat.jpg
│   ├── rohit.jpg
│   └── ...other player images
│
├── data/                    # Player JSON dataset
│   └── players.json
│
├── components/              # Reusable UI components
│   ├── Stat.tsx             # Animated stats card
│   ├── Header.tsx
│   └── ...other components
│
├── pages/                    # Next.js pages
│   ├── index.tsx             # Homepage
│   ├── countries/
│   │   ├── index.tsx         # All countries
│   │   └── [country].tsx     # Country-specific pages
│   ├── players/
│   │   └── [slug].tsx        # Player profile pages
│   └── roles/
│       └── index.tsx         # Roles page
│
├── styles/                  # Tailwind or global styles
│   └── globals.css
├── .env.local               # Environment variables (NEXT_PUBLIC_SITE_URL)
├── next.config.js
├── package.json
└── README.md

SEO Optimization & Keyword Research
Keyword Research

Targeted cricket stats and profiles keywords:

“cricket player stats”

“[Player Name] stats”

“[Country] cricket players”

“cricket player profile”

Process:

Used Google Keyword Planner & Ubersuggest to find high-volume, relevant keywords.

Focused on long-tail keywords for individual players and countries.

Selected keywords that match typical search queries for cricket fans.

SEO Implementation

Dynamic Meta Tags: <title>, <meta description>, canonical URLs

OpenGraph Tags: Social sharing with og:title, og:description, og:image, og:url

JSON-LD Structured Data:

Person schema for player pages

ItemList schema for country pages

Breadcrumb Navigation to improve usability and search engine understanding

Server-Side Rendering (SSR) using getServerSideProps for better indexing

Installation & Setup

Clone the repository:

git clone https://github.com/yourusername/cricket-stats.git
cd cricket-stats


Install dependencies:

npm install


or

yarn install


Run the development server:

npm run dev


or

yarn dev


Open http://localhost:3000
 to view the site.