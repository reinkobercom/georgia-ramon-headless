import clsx from "clsx";

// Wortmarke – ersetzt später durch das SVG-Logo von Georgia Ramon.
export default function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={clsx(
        "inline-flex flex-col items-center leading-none text-current",
        className,
      )}
    >
      <span
        className={clsx("font-serif tracking-[0.06em] uppercase", {
          "text-[19px] sm:text-[22px]": size === "md",
          "text-lg": size === "sm",
        })}
      >
        Georgia
      </span>
      <span
        className={clsx("font-serif tracking-[0.06em] uppercase", {
          "text-[19px] sm:text-[22px]": size === "md",
          "text-lg": size === "sm",
        })}
      >
        Ramon
      </span>
      <span className="mt-1 text-[8px] font-medium tracking-[0.3em] uppercase opacity-80">
        Bean to Bar
      </span>
    </span>
  );
}
