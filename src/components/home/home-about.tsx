"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, Variants } from "framer-motion";

import { API_URL } from "@/constants";
import { HomeAboutProps } from "@/types/home-page.types";
import { Pretitle } from "@/components/pretitle";
import { Button } from "@/components/ui/button";

interface Props {
  data: HomeAboutProps;
}

export const HomeAbout = ({ data }: Props) => {
  const prefersReducedMotion = useReducedMotion();

  const containerStagger: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const slideLeft: Variants = {
    hidden: { x: prefersReducedMotion ? 0 : -60, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.3, // задержка
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideRight: Variants = {
    hidden: { x: prefersReducedMotion ? 0 : 60, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.5, // чуть позже чем картинка
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { y: prefersReducedMotion ? 0 : 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.7, // старт после текста
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="pt-11 pb-16 mb-20 overflow-hiddenx">
      <div className="container">
        {/* Верхняя двухколоночная часть */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 2xl:gap-28 mb-20"
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Картинка (въезжает слева) */}
          <motion.div variants={slideLeft} className="relative min-h-[400px]">
            <Image
              src={`${API_URL}${data.image.url}`}
              alt={data.title}
              fill
              className="object-cover object-center rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>

          {/* Текстовый столбец (въезжает справа) */}
          <motion.div variants={slideRight} className="md:pt-20 pb-7">
            <Pretitle text={data.pretitle} className="mb-5" />
            <h2 className="mb-6 max-w-[480px] text-aqua-base">{data.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: data.text }}
              className="mb-9 max-w-[444px]"
            />
            <div className="grid grid-cols-1 lg::grid-cols-2 gap-4 mb-10 pb-9 border-b border-[#EEF3FB] max-w-[480px]">
              <div className="flex gap-5">
                <div className="mt-1 shrink-0 basis-2.5 size-2.5 bg-sand-base" />
                <div>
                  <div className="leading-none font-bold text-lg mb-3 text-aqua-base">
                    Проекты
                  </div>
                  <div>
                    Реализовано более <br />
                    100 проектов
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="mt-1 shrink-0 basis-2.5 size-2.5 bg-sand-base" />
                <div>
                  <div className="leading-none font-bold text-lg mb-3 text-aqua-base">
                    Опыт
                  </div>
                  <div>
                    Разработаны <br /> внутренние методики
                  </div>
                </div>
              </div>
            </div>
            <Link href="/mission" passHref>
              <Button variant="default" className="max-sm:w-full">
                Наша миссия
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Преимущества: мягкий fade-up + stagger */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14"
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {data.advantages.map((advantage) => (
            <motion.div
              key={advantage.id}
              variants={fadeUp}
              className="flex gap-5"
            >
              <div className="mt-1 shrink-0 basis-[62px] size-[62px]">
                <Image
                  src={`${API_URL}${advantage.icon.url}`}
                  alt={advantage.title}
                  width={62}
                  height={62}
                  className="object-contain object-center"
                />
              </div>
              <div>
                <div className="leading-none font-bold text-lg mb-3 text-aqua-base">
                  {advantage.title}
                </div>
                <div className="max-w-[253px] text-sm">{advantage.text}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
