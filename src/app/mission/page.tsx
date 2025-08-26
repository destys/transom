import { notFound } from 'next/navigation';

import { getPage } from '@/actions/get-page';
import { getSeoMetadata } from '@/components/seo-metadata';
import { MissinPageProps } from '@/types/mission-page.types';
import { PageIntro } from '@/components/page-intro';

export async function generateMetadata() {
    const { data: page } = await getPage<MissinPageProps>("mission-page", {
        populate: {
            seo: {
                populate: "*",
            }
        }
    });

    if (!page) return null;

    return getSeoMetadata(page.seo);
}

const MissionPage = async () => {
    const { data: page } = await getPage<MissinPageProps>("mission-page", {
        populate: "*",
    });


    if (!page) return notFound();

    return (
        <div className='mb-48'>
            <PageIntro title={page.title} backgroundColor='#e0bf8c' titleColor="#000e54" bg={page.introBg} />
        </div>
    )
}

export default MissionPage