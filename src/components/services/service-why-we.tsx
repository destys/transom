import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

import { API_URL } from "@/constants";
import { MediaProps } from "@/types/media.types";

interface Props {
  data: {
    title: string;
    rows: {
      id: number;
      image: MediaProps;
      title: string;
      text: BlocksContent;
    }[];
  };
}

export const ServiceWhyWe = ({ data }: Props) => {
  return (
    <div className="mb-18 lg:mb-36">
      <div className="container">
        <h2 className="mb-8 md:mb-14 font-sans text-2xl md:text-3xl font-semibold text-aqua-base">
          {data.title}
        </h2>
        <div className="text-lg md:text-[22px] space-y-7 lg:space-y-10">
          {data.rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-col sm:flex-row gap-5 sm:items-start"
            >
              <div className="sm:shrink-0 sm:basis-12">
                <Image
                  src={`${API_URL}${row.image.url}`}
                  width={48}
                  height={48}
                  alt={row.image.alternateText || "Иконка"}
                />
              </div>
              <div>
                <div className="font-semibold text-sand-base">{row.title}</div>
                {row.text && (
                  <div className="[&_strong]:text-aqua-base [&_ul]:list-inside [&_ul]:list-disc [&_ul]:mb-6">
                    <BlocksRenderer content={row.text} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
