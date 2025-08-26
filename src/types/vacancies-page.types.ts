"use strict";

import { SeoProps } from "./seo.types";

export interface VacanciesPageProps {
  title: string;
  seo: SeoProps;
  vacancies: VacancyProps[];
}

export interface VacancyProps {
  id: number;
  title: string;
  description: string;
}
