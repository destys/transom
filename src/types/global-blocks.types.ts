import { BlocksContent } from "@strapi/blocks-react-renderer";

import { MediaProps } from "./media.types";

export interface GlobalBlocksProps {
  reviews: ReviewsProps;
  clients: ClientsProps;
}

export interface ReviewsProps {
  image: MediaProps;
  name: string;
  position: string;
  text: BlocksContent;
}

export interface ClientsProps {
  title: string;
  images: MediaProps[];
}
