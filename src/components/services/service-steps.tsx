"use client";

import { useEffect, useRef } from "react";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

interface Props {
  data: {
    title: string;
    steps: { id: number; text: BlocksContent }[];
  };
  gap?: number; // px между карточками
}

/**
 * Горизонтальная лента, связанная с вертикальным скроллом страницы.
 * Секция остаётся в потоке (НЕ sticky). Лента движется по X от 0 до -maxX,
 * пока пользователь скроллит от момента полной видимости секции до касания её верха с верхом окна.
 */
export const ServiceSteps = ({ data, gap = 24 }: Props) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const viewport = viewportRef.current!;
    const track = trackRef.current!;
    if (!root || !viewport || !track) return;

    let vw = 0;
    let sectionH = 0;
    let contentW = 0;
    let maxX = 0;
    let raf = 0;

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const ease = (t: number) => t; // линейно; при желании можно заменить на лёгкий ease

    const calc = () => {
      vw = viewport.clientWidth;
      sectionH = root.offsetHeight;
      contentW = track.scrollWidth;
      maxX = Math.max(0, contentW - vw);
    };

    const update = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;

      // Условия этапа:
      // 1) "Полностью в видимости" — когда rect.top >= 0 и rect.bottom <= vh.
      //    Это соответствует top == vh - sectionH (нижняя грань вошла) до top == 0 (верх у верхней границы).
      // Интервал для прогресса: top от (vh - sectionH) до 0.
      const startTop = Math.max(0, vh - sectionH); // точка, где секция впервые полностью видна
      const endTop = 0; // точка, где верх секции упёрся в верх окна

      let progress: number;

      if (sectionH <= vh) {
        // нормальный случай: секция может полностью поместиться
        const top = rect.top;
        // топ в диапазоне [0..startTop] (пока блок выше — > startTop — прогресс 0; когда дошли до 0 — прогресс 1)
        const t =
          (startTop - Math.min(Math.max(top, endTop), startTop)) /
          Math.max(1, startTop - endTop);
        progress = clamp01(t);
      } else {
        // fallback: секция выше экрана => "полностью видима" недостижимо.
        // Двигаем между моментом, когда низ секции вошёл (rect.bottom == vh) и когда верх дошёл до 0.
        // rect.bottom = top + sectionH. Условие bottom: vh -> top = vh - sectionH.
        const top = rect.top;
        const start = vh - sectionH;
        const end = 0;
        const t = (top - start) / Math.max(1, end - start); // top идёт от start к 0
        progress = clamp01(t);
      }

      const x = -maxX * ease(progress);
      track.style.transform = `translate3d(${x}px,0,0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const ro = new ResizeObserver(() => {
      calc();
      onScroll();
    });

    ro.observe(root);
    ro.observe(viewport);
    ro.observe(track);
    window.addEventListener("resize", calc);
    window.addEventListener("scroll", onScroll, { passive: true });

    calc();
    update();

    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={rootRef} className="mb-18 lg:mb-36">
      <div className="container">
        <h2 className="font-semibold font-sans text-3xl text-aqua-base mb-14">
          {data.title}
        </h2>

        {/* Видимая область ленты: остаётся в потоке, без sticky */}
        <div ref={viewportRef} className="relative">
          {/* Горизонтальная дорожка: один ряд, авто-ширина, без переносов */}
          <div
            ref={trackRef}
            className="will-change-transform inline-flex flex-nowrap pb-1"
            style={{
              gap: `${gap}px`,
              transform: "translate3d(0,0,0)",
            }}
          >
            {data.steps.map((step, i) => (
              <article
                key={step.id}
                className="bg-white rounded-xl w-[280px] sm:w-[320px] lg:w-[360px]  flex items-start gap-3"
              >
                <div className="flex justify-center items-center bg-sand-base text-aqua-base font-mono text-xl lg:text-2xl font-bold shrink-0 basis-10 size-10 rounded-full">
                  {i + 1}
                </div>
                <div className="typography text-lg leading-6 text-gray-700">
                  <BlocksRenderer content={step.text} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
