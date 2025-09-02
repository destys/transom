'use client';

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import { API_URL } from "@/constants";
import { MediaProps } from "@/types/media.types";

interface Props {
    data: MediaProps[];
}

export const Ratings = ({ data }: Props) => {
    const swiperRef = useRef<SwiperType | null>(null);

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    // Slides для лайтбокса
    const slides = useMemo(
        () =>
            data.map((item) => ({
                src: `${API_URL}${item.url}`,
                alt: item.alternateText || "Рейтинг",
            })),
        [data]
    );

    return (
        <div className="grid grid-cols-5 items-center gap-5">
            {/* Заголовок */}
            <div className="col-span-5 grid grid-cols-5 gap-5">
                <div />
                <div className="col-span-3">
                    <div className="mb-8 h-[3px] w-[59px] bg-sand-base" />
                    <h2 className="text-aqua-base mb-14">Рейтинги</h2>
                </div>
                <div />
            </div>

            {/* Кнопка влево */}
            <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex justify-center items-center cursor-pointer"
            >
                <ChevronLeftIcon />
            </button>

            {/* Слайдер */}
            <div className="col-span-3">
                <Swiper
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    loop
                    slidesPerView={1}
                >
                    {data.map((item, i) => (
                        <SwiperSlide
                            key={item.id}
                            className="relative !h-[398px] shadow-[4px_4px_39px_0px_#0000001A]"
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    setIndex(i);
                                    setOpen(true);
                                }}
                                className="w-full h-full relative"
                                aria-label={`Открыть рейтинг ${i + 1}`}
                            >
                                <Image
                                    src={`${API_URL}${item.url}`}
                                    alt={item.alternateText || "Рейтинг"}
                                    fill
                                    className="object-contain rounded-md"
                                    sizes="100vw"
                                />
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Кнопка вправо */}
            <button
                onClick={() => swiperRef.current?.slideNext()}
                className="flex justify-center items-center cursor-pointer"
            >
                <ChevronRightIcon />
            </button>

            {/* Лайтбокс */}
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={slides}
                plugins={[Zoom]}
                controller={{ closeOnBackdropClick: true }}
                zoom={{ maxZoomPixelRatio: 2.5 }}
            />
        </div>
    );
};