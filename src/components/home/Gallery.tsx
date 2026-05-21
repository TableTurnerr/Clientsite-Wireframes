"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SmartImage from "../shared/SmartImage";

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

const IMAGES: GalleryImage[] = [
  {
    src: "/Images/gallery/baklava-pistachio-copper.webp",
    alt: "Pistachio baklava layered on a hammered copper dish, surrounded by raw pistachios",
    caption: "Pistachio baklava — our four-generation signature",
  },
  {
    src: "/Images/gallery/sweets-platter-lamps.webp",
    alt: "A large oval platter of mixed Iraqi baklava and bird's nest pastries in the bakery window",
    caption: "Assorted baklava platter, fresh from the oven",
  },
  {
    src: "/Images/gallery/baklava-pistachio-plate.webp",
    alt: "Pistachio baklava plated on a green ceramic dish beside Turkish mosaic lamps",
    caption: "Hand-cut, hand-rolled, glazed in syrup",
  },
  {
    src: "/Images/gallery/zalabia-rings.webp",
    alt: "Two golden zalabia rings, crisp and syrup-soaked, plated on green ceramic",
    caption: "Zalabia rings — crisp outside, syrup-soaked through",
  },
  {
    src: "/Images/gallery/baklava-tiered-tray.webp",
    alt: "A three-tier copper stand of mixed Iraqi sweets served with a small pot of qahwa",
    caption: "Tiered trays built for the table — perfect for catering",
  },
  {
    src: "/Images/gallery/baklava-boxed.webp",
    alt: "A boxed Al-Baghdady bakery selection next to a plate of fresh pistachio baklava",
    caption: "Boxed and ready to take home, in any size",
  },
  {
    src: "/Images/gallery/dessert-tray-box.webp",
    alt: "An Al-Baghdady catering box with compartments of mixed baklava, pistachio rolls and Iraqi sweets",
    caption: "Custom dessert trays, boxed for celebrations",
  },
  {
    src: "/Images/gallery/zalabia-tray.webp",
    alt: "A heaped tray of golden zalabia rings dusted with crushed pistachio",
    caption: "Fresh zalabia rings, by the trayful",
  },
  {
    src: "/Images/gallery/ladyfingers-pistachio.webp",
    alt: "Crisp phyllo ladyfinger rolls dusted with pistachio on a ridged glass plate",
    caption: "Ladyfingers — rolled, fried crisp, dusted with pistachio",
  },
];

const SPANS = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
];

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIdx(null), []);
  const next = useCallback(
    () => setLightboxIdx((i) => (i === null ? null : (i + 1) % IMAGES.length)),
    [],
  );
  const prev = useCallback(
    () =>
      setLightboxIdx((i) =>
        i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length,
      ),
    [],
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIdx, close, next, prev]);

  return (
    <section className="section-pad">
      <div className="container-pad">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="eyebrow">Gallery</div>
          <h2 className="mb-4">A closer look at the counter.</h2>
          <p className="text-[var(--color-text-muted)]">
            From pistachio baklava we&apos;ve been laying down since 1919 to the
            zalabia rings that come out crisp every morning.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 lg:auto-rows-[220px]">
          {IMAGES.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setLightboxIdx(idx)}
              aria-label={`Open photo: ${img.caption}`}
              className={`relative block rounded-2xl overflow-hidden cursor-pointer group bg-white border border-[var(--color-border)] aspect-square lg:aspect-auto lg:h-full ${SPANS[idx]}`}
              style={{
                transition:
                  "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease",
              }}
            >
              <SmartImage
                src={img.src}
                alt={img.alt}
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                className="w-full h-full"
                imgClassName="gallery-img"
                fetchPriority="low"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 transition-opacity duration-500 opacity-60 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26,20,16,0) 40%, rgba(26,20,16,0.55) 75%, rgba(26,20,16,0.85) 100%)",
                }}
              />

              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 transition-all duration-500 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                <p
                  className="text-[0.95rem] leading-snug font-medium text-left"
                  style={{
                    color: "#FFFFFF",
                    textShadow: "0 1px 2px rgba(0,0,0,0.45)",
                  }}
                >
                  {img.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery viewer"
          onClick={close}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-fade-in"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close gallery"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X size={20} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={22} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight size={22} strokeWidth={2} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl flex flex-col items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGES[lightboxIdx].src}
              alt={IMAGES[lightboxIdx].alt}
              className="w-auto max-w-full max-h-[78vh] object-contain rounded-lg gallery-img"
            />
            <div
              className="text-center mt-4 text-sm px-6"
              style={{ color: "rgba(255,255,255,0.92)" }}
            >
              {IMAGES[lightboxIdx].caption}
              <span
                className="block text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {lightboxIdx + 1} / {IMAGES.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
