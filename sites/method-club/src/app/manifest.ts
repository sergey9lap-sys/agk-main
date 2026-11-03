import type { MetadataRoute } from "next";
import { OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/method-club/",
    display: "standalone",
    background_color: "#0e0e0e",
    theme_color: "#d6a65c",
    lang: "ru-RU",
    scope: "/method-club/",
    icons: [
      {
        src: OG_IMAGE_PATH,
        sizes: "1200x630",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
    id: SITE_URL,
  };
}
