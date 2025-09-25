"use strict";

import { BlocksContent } from "@strapi/blocks-react-renderer";

import { SeoProps } from "./seo.types";

export interface VacanciesPageProps {
  title: string;
  description: BlocksContent;
  seo: SeoProps;
  vacancies: VacancyProps[];
}

export interface VacancyProps {
  id: number;
  title: string;
  description: BlocksContent;
}
