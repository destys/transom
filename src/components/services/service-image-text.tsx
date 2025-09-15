import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

import { MediaProps } from "@/types/media.types";
import { API_URL } from "@/constants";

interface Props {
  data: {
    image: MediaProps;
    text: BlocksContent;
  };
}

export const ServiceImageText = ({ data }: Props) => {
  return (
    <div className="relative mb-14 lg:mb-28 py-16 xl:py-0">
      <Image
        src={"/serv-bg.jpg"}
        alt="bg"
        fill
        className="object-cover object-center"
      />
      <div className="container grid xl:grid-cols-12 gap-5 items-center xl:min-h-[650px] relative z-20">
        <div className="relative h-full col-span-5 max-xl:hidden">
          <Image
            src={`${API_URL}${data.image.url}`}
            alt={data.image.alternateText || "Изображение"}
            width={739}
            height={739}
            className="w-full h-[100%] absolute -left-20 bottom-0 object-cover"
          />
        </div>
        <div className="py-1 typography [&>h3]:text-sand-base [&>h3]:text-3xl [&>h3]:max-md:text-2xl [&>h3]:font-semibold [&>h3]:mb-7 [&>h3]:md:mb-10 text-lg md:text-[22px] leading-[1.2] xl:col-span-7 text-white [&>p]:mb-7 [&>p]:md:mb-10">
          <BlocksRenderer content={data.text} />
        </div>
      </div>
    </div>
  );
};
