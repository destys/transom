import { notFound } from 'next/navigation';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

import { getPage } from '@/actions/get-page';
import { getSeoMetadata } from '@/components/seo-metadata';
import { MissinPageProps } from '@/types/mission-page.types';
import { PageIntro } from '@/components/page-intro';
import { MoreThan } from '@/components/mission/more-than';
import { Formula } from '@/components/mission/formula';
import { Experts } from '@/components/global/experts';
import { Certificates } from '@/components/mission/certificates';
import { Ratings } from '@/components/mission/ratings';
import { GlobalBlocksProps } from '@/types/global-blocks.types';

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
        populate: {
            introBg: {
                populate: "*"
            },
            more_than: {
                populate: "*"
            },
            formula: {
                populate: "*"
            },
            experts: {
                populate: "*"
            },
            certificates: {
                populate: "*"
            },
            ratings: {
                populate: "*"
            },
        },
    });

    const { data: global } = await getPage<GlobalBlocksProps>("global-block", {
        populate: {
            experts: {
                populate: "*",
            },
        },
    })


    if (!page) return notFound();

    return (
        <div className='mb-48'>
            <PageIntro title={page.title} backgroundColor='#e0bf8c' titleColor="#000e54" bg={page.introBg} />
            <div className='mt-24'>
                <div className="container max-w-[1106px]">
                    {page.text_1 && <div className='text-center font-mono text-3xl text-aqua-base mb-8'><BlocksRenderer content={page.text_1} /></div>}
                    {page.text_2 && <div className='mb-24 text-center'><BlocksRenderer content={page.text_2} /></div>}
                    {page.more_than && <MoreThan data={page.more_than} />}
                </div>
                {page.formula && <Formula data={page.formula} />}
                {global?.experts && <Experts data={global.experts} />}
                {page.text_3 && (
                    <div className="container py-32">
                        <div className="text-center [&>h4]:text-3xl [&>h4]:text-aqua-base [&>h4]:font-mono [&>h4]:mb-9 [&>p]:mb-11">
                            <BlocksRenderer content={page.text_3} />
                        </div>
                    </div>
                )}

                <div>
                    <div className="container grid grid-cols-12 gap-5">
                        <div className="col-span-6">
                            {page.certificates && (
                                <Certificates data={page.certificates} />
                            )}
                        </div>
                        <div></div>
                        <div className="col-span-5">
                            {page.ratings && (
                                <Ratings data={page.ratings} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MissionPage