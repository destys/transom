import { notFound } from 'next/navigation';

import { getData } from '@/actions/get-data';
import { getPage } from '@/actions/get-page';
import { NewsItem } from '@/components/news/news-item';
import { PageIntro } from '@/components/page-intro'
import { getSeoMetadata } from '@/components/seo-metadata';
import { NewsPageProps } from '@/types/news-page.types';
import { NewsProps } from '@/types/news.types';
import { Button } from '@/components/ui/button';

export async function generateMetadata() {
    const { data: page } = await getPage<NewsPageProps>("news-page", {
        populate: {
            seo: {
                populate: "*",
            }
        }
    });

    if (!page) return null;

    return getSeoMetadata(page.seo);
}


const NewsPage = async () => {

    const { data: page } = await getPage<NewsPageProps>("news-page", {
        populate: "*",
    });

    const { data: news, meta } = await getData<NewsProps>("news", {
        populate: "*",
        sort: ['createdAt:desc']
    });

    if (!page) return notFound();

    return (
        <div className='mb-48'>
            <PageIntro title={page.title} backgroundColor='#000e54' titleColor="#e0bf8c" bg={page.introBg} />
            <div className="container">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-y-20 my-24'>
                    {news.map(item => (
                        <NewsItem data={item} key={item.documentId} />
                    ))}
                </div>
                {meta.pagination.total > 9 && (
                    <div className='flex justify-center mb-32'>
                        <Button>Показать ещё</Button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default NewsPage