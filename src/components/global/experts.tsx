import Image from "next/image";

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
        "mb-44 py-8 lg:py-16",
        isBackground && "bg-aqua-base text-white mb-0 py-14 lg:py-28 "
      )}
    >
      <div className="container">
        <div className="mb-8 h-[3px] w-[59px] bg-sand-base" />
        <h2 className="mb-11">Наши лучшие эксперты</h2>
        <div className="flex overflow-x-auto md:overflow-x-hidden md:grid md:grid-cols-4 gap-5">
          {data.map((item) => (
            <div
              key={item.id}
              className="max-md:basis-2/5 max-sm:basis-3/4 max-md:shrink-0 max-md:pb-2"
            >
              <div className="relative h-[300px] mb-7">
                <Image
                  src={`${API_URL}${item.photo.url}`}
                  alt="photo"
                  fill
                  className=" object-cover object-center"
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
          ))}
        </div>
      </div>
    </div>
  );
};
