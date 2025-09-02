import Image from "next/image";

import { API_URL } from "@/constants";
import { cn } from "@/lib/utils";
import { MediaProps } from "@/types/media.types";

interface Props {
    data: {
        title: string;
        description: string;
        rows: {
            id: number;
            image: MediaProps;
            title: string;
            description: string;
        }[];
    }

}

export const ServiceGrid = ({ data }: Props) => {
    return (
        <div>
            <div className="container">
                <div className="grid grid-cols-12 gap-5 mb-16">
                    <h2 className="font-sans col-span-5 text-3xl font-semibold">{data.title}</h2>
                    <div className="col-span-7">
                        {data.description}
                    </div>
                </div>
                <div className={cn("grid grid-cols-4 gap-5", data.rows.length === 3 && "grid-cols-3")}>
                    {data.rows.map(row => (
                        <div key={row.id} className="flex flex-col">
                            <div className="relative h-[220px]">
                                <Image src={`${API_URL}${row.image.url}`} alt={row.image.alternateText || "Изображение"} fill />
                            </div>
                            <div className="p-5 border-2 border-[#E8EEFF] flex-auto">
                                {row.title && <div className="mb-4 text-lg font-medium leading-[1.2]">{row.title}</div>}
                                {row.description && <div className={cn("text-lg font-medium leading-[1.2]", row.title && "text-sm font-normal")}>{row.description}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
