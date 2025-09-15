import Image from "next/image";

interface Props {
  data: {
    title: string;
    rows: {
      id: number;
      title: string;
      description: string;
    }[];
  };
}

export const ServiceApproach = ({ data }: Props) => {
  return (
    <div className="mb-24 py-16 lg:pt-28 lg:pb-64 bg-[#EEF3FB] after:">
      <div className="container">
        <h2 className="mb-12 lg:mb-44 font-sans text-3xl font-semibold text-aqua-base">
          {data.title}
        </h2>
        <div className="grid lg:grid-cols-3 lg:items-end gap-12 lg:gap-5 relative">
          {data.rows.map((row) => (
            <div key={row.id} className="text-aqua-base relative">
              <div className="flex flex-col justify-end lg:-rotate-45 origin-bottom-center">
                <div className="font-mono text-2xl"> {row.title}</div>
                <div className="text-sm">{row.description}</div>
                <div>
                  <Image
                    src={"/long-arrow.svg"}
                    alt="arrow"
                    width={384}
                    height={10}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="hidden lg:block absolute -bottom-[121px] left-0 z-0 w-full h-0.5 border-b-2 border-black/50 border-dashed"></div>
        </div>
      </div>
    </div>
  );
};
