import { getData } from "@/actions/get-data";
import { NewsProps } from "@/types/news.types";
import { ServiceProps } from "@/types/service.types";
import { SearchResults } from "@/components/search/search-results";

interface Props {
  searchParams: {
    q?: string;
  };
}

const SearchPage = async ({ searchParams }: Props) => {
  const searchText = searchParams.q?.trim() || "";

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
      pagination: {
        page: 1,
        pageSize: 200, // <= правильное поле
      },
    }),
    getData<any>("services", {
      filters: {
        $or: [
          { search_tags: { $containsi: searchText } },
          { title: { $containsi: searchText } },
        ],
      },
      populate: "*",
      pagination: {
        page: 1,
        pageSize: 200, // <= правильное поле
      },
    }),
  ]);

  // Собираем результаты в один массив
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

      {/* Клиентский компонент: подсветка и "показать ещё" */}
      <div className="container">
        <SearchResults results={results} searchText={searchText} />
      </div>
    </div>
  );
};

export default SearchPage;
