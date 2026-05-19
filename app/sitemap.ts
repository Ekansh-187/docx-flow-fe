import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.ilovedox.com";

  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/docs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/docx-to-pdf`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/compress`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools/image-to-pdf`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}