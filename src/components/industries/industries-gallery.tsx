import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import { IndustriesRows } from "./industries-rows";

import { API_URL } from "@/constants";
import { IndusriesGalleryProps } from "@/types/industries-page.types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Props {
    data: IndusriesGalleryProps[];
}

export const IndustriesGallery = ({ data }: Props) => {
    return (
        <div>
            <Tabs defaultValue={data[0].id.toString()}>
                <TabsList className="grid grid-cols-6 mb-36 w-full max-w-[1920px] mx-auto h-auto">
                    {data.map(item => (
                        <TabsTrigger value={item.id.toString()} key={item.id} className="block border-0 rounded-none bg-transparent cursor-pointer relative group h-[600px] overflow-hidden whitespace-normal p-0 shadow-none data-[state=active]:[&>div]:opacity-100 data-[state=active]:[&>div>img]:saturate-100 data-[state=active]:[&>div]:translate-y-0 data-[state=active]:[&>div]:text-sand-base">
                            <div className="relative z-20 h-[600px] opacity-25 transition-opacity group-hover:opacity-100">
                                <Image src={`${API_URL}${item.image.url}`} alt={item.image.alternateText || "Отрасль"} fill className="saturate-0 group-hover:saturate-100" />
                            </div>
                            <div className="absolute left-0 bottom-0 z-50 w-full h-[140px] text-lg font-bold text-center text-aqua-base flex justify-center items-center px-5 transition-colors group-hover:text-sand-base">
                                {item.title}
                            </div>
                            <div className="absolute left-0 bottom-0 z-20 w-full h-[140px] bg-aqua-base translate-y-full transition-transform group-hover:translate-y-0"></div>
                        </TabsTrigger>
                    ))}
                </TabsList>
                {data.map(item => (
                    <TabsContent value={item.id.toString()} key={item.id}>
                        {item.description && (
                            <div className="typography container mb-32 text-[22px]">
                                <BlocksRenderer content={item.description} />
                            </div>
                        )}
                        {item.rows && <IndustriesRows data={item.rows} />}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
