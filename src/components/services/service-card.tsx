import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import { API_URL } from "@/constants";
import { ServiceProps } from "@/types/service.types";
import { cn } from "@/lib/utils";

interface Props {
    data: ServiceProps;
}

export const ServiceCard = ({ data }: Props) => {

    return (
        <Link href={`/services/${data.slug}`}
            className={cn(
                "group bg-[#EEF3FB] h-[225px] p-5 transition-colors hover:bg-aqua-base flex flex-col justify-between overflow-hidden relative",
                data.isWide && "col-span-2",
                data.iconPosition.includes("top") && "flex-col-reverse items-start",
            )}
        >
            {data.icon && (
                <div
                    className={cn(
                        "absolute top-5 left-5 w-16 h-16 text-aqua-base group-hover:text-sand-base",
                        data.iconPosition === "top-right" && "left-auto right-5",
                        data.iconPosition === "bottom-right" && "left-auto right-5 top-auto bottom-5",
                        data.isWide &&
                        "group-hover:-rotate-45 group-hover:scale-[300%] group-hover:left-[80%] group-hover:top-[45%] transition-all"
                    )}
                    style={{
                        backgroundColor: "currentColor",
                        WebkitMaskImage: `url(${API_URL}${data.icon.url})`,
                        maskImage: `url(${API_URL}${data.icon.url})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                    }}
                />
            )}
            <h3 className="max-w-[246px] text-lg font-bold text-aqua-base transition-colors group-hover:text-sand-base">
                {data.title}
                <ChevronRightIcon className="inline size-4" />
            </h3>
        </Link>
    );
};