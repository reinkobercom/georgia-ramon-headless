import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center text-cream-50 transition-colors hover:text-gold-300">
      <ShoppingBagIcon className={clsx("h-5 w-5", className)} />
      {quantity ? (
        <div className="absolute top-0.5 right-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-semibold text-cocoa-950">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
