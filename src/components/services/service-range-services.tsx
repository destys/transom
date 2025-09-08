'use client';

import 'swiper/css';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
    data: {
        title: string;
        slides: { id: number; text: BlocksContent }[];
    };
}

export const ServiceRangeServices = ({ data }: Props) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [active, setActive] = useState(1);
    const [isBeginning, setIsBeginning] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [offsetApplied, setOffsetApplied] = useState(true);

    const updateState = (s: SwiperType) => {
        setActive(s.realIndex);
        setIsBeginning(s.isBeginning);
        setIsEnd(s.isEnd);
    };

    const clearOffsetAndPinSecondLeft = (s: SwiperType) => {
        s.params.slidesOffsetBefore = 0;
        s.update();
        // второй слайд к левому краю
        s.slideTo(1);
        setOffsetApplied(false);
    };

    const handlePrev = () => {
        const s = swiperRef.current;
        if (!s) return;
        if (offsetApplied) {
            clearOffsetAndPinSecondLeft(s);
            return;
        }
        s.slidePrev();
    };

    const handleNext = () => {
        const s = swiperRef.current;
        if (!s) return;
        if (offsetApplied) {
            clearOffsetAndPinSecondLeft(s);
            return;
        }
        s.slideNext();
    };

    return (
        <div className="relative mb-28 overflow-hidden">
            <Image src="/serv-bg.jpg" alt="bg" fill className="object-cover object-center" />
            <div className="container relative z-30 pt-24 pb-36">
                <div className="mb-16 flex items-center justify-between gap-5">
                    <h2 className="font-sans font-semibold text-sand-base">{data.title}</h2>

                    <div className="flex items-center gap-3 text-white">
                        <button
                            type="button"
                            aria-label="Предыдущий слайд"
                            className="rounded-full border border-white transition-transform hover:scale-110 disabled:opacity-40"
                            onClick={handlePrev}
                            disabled={!offsetApplied && isBeginning}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            type="button"
                            aria-label="Следующий слайд"
                            className="rounded-full border border-white transition-transform hover:scale-110 disabled:opacity-40"
                            onClick={handleNext}
                            disabled={!offsetApplied && isEnd}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                <Swiper
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 0 },
                        768: { slidesPerView: 2, spaceBetween: 0 },
                        1024: { slidesPerView: 3, spaceBetween: 0 },
                    }}
                    initialSlide={0}
                    onSwiper={(s) => {
                        swiperRef.current = s;
                    }}
                    onSlideChange={(s) => updateState(s)}
                    className="!overflow-visible !pb-0"
                >
                    {data.slides.map((slide, index) => {
                        const isActive = index === active;

                        return (
                            <SwiperSlide
                                key={slide.id}
                                className="border border-[#566BD0] border-l-0 first:border-l"
                            >
                                <div
                                    className={[
                                        'flex h-[500px] flex-col justify-between p-12 text-[22px] text-white transition-all',
                                        isActive && 'bg-white !text-primary',
                                    ].join(' ')}
                                >
                                    {slide.text && (
                                        <div>
                                            <BlocksRenderer content={slide.text} />
                                        </div>
                                    )}

                                    <div className="flex items-end gap-1 font-medium">
                                        <span className={cn(isActive && "text-6xl font-semibold")}>{String(index + 1).padStart(2, '0')}</span>
                                        <span>/</span>
                                        <span>{String(data.slides.length).padStart(2, '0')}</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};