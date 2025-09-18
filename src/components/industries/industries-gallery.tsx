import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import { IndustriesRows } from "./industries-rows";

import { API_URL } from "@/constants";
import { IndusriesGalleryProps } from "@/types/industries-page.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  data: IndusriesGalleryProps[];
}

export const IndustriesGallery = ({ data }: Props) => {
  return (
    <div>
      <Tabs defaultValue={data[0].id.toString()}>
        <TabsList className="flex justify-start xl:grid xl:grid-cols-6 mb-12 xl:mb-36 w-full max-w-[1920px] xl:mx-auto h-auto max-xl:overflow-auto">
          {data.map((item) => (
            <TabsTrigger
              value={item.id.toString()}
              key={item.id}
              className="max-xl:shrink-0 max-xl:basis-2/5 max-sm:basis-2/5 block border-0 rounded-none bg-transparent cursor-pointer relative group md:h-[400px] xl:h-[600px] overflow-hidden whitespace-normal p-0 shadow-none data-[state=active]:[&>div]:opacity-100 data-[state=active]:[&>div>img]:saturate-100 data-[state=active]:[&>div]:translate-y-0 data-[state=active]:[&>div]:text-sand-base"
            >
              <div className="relative z-20 h-[600px] opacity-25 transition-opacity group-hover:opacity-100 max-md:hidden">
                <Image
                  src={`${API_URL}${item.image.url}`}
                  alt={item.image.alternateText || "Отрасль"}
                  fill
                  className="saturate-0 group-hover:saturate-100"
                />
              </div>
              <div className="md:absolute md:left-0 md:bottom-0 md:z-50 w-full h-24 md:h-[140px] text-sm md:text-lg font-bold text-center text-aqua-base flex justify-center items-center px-3 md:px-5 transition-colors group-hover:text-sand-base">
                {item.title}
              </div>
              <div className="absolute left-0 bottom-0 z-20 w-full h-[140px] bg-aqua-base translate-y-full transition-transform group-hover:translate-y-0 max-md:hidden"></div>
            </TabsTrigger>
          ))}
        </TabsList>
        {data.map((item) => (
          <TabsContent value={item.id.toString()} key={item.id}>
            {item.description && (
              <div className="typography container mb-16 lg:mb-32 text-base lg:text-[22px]">
                <BlocksRenderer content={item.description} />
              </div>
            )}
            {item.rows && <IndustriesRows data={item.rows} />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
