import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import { OpenModalBtn } from "../open-modal-btn";

import { API_URL } from "@/constants";
import { HomeWarrantyProps } from "@/types/home-page.types";
import { Pretitle } from "@/components/pretitle";

interface Props {
  data: HomeWarrantyProps;
}

export const HomeWarranty = ({ data }: Props) => {
  return (
    <section className="relative py-[100px]">
      <Image
        src={`${API_URL}${data.bgImage.url}`}
        alt={data.bgImage.alternateText || data.title}
        fill
        className="object-cover object-center"
      />
      <div className="container relative z-10">
        <div className="max-w-[696px] space-y-7">
          <Pretitle text={data.pretitle} className="mb-7" />
          <h2 className="max-w-[490px] text-white">{data.title}</h2>
          {data.text && (
            <div className="text-white">
              <BlocksRenderer content={data.text} />
            </div>
          )}
          <OpenModalBtn text="Получить консультацию" variant={"secondary"} />
        </div>
      </div>
    </section>
  );
};
