import { BlocksContent } from "@strapi/blocks-react-renderer";

import { MediaProps } from "./media.types";
import { SeoProps } from "./seo.types";

export interface NewsProps {
  documentId: string;
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  search_tags: string;
  image: MediaProps;
  text: BlocksContent;
  seo: SeoProps;
}
