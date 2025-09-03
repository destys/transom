import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"

interface Props {
    data: {
        text: BlocksContent;
    };
}

export const ServiceTextBlock = ({ data }: Props) => {
    if (!data) return null;
    const { text } = data;

    return (
        <div className="container typography mb-28 text-[22px] [&>h3]:text-3xl [&>h3]:text-aqua-base [&>h3]:font-semibold [&>h3]:mb-14 [&>ul>li]:text-aqua-base [&>blockquote]:text-sand-base [&>blockquote]:text-5xl [&>blockquote]:font-bold [&>blockquote]:font-mono [&>blockquote]:text-center">
            <BlocksRenderer content={text} />
        </div>
    )
}
