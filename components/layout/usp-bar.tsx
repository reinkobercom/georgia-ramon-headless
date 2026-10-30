import { CheckIcon } from "@heroicons/react/24/outline";
import { uspItems } from "lib/navigation";

export function UspBar() {
  return (
    <div className="overflow-hidden border-b border-cream-300 bg-cream-100 text-[11px] text-cocoa-700 sm:text-xs">
      {/* Desktop: statisch */}
      <ul className="container-shop hidden h-10 items-center justify-between md:flex">
        {uspItems.map((usp) => (
          <li key={usp} className="flex items-center gap-2">
            <CheckIcon className="h-3.5 w-3.5 text-gold-600" />
            {usp}
          </li>
        ))}
      </ul>
      {/* Mobil: Laufband */}
      <div className="flex h-9 items-center md:hidden">
        <ul className="flex shrink-0 animate-[marquee_28s_linear_infinite] gap-8 pr-8 whitespace-nowrap">
          {[...uspItems, ...uspItems].map((usp, i) => (
            <li key={i} className="flex items-center gap-2" aria-hidden={i >= uspItems.length}>
              <CheckIcon className="h-3.5 w-3.5 text-gold-600" />
              {usp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
