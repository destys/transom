import Image from "next/image";
import Link from "next/link";

import { API_URL } from "@/constants";
import { HomeAboutProps } from "@/types/home-page.types"
import { Pretitle } from "@/components/pretitle";
import { Button } from "@/components/ui/button";

interface Props {
    data: HomeAboutProps;
}

export const HomeAbout = ({ data }: Props) => {
    return (
        <section className="pt-11 pb-16 mb-20">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-28 mb-20">
                    <div className="relative">
                        <Image
                            src={`${API_URL}${data.image.url}`}
                            alt={data.title} fill
                            className="object-cover object-center"
                        />
                    </div>
                    <div className="pt-20 pb-7">
                        <Pretitle text={data.pretitle} className="mb-5" />
                        <h2 className="mb-6 max-w-[480px] text-aqua-base">{data.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: data.text }} className="mb-9 max-w-[444px]" />
                        <div className="grid grid-cols-1 md:grid-cols-2 mb-10 pb-9 border-b border-[#EEF3FB] max-w-[480px]">
                            <div className="flex gap-5 ">
                                <div className="mt-1 shrink-0 basis-2.5 size-2.5 bg-sand-base"></div>
                                <div>
                                    <div className="leading-none font-bold text-lg mb-3 text-aqua-base">Проекты</div>
                                    <div>Реализовано более <br />100 проектов</div>
                                </div>
                            </div>
                            <div className="flex gap-5 ">
                                <div className="mt-1 shrink-0 basis-2.5 size-2.5 bg-sand-base"></div>
                                <div>
                                    <div className="leading-none font-bold text-lg mb-3 text-aqua-base">Опыт</div>
                                    <div>Разработаны <br /> внутренние методики </div>
                                </div>
                            </div>
                        </div>
                        <Link href="/mission" passHref>
                            <Button variant={'default'}>
                                Наша миссия
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-14">
                    {data.advantages.map((advantage) => (
                        <div key={advantage.id} className="flex gap-5">
                            <div className="mt-1 shrink-0 basis-[62px] size-[62px]">
                                <Image
                                    src={`${API_URL}${advantage.icon.url}`}
                                    alt={advantage.title}
                                    width={62}
                                    height={62}
                                    className="object-contain object-center"
                                />
                            </div>
                            <div>
                                <div className="leading-none font-bold text-lg mb-3 text-aqua-base">{advantage.title}</div>
                                <div className="max-w-[253px] text-sm">{advantage.text}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
