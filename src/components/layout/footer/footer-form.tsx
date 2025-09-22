"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// ❗ Лучше использовать клиентский helper (а не server action):
// import { sendEmailClient as sendEmail } from "@/lib/send-email";
import { sendEmail } from "@/actions/send-email"; // если это server action — см. примечание ниже
import { useSimpleModal } from "@/providers/modal-provider";
import { SuccessModal } from "@/components/modals/success-modal";

const formSchema = z.object({
  phone: z.string().min(10).max(50),
});

type Values = z.infer<typeof formSchema>;

export const FooterForm = () => {
  const [loading, setLoading] = useState(false);
  const { openModal } = useSimpleModal();

  const form = useForm<Values>({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: "" },
  });

  const onSubmit = async (v: Values) => {
    try {
      setLoading(true);
      await sendEmail({ phone: v.phone }); // см. примечание ниже
      form.reset();

      // Открываем success-модалку
      openModal({
        maxWidth: "sm:max-w-sm",
        content: <SuccessModal />,
      });
    } catch (e) {
      form.setError("phone", {
        message: "Не удалось отправить. Попробуйте ещё раз.",
      });
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center w-full text-white bg-aqua-base min-h-[220px] -translate-y-1/2 relative">
      <Image
        src={"/footer-form-bg.svg"}
        alt="phone"
        fill
        className="!left-auto !w-fit"
      />
      <div className="flex items-center gap-6 md:gap-12 xl:gap-24 size-full px-6 xl:px-20 max-md:flex-col max-md:justify-center max-md:py-6">
        <div className="md:basis-sm">
          <div className="text-4xl font-mono text-white max-md:text-center">
            Остались вопросы?
          </div>
          <div className="text-sm text-sand-base max-md:text-center">
            Напишите Ваш телефон и мы свяжемся с Вами в ближайшее время
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row w-full md:w-auto md:flex-auto gap-7 relative z-10"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-auto">
                  <FormControl>
                    <Input
                      placeholder="Ваш телефон"
                      mask="+{7} (000) 000-00-00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="secondary"
              type="submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Отправка..." : "Отправить"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
