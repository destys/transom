import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../ui/button';

import { API_URL } from '@/constants';
import { ClientsProps } from '@/types/global-blocks.types';

interface Props {
    data: ClientsProps;
}

export const GlobalClients = ({ data }: Props) => {
    return (
        <section className='pt-24 pb-20'>
            <div className="container">
                <div className='mb-8 w-[59px] h-[3px] bg-sand-base'></div>
                <h2 className="mb-[73px] text-aqua-base">{data.title}</h2>
                <div className="grid grid-cols-5 gap-y-20 gap-x-32 mb-28">
                    {data.images.map((image, index) => (
                        <div key={index} className="flex justify-center items-center">
                            <Image src={`${API_URL}${image.url}`} alt={image.alt || 'logo'} width={image.width} height={image.height} className="object-contain object-center" />
                        </div>
                    ))}
                </div>
                <Link href="/clients" passHref className='flex justify-center'>
                    <Button variant={'default'} className="mx-auto">
                        Показать ещё
                    </Button>
                </Link>
            </div>
        </section>
    )
}