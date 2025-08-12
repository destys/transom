"use strict";

import qs from "qs";

import { API_URL } from "@/constants";

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface FetchOptions {
  filters?: Record<string, any>;
  populate?: string | string[] | Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

const STRAPI_URL = API_URL;

export async function getData<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<StrapiResponse<T>> {
  try {
    const query = qs.stringify(
      {
        filters: options.filters,
        populate: options.populate,
        sort: options.sort,
        pagination: options.pagination,
      },
      { encodeValuesOnly: true }
    );
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}?${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 5 },
    });

    if (!res.ok) {
      throw new Error(`Ошибка запроса: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Ошибка при получении данных из Strapi:", error);
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } },
    };
  }
}
