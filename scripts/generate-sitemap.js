const fs = require("fs");
const glob = require("fast-glob");
const path = require("path");

async function generateSitemap() {
  // Main pages
  const allPages = await glob(["**/page.tsx"], {
    cwd: path.join(process.cwd(), "src/app"),
  });

  const pageNames = allPages
    .map((page) => {
      return page.replace("/page.tsx", "").replace("page.tsx", "");
    })
    .filter((page) => {
      return !page.includes("[slug]");
    });

  const xmlPages = pageNames.map(addXMLPage).join("\n");

  // Projects
  const projectFileNames = await glob(["*.md"], {
    cwd: path.join(process.cwd(), "src/data/projects"),
  });

  const xmlProjects = projectFileNames.map(addXMLProject).join("\n");

  // Articles
  const articleFileNames = await glob(["*.md"], {
    cwd: path.join(process.cwd(), "src/data/articles"),
  });

  const xmlArticles = articleFileNames.map(addXMLProject).join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlPages}${xmlProjects}${xmlArticles}</urlset>`;
  fs.writeFileSync("public/sitemap.xml", sitemap);
}

generateSitemap();

function addXMLProject(project) {
  const path = project.replace(".md", "");
  return generateXMLTag(`/projects/${path}`);
}

function addXMLPage(page) {
  return generateXMLTag(`/${page}`);
}

function generateXMLTag(url, frequency = "weekly") {
  return `<url>
    <loc>${`${process.env.NEXT_PUBLIC_BASE_URL}${url}`}</loc>
    <changefreq>${frequency}</changefreq>
  </url>`;
}
