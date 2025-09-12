"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import { API_URL } from "@/constants";
import { MediaProps } from "@/types/media.types";

interface Props {
  data: MediaProps[];
}

export const Certificates = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Преобразуем данные в slides для лайтбокса
  const slides = useMemo(
    () =>
      data.map((item) => ({
        src: `${API_URL}${item.url}`,
        alt: item.alternateText || "Сертификат",
      })),
    [data]
  );

  return (
    <div>
      <div className="mb-8 h-[3px] w-[59px] bg-sand-base" />
      <h2 className="text-aqua-base mb-14">Сертификаты</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className="bg-background relative h-[398px] outline-none focus-visible:ring-2 focus-visible:ring-aqua-base"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            aria-label={`Открыть сертификат ${i + 1} в лайтбоксе`}
          >
            <Image
              src={`${API_URL}${item.url}`}
              alt={item.alternateText || "Сертификат"}
              fill
              className="object-contain rounded-md lg:shadow-[4px_4px_39px_0px_#0000001A]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom]}
        // комфортные настройки управления
        controller={{ closeOnBackdropClick: true }}
        // отключает скролл страницы, пока открыт лайтбокс
        carousel={{ finite: false }}
        // зум жестами/колёсиком
        zoom={{ maxZoomPixelRatio: 2.5 }}
      />
    </div>
  );
};
