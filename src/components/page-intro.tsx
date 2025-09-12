import Image from "next/image";

import { Crumbs } from "./crumbs";

import { MediaProps } from "@/types/media.types";
import { API_URL } from "@/constants";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  backgroundColor?: string;
  titleColor?: string;
  className?: string;
  bg?: MediaProps;
  crumbs?: {
    title: string;
    slug?: string;
  }[];
}

export const PageIntro = ({
  title,
  bg,
  backgroundColor,
  titleColor,
  className,
  crumbs,
}: Props) => {
  const crumbsData = crumbs
    ? crumbs
    : [
        {
          title: title,
        },
      ];

  return (
    <div className={cn("relative min-h-[400px] flex items-center", className)}>
      {backgroundColor && (
        <div
          className="absolute inset-0 z-20 opacity-60"
          style={{ backgroundColor: backgroundColor || "#000e54" }}
        />
      )}
      {bg && (
        <Image src={`${API_URL}${bg.url}`} alt="bg" fill className="z-10" />
      )}
      <div className="container relative z-30 flex flex-col items-center justify-center">
        <Crumbs
          data={crumbsData}
          textColor={cn("text-white", !backgroundColor && "text-foreground")}
        />
        <h1
          className="font-mono text-3xl lg:text-5xl"
          style={{ color: titleColor || "#e0bf8c" }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};
