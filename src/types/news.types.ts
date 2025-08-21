import { BlocksContent } from "@strapi/blocks-react-renderer";

import { MediaProps } from "./media.types";

export interface NewsProps {
  documentId: string;
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  image: MediaProps;
  text: BlocksContent;
}
