"use client";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { HeaderMobileMenu } from "./header-mobile-menu";

import { cn } from "@/lib/utils";

export const HeaderMobileWrapper = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("locked");
    } else {
      document.body.classList.remove("locked");
    }
  }, [isMenuOpen]);
  return (
    <div className="lg:hidden">
      <button
        className="size-[70px] max-md:size-14 flex items-center justify-center cursor-pointer relative z-20 lg:hidden text-white bg-aqua-base"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <XIcon className="size-6" />
        ) : (
          <div className="size-5 flex flex-col justify-center gap-1">
            <span className="bg-white rounded-[3px] w-full h-0.5"></span>
            <span className="bg-white rounded-[3px] w-full h-0.5"></span>
            <span className="bg-white rounded-[3px] w-2/3 h-0.5"></span>
          </div>
        )}
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
  );
};
