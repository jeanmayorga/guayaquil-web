import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = "https://www.guayaquil.app";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  };
}
