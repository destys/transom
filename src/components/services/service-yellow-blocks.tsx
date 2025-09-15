import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

import { cn } from "@/lib/utils";

interface Props {
  data: {
    title: string;
    description: BlocksContent;
    rows: {
      id: number;
      title: string;
      text: BlocksContent;
      isLong: boolean;
    }[];
  };
}

export const ServiceYellowBlocks = ({ data }: Props) => {
  return (
    <div className="mb-18 lg:mb-36">
      <div className="container">
        {data.title && (
          <h2
            className={cn(
              "mb-14 font-sans text-3xl font-semibold text-aqua-base",
              data.description && "mb-5"
            )}
          >
            {data.title}
          </h2>
        )}
        {data.description && (
          <div className="mb-14 typography">
            <BlocksRenderer content={data.description} />
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-5">
          {data.rows.map((row) => (
            <div
              key={row.id}
              className={cn("p-5 bg-[#FDF6ED]", row.isLong && "md:col-span-2")}
            >
              <div className="mb-4 md:mb-8 font-medium text-xl md:text-2xl text-aqua-base">
                {row.title}
              </div>
              {row.text && (
                <div className="typography [&_strong]:text-aqua-base">
                  <BlocksRenderer content={row.text} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
