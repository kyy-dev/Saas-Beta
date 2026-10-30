const fs = require("node:fs/promises");
const path = require("node:path");

const frontendDirectory = path.resolve(__dirname, "..", "Frontend");

function parseSiteUrl(value) {
  let siteUrl;
  try {
    siteUrl = new URL(value);
  } catch {
    throw new Error("Provide the public site URL, for example https://pixelshift.id.");
  }

  if (
    siteUrl.protocol !== "https:" ||
    siteUrl.username ||
    siteUrl.password ||
    siteUrl.pathname !== "/" ||
    siteUrl.search ||
    siteUrl.hash
  ) {
    throw new Error("The site URL must be an HTTPS origin without a path, query, or fragment.");
  }

  return siteUrl.origin;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function updateCanonical(html, canonicalUrl) {
  const canonicalTag = `    <link rel="canonical" href="${canonicalUrl}">`;
  const canonicalPattern = /^\s*<link rel="canonical" href="[^"]*">\s*$/m;

  if (canonicalPattern.test(html)) {
    return html.replace(canonicalPattern, canonicalTag);
  }

  if (!html.includes("</head>")) {
    throw new Error("Could not find the closing head tag to add a canonical URL.");
  }

  return html.replace("</head>", `${canonicalTag}\n  </head>`);
}

async function generate(siteOrigin) {
  const homePath = path.join(frontendDirectory, "index.html");
  const pdfPath = path.join(frontendDirectory, "pdf.html");
  const robotsPath = path.join(frontendDirectory, "robots.txt");
  const sitemapPath = path.join(frontendDirectory, "sitemap.xml");
  const [homeHtml, pdfHtml] = await Promise.all([
    fs.readFile(homePath, "utf8"),
    fs.readFile(pdfPath, "utf8")
  ]);
  const sitemapUrl = `${siteOrigin}/sitemap.xml`;
  const pages = [
    { loc: `${siteOrigin}/` },
    { loc: `${siteOrigin}/pdf.html` }
  ];
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pages.flatMap(({ loc }) => [
      "  <url>",
      `    <loc>${escapeXml(loc)}</loc>`,
      "  </url>"
    ]),
    "</urlset>",
    ""
  ].join("\n");
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;

  await Promise.all([
    fs.writeFile(homePath, updateCanonical(homeHtml, `${siteOrigin}/`)),
    fs.writeFile(pdfPath, updateCanonical(pdfHtml, `${siteOrigin}/pdf.html`)),
    fs.writeFile(robotsPath, robots),
    fs.writeFile(sitemapPath, sitemap)
  ]);

  return { sitemapUrl, pageCount: pages.length };
}

if (require.main === module) {
  try {
    const siteOrigin = parseSiteUrl(process.argv[2]);
    generate(siteOrigin)
      .then(({ sitemapUrl, pageCount }) => {
        console.log(`Generated ${pageCount} sitemap URLs for ${siteOrigin}.`);
        console.log(`Submit ${sitemapUrl} in Google Search Console.`);
      })
      .catch((error) => {
        console.error(`Could not generate SEO files: ${error.message}`);
        process.exitCode = 1;
      });
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { escapeXml, generate, parseSiteUrl, updateCanonical };
