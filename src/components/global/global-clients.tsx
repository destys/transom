"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "../ui/button";

import { API_URL } from "@/constants";
import { ClientsProps } from "@/types/global-blocks.types";
import { cn } from "@/lib/utils";

interface Props {
  data: ClientsProps;
  isBackground?: boolean;
  className?: string;
}

export const GlobalClients = ({
  data,
  isBackground = false,
  className,
}: Props) => {
  const [showAll, setShowAll] = useState(false);

  const images = data.images || [];
  const hasMore = images.length > 15;
  const visibleImages = showAll ? images : images.slice(0, 15);

  return (
    <section
      className={cn(
        "bg-[#EEF3FB] pt-12 lg:pt-24 pb-10 lg:pb-20",
        !isBackground && "bg-transparent",
        className
      )}
    >
      <div className="container">
        <div className="mb-8 w-[59px] h-[3px] bg-sand-base"></div>
        <h2 className="mb-[73px] text-aqua-base">{data.title}</h2>

        {/* сетка картинок */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-20 lg:gap-y-20 lg:gap-x-32 mb-12 lg:mb-28">
          {visibleImages.map((image, index) => (
            <div key={index} className="flex md:justify-center items-center">
              <Image
                src={`${API_URL}${image.url}`}
                alt={image.alternateText || "logo"}
                width={image.width}
                height={image.height}
                className="object-contain object-center"
              />
            </div>
          ))}
        </div>

        {/* кнопка */}
        {hasMore && !showAll && (
          <div className="flex justify-center">
            <Button
              variant="default"
              className="mx-auto max-sm:w-full"
              onClick={() => setShowAll(true)}
            >
              Показать ещё
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
