"use client";

export function SuccessModal() {
  return (
    <div className="px-6 sm:px-12 py-10 sm:py-14 text-center">
      <h3 className="font-mono text-3xl sm:text-[38px] mb-6 text-aqua-base">
        Ваша заявка <br />
        отправлена
      </h3>
      <p className="text-sm mx-auto">
        Мы свяжемся с Вами
        <br className="hidden sm:block" />в ближайшее время
      </p>
    </div>
  );
}
