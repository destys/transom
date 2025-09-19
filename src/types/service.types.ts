import { BlocksContent } from "@strapi/blocks-react-renderer";

import { MediaProps } from "./media.types";
import { SeoProps } from "./seo.types";

export interface ServiceProps {
  documentId: string;
  title: string;
  slug: string;
  iconPosition: string;
  icon: MediaProps;
  menuIndex: number;
  isWide: boolean;
  search_tags: string;
  seo: SeoProps;
  text_1: BlocksContent;
  content: any;
}
