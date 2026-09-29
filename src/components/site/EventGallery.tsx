import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { GalleryPhoto } from "@/config/gallery";

export function GallerySlider({ photos, onOpen }: { photos: GalleryPhoto[]; onOpen?: (index: number) => void }) {
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: "start", dragFree: true });
  const [paused, setPaused] = useState(false);
  const previous = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);

  useEffect(() => {
    if (!api || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => api.scrollNext(), 3600);
    return () => window.clearInterval(timer);
  }, [api, paused]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div ref={viewportRef} className="overflow-hidden">
        <ul className="flex touch-pan-y items-center gap-3 md:gap-4">
          {photos.map((photo, index) => {
            const landscape = photo.width > photo.height;
            return (
              <li key={photo.id} className={`min-w-0 shrink-0 ${landscape ? "basis-[72vw] sm:basis-[46vw] lg:basis-[30vw]" : "basis-[52vw] sm:basis-[30vw] lg:basis-[19vw]"}`}>
                <Button type="button" variant="ghost" onClick={() => onOpen?.(index)} className="group relative block h-56 w-full overflow-hidden rounded-xl border border-white/10 bg-black/50 p-0 text-left hover:bg-black/50 sm:h-64 lg:h-72" aria-label={`Open photo ${index + 1} of ${photos.length} from ${photo.year}`}>
                  <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-md">{photo.year}</span>
                  <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-colors group-hover:bg-gold group-hover:text-gold-foreground"><Expand size={15} /></span>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-5 flex items-center justify-end gap-2">
        <Button variant="outline" size="icon" onClick={previous} aria-label="Previous photos" className="rounded-full border-white/20 bg-white/[0.06] text-white hover:bg-gold hover:text-gold-foreground"><ArrowLeft /></Button>
        <Button variant="outline" size="icon" onClick={next} aria-label="Next photos" className="rounded-full border-white/20 bg-white/[0.06] text-white hover:bg-gold hover:text-gold-foreground"><ArrowRight /></Button>
      </div>
    </div>
  );
}

export function GalleryStrip({ photos }: { photos: GalleryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const previous = useCallback(() => setActiveIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % photos.length), [photos.length]);
  const featured = photos[activeIndex];
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    thumbRefs.current[activeIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex]);

  return (
    <div>
      <div className="relative">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setLightboxIndex(activeIndex)}
          className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-0 text-left hover:bg-black/40 sm:aspect-[2/1]"
          aria-label={`Open photo ${activeIndex + 1} of ${photos.length}`}
        >
          {featured && (
            <img
              key={featured.id}
              src={featured.src}
              alt={featured.alt}
              width={featured.width}
              height={featured.height}
              className="h-full w-full object-cover"
            />
          )}
          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
            <Expand size={15} />
          </span>
          <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-semibold tabular-nums tracking-[0.2em] text-gold backdrop-blur-md">
            {activeIndex + 1} / {photos.length}
          </span>
        </Button>
        <Button variant="outline" size="icon" onClick={previous} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border-white/20 bg-black/60 text-white hover:bg-gold hover:text-gold-foreground"><ArrowLeft /></Button>
        <Button variant="outline" size="icon" onClick={next} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border-white/20 bg-black/60 text-white hover:bg-gold hover:text-gold-foreground"><ArrowRight /></Button>
      </div>
      <div className="mt-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex w-max touch-pan-x items-stretch gap-2">
          {photos.map((photo, index) => (
            <li key={photo.id} className="min-w-0 shrink-0">
              <button
                ref={(el) => { thumbRefs.current[index] = el; }}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`block h-14 w-[4.5rem] overflow-hidden rounded-lg border p-0 transition-all duration-200 sm:h-16 sm:w-20 ${index === activeIndex ? "border-gold ring-2 ring-gold/40" : "border-white/15 opacity-55 hover:opacity-90"}`}
                aria-label={`Show photo ${index + 1} of ${photos.length}`}
                aria-current={index === activeIndex}
              >
                <img src={photo.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <GalleryLightbox photos={photos} activeIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} onChange={setLightboxIndex} />
    </div>
  );
}



export function GalleryPreview({ photos }: { photos: GalleryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <>
      <GallerySlider photos={photos} onOpen={setActiveIndex} />
      <GalleryLightbox photos={photos} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onChange={setActiveIndex} />
    </>
  );
}

export function GalleryLightbox({ photos, activeIndex, onClose, onChange }: { photos: GalleryPhoto[]; activeIndex: number | null; onClose: () => void; onChange: (index: number) => void }) {
  const showPrevious = useCallback(() => { if (activeIndex !== null) onChange((activeIndex - 1 + photos.length) % photos.length); }, [activeIndex, onChange, photos.length]);
  const showNext = useCallback(() => { if (activeIndex !== null) onChange((activeIndex + 1) % photos.length); }, [activeIndex, onChange, photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [activeIndex, onClose, showNext, showPrevious]);

  const photo = activeIndex === null ? undefined : photos[activeIndex];
  return (
    <AnimatePresence>
      {photo && activeIndex !== null && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-xl sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={`Photo ${activeIndex + 1} of ${photos.length}`} onClick={onClose}>
          <motion.img key={photo.id} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} className="max-h-[88dvh] max-w-[94vw] object-contain" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }} onClick={(event) => event.stopPropagation()} />
          <Button variant="outline" size="icon" onClick={onClose} aria-label="Close gallery" className="absolute right-4 top-4 rounded-full border-white/20 bg-black/60 text-white hover:bg-gold hover:text-gold-foreground sm:right-6 sm:top-6"><X /></Button>
          <Button variant="outline" size="icon" onClick={(event) => { event.stopPropagation(); showPrevious(); }} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border-white/20 bg-black/60 text-white hover:bg-gold hover:text-gold-foreground sm:left-6"><ArrowLeft /></Button>
          <Button variant="outline" size="icon" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border-white/20 bg-black/60 text-white hover:bg-gold hover:text-gold-foreground sm:right-6"><ArrowRight /></Button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tabular-nums text-white/70">{activeIndex + 1} / {photos.length}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}