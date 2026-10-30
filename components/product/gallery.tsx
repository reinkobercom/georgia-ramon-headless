"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GridTileImage } from "components/grid/tile";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageIndex = searchParams.has("image")
    ? parseInt(searchParams.get("image")!)
    : 0;

  const updateImage = (index: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName =
    "h-full px-5 transition-colors hover:text-cocoa-900 flex items-center justify-center";

  return (
    <form>
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-cream-100">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
            priority={true}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-4 flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full bg-cream-50/90 text-cocoa-500 shadow-sm backdrop-blur-sm">
              <button
                formAction={() => updateImage(previousImageIndex.toString())}
                aria-label="Vorheriges Bild"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-cream-300"></div>
              <button
                formAction={() => updateImage(nextImageIndex.toString())}
                aria-label="Nächstes Bild"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="mt-3 flex items-center gap-2 overflow-x-auto py-1">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image.src} className="h-16 w-16 shrink-0 sm:h-20 sm:w-20">
                <button
                  formAction={() => updateImage(index.toString())}
                  aria-label="Bild auswählen"
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}
