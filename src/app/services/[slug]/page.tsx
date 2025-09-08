import React from 'react'
import { notFound } from 'next/navigation'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

import { getPage } from '@/actions/get-page'
import { GlobalBlocksProps } from '@/types/global-blocks.types'
import { Experts } from '@/components/global/experts'
import { PageIntro } from '@/components/page-intro'
import { ServiceProps } from '@/types/service.types'
import { getData } from '@/actions/get-data'
import { getSeoMetadata } from '@/components/seo-metadata'
import { ServiceDynamicZone } from '@/components/services/service-dynamic-zone'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;

    const { data: services } = await getData<ServiceProps>("services", {
        filters: {
            slug: {
                $eq: slug
            }
        },
        populate: "*",
    });

    if (!services.length) return notFound();

    const service = services[0];

    return getSeoMetadata(service.seo);
}

const ServicePage = async ({ params }: Props) => {
    const { slug } = await params;

    const { data: services } = await getData<ServiceProps>("services", {
        filters: {
            slug: {
                $eq: slug
            }
        },
        populate: {
            content: {
                on: {
                    'services.image-text': {
                        populate: "*"
                    },
                    'services.grid': {
                        populate: {
                            rows: {
                                populate: "*"
                            }
                        }
                    },
                    'services.text-block': {
                        populate: "*"
                    },
                    'services.service-steps': {
                        populate: "*"
                    },
                    'services.approach': {
                        populate: "*"
                    },
                    'services.yellow-blocks': {
                        populate: "*"
                    },
                    'services.comparison-section': {
                        populate: {
                            before: {
                                populate: "*"
                            },
                            after: {
                                populate: "*"
                            },
                        }
                    },
                    'services.range-services': {
                        populate: "*"
                    },
                    'services.why-we': {
                        populate: {
                            rows: {
                                populate: "*"
                            }
                        }
                    },
                    'services.problems': {
                        populate: "*"
                    },
                },
            },
        },
    });

    if (!services.length) return notFound();

    const { data: global } = await getPage<GlobalBlocksProps>("global-block", {
        populate: {
            experts: {
                populate: "*",
            },
        },
    })

    const service = services[0];

    const crumbs = [
        {
            title: 'Услуги',
            slug: '/services'
        },
        {
            title: service.title
        }
    ]

    return (
        <div>
            <PageIntro title={service.title} titleColor="#000e54" className="-mb-20" crumbs={crumbs} />
            {service.text_1 && (
                <div className="container typography mb-16">
                    <BlocksRenderer content={service.text_1} />
                </div>
            )}
            <ServiceDynamicZone content={service.content} />


            {global?.experts && <Experts data={global.experts} isBackground={false} />}
        </div>
    )
}

export default ServicePage