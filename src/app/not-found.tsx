import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className='flex justify-center items-center min-h-[976px] h-screen lg:h-[80vh] bg-[#000E54]/80'>
            <div className="container flex flex-col justify-center items-center">
                <h1 className='mb-6 lg:mb-14 text-white text-2xl lg:text-[40px]'>Страница не найдена...</h1>
                <div className='mb-7 lg:mb-16'>
                    <Image src={'/404.svg'} alt='404' width={887} height={271} />
                </div>
                <Link href={'/'}>
                    <Button variant={'secondary'}>
                        Вернуться на главную
                    </Button>
                </Link>
            </div>
        </div>
    )
}