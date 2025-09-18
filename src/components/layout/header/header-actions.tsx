"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { HeaderSearch } from "./header-search";

export const HeaderActions = () => {
  const [isSeachOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex items-center gap-4 xl:gap-8 2xl:gap-16">
      <Link
        href={"tel:"}
        className="hidden md:flex gap-2.5 items-center text-aqua-base text-xs font-semibold whitespace-nowrap"
      >
        <Image src={"/icons/phone.svg"} alt="phone" width={16} height={16} />8
        (495) 780-36-55
      </Link>
      <Link
        href={"mailto:"}
        className="hidden md:flex gap-2.5 items-center text-aqua-base text-xs font-semibold whitespace-normal"
      >
        <Image src={"/icons/mail.svg"} alt="mail" width={16} height={16} />
        info@transom.ru
      </Link>
      <div className="md:relative">
        <button
          className="size-[70px] flex items-center justify-center bg-aqua-base cursor-pointer relative z-20"
          onClick={() => setIsSearchOpen(!isSeachOpen)}
        >
          <Image
            src={"/icons/search.svg"}
            alt="search"
            width={18}
            height={18}
          />
        </button>
        <HeaderSearch isOpen={isSeachOpen} setIsSearchOpen={setIsSearchOpen} />
      </div>
    </div>
  );
};
