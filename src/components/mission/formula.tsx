import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

import { FormulaSectionProps } from "@/types/mission-page.types";

interface Props {
  data: FormulaSectionProps;
}

export const Formula = ({ data }: Props) => {
  return (
    <div className="py-14 lg:pt-[70px] lg:pb-[80px] bg-[#EEF3FB]">
      <div className="container">
        <h2 className="text-center font-mono text-3xl lg:text-6xl mb-10 text-sand-base">
          {data.title}
        </h2>
        {data.formulaItems.map((item, index) => (
          <div key={item.id} className="text-center">
            <div className="mb-6 font-mono text-xl lg:text-2xl text-aqua-base">
              {item.title}
            </div>
            {index + 1 < data.formulaItems.length && (
              <div className="flex justify-center mb-6">
                <Image
                  src={"/icons/arrow-down.svg"}
                  alt="arrow-down"
                  width={15}
                  height={22}
                />
              </div>
            )}
          </div>
        ))}
        {data.text && (
          <div className="mt-12 lg:mt-24 text-center text-lg lg:text-2xl max-w-[1037px] mx-auto">
            <BlocksRenderer content={data.text} />
          </div>
        )}
      </div>
    </div>
  );
};
