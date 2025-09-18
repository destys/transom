import React from "react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  search: z.string(),
});

interface Props {
  isOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

export const HeaderSearch = ({ isOpen, setIsSearchOpen }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.warn(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex absolute top-0 right-0 size-[0px] overflow-hidden -z-10 transition-[width]",
          isOpen && "z-30 size-full md:w-[300px]"
        )}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex-auto">
              <FormControl>
                <Input
                  placeholder="Поиск..."
                  className="flex-auto size-full bg-[#F2F4F8] border-none rounded-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="button"
          className="shrink-0 basis-[70px] size-[70px] max-md:h-14 flex items-center justify-center bg-sand-base cursor-pointer relative z-20"
          onClick={() => setIsSearchOpen(false)}
        >
          {isOpen ? (
            <XIcon size={18} />
          ) : (
            <Image
              src={"/icons/search.svg"}
              alt="search"
              width={18}
              height={18}
            />
          )}
        </button>
      </form>
    </Form>
  );
};
