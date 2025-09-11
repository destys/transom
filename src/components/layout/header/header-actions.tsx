"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

import { HeaderSearch } from "./header-search";
import { HeaderMobileMenu } from "./header-mobile-menu";

import { cn } from "@/lib/utils";

export const HeaderActions = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSeachOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("locked");
    } else {
      document.body.classList.remove("locked");
    }
  }, [isMenuOpen]);

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
      <div className="relative -mr-4">
        <button
          className="size-[70px] max-md:h-14 flex items-center justify-center bg-aqua-base cursor-pointer relative z-20"
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
      <div>
        <button
          className="size-[70px] max-md:h-14 flex items-center justify-center bg-sand-base cursor-pointer relative z-20 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>
        <div
          className={cn(
            "opacity-0 -translate-y-full pointer-events-none transition-all absolute top-full left-0 z-0 w-full lg:hidden",
            isMenuOpen && "opacity-100 translate-y-0 pointer-events-auto z-10"
          )}
        >
          <HeaderMobileMenu setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>
    </div>
  );
};
