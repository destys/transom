import { cn } from "@/lib/utils";

interface Props {
    text: string;
    className?: string;
}

export const Pretitle = ({ text, className }: Props) => {
    return (
        <div className={cn("flex gap-4 items-center text-xs font-bold text-sand-base", className)}>
            {text}
            <span className="w-10 h-0.5 bg-sand-base"></span>
        </div>

    )
}
