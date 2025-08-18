import { BlocksContent } from "@strapi/blocks-react-renderer";

import { MediaProps } from "./media.types";
import { SeoProps } from "./seo.types";

export interface HomePageProps {
  intro: HomeIntroProps;
  whyWe: HomeWhyWeProps;
  about: HomeAboutProps;
  warranty: HomeWarrantyProps;
  seo: SeoProps;
}

export interface HomeIntroProps {
  title: string;
  text: string;
  image: string;
  background: MediaProps;
}

export interface HomeWhyWeProps {
  pretitle: string;
  title: string;
  text1: string;
  text2: string;
}

export interface HomeAboutProps {
  pretitle: string;
  title: string;
  text: string;
  image: MediaProps;
  advantages: {
    id: number;
    title: string;
    text: string;
    icon: MediaProps;
  }[];
}

export interface HomeWarrantyProps {
  pretitle: string;
  title: string;
  text: BlocksContent;
  bgImage: MediaProps;
}
