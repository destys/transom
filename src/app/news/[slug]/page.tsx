import { notFound } from "next/navigation";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import { getData } from "@/actions/get-data";
import { getSeoMetadata } from "@/components/seo-metadata";
import { NewsProps } from "@/types/news.types";
import { Crumbs } from "@/components/crumbs";
import { API_URL } from "@/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const { data } = await getData<NewsProps>("news", {
    filters: {
      slug: slug,
    },
    populate: "*",
  });

  const post = data[0];

  if (!post) return null;

  return getSeoMetadata(post.seo);
}

const PostPage = async ({ params }: Props) => {
  const { slug } = await params;

  const { data } = await getData<NewsProps>("news", {
    filters: {
      slug: slug,
    },
    populate: "*",
  });

  const post = data[0];

  if (!post) return notFound();

  const crumbsData = [
    {
      slug: "/news",
      title: "Новости",
    },
    {
      title: post.title,
    },
  ];

  return (
    <div className="py-16 lg:py-32 mb-32">
      <div className="container">
        <Crumbs data={crumbsData} textColor="text-foreground" />
        <h1 className="mb-12 md:mb-24 lg:mb-32 text-center">{post.title}</h1>
        <div className="mb-8 md:md-12 lg:mb-20 relative h-[240px] md:h-[360px] lg:h-[460px]">
          <Image
            src={`${API_URL}${post.image.url}`}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="mb-8 text-xl md:text-2xl lg:text-3xl font-semibold text-aqua-base">
          {post.subtitle}
        </div>
        <div className="post-content">
          {post.text && <BlocksRenderer content={post.text} />}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
