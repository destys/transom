import { Fragment } from "react";

import { ServiceImageText } from "./service-image-text";
import { ServiceGrid } from "./service-grid";
import { ServiceTextBlock } from "./service-text-block";
import { ServiceSteps } from "./service-steps";
import { ServiceApproach } from "./service-approach";
import { ServiceYellowBlocks } from "./service-yellow-blocks";
import { ServiceComparison } from "./service-comparison";
import { ServiceWhyWe } from "./service-why-we";
import { ServiceProblems } from "./service-problems";
import { ServiceRangeServices } from "./service-range-services";

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
                    case "services.approach":
                        return <ServiceApproach key={index} data={block} />;
                    case "services.yellow-blocks":
                        return <ServiceYellowBlocks key={index} data={block} />;
                    case "services.comparison-section":
                        return <ServiceComparison key={index} data={block} />;
                    case "services.problems":
                        return <ServiceProblems key={index} data={block} />;
                    case "services.why-we":
                        return <ServiceWhyWe key={index} data={block} />;
                    case "services.range-services":
                        return <ServiceRangeServices key={index} data={block} />;
                    default:
                        return <Fragment key={index} />;
                }
            })}
        </div>
    );
};