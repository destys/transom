import { CheckIcon, XIcon } from "lucide-react";

interface Props {
    data: {
        before: {
            title: string;
            rows: {
                id: number;
                title: string;
            }[]
        },
        after: {
            title: string;
            rows: {
                id: number;
                title: string;
            }[]
        }
    }
}

export const ServiceComparison = ({ data }: Props) => {
    return (
        <div className="relative mb-32">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-[#EEF3FB]"></div>
            <div className="container grid grid-cols-2 relative z-20 py-24">
                <div className="space-y-[30px]">
                    <h2 className="text-[32px] text-center">{data.before.title}</h2>
                    {data.before.rows.map(row => (
                        <div key={row.id} className="flex flex-col items-center text-center text-[#FF0000] gap-[30px]">
                            <XIcon />
                            <span className="text-[22px] text-primary">{row.title}</span>
                        </div>
                    ))}
                </div>
                <div className="space-y-[30px]">
                    <h2 className="text-[32px] text-center text-sand-base">{data.after.title}</h2>
                    {data.after.rows.map(row => (
                        <div key={row.id} className="flex flex-col items-center text-center text-[#0DFF00] gap-[30px]">
                            <CheckIcon />
                            <span className="text-[22px] text-white">{row.title}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-aqua-base"></div>
        </div>
    )
}