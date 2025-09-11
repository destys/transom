"use client";

import { ChevronRightIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import { getPage } from "@/actions/get-page";
import { MenuItemProps, MenuProps } from "@/types/menu.types";

export const HeaderMobileMenu = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<MenuItemProps[]>([]);

  useEffect(() => {
    let isActive = true; // флаг защиты от setState после unmount

    const fetchMenu = async () => {
      setLoading(true);
      try {
        const { data } = await getPage<MenuProps>("header-menu", {
          populate: "*",
        });
        if (!isActive) return;
        setItems(data?.headerMenu ?? []);
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchMenu();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-xl pb-8 md:pb-0">
      <nav className="min-h-16  flex justify-center items-center p-6">
        {loading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <ul className="flex flex-col justify-center items-center md:gap-5 w-full md:justify-start md:flex-row xl:gap-6 2xl:gap-10">
            {items.map((item) => (
              <li
                key={item.id}
                className="border-b border-aqua-base w-full transition-colors hover:border-sand-base md:border-0 md:w-auto"
              >
                <Link
                  href={item.link}
                  className="flex items-center gap-1 py-4 w-full justify-between font-semibold text-xs text-aqua-base transition-colors hover:text-sand-base md:py-0 md:justify-start md:w-fit"
                >
                  {item.title}
                  {item.addChevron && <ChevronRightIcon className="size-3" />}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
      <div className="flex gap-5 md:gap-2 md:flex-col justify-center px-6 md:hidden">
        <Link
          href={"tel:"}
          className="flex gap-2.5 items-center text-aqua-base text-xs font-semibold whitespace-nowrap"
        >
          <Image src={"/icons/phone.svg"} alt="phone" width={16} height={16} />8
          (495) 780-36-55
        </Link>
        <Link
          href={"mailto:"}
          className="flex gap-2.5 items-center text-aqua-base text-xs font-semibold whitespace-normal"
        >
          <Image src={"/icons/mail.svg"} alt="mail" width={16} height={16} />
          info@transom.ru
        </Link>
      </div>
    </div>
  );
};
