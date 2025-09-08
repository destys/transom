import Image from "next/image";

import { HomeIntroProps } from "@/types/home-page.types";
import { API_URL } from "@/constants";
import { Button } from "@/components/ui/button";

interface Props {
    data: HomeIntroProps;
}

export const HomeIntro = ({ data }: Props) => {
    return (
        <section className="min-h-[800px] relative flex items-center">
            {data.background && (
                <>
                    {data.background.mime.startsWith("image/") && (
                        <Image
                            src={`${API_URL}${data.background.url}`}
                            alt="Intro Image"
                            fill
                            className="object-cover object-center z-10"
                        />
                    )}

                    {data.background.mime.startsWith("video/") && (
                        <video
                            src={`${API_URL}${data.background.url}`}
                            autoPlay
                            loop
                            muted
                            className="absolute inset-0 w-full h-full object-cover z-10"
                        />
                    )}
                </>
            )}

            <div className="absolute inset-0 size-full z-20 bg-gradient-to-bl from-[#EEF3FB]/0 to-[#EEF3FB]/90"></div>

            <div className="container relative z-20">
                <div className="max-w-[628px] space-y-11">
                    <div className="mb-7">
                        <Image src={'/logo_small.svg'} alt="Logo" width={94} height={103} />
                    </div>
                    <h1 className="font-mono text-6xl leading-[1.15] text-aqua-base">{data.title}</h1>
                    <div className="text-lg">{data.text}</div>
                    <Button>
                        Консультация
                    </Button>
                </div>
            </div>
        </section>
    )
}
