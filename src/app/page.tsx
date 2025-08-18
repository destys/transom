import { notFound } from "next/navigation";

import { getPage } from "@/actions/get-page"
import { HomeIntro } from "@/components/home/home-intro"
import { getSeoMetadata } from "@/components/seo-metadata";
import { HomePageProps } from "@/types/home-page.types"
import { HomeWhyWe } from "@/components/home/home-why-we";
import { HomeServices } from "@/components/home/home-services";
import { getData } from "@/actions/get-data";
import { ServiceProps } from "@/types/service.types";
import { HomeAbout } from "@/components/home/home-about";
import { HomeWarranty } from "@/components/home/home-warranty";
import { GlobalBlocksProps } from "@/types/global-blocks.types";
import { GlobalClients } from "@/components/global/global-clients";

export async function generateMetadata() {
  const { data: page } = await getPage<HomePageProps>("home-page", {
    populate: {
      seo: {
        populate: "*",
      }
    }
  });

  if (!page) return null;

  return getSeoMetadata(page.seo);
}

const HomePage = async () => {
  const { data } = await getPage<HomePageProps>("home-page", {
    populate: {
      intro: {
        populate: "*",
      },
      whyWe: {
        populate: "*",
      },
      about: {
        populate: {
          image: {
            populate: "*",
          },
          advantages: {
            populate: "*",
          }
        }
      },
      warranty: {
        populate: "*",
      },
    },
  })

  const { data: global } = await getPage<GlobalBlocksProps>("global-block", {
    populate: {
      clients: {
        populate: {
          images: {
            populate: "*",
          }
        },
      },
      reviews: {
        populate: {
          image: {
            populate: "*",
          }
        },
      },
    },
  })

  const { data: services } = await getData<ServiceProps>("services", {
    populate: "*",
  });

  if (!data) return notFound();

  return (
    <>
      {data.intro && <HomeIntro data={data.intro} />}
      {data.whyWe && <HomeWhyWe data={data.whyWe} />}
      {!!services.length && <HomeServices data={services} />}
      {data.about && <HomeAbout data={data.about} />}
      {data.warranty && <HomeWarranty data={data.warranty} />}
      {global?.clients && <GlobalClients data={global.clients} />}
    </>
  )
}

export default HomePage