import { ServiceCard } from "../services/service-card";

import { ServiceProps } from "@/types/service.types";

interface Props {
    data: ServiceProps[];
}

export const HomeServices = ({ data }: Props) => {
    return (
        <section className="py-24">
            <div className="container">
                <div className="grid grid-cols-4 gap-5">
                    {data.sort((a, b) => a.menuIndex - b.menuIndex).map((service) => (
                        <ServiceCard key={service.documentId} data={service} />
                    ))}
                </div>
            </div>
        </section>
    )
}