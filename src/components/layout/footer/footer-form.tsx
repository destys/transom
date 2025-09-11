"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  phone: z.string().min(10).max(50),
});

export const FooterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.warn(values);
  }

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
            <Button variant={"secondary"} type="submit">
              Отправить
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
