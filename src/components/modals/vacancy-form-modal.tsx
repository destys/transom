"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Loader2Icon } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sendEmail } from "@/actions/send-email";

const schema = z.object({
  phone: z.string().min(10, "Введите корректный телефон"),
});
type Values = z.infer<typeof schema>;

export function VacancyFormModal({
  onSuccess,
  className,
}: {
  onSuccess: () => void;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { phone: "" },
  });

  const onSubmit = async (v: Values) => {
    console.warn("v: ", v);
    try {
      setLoading(true);
      const res = await sendEmail({ phone: v.phone });
      console.warn("res: ", res);
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        // фон и текст как на макете
        "bg-[#0B1B69] text-white",
        // внутренние отступы и центрирование контента
        "px-6 sm:px-12 lg:px-14 py-10 sm:py-14 text-center",
        className
      )}
    >
      {/* Заголовок */}
      <h3 className="font-mono text-3xl sm:text-[38px] mb-4">
        Хотите работать у нас?
      </h3>

      {/* Подзаголовок */}
      <p className="text-sand-base text-sm mx-auto mb-8">
        Напишите Ваш телефон и мы свяжемся с&nbsp;Вами
        <br className="hidden sm:block" />в ближайшее время
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-6"
        >
          {/* Поле телефона — ширина как на макете */}
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full max-w-[560px]">
                <FormControl>
                  <Input
                    mask="+{7} (000) 000-00-00"
                    type="tel"
                    placeholder="Ваш телефон"
                    className={cn(
                      "h-12 sm:h-14 rounded-none",
                      "bg-white text-[#0B1B69] placeholder:text-[#5E698A]",
                      "border-0 focus-visible:ring-2 focus-visible:ring-[#E0BF8C]"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-200 mt-2" />
              </FormItem>
            )}
          />

          {/* Кнопка с рамкой и стрелкой */}
          <Button type="submit" variant={"secondary"} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Отправить"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
