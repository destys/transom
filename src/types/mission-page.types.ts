import { BlocksContent } from "@strapi/blocks-react-renderer";

import { MediaProps } from "./media.types";
import { SeoProps } from "./seo.types";

export interface MoreThanProps {
  image: MediaProps;
  title: string;
  text: string;
  points: {
    id: number;
    text: BlocksContent;
  }[];
}

export interface FormulaItemProps {
  title: string;
  id: number;
}

export interface FormulaSectionProps {
  title: string;
  text: BlocksContent;
  formulaItems: FormulaItemProps[];
}

export interface MissinPageProps {
  title: string;
  introBg: MediaProps;
  text_1: BlocksContent;
  text_2: BlocksContent;
  text_3: BlocksContent;
  seo: SeoProps;

  more_than: MoreThanProps;
  formula: FormulaSectionProps;
  certificates: MediaProps[];
  ratings: MediaProps[];
}
