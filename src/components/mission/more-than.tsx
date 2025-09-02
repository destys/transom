import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

import { API_URL } from "@/constants";
import { MoreThanProps } from "@/types/mission-page.types"

interface Props {
    data: MoreThanProps;
}

export const MoreThan = ({ data }: Props) => {
    return (
        <div className="mb-44">
            <div className='grid grid-cols-2 gap-20 items-center mb-24'>
                <div className="relative">
                    {data.image && <Image src={`${API_URL}${data.image.url}`} alt={data.title} width={476} height={476} />}
                </div>
                <div>
                    <h2 className='mb-4 text-[66px] text-aqua-base font-mono'>{data.title}</h2>
                    <div>{data.text}</div>
                </div>
            </div>
            {data.points && (
                <div className='flex justify-between'>
                    {data.points.map((point, index) => (
                        <div key={point.id} className='max-w-[266px]'>
                            <div className='text-[96px] font-mono text-sand-base text-center leading-[0.5] mb-12'>{index + 1}</div>
                            <div className='text-center font-medium text-lg'>{point.text && <BlocksRenderer content={point.text} />}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
