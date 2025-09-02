import { IndustriesRowsProps } from "@/types/industries-page.types"

interface Props {
    data: IndustriesRowsProps[];
}

export const IndustriesRows = ({ data }: Props) => {
    return (
        <div className="mb-44">
            <div className="container">
                {data.map(item => (
                    <div key={item.id} className="mb-40">
                        <div className="flex items-center gap-8 mb-6">
                            <div className="text-2xl font-bold text-aqua-base">{item.title}</div>
                            <div className="flex-auto bg-[#D9D9D9] h-px"></div>
                        </div>
                        <div className="text-[22px] mb-10">{item.description}</div>
                        <div>
                            <div className="text-[22px] mb-7">Клиенты:</div>
                            <div className="grid grid-cols-3 gap-9">
                                {item.clients.map(client => (
                                    <div key={client.id} className="text-lg text-sand-base font-bold">{client.title}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
