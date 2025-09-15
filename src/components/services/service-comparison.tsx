import { CheckIcon, XIcon } from "lucide-react";

interface Props {
  data: {
    before: {
      title: string;
      rows: {
        id: number;
        title: string;
      }[];
    };
    after: {
      title: string;
      rows: {
        id: number;
        title: string;
      }[];
    };
  };
}

export const ServiceComparison = ({ data }: Props) => {
  return (
    <div className="relative mb-16 lg:mb-32">
      <div className="hidden md:block absolute top-0 left-0 w-1/2 h-full bg-[#EEF3FB]"></div>
      <div className="container grid md:grid-cols-2 relative z-20 py-12 lg:py-24">
        <div className="space-y-5 md:space-y-[30px] max-md:bg-[#EEF3FB] max-md:py-16 max-md:-mx-4">
          <h2 className="text-2xl md:text-[32px] text-center">
            {data.before.title}
          </h2>
          {data.before.rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-col items-center text-center text-[#FF0000] gap-5 md:gap-[30px]"
            >
              <XIcon />
              <span className="text-lg md:text-[22px] text-primary">
                {row.title}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-5 md:space-y-[30px] max-md:bg-aqua-base max-md:py-16 max-md:-mx-4">
          <h2 className="text-2xl md:text-[32px] text-center text-sand-base">
            {data.after.title}
          </h2>
          {data.after.rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-col items-center text-center text-[#0DFF00] gap-5 md:gap-[30px]"
            >
              <CheckIcon />
              <span className="text-lg md:text-[22px] text-white">
                {row.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full bg-aqua-base"></div>
    </div>
  );
};
