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
  seo: SeoProps;
}
