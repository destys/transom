import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
    data: {
        slug?: string;
        title: string;
    }[];
    textColor?: string; // можно передавать tailwind класс цвета
}

export const Crumbs = ({ data, textColor = "text-white" }: Props) => {
    return (
        <div className="flex flex-wrap justify-center items-center gap-5 mb-5">
            {/* Первая ссылка всегда на главную */}
            <Link
                href="/"
                className={`${textColor} text-xs font-bold hover:no-underline underline`}
            >
                Главная
            </Link>

            {data.map((item, idx) => (
                <div key={idx} className="flex items-center gap-5">
                    {/* Разделитель */}
                    <ChevronRight size={12} className={textColor} />

                    {/* Если есть slug → ссылка, иначе текст */}
                    {item.slug ? (
                        <Link
                            href={item.slug}
                            className={`${textColor} text-xs font-bold hover:no-underline underline`}
                        >
                            {item.title}
                        </Link>
                    ) : (
                        <div className={`${textColor} text-xs font-bold`}>
                            {item.title}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};