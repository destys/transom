import qs from "qs";

import { API_URL, REVALIDATE_TIME } from "@/constants";

export interface StrapiSingleResponse<T> {
  data: T | null;
  meta: object;
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

export async function getPage<T>(
  collection: string,
  options: FetchOptions = {}
): Promise<StrapiSingleResponse<T>> {
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

    const res = await fetch(`${STRAPI_URL}/api/${collection}?${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!res.ok) {
      throw new Error(`Ошибка запроса: ${res.status}`);
    }

    const json = await res.json();

    return {
      data: json.data ?? null,
      meta: json.meta ?? {},
    };
  } catch (error) {
    console.error(`Ошибка при получении данных из /${collection}:`, error);
    return {
      data: null,
      meta: {},
    };
  }
}
