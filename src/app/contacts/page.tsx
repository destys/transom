import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation";

import { getPage } from "@/actions/get-page";
import { getSeoMetadata } from "@/components/seo-metadata";
import { ContactsPageProps } from "@/types/contacts.types";

export async function generateMetadata() {
    const { data: page } = await getPage<ContactsPageProps>("contacts-page", {
        populate: {
            seo: {
                populate: "*",
            }
        }
    });

    if (!page) return null;

    return getSeoMetadata(page.seo);
}

const ContactsPage = async () => {
    const { data: page } = await getPage<ContactsPageProps>("contacts-page");

    if (!page) return notFound();

    return (
        <div className="relative min-h-[820px] h-[73vh] flex items-center">
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A55a3bf6619e74df28110d166504a0ed623a1f51ea8f73d47d4b29862a9fc0547&amp;source=constructor" width="1280" height="720" className="size-full absolute inset-0"></iframe>
            <div className="container relative z-10">
                <div className="bg-white max-w-[555px] p-[60px] pb-8">
                    <div className="mb-9 pb-8 border-b border-[#D9D9D9] flex flex-col gap-5">
                        <Link href="tel:+74957803655" className="ext-aqua-base text-4xl font-mono transition-colors hover:text-sand-base">8 (495) 780-36-55</Link>
                        <Link href="tel:+74957803655" className="flex gap-6 transition-colors hover:text-sand-base">
                            <Image src={'/icons/mail.svg'} alt="mail" width={16} height={16} />
                            info@transom.ru
                        </Link>
                        <div className="flex gap-6">
                            <Image src={'/icons/schedule.svg'} alt="schedule" width={16} height={16} />
                            Пн – Пт с 09:00 до 18:00
                        </div>
                        <div className="flex items-start gap-6">
                            <Image src={'/icons/location.svg'} alt="location" width={16} height={16} className="mt-0.5" />
                            125424 Россия, г. Москва,<br />Волоколамское шоссе, д. 73, офис 219 <br />ИНН 7702338570 КПП 773301001
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <Link href={'#'} title="whatsapp" className="transition-transform hover:scale-105">
                            <Image src={'/icons/wa.svg'} alt="wa" width={25} height={25} />
                        </Link>
                        <Link href={'#'} title="telegram" className="transition-transform hover:scale-105">
                            <Image src={'/icons/tg.svg'} alt="wa" width={25} height={25} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactsPage