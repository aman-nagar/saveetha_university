/**
 * Sitemap Generator for Saveetha Amaravati University
 * This utility generates a sitemap.xml file at build time
 *
 * Usage:
 * - Called from build script in package.json
 * - Generates dist/sitemap.xml with all public routes
 *
 * Why this helps SEO:
 * - Google finds all pages faster
 * - Helps with crawl efficiency
 * - Provides lastModified and priority info
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define all public routes that should be indexed
// These are the only routes Google should crawl
const PUBLIC_ROUTES = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
    description: "Home Page",
  },
  {
    path: "/about",
    priority: "0.9",
    changefreq: "monthly",
    description: "About Us",
  },
  {
    path: "/contact",
    priority: "0.8",
    changefreq: "monthly",
    description: "Contact Us",
  },
  {
    path: "/wiep-Form",
    priority: "0.9",
    changefreq: "weekly",
    description: "Apply for WIEP Franchise",
  },
  {
    path: "/apply-admission",
    priority: "0.9",
    changefreq: "weekly",
    description: "Student Admissions",
  },
  {
    path: "/academics",
    priority: "0.8",
    changefreq: "monthly",
    description: "Academics",
  },
  {
    path: "/gallery",
    priority: "0.7",
    changefreq: "monthly",
    description: "Gallery",
  },
  {
    path: "/news",
    priority: "0.7",
    changefreq: "weekly",
    description: "News & Updates",
  },
];

// Base URL of your website
const BASE_URL = "https://saveethaamaravatiuniversity.ac.in";

/**
 * Generate XML for a single URL entry
 */
function generateUrlEntry(route) {
  const url = `${BASE_URL}${route.path}`;
  const lastmod = new Date().toISOString().split("T")[0];

  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
}

/**
 * Generate complete sitemap.xml
 */
function generateSitemap() {
  const urlEntries = PUBLIC_ROUTES.map((route) => generateUrlEntry(route)).join(
    "\n",
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>`;

  return sitemap;
}

/**
 * Write sitemap to dist folder
 * Called during build process
 */
export function writeSitemap() {
  try {
    const distDir = path.resolve(__dirname, "../../dist");

    // Create dist directory if it doesn't exist
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    const sitemapPath = path.join(distDir, "sitemap.xml");
    const sitemapContent = generateSitemap();

    fs.writeFileSync(sitemapPath, sitemapContent, "utf8");

    console.log("✅ Sitemap generated successfully at:", sitemapPath);
    console.log(`📍 Routes included: ${PUBLIC_ROUTES.length}`);

    return true;
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    return false;
  }
}

/**
 * Generate sitemap object for inspection
 * Useful for testing
 */
export function getSitemapData() {
  return {
    baseUrl: BASE_URL,
    routes: PUBLIC_ROUTES,
    totalUrls: PUBLIC_ROUTES.length,
    lastGenerated: new Date().toISOString(),
  };
}

// If run directly (not imported), generate sitemap
if (import.meta.url === `file://${process.argv[1]}`) {
  writeSitemap();
}
