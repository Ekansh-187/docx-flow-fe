import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/signin", "/api/"],
      },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
    ],
    sitemap: "https://ilovedox.com/sitemap.xml",
  };
}
