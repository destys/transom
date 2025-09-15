import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import { XIcon } from "lucide-react";

interface Props {
  data: {
    title: string;
    rows: {
      id: number;
      title: string;
      description: BlocksContent;
    }[];
  };
}

export const ServiceProblems = ({ data }: Props) => {
  return (
    <div className="mb-18 lg:mb-36">
      <div className="container">
        <h2 className="mb-8 md:mb-14 font-sans text-2xl md:text-3xl font-semibold text-aqua-base">
          {data.title}
        </h2>
        <div className="text-lg md:text-[22px] space-y-10">
          {data.rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-col sm:flex-row gap-5 sm:items-center"
            >
              <div className="text-[#FF0000]">
                <XIcon />
              </div>
              <div>
                <div className="font-semibold text-[#FF0000]">{row.title}</div>
                {row.description && (
                  <div>
                    <BlocksRenderer content={row.description} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
