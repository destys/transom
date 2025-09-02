"use strict";

import { BlocksContent } from "@strapi/blocks-react-renderer";

import { MediaProps } from "./media.types";
import { SeoProps } from "./seo.types";

export interface IndustriesPageProps {
  title: string;
  seo: SeoProps;
  gallery: IndusriesGalleryProps[];
  text: BlocksContent;
  rows: IndustriesRowsProps[];
}

export interface IndusriesGalleryProps {
  id: number;
  title: string;
  image: MediaProps;
}

export interface IndustriesRowsProps {
  id: number;
  title: string;
  description: string;
  clients: {
    id: number;
    title: string;
  }[];
}
