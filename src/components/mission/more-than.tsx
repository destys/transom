import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

import { API_URL } from "@/constants";
import { MoreThanProps } from "@/types/mission-page.types";

interface Props {
  data: MoreThanProps;
}

export const MoreThan = ({ data }: Props) => {
  return (
    <div className="mb-44">
      <div className="gri grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center mb-24">
        <div className="relative">
          {data.image && (
            <Image
              src={`${API_URL}${data.image.url}`}
              alt={data.title}
              width={476}
              height={476}
            />
          )}
        </div>
        <div>
          <h2 className="mb-4 text-3xl lg:text-[66px] text-aqua-base font-mono">
            {data.title}
          </h2>
          <div>{data.text}</div>
        </div>
      </div>
      {data.points && (
        <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between">
          {data.points.map((point, index) => (
            <div key={point.id} className="lg:max-w-[266px]">
              <div className="text-7xl lg:text-[96px] font-mono text-sand-base text-center leading-none lg:leading-[0.5] mb-6 lg:mb-12">
                {index + 1}
              </div>
              <div className="text-center font-medium text-lg">
                {point.text && <BlocksRenderer content={point.text} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
