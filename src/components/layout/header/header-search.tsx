import React from 'react'
import Image from 'next/image';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"


const formSchema = z.object({
    search: z.string(),
})

interface Props {
    isOpen: boolean;
}

export const HeaderSearch = ({ isOpen }: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.warn(values)
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex absolute top-0 right-0 size-full overflow-hidden -z-10 transition-all", isOpen && "z-30 w-[300px]")}>
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className="flex-auto">
                            <FormControl>
                                <Input placeholder="Поиск..." className='flex-auto size-full bg-[#F2F4F8] border-none rounded-none' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                    }
                />
                < button type="submit" className="shrink-0 basis-[70px] size-[70px] flex items-center justify-center bg-sand-base cursor-pointer relative z-20" >
                    <Image src={'/icons/search.svg'} alt="search" width={18} height={18} />
                </button >
            </form >
        </Form >
    )
}
