import { MediaProps } from "./media.types";
import { SeoProps } from "./seo.types";

export interface HomePageProps {
  intro: HomeIntroProps;
  whyWe: WhyWeProps;
  seo: SeoProps;
}

export interface HomeIntroProps {
  title: string;
  text: string;
  image: string;
  background: MediaProps;
}

export interface WhyWeProps {
  pretitle: string;
  title: string;
  text1: string;
  text2: string;
}
