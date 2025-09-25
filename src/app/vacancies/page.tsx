import { notFound } from "next/navigation";
import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import { getPage } from "@/actions/get-page";
import { getSeoMetadata } from "@/components/seo-metadata";
import { VacanciesPageProps } from "@/types/vacancies-page.types";
import { PageIntro } from "@/components/page-intro";
import { SearchForm } from "@/components/vacancies/search-form";
import { VacanciesModalBtn } from "@/components/vacancies/vacancies-modal-btn";

export async function generateMetadata() {
  const { data: page } = await getPage<VacanciesPageProps>("vacancies-page", {
    populate: {
      seo: {
        populate: "*",
      },
    },
  });

  if (!page) return null;

  return getSeoMetadata(page.seo);
}

const VacanciesPage = async () => {
  const { data: page } = await getPage<VacanciesPageProps>("vacancies-page", {
    populate: "*",
  });

  if (!page) return notFound();
  return (
    <div className="mb-48">
      <PageIntro title={page.title} titleColor="#000e54" className="-mb-20" />
      {page.description && (
        <div className="container typography mb-16 lg:text-[22px]">
          <BlocksRenderer content={page.description} />
        </div>
      )}
      <div className="bg-[#EEF3FB] py-32 mb-24">
        <div className="container">
          <SearchForm data={page.vacancies} />
          <div>
            <div className="text-2xl mb-6 text-[#677B8C]">Вакансии:</div>
            <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center gap-5">
              {page.vacancies.map((vacancy, index) => (
                <div key={vacancy.id} className="flex gap-5 items-center">
                  <Link
                    href={`/vacancies#vacancy-${vacancy.id}`}
                    className="text-3xl lg:text-5xl font-mono text-aqua-base transition-colors hover:text-sand-base"
                  >
                    {vacancy.title}
                  </Link>
                  {index + 1 < page.vacancies.length && (
                    <div className="bg-aqua-base size-2 rounded-full max-lg:hidden" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container space-y-16 lg:space-y-32">
          {page.vacancies.map((vacancy) => (
            <article
              key={vacancy.id}
              id={`vacancy-${vacancy.id}`}
              className=" scroll-mt-24"
            >
              <div className="text-aqua-base font-mono text-2xl mb-9">
                {vacancy.title}
              </div>
              <div className="mb-9 typography">
                {vacancy.description && (
                  <BlocksRenderer content={vacancy.description} />
                )}
              </div>
              <VacanciesModalBtn
                variant={"secondaryFilled"}
                text="Откликнуться на вакансию"
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VacanciesPage;
