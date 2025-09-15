"use client";

import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";

interface Props {
  data: {
    title: string;
    steps: {
      id: number;
      text: BlocksContent;
    }[];
  };
}

export const ServiceSteps = ({ data }: Props) => {
  return (
    <div className="mb-18 lg:mb-36 !overflow-x-visible">
      <div className="container overflow-hidden">
        <h2 className="font-semibold font-sans text-3xl text-aqua-base mb-14">
          {data.title}
        </h2>
        <Swiper
          modules={[Mousewheel, Scrollbar]}
          mousewheel={true}
          spaceBetween={80}
          slidesPerView={1.3}
          breakpoints={{
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
          scrollbar={{
            hide: false,
            draggable: true,
          }}
          className="service-steps-swiper !overflow-visible"
        >
          {data.steps.map((step, index) => (
            <SwiperSlide key={step.id} className="">
              <div className="flex justify-center items-center bg-sand-base text-aqua-base font-mono text-2xl font-bold size-10 shrink-0 basis-10 rounded-full">
                {index + 1}
              </div>
              <div className="typography">
                <BlocksRenderer content={step.text} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <style jsx global>{`
          /* === ServiceSteps Swiper – custom scrollbar (scoped) === */
          .service-steps-swiper {
            /* make room below slides for the scrollbar */
            padding-bottom: 14px;
          }
          .service-steps-swiper .swiper-scrollbar {
            position: static; /* put it under the slides, not overlay */
            height: 6px;
            margin-top: 16px; /* distance from slides to bar */
            background: transparent /* track color */
            border-radius: 9999px;
            opacity: 1; /* always visible (since hide: false) */
          }
          .service-steps-swiper .swiper-scrollbar-drag {
            background: #e0bf8c; /* aqua-base – adjust to your token */
            border-radius: 9999px;
          }
          /* Hover/focus affordance */
          @media (hover: hover) {
            .service-steps-swiper .swiper-scrollbar-drag:hover {
              background: #e0bf8c;
            }
          }
          /* Reduce bar on very small screens */
          @media (max-width: 480px) {
            .service-steps-swiper .swiper-scrollbar {
              height: 4px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};
