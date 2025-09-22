"use client";

import * as React from "react";
import { IMaskInput, IMaskInputProps } from "react-imask";

import { cn } from "@/lib/utils";

interface InputProps
  extends Omit<React.ComponentProps<"input">, "mask" | "onChange"> {
  mask?: IMaskInputProps<HTMLInputElement>["mask"];
  /** Сюда прилетит SyntheticEvent, чтобы интеграция с RHF/контроллерами не ломалась */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const baseClass =
  "file:text-foreground placeholder:text-primary selection:bg-primary selection:text-primary-foreground " +
  "dark:bg-input/30 flex h-14 w-full min-w-0 border text-primary border-white bg-white px-5 py-5 text-sm " +
  "shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent " +
  "file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm " +
  "focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mask, onChange, ...props }, ref) => {
    // Если передана mask — рендерим IMaskInput
    if (mask) {
      return (
        <IMaskInput
          {...(props as any)}
          mask={mask}
          // Обычно удобнее получать "чистое" значение без форматирования
          unmask={false}
          data-slot="input"
          // Пробрасываем ref во внутренний input
          inputRef={(el) => {
            if (typeof ref === "function") ref(el);
            else if (ref)
              (ref as React.MutableRefObject<HTMLInputElement | null>).current =
                el;
          }}
          // Приводим onAccept к onChange-совместимому событию
          onAccept={(value: any) => {
            if (onChange) {
              const event = {
                target: {
                  name: (props as any).name,
                  value,
                },
              } as unknown as React.ChangeEvent<HTMLInputElement>;
              onChange(event);
            }
          }}
          className={cn(baseClass, className)}
        />
      );
    }

    // Обычный input без маски
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(baseClass, className)}
        ref={ref}
        onChange={onChange}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
