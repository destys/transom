import Image from "next/image";

import { API_URL } from "@/constants";
import { IndusriesGalleryProps } from "@/types/industries-page.types"

interface Props {
    data: IndusriesGalleryProps[];
}

export const IndustriesGallery = ({ data }: Props) => {
    return (
        <div className="grid grid-cols-6 mb-36 max-w-[1920px] mx-auto">
            {data.map(item => (
                <div key={item.id} className="group relative h-[600px] overflow-hidden">
                    <div className="relative z-10 h-[600px] opacity-25 transition-opacity group-hover:opacity-100">
                        <Image src={`${API_URL}${item.image.url}`} alt={item.image.alternateText || "Отрасль"} fill className="saturate-0 group-hover:saturate-100" />
                    </div>
                    <div className="absolute left-0 bottom-0 z-50 w-full h-[140px] text-lg font-bold text-center text-aqua-base flex justify-center items-center px-5 transition-colors group-hover:text-sand-base">
                        {item.title}
                    </div>
                    <div className="absolute left-0 bottom-0 z-20 w-full h-[140px] bg-aqua-base translate-y-full transition-transform group-hover:translate-y-0"></div>
                </div>
            ))}
        </div>
    )
}
