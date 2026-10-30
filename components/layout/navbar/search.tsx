"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <Form
      action="/search"
      className="relative w-full"
    >
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="Schokolade suchen …"
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="w-full rounded-sm border border-cocoa-700 bg-cocoa-900 px-4 py-2.5 text-base text-cream-50 placeholder:text-cream-300/60"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-cream-200" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full">
      <input
        placeholder="Schokolade suchen …"
        className="w-full rounded-sm border border-cocoa-700 bg-cocoa-900 px-4 py-2.5 text-base text-cream-50 placeholder:text-cream-300/60"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-cream-200" />
      </div>
    </form>
  );
}
