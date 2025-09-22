import { Metadata } from "next";

import { getData } from "@/actions/get-data";
import { NewsProps } from "@/types/news.types";
import { ServiceProps } from "@/types/service.types";
import { SearchResults } from "@/components/search/search-results";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Результаты поиска",
    description: "Результаты поиска на сайте Трансом",
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "none",
        "max-snippet": -1,
      },
    },
  };
}
const SearchPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const sp = await searchParams; // <-- ждём промис
  const q = sp.q;
  const searchText =
    typeof q === "string"
      ? q.trim()
      : Array.isArray(q)
        ? (q[0] || "").trim()
        : "";

  if (!searchText) {
    return (
      <div className="bg-[#EEF3FB] py-14 mb-8">
        <div className="container flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-semibold">
            Вы ничего не ввели в строку поиска
          </h1>
        </div>
      </div>
    );
  }

  const [blogs, services] = await Promise.all([
    getData<any>("news", {
      filters: {
        $or: [
          { search_tags: { $containsi: searchText } },
          { title: { $containsi: searchText } },
        ],
      },
      populate: "*",
      pagination: { page: 1, pageSize: 200 },
    }),
    getData<any>("services", {
      filters: {
        $or: [
          { search_tags: { $containsi: searchText } },
          { title: { $containsi: searchText } },
        ],
      },
      populate: "*",
      pagination: { page: 1, pageSize: 200 },
    }),
  ]);

  const results = [
    ...blogs.data.map((item: NewsProps) => ({
      id: item.documentId,
      type: "blog" as const,
      title: item.title,
      link: `/news/${item.slug}`,
      tags: item.search_tags,
    })),
    ...services.data.map((item: ServiceProps) => ({
      id: item.documentId,
      type: "service" as const,
      title: item.title,
      link: `/services/${item.slug}`,
      tags: item.search_tags,
    })),
  ];

  return (
    <div>
      <div className="bg-[#EEF3FB] py-14 mb-8">
        <div className="container flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-semibold">
            Результаты поиска по запросу: {searchText}
          </h1>
          <p>Найдено {results.length} упоминаний</p>
        </div>
      </div>
      <div className="container">
        <SearchResults results={results} searchText={searchText} />
      </div>
    </div>
  );
};

export default SearchPage;
