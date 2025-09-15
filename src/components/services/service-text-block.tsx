import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

interface Props {
  data: {
    text: BlocksContent;
  };
}

export const ServiceTextBlock = ({ data }: Props) => {
  if (!data) return null;
  const { text } = data;

  return (
    <div className="container typography mb-14 lg:mb-28 text-lg md:text-[22px] [&>h3]:text-3xl [&>h3]:max-md:text-2xl [&>h3]:text-aqua-base [&>h3]:font-semibold [&>h3]:mb-14 [&>ul>li]:text-aqua-base [&>blockquote]:text-sand-base [&>blockquote]:text-3xl [&>blockquote]:lg:text-5xl [&>blockquote]:font-bold [&>blockquote]:font-mono [&>blockquote]:text-center">
      <BlocksRenderer content={text} />
    </div>
  );
};
