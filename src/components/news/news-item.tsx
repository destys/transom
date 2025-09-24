import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";

import { NewsProps } from "@/types/news.types";
import { API_URL } from "@/constants";

interface Props {
  data: NewsProps;
}

export const NewsItem = ({ data }: Props) => {
  return (
    <div>
      <Link
        href={`/news/${data.slug}`}
        className="block relative h-[281px] mb-9"
      >
        <Image
          src={`${API_URL}${data.image.url}`}
          alt={data.title}
          fill
          className="object-cover"
        />
      </Link>
      <div className="text-sm font-semibold text-sand-base mb-5">
        {format(data.pubDate ? data.pubDate : data.createdAt, "dd.MM.yyyy")}
      </div>
      <h3 className="mb-5">
        <Link
          href={`/news/${data.slug}`}
          className="text-xl font-bold text-aqua-base underline hover:text-sand-base transition-colors"
        >
          {data.title}
        </Link>
      </h3>
      <div className="mb-3 line-clamp-4">{data.excerpt}</div>
    </div>
  );
};
