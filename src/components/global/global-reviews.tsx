'use client';

import * as React from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ReviewsProps } from '@/types/global-blocks.types';
import { API_URL } from '@/constants';
import { cn } from '@/lib/utils';

import 'swiper/css';

interface Props {
    data: ReviewsProps[];
    isBackground?: boolean;
}

export const GlobalReviews = ({ data, isBackground = false }: Props) => {
    const swiperRef = React.useRef<SwiperType | null>(null);
    const [active, setActive] = React.useState(0);

    return (
        <section className={cn("bg-[#EEF3FB] py-20", !isBackground && "bg-transparent")}>
            <div className="container">
                <div className="mb-8 h-[3px] w-[59px] bg-sand-base" />
                <h2 className="mb-[73px] text-aqua-base">Отзывы</h2>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        setActive(swiper.activeIndex);
                    }}
                    onSlideChange={(swiper) => setActive(swiper.activeIndex)}
                    className="!pb-0"
                >
                    {data.map((item) => (
                        <SwiperSlide key={item.id} className="!flex items-center gap-[120px]">
                            <div className="relative h-[537px] basis-1/3 shrink-0 max-w-[380px]">
                                <Image
                                    src={`${API_URL}${item.image.url}`}
                                    alt={item.name}
                                    fill
                                />
                            </div>
                            <div className="col-span-2">
                                <div className="typography">
                                    <BlocksRenderer content={item.text} />
                                </div>
                                <div className="mb-1 font-bold text-aqua-base">{item.name}</div>
                                <div className="text-xs">{item.position}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Навигация + пагинация */}
                <div className="mt-24 flex items-center justify-center gap-14">
                    <button
                        type="button"
                        aria-label="Предыдущий отзыв"
                        className="cursor-pointer transition-transform hover:scale-110 disabled:opacity-40"
                        onClick={() => swiperRef.current?.slidePrev()}
                        disabled={swiperRef.current?.isBeginning}
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <div className="flex items-center gap-14">
                        {data.map((_, i) => {
                            const isActive = i === active;
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    aria-label={`Перейти к отзыву ${i + 1}`}
                                    onClick={() => swiperRef.current?.slideTo(i)}
                                    className={[
                                        'size-1 rounded-full transition-all bg-aqua-base/25 hover:bg-aqua-base/60',
                                        isActive && '!bg-aqua-base size-2',
                                    ].join(' ')}
                                />
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        aria-label="Следующий отзыв"
                        className="cursor-pointer transition-transform hover:scale-110 disabled:opacity-40"
                        onClick={() => swiperRef.current?.slideNext()}
                        disabled={swiperRef.current?.isEnd}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};