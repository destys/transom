// /components/search/SearchResults.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Result = {
  id: string;
  type: "blog" | "service";
  title: string;
  link: string;
  tags?: string;
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildTokens(query: string) {
  // Разбиваем по пробелам/знакам, убираем короткие токены
  const raw = query.split(/[\s,.;:]+/).filter(Boolean);
  const uniq = Array.from(new Set(raw.map((t) => t.toLowerCase())));
  return uniq.filter((t) => t.length >= 2); // отсечь односимвольные
}

function Highlight({ text, query }: { text: string; query: string }) {
  const tokens = useMemo(() => buildTokens(query), [query]);

  if (!tokens.length) return <>{text}</>;

  const pattern = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "ig");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = tokens.some((t) => part.toLowerCase() === t);
        return isMatch ? (
          <span key={i} className="rounded-sm px-0.5 text-aqua-base font-bold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

export function SearchResults({
  results,
  searchText,
}: {
  results: Result[];
  searchText: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? results : results.slice(0, 10);

  return (
    <>
      <div className="mb-56 lg:mb-44 space-y-6 list-inside list-decimal">
        {results.length === 0 ? (
          <div className="text-gray-500">Ничего не найдено</div>
        ) : (
          visible.map((r) => (
            <div key={`${r.type}-${r.id}`}>
              <Link href={r.link} className="block">
                <div className="font-semibold mb-1">
                  <Highlight text={r.title} query={searchText} />
                </div>
                {r.tags ? (
                  <div className="text-sm text-muted-foreground">
                    <Highlight text={r.tags} query={searchText} />
                  </div>
                ) : null}
              </Link>
            </div>
          ))
        )}
      </div>

      {results.length > 10 && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="px-4 py-2 rounded-md bg-black text-white hover:opacity-90"
          >
            {showAll ? "Скрыть" : "Показать ещё"}
          </button>
        </div>
      )}
    </>
  );
}
