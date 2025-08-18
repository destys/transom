import { Pretitle } from "@/components/pretitle";
import { HomeWhyWeProps } from "@/types/home-page.types";

interface Props {
    data: HomeWhyWeProps;
}

export const HomeWhyWe = ({ data }: Props) => {
    return (
        <section className="bg-aqua-base py-24 text-white">
            <div className="container flex gap-12">
                <div className="relative shrink-0 basis-[331px]">
                    <Pretitle text={data.pretitle} className="absolute left-0 -top-7" />
                    <h2>{data.title}</h2>
                </div>
                <div className="mr-6">{data.text1}</div>
                <div>{data.text2}</div>
            </div>
        </section>
    )
}
