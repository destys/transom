import { IndustriesRowsProps } from "@/types/industries-page.types";

interface Props {
  data: IndustriesRowsProps[];
}

export const IndustriesRows = ({ data }: Props) => {
  return (
    <div className="lg:mb-56">
      <div className="container max-lg:px-0">
        {data.map((item) => (
          <div key={item.id} className="lg:mb-40">
            <div className="flex items-center gap-8 lg:mb-6">
              <div className="text-base lg:text-2xl font-bold text-aqua-base">
                {item.title}
              </div>
              <div className="flex-auto bg-[#D9D9D9] h-px"></div>
            </div>
            <div className="text-sm lg:text-[22px] mb-5 lg:mb-10">
              {item.description}
            </div>
            <div className="mb-7 lg:mb-0">
              <div className="text-base lg:text-[22px] mb-4 lg:mb-7">
                Клиенты:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-9">
                {item.clients.map((client) => (
                  <div
                    key={client.id}
                    className="text-sm lg:text-lg text-sand-base font-bold"
                  >
                    {client.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
