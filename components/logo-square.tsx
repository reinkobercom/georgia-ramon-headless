import clsx from "clsx";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black",
        {
          "h-[40px] w-[40px] rounded-xl": !size,
          "h-[30px] w-[30px] rounded-lg": size === "sm",
        },
      )}
    >
      <span
        className={clsx("font-semibold tracking-tight", {
          "text-sm": !size,
          "text-[10px]": size === "sm",
        })}
      >
        GR
      </span>
    </div>
  );
}
