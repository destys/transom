"use client";

import * as React from "react";
import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

import { Input } from "../ui/input";

export interface VacancyProps {
    id: number;
    title: string;
    description: string;
}

interface Props {
    data: VacancyProps[];
    maxItems?: number;
}

export const SearchForm: React.FC<Props> = ({ data, maxItems = 8 }) => {
    const router = useRouter();
    const [q, setQ] = useState("");
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const wrapRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const norm = (s: string) =>
        (s || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .replace(/\s+/g, " ")
            .trim();

    const items = useMemo(() => {
        const qn = norm(q);
        if (!qn) return [];
        const scored = data
            .map((v) => {
                const hay = `${v.title} • ${v.description}`;
                const hn = norm(hay);
                if (!hn.includes(qn)) return null;

                // простой скоринг: совпадения в title важнее
                const titleIdx = norm(v.title).indexOf(qn);
                const descIdx = norm(v.description).indexOf(qn);
                const score =
                    (titleIdx !== -1 ? titleIdx : 10_000) + (descIdx !== -1 ? descIdx / 10 : 0);
                return { v, score };
            })
            .filter(Boolean) as { v: VacancyProps; score: number }[];

        scored.sort((a, b) => a.score - b.score);
        return scored.slice(0, maxItems);
    }, [q, data, maxItems]);

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!wrapRef.current) return;
            if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    const highlight = (text: string) => {
        const qn = norm(q);
        if (!qn) return text;

        // безопасная подсветка по словам запроса
        const esc = qn.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const re = new RegExp(`(${esc})`, "ig");
        const parts = text.split(re);
        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === qn ? (
                        <mark key={i} className="bg-yellow-200 rounded px-0.5">
                            {part}
                        </mark>
                    ) : (
                        <React.Fragment key={i}>{part}</React.Fragment>
                    )
                )}
            </>
        );
    };

    const go = (id: number) => {
        setOpen(false);
        router.push(`/vacancies#vacancy-${id}`);
    };

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
            setOpen(true);
            return;
        }
        if (!items.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => (i + 1) % items.length);
            listRef.current?.children[(active + 1) % items.length]?.scrollIntoView({ block: "nearest" });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => (i - 1 + items.length) % items.length);
            listRef.current
                ?.children[(active - 1 + items.length) % items.length]
                ?.scrollIntoView({ block: "nearest" });
        } else if (e.key === "Enter") {
            e.preventDefault();
            const picked = items[active];
            if (picked) go(picked.v.id);
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    };

    // небольшой сниппет из description
    const makeSnippet = (v: VacancyProps, len = 120) => {
        const text = v.description || "";
        if (!q) return text.slice(0, len) + (text.length > len ? "…" : "");
        const i = norm(text).indexOf(norm(q));
        if (i === -1) return text.slice(0, len) + (text.length > len ? "…" : "");
        const start = Math.max(0, i - 20);
        const end = Math.min(text.length, start + len);
        const chunk = text.slice(start, end);
        return (start > 0 ? "… " : "") + chunk + (end < text.length ? " …" : "");
    };

    return (
        <div ref={wrapRef} className="max-w-[576px] mx-auto relative">
            <Input
                value={q}
                onChange={(e) => {
                    setQ(e.target.value);
                    setActive(0);
                    setOpen(true);
                }}
                onFocus={() => q && setOpen(true)}
                onKeyDown={onKeyDown}
                className="mb-16 py-9 pl-9 pr-16 rounded-[1000px] w-full shadow-[0_10px_20px_0_#00000014] text-base focus:border-0"
                placeholder="Поиск вакансий..."
                aria-autocomplete="list"
                aria-expanded={open}
                aria-controls="vacancy-search-listbox"
                role="combobox"
            />
            <button
                type="button"
                className="absolute top-1/2 right-5 z-10 -translate-y-1/2 size-12 text-white flex justify-center items-center bg-aqua-base rounded-full"
                onClick={() => {
                    if (items[0]) go(items[0].v.id);
                }}
                aria-label="Искать"
            >
                <SearchIcon />
            </button>

            {open && q && (
                <div className="absolute left-0 right-0 top-[110%] z-20">
                    <ul
                        id="vacancy-search-listbox"
                        ref={listRef}
                        role="listbox"
                        className="max-h-96 overflow-auto rounded-3xl bg-white shadow-[0_10px_20px_0_#00000014]"
                    >
                        {items.length === 0 && (
                            <li className="px-4 py-3 text-sm text-muted-foreground">Ничего не найдено</li>
                        )}

                        {items.map(({ v }, i) => {
                            const isActive = i === active;
                            return (
                                <li
                                    key={v.id}
                                    role="option"
                                    aria-selected={isActive}
                                    className={`px-4 py-3 cursor-pointer transition-colors ${isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                                        }`}
                                    onMouseEnter={() => setActive(i)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => go(v.id)}
                                >
                                    <div className="text-sm font-medium leading-5">{highlight(v.title)}</div>
                                    {v.description && (
                                        <div className="mt-0.5 text-xs text-muted-foreground">
                                            {highlight(makeSnippet(v))}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};