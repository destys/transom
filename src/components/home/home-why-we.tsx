import { WhyWeProps } from "@/types/home-page.types";

interface Props {
    data: WhyWeProps;
}

export const HomeWhyWe = ({ data }: Props) => {
    return (
        <section className="bg-aqua-base py-24 text-white">
            <div className="container flex gap-12">
                <div className="relative shrink-0 basis-[331px]">
                    <div className="flex gap-4 items-center absolute left-0 -top-7 text-xs font-bold text-sand-base">
                        {data.pretitle}
                        <span className="w-10 h-0.5 bg-sand-base"></span>
                    </div>
                    <h2>{data.title}</h2>
                </div>
                <div className="mr-6">{data.text1}</div>
                <div>{data.text2}</div>
            </div>
        </section>
    )
}
