import { notFound } from "next/navigation";

import { getPage } from "@/actions/get-page";
import { getSeoMetadata } from "@/components/seo-metadata";
import { ServicesPageProps } from "@/types/services-page.types";
import { PageIntro } from "@/components/page-intro";
import { ServiceProps } from "@/types/service.types";
import { getData } from "@/actions/get-data";
import { HomeServices } from "@/components/home/home-services";

export async function generateMetadata() {
    const { data: page } = await getPage<ServicesPageProps>("services-page", {
        populate: {
            seo: {
                populate: "*",
            }
        }
    });

    if (!page) return null;

    return getSeoMetadata(page.seo);
}

const ServicesPage = async () => {
    const { data: page } = await getPage<ServicesPageProps>("services-page", {
        populate: "*",
    });

    const { data: services } = await getData<ServiceProps>("services", {
        populate: "*",
    });


    if (!page) return notFound();
    return (
        <div className='mb-48'>
            <PageIntro title={page.title} backgroundColor='#000e54' titleColor="#e0bf8c" bg={page.introBg} />
            {!!services.length && <HomeServices data={services} />}
        </div>
    )
}

export default ServicesPage