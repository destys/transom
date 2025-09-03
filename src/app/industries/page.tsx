import { notFound } from "next/navigation";

import { getPage } from "@/actions/get-page";
import { PageIntro } from "@/components/page-intro"
import { IndustriesPageProps } from "@/types/industries-page.types";
import { IndustriesGallery } from "@/components/industries/industries-gallery";
import { getSeoMetadata } from "@/components/seo-metadata";

export async function generateMetadata() {
    const { data: page } = await getPage<IndustriesPageProps>("industries-page", {
        populate: {
            seo: {
                populate: "*",
            }
        }
    });

    if (!page) return null;

    return getSeoMetadata(page.seo);
}

const IndustriesPage = async () => {
    const { data: page } = await getPage<IndustriesPageProps>("industries-page", {
        populate: {
            gallery: {
                populate: {
                    image: {
                        populate: "*",
                    },
                    rows: {
                        populate: "*",
                    }
                },
            },

        }
    });

    if (!page) return notFound();

    return (
        <div>
            <PageIntro title={page.title} titleColor="#000e54" className="-mb-20" />
            {!!page.gallery?.length && <IndustriesGallery data={page.gallery} />}
        </div>
    )
}

export default IndustriesPage