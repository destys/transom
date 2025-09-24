import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import { getPage } from "@/actions/get-page";
import { MenuProps } from "@/types/menu.types";

export const HeaderMenu = async () => {
  const { data } = await getPage<MenuProps>("header-menu", {
    populate: "*",
  });
  return (
    <nav className="hidden flex-auto lg:block">
      <ul className="flex items-center gap-3 xl:gap-6 2xl:gap-10">
        {data?.headerMenu.map((item) => (
          <li key={item.id}>
            <Link
              href={item.link}
              className="flex items-center gap-1 font-semibold text-base text-aqua-base transition-colors hover:text-sand-base"
            >
              {item.title}
              {item.addChevron && <ChevronRightIcon className="size-3" />}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
