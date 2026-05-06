import { useRef, useCallback } from 'react';

type Variant = 'wide' | 'short';

type Testimonial = {
  id: string;
  url: string;
  thumbnail: string;
  fallbackThumbnail: string;
  client: string;
  role: string;
  quote: string;
  variant: Variant;
};

// For YouTube Shorts, `maxresdefault.jpg` often returns YouTube's gray
// placeholder (served as 200 OK so an onError handler never fires).
// `hqdefault.jpg` is reliable — it's 4:3 with the original 9:16 frame
// centered, so `object-cover` on a 9:16 card crops out the letterbox
// bars and shows exactly the Short's content.
const testimonials: Testimonial[] = [
  {
    id: 'iF3SWCCT94A',
    url: 'https://www.youtube.com/watch?v=iF3SWCCT94A',
    thumbnail: 'https://i.ytimg.com/vi/iF3SWCCT94A/maxresdefault.jpg',
    fallbackThumbnail: 'https://i.ytimg.com/vi/iF3SWCCT94A/hqdefault.jpg',
    client: 'Doma Constructions',
    role: 'Shiva Badri',
    quote: 'Project delivery walkthrough',
    variant: 'wide',
  },
  {
    id: 'zcB8pU6B_EQ',
    url: 'https://www.youtube.com/shorts/zcB8pU6B_EQ',
    thumbnail: 'https://i.ytimg.com/vi/zcB8pU6B_EQ/hqdefault.jpg',
    fallbackThumbnail: 'https://i.ytimg.com/vi/zcB8pU6B_EQ/mqdefault.jpg',
    client: 'Doma Constructions',
    role: 'Shiva Badri',
    quote: 'On-site progress',
    variant: 'short',
  },
  {
    id: 'aU-ZVvBPzhM',
    url: 'https://www.youtube.com/shorts/aU-ZVvBPzhM',
    thumbnail: 'https://i.ytimg.com/vi/aU-ZVvBPzhM/hqdefault.jpg',
    fallbackThumbnail: 'https://i.ytimg.com/vi/aU-ZVvBPzhM/mqdefault.jpg',
    client: 'Doma Constructions',
    role: 'Site walkthrough',
    quote: 'Build progress',
    variant: 'short',
  },
];

type CardProps = {
  t: Testimonial;
  /** When fluid, the card sizes to its container via aspect-ratio (mobile). */
  fluid?: boolean;
  /** Fixed pixel size used by the desktop slider. */
  fixedSize?: { width: number; height: number };
};

