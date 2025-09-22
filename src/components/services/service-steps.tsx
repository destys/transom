"use client";

import { useEffect, useRef, useState } from "react";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

interface Props {
  data: {
    title: string;
    steps: { id: number; text: BlocksContent }[];
  };
  gap?: number; // px между карточками (для десктопной ленты)
}

export const ServiceSteps = ({ data, gap = 24 }: Props) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // медиазапрос, чтобы не вешать логику на мобильных
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)"); // md
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // на <md ничего не делаем

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

    const calc = () => {
      vw = viewport.clientWidth;
      sectionH = root.offsetHeight;
      contentW = track.scrollWidth;
      maxX = Math.max(0, contentW - vw);
    };

    const update = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;

      const startTop = Math.max(0, vh - sectionH);
      const endTop = 0;

      let progress: number;

      if (sectionH <= vh) {
        const top = rect.top;
        const t =
          (startTop - Math.min(Math.max(top, endTop), startTop)) /
          Math.max(1, startTop - endTop);
        progress = clamp01(t);
      } else {
        const top = rect.top;
        const start = vh - sectionH;
        const end = 0;
        const t = (top - start) / Math.max(1, end - start);
        progress = clamp01(t);
      }

      const x = -maxX * progress; // линейно
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
  }, [isDesktop]);

  return (
    <section ref={rootRef as any} className="mb-18 lg:mb-36 overflow-hidden">
      <div className="container">
        <h2 className="font-semibold font-sans text-3xl text-aqua-base mb-14">
          {data.title}
        </h2>

        {/* --- Мобильная версия (<md): вертикальный список, без прокруток --- */}
        <div className="md:hidden space-y-4">
          {data.steps.map((step, i) => (
            <article
              key={step.id}
              className="bg-white rounded-xl p-4 flex items-start gap-3"
            >
              <div className="flex justify-center items-center bg-sand-base text-aqua-base font-mono text-lg font-bold shrink-0 size-8 rounded-full">
                {i + 1}
              </div>
              <div className="typography text-base leading-6 text-gray-700">
                <BlocksRenderer content={step.text} />
              </div>
            </article>
          ))}
        </div>

        {/* --- Десктопная версия (>=md): горизонтальная лента, скролл по странице --- */}
        <div ref={viewportRef} className="relative hidden md:block">
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
                className="bg-white rounded-xl w-[280px] sm:w-[320px] lg:w-[360px] p-4 flex items-start gap-3"
              >
                <div className="flex justify-center items-center bg-sand-base text-aqua-base font-mono text-xl lg:text-2xl font-bold shrink-0 size-10 rounded-full">
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
