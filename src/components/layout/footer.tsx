import Image from "next/image";
import Link from "next/link";

import { FooterForm } from "@/components/layout/footer/footer-form";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-[#EEF3FB]">
      <div className="container relative">
        <FooterForm />
        <div className="flex flex-col justify-center md:justify-start md:flex-row gap-5 items-center w-full mb-[72px] -mt-28 md:-mt-[63px]">
          <div className="flex flex-col sm:flex-row items-center gap-5 md:mr-auto max-md:order-1">
            <Link
              href={"tel:"}
              className="flex gap-2.5 items-center text-aqua-base text-xs font-extrabold transition-colors hover:text-sand-base"
            >
              <Image
                src={"/icons/phone.svg"}
                alt="phone"
                width={16}
                height={16}
              />
              8 (495) 780-36-55
            </Link>
            <Link
              href={"mailto:"}
              className="flex gap-2.5 items-center text-aqua-base text-xs font-extrabold transition-colors hover:text-sand-base"
            >
              <Image
                src={"/icons/mail.svg"}
                alt="mail"
                width={16}
                height={16}
              />
              info@transom.ru
            </Link>
          </div>
          <Link href={"/"} className="max-md:order-0">
            <Image src={"/logo_blue.svg"} alt="logo" width={120} height={28} />
          </Link>
          <div className="md:ml-auto flex flex-col md:flex-row items-center gap-5 max-md:order-2">
            <div className="flex gap-3.5">
              <Link
                href={"mailto:"}
                className="flex gap-2.5 items-center text-aqua-base text-xs font-semibold"
              >
                <Image src={"/icons/wa.svg"} alt="wa" width={16} height={16} />
              </Link>
              <Link
                href={"mailto:"}
                className="flex gap-2.5 items-center text-aqua-base text-xs font-semibold "
              >
                <Image src={"/icons/tg.svg"} alt="tg" width={16} height={16} />
              </Link>
            </div>
            <Button variant={"secondaryFilled"}>Обратный звонок</Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
