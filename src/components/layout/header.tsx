import Image from "next/image";
import Link from "next/link";

import { HeaderMenu } from "./header/header-menu";
import { HeaderActions } from "./header/header-actions";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full flex items-center justify-between gap-3.5 xl:gap-7 2xl:gap-14 bg-white h-14 md:h-[70px]">
      <Link
        href={"/"}
        className="flex justify-center items-center basis-[140px] xl:basis-[170px] h-14 md:h-[70px] bg-aqua-base shrink-0"
      >
        <Image
          src={"/logo_horisontal.svg"}
          alt={"Transom logo"}
          width={127}
          height={30}
        />
      </Link>
      <HeaderMenu />
      <HeaderActions />
    </header>
  );
};
