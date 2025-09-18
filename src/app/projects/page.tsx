import { notFound } from "next/navigation";

import { getPage } from "@/actions/get-page";
import { GlobalClients } from "@/components/global/global-clients";
import { GlobalReviews } from "@/components/global/global-reviews";
import { ProjectsMap } from "@/components/projects/projects-map";
import { getSeoMetadata } from "@/components/seo-metadata";
import { GlobalBlocksProps } from "@/types/global-blocks.types";
import { ProjectsPageProps } from "@/types/projects-page.types";
import { PageIntro } from "@/components/page-intro";

export async function generateMetadata() {
  const { data: page } = await getPage<ProjectsPageProps>("projects-page", {
    populate: {
      seo: {
        populate: "*",
      },
    },
  });

  if (!page) return null;

  return getSeoMetadata(page.seo);
}

const ProjectsPage = async () => {
  const { data: page } = await getPage<ProjectsPageProps>("projects-page");
  const { data: global } = await getPage<GlobalBlocksProps>("global-block", {
    populate: {
      clients: {
        populate: {
          images: {
            populate: "*",
          },
        },
      },
      reviews: {
        populate: {
          image: {
            populate: "*",
          },
        },
      },
    },
  });

  if (!page) return notFound();

  return (
    <div>
      <PageIntro title={page.title} titleColor="#000e54" className="-mb-20" />
      <ProjectsMap />
      {global?.clients && (
        <GlobalClients
          data={global.clients}
          isBackground={true}
          className="lg:-translate-y-20 lg:-mb-20"
        />
      )}
      {global?.reviews && <GlobalReviews data={global.reviews} />}
      <div className="mb-24"></div>
    </div>
  );
};

export default ProjectsPage;
