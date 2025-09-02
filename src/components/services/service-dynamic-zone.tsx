import { Fragment } from "react";

import { ServiceImageText } from "./service-image-text";
import { ServiceGrid } from "./service-grid";

interface Props {
    content: any[];
}

export const ServiceDynamicZone = ({ content }: Props) => {
    return (
        <div>
            {content.map((block, index) => {
                switch (block.__component) {
                    case "services.image-text":
                        return <ServiceImageText key={index} data={block} />;
                    case "services.grid":
                        return <ServiceGrid key={index} data={block} />;
                    default:
                        return <Fragment key={index} />;
                }
            })}
        </div>
    );
};