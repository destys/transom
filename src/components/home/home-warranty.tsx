import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import { API_URL } from "@/constants";
import { HomeWarrantyProps } from "@/types/home-page.types";
import { Pretitle } from "@/components/pretitle";
import { Button } from "@/components/ui/button";

interface Props {
    data: HomeWarrantyProps;
}

export const HomeWarranty = ({ data }: Props) => {
    return (
        <section className="relative py-[100px]">
            <Image src={`${API_URL}${data.bgImage.url}`} alt={data.bgImage.alt || data.title} fill className="object-cover object-center" />
            <div className="container relative z-10">
                <div className="max-w-[696px] space-y-7">
                    <Pretitle text={data.pretitle} className="mb-7" />
                    <h2 className="max-w-[490px] text-white">{data.title}</h2>
                    {data.text && <div className="text-white"><BlocksRenderer content={data.text} /></div>}
                    <Button variant={'secondary'}>Получить консультацию</Button>
                </div>
            </div>
        </section>
    )
}