function TestimonialCard({ t, fluid = false, fixedSize }: CardProps) {
  const isWide = t.variant === 'wide';
  const aspectClass = isWide ? 'aspect-video' : 'aspect-[9/16]';
  const sizeClass = fluid
    ? `w-full ${aspectClass}`
    : 'flex-shrink-0 snap-start';
  const sizeStyle = !fluid && fixedSize
    ? { width: fixedSize.width, height: fixedSize.height }
    : undefined;

  return (
    <a
      href={t.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${t.client} testimonial on YouTube`}
      className={`group relative block ${sizeClass} rounded-xl overflow-hidden bg-doma-dark ring-1 ring-doma-text/10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_32px_70px_-25px_rgba(0,0,0,0.55)]`}
      style={sizeStyle}
    >
      <img
        src={t.thumbnail}
        alt={`${t.client} — ${t.quote}`}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          const img = e.currentTarget;
          if (img.src !== t.fallbackThumbnail) {
            img.src = t.fallbackThumbnail;
          }
        }}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none"
      />

      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-black/55 backdrop-blur text-white text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.18em] font-medium">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-doma-gold" />
        {isWide ? 'Video' : 'Short'}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="relative inline-flex items-center justify-center">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-doma-gold/30 blur-md scale-110 group-hover:scale-125 transition-transform duration-500"
          />
          <span className="relative inline-flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/95 backdrop-blur-sm shadow-lg shadow-black/40 transition-transform duration-500 group-hover:scale-110">
            <span
              aria-hidden
              className="block w-0 h-0 border-l-[11px] sm:border-l-[14px] md:border-l-[16px] border-l-doma-text border-y-[7px] sm:border-y-[9px] md:border-y-[10px] border-y-transparent translate-x-[2px]"
            />
          </span>
        </span>
      </div>

      <div className="absolute left-3 right-3 sm:left-4 sm:right-4 bottom-3 sm:bottom-4 text-white">
        <div className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-doma-gold/95 mb-1 sm:mb-1.5 line-clamp-1">
          {t.quote}
        </div>
        <div className="font-serif text-sm sm:text-base md:text-lg leading-tight line-clamp-1">
          {t.client}
        </div>
        <div className="text-[10px] sm:text-[11px] md:text-xs text-white/75 mt-0.5 line-clamp-1">
          — {t.role}
        </div>
      </div>
    </a>
  );
}

export default function TestimonialsSection() {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollByPage = useCallback((dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const amount = Math.max(rail.clientWidth * 0.7, 280);
    rail.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }, []);

  const shorts = testimonials.filter((t) => t.variant === 'short');
  const wides = testimonials.filter((t) => t.variant === 'wide');

  return (
    <section
      id="testimonials"
      className="relative z-[60] bg-doma-bg py-[10vh] md:py-[14vh] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-doma-gold/30 to-transparent"
      />

      <div className="px-[5vw] md:px-[3vw]">
        <div className="max-w-[1280px] mx-auto">
          {/* Header row */}
          <div className="flex items-end justify-between gap-6 mb-8 md:mb-12">
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <span className="inline-block w-8 h-px bg-doma-gold" />
                <span className="text-[11px] md:text-[12px] uppercase tracking-[0.28em] text-doma-gold font-medium">
                  Client Stories
                </span>
              </div>
              <h2 className="section-heading text-doma-text">Testimonials</h2>
            </div>

            {/* Desktop slider arrows */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => scrollByPage(-1)}
                aria-label="Previous testimonial"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-doma-text/20 text-doma-text hover:border-doma-gold hover:text-doma-gold hover:-translate-x-0.5 transition-all duration-300"
              >
                <span aria-hidden className="text-lg">←</span>
              </button>
              <button
                type="button"
                onClick={() => scrollByPage(1)}
                aria-label="Next testimonial"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-doma-text/20 text-doma-text hover:border-doma-gold hover:text-doma-gold hover:translate-x-0.5 transition-all duration-300"
              >
                <span aria-hidden className="text-lg">→</span>
              </button>
            </div>
          </div>

          {/* MOBILE — 2 shorts side by side, then the wide video */}
          <div className="md:hidden space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {shorts.map((t) => (
                <TestimonialCard key={t.id} t={t} fluid />
              ))}
            </div>
            <div className="space-y-4">
              {wides.map((t) => (
                <TestimonialCard key={t.id} t={t} fluid />
              ))}
            </div>
          </div>

          {/* DESKTOP — horizontal slider with snap + arrow controls */}
          <div className="hidden md:block">
            <div className="relative -mx-[5vw] md:-mx-[3vw]">
              <div
                ref={railRef}
                className="flex items-center gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 px-[5vw] md:px-[3vw] thin-scroll"
              >
                {testimonials.map((t) => (
                  <TestimonialCard
                    key={t.id}
                    t={t}
                    fixedSize={
                      t.variant === 'wide'
                        ? { width: 420, height: 236 }
                        : { width: 210, height: 373 }
                    }
                  />
                ))}
                <div aria-hidden className="flex-shrink-0 w-2" />
              </div>
            </div>

            <div className="mt-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-doma-muted">
              <span aria-hidden className="inline-block w-6 h-px bg-doma-text/20" />
              <span>Use the arrows or drag to see more · tap a clip to watch on YouTube</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
