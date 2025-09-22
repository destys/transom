"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

import { API_URL } from "@/constants";
import { ExpertProps } from "@/types/global-blocks.types";
import { cn } from "@/lib/utils";

interface Props {
  data: ExpertProps[];
  isBackground?: boolean;
}

export const Experts = ({ data, isBackground = true }: Props) => {
  return (
    <div
      className={cn(
        "mb-44 py-8 lg:py-16 relative",
        isBackground && "bg-aqua-base text-white mb-0 py-14 lg:py-28"
      )}
    >
      <div className="container">
        <div className="mb-8 h-[3px] w-[59px] bg-sand-base" />
        <div className="flex items-center justify-between gap-5 mb-11">
          <h2>Наши лучшие эксперты</h2>
          <div className="flex gap-3">
            <button className="experts-prev p-2 rounded-full bg-white text-black shadow hover:bg-sand-base">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="experts-next p-2 rounded-full bg-white text-black shadow hover:bg-sand-base">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Навигация */}

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".experts-prev",
            nextEl: ".experts-next",
          }}
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="!overflow-visible"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div>
                <div className="relative h-[300px] mb-7">
                  <Image
                    src={`${API_URL}${item.photo.url}`}
                    alt={item.name}
                    fill
                    className="object-cover object-center rounded-xl"
                  />
                </div>
                <div
                  className={cn(
                    "text-sm font-bold font-mono mb-2.5",
                    !isBackground && "text-aqua-base"
                  )}
                >
                  {item.name.split(" ")[0]} <br />
                  {item.name.split(" ").slice(1).join(" ")}
                </div>
                <div
                  className={cn(
                    "text-xs max-w-5/6",
                    isBackground && "text-[#A6B0DF]"
                  )}
                >
                  {item.description}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
