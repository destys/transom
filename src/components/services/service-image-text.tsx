import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

import { MediaProps } from "@/types/media.types";
import { API_URL } from "@/constants";

interface Props {
    data: {
        image: MediaProps;
        text: BlocksContent;
    }
}

export const ServiceImageText = ({ data }: Props) => {
    return (
        <div className="relative mb-28">
            <Image src={'/serv-bg.jpg'} alt="bg" fill className="object-cover object-center" />
            <div className="container grid grid-cols-12 gap-5 items-center min-h-[650px] relative z-20">
                <div className="relative h-full col-span-5">
                    <Image src={`${API_URL}${data.image.url}`} alt={data.image.alternateText || "Изображение"} width={739} height={739} className="w-full h-[100%] absolute -left-20 bottom-0 object-cover" />
                </div>
                <div className="py-1 typography [&>h3]:text-sand-base [&>h3]:text-3xl [&>h3]:font-semibold [&>h3]:mb-10 text-[22px] leading-[1.2] col-span-7 text-white [&>p]:mb-10">
                    <BlocksRenderer content={data.text} />
                </div>
            </div>
        </div>
    )
}
