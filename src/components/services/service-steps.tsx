import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"

interface Props {
    data: {
        title: string;
        steps: {
            id: number;
            text: BlocksContent
        }[];
    }
}

export const ServiceSteps = ({ data }: Props) => {
    return (
        <div className="mb-36">
            <div className="container">
                <h2 className="font-semibold font-sans text-3xl text-aqua-base mb-14">{data.title}</h2>
                <div className=" flex overflow-x-auto gap-20">
                    {data.steps.map((step, index) => (
                        <div key={step.id} className="flex gap-4 shrink-0 basis-1/4">
                            <div className="flex justify-center items-center bg-sand-base text-aqua-base font-mono text-2xl font-bold size-10 shrink-0 basis-10 rounded-full">{index + 1}</div>
                            <div className="typography">
                                <BlocksRenderer content={step.text} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}