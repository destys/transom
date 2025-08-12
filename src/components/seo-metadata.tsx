import { SeoProps } from "@/types/seo.types";

export function getSeoMetadata(seo?: SeoProps) {
  if (!seo) return {};

  return {
    title: seo.title,
    description: seo.description,
  };
}
