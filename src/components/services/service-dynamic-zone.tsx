import { Fragment } from "react";

import { ServiceImageText } from "./service-image-text";
import { ServiceGrid } from "./service-grid";
import { ServiceTextBlock } from "./service-text-block";
import { ServiceSteps } from "./service-steps";

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
                    case "services.text-block":
                        return <ServiceTextBlock key={index} data={block} />;
                    case "services.service-steps":
                        return <ServiceSteps key={index} data={block} />;
                    default:
                        return <Fragment key={index} />;
                }
            })}
        </div>
    );
};