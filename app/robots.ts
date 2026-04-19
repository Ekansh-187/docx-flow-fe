import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/signin", "/api/"],
      },
    ],
    sitemap: "https://ilovedox.com/sitemap.xml",
  };
}
