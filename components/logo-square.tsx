import clsx from "clsx";
import Image from "next/image";

// Offizielles Logo, weiß auf transparent (für dunkle Hintergründe).
export default function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Image
      src="/logo-georgia-ramon-white.png"
      alt="Georgia Ramon"
      width={500}
      height={385}
      priority={size === "md"}
      className={clsx(
        "w-auto",
        {
          "h-9": size === "sm",
          "h-11 md:h-14": size === "md",
          "h-16 md:h-20": size === "lg",
        },
        className,
      )}
    />
  );
}
