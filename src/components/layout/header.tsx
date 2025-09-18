import Image from "next/image";
import Link from "next/link";

import { HeaderMenu } from "./header/header-menu";
import { HeaderActions } from "./header/header-actions";
import { HeaderMobileWrapper } from "./header/header-mobile-wrapper";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full flex items-center justify-between lg:gap-3.5 xl:gap-7 2xl:gap-14 bg-white h-[70px] max-md:bg-aqua-base">
      <HeaderMobileWrapper />
      <Link
        href={"/"}
        className="flex justify-center items-center basis-[140px] xl:basis-[170px] h-[70px] bg-aqua-base shrink-0 mx-auto lg:ml-0"
      >
        <Image
          src={"/logo_horisontal.svg"}
          alt={"Transom logo"}
          width={127}
          height={30}
          className="max-md:hidden"
        />
        <Image
          src={"/logo_small.svg"}
          alt={"Transom logo"}
          width={40}
          height={44}
          className="md:hidden"
        />
      </Link>
      <HeaderMenu />
      <HeaderActions />
    </header>
  );
};
