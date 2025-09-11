import Link from "next/link";
import { format } from "date-fns";

import { Button } from "../ui/button";

import { NewsProps } from "@/types/news.types";
import { cn } from "@/lib/utils";

interface Props {
  data: NewsProps[];
}

export const HomeNews = ({ data }: Props) => {
  return (
    <section className="pt-20 pb-24 mb-24">
      <div className="container">
        <div className="mb-8 h-[3px] w-[59px] bg-sand-base" />
        <h2 className="mb-[73px] text-aqua-base">Новости</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-5 mb-8 lg:mb-16">
          {data.map((item, index) => (
            <div
              key={item.documentId}
              className={cn(index === 0 && "md:col-span-2 lg:col-span-1")}
            >
              <div className="text-xs font-bold text-aqua-base mb-3">
                {format(item.createdAt, "dd.MM.yyyy")}
              </div>
              <h3 className="text-xl font-bold text-aqua-base mb-3">
                {item.title}
              </h3>
              <div className="mb-3 line-clamp-4">{item.excerpt}</div>
              <Link
                href={`/news/${item.slug}`}
                className="font-bold text-sm text-sand-base underline"
              >
                Подробнее
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href={"/news"} passHref className="max-sm:w-full">
            <Button className="max-sm:w-full">Все новости</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
