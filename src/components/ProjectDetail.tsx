import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type ProjectCategory = 'commercial' | 'residential' | 'community';
export type ProjectStatus = 'present' | 'past';

export type ProjectDetailData = {
  title: string;
  image: string;
  location: string;
  year: string;
  scope: string;
  description: string;
  longDescription: string;
  gallery: string[];
  category: ProjectCategory;
  status: ProjectStatus;
};

type Props = {
  project: ProjectDetailData;
  sourceLabel?: string;
  onBackToProjects?: () => void;
  onClose: () => void;
};

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export default function ProjectDetail({
  project,
  sourceLabel = 'Selected Projects',
  onBackToProjects,
  onClose,
}: Props) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const galleryTotal = project.gallery.length;
  const goNextFrame = () =>
    setGalleryIdx((i) => (i + 1) % galleryTotal);
  const goPrevFrame = () =>
    setGalleryIdx((i) => (i - 1 + galleryTotal) % galleryTotal);

  useEffect(() => {
    setGalleryIdx(0);
  }, [project.title]);

  useEffect(() => {
    const t = window.requestAnimationFrame(() => setEntered(true));
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.cancelAnimationFrame(t);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') triggerClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const triggerClose = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => onClose(), 720);
  };

  const goToContact = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => {
      onClose();
      window.requestAnimationFrame(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }, 720);
  };

  const goToHome = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => {
      onClose();
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }, 720);
  };

  const goToProjects = () => {
    if (closing) return;
    if (onBackToProjects) {
      onBackToProjects();
      return;
    }
    setClosing(true);
    window.setTimeout(() => {
      onClose();
      window.requestAnimationFrame(() => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }, 720);
  };

  const scrollTo = (target: React.RefObject<HTMLDivElement | null>) => {
    const container = scrollRef.current;
    const el = target.current;
    if (!container || !el) return;
    const top = el.offsetTop - 96;
    container.scrollTo({ top, behavior: 'smooth' });
  };

  const visible = entered && !closing;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] overflow-hidden"
      style={{
        backgroundColor: '#0E0E0E',
        opacity: visible ? 1 : 0,
        transition: `opacity 700ms ${EASE}`,
      }}
    >
      <div
        ref={scrollRef}
        className="relative w-full h-full overflow-y-auto"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: `transform 800ms ${EASE}`,
        }}
      >
        <div className="sticky top-0 z-30 flex flex-col gap-3 px-[5vw] md:px-[3vw] pt-[2vh] md:pt-[2.4vh] pb-[1.6vh] md:pb-[1.8vh] bg-[#0E0E0E]/70 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={triggerClose}
              className="group inline-flex items-center gap-2 md:gap-3 text-white/80 hover:text-white transition-colors duration-300"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/30 group-hover:border-white transition-colors duration-300">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.16em]">
                <span className="hidden sm:inline">Back to {sourceLabel}</span>
                <span className="sm:hidden">Back</span>
              </span>
            </button>
            <nav
              aria-label="Breadcrumb"
              className="text-[10px] md:text-xs uppercase tracking-[0.16em] text-white/55 text-right truncate max-w-[55vw]"
            >
              <button
                type="button"
                onClick={goToHome}
                className="hidden sm:inline hover:text-white transition-colors duration-300"
              >
                Doma Build
              </button>
              <span className="hidden sm:inline mx-2 text-white/25">/</span>
              <button
                type="button"
                onClick={goToProjects}
                className="hidden sm:inline hover:text-white transition-colors duration-300"
              >
                {sourceLabel}
              </button>
              <span className="hidden sm:inline mx-2 text-white/25">/</span>
              <span className="text-white/85">{project.title}</span>
            </nav>
          </div>

          <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.16em]">
            <button
              type="button"
              onClick={() => scrollTo(overviewRef)}
              className="px-3 py-1.5 rounded-full border border-white/20 text-white/75 hover:text-white hover:border-white/60 transition-colors duration-300"
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => scrollTo(galleryRef)}
              className="px-3 py-1.5 rounded-full border border-white/20 text-white/75 hover:text-white hover:border-white/60 transition-colors duration-300"
            >
              Gallery
            </button>
            <button
              type="button"
              onClick={() => scrollTo(contactRef)}
              className="px-3 py-1.5 rounded-full border border-white/20 text-white/75 hover:text-white hover:border-white/60 transition-colors duration-300"
            >
              Contact
            </button>
          </div>
        </div>

        <div ref={overviewRef} className="relative w-full h-[60vh] md:h-[78vh] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: visible ? 'scale(1)' : 'scale(1.06)',
              transition: `transform 1100ms ${EASE}`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
          <div className="absolute left-[5vw] right-[5vw] md:left-[3vw] md:right-[3vw] bottom-[5vh] md:bottom-[6vh] text-white">
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/60 mb-2 md:mb-3">
              {project.location} · {project.year}
            </div>
            <h1 className="font-serif leading-[1.02] text-[clamp(32px,7vw,108px)] max-w-full md:max-w-[78vw]">
              {project.title}
            </h1>
            <p className="mt-4 md:mt-6 max-w-full md:max-w-[42vw] text-white/75 text-[14px] md:text-[17px] leading-[1.6]">
              {project.description}
            </p>
          </div>
        </div>

        <div className="px-[5vw] md:px-[3vw] py-[8vh] md:py-[10vh] grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          <div className="lg:col-span-3 grid grid-cols-3 lg:grid-cols-1 gap-5 md:gap-6 lg:gap-0 lg:space-y-8">
            <Detail label="Location" value={project.location} />
            <Detail label="Year" value={project.year} />
            <Detail label="Scope" value={project.scope} />
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <p className="text-white/80 text-[15px] md:text-[19px] leading-[1.7] font-light">
              {project.longDescription}
            </p>
          </div>
        </div>

        <div ref={galleryRef} className="px-[5vw] md:px-[3vw] pb-[10vh] md:pb-[12vh]">
          <div className="flex items-end justify-between gap-3 mb-[3vh] md:mb-[4vh]">
            <div>
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/45 mb-2 md:mb-3">
                Gallery
              </div>
              <h2 className="font-serif text-white text-[clamp(28px,3.6vw,52px)] leading-[1.05]">
                Inside the build
              </h2>
            </div>
            <div className="text-right shrink-0">
              <div className="font-serif text-white text-[clamp(28px,3.6vw,52px)] leading-none tabular-nums">
                {String(galleryIdx + 1).padStart(2, '0')}
              </div>
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/45 mt-1">
                of {String(galleryTotal).padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="relative w-full h-[clamp(320px,58vh,640px)] rounded-md overflow-hidden bg-black/60 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            {project.gallery.map((src, i) => (
              <img
                key={src + i}
                src={src}
                alt={`${project.title} frame ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: i === galleryIdx ? 1 : 0,
                  transform: i === galleryIdx ? 'scale(1)' : 'scale(1.05)',
                  transition: `opacity 800ms ${EASE}, transform 1400ms ${EASE}`,
                }}
              />
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />

            <button
              type="button"
              onClick={goPrevFrame}
              aria-label="Previous frame"
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm text-white text-lg hover:bg-white hover:text-doma-text hover:border-white transition-colors duration-300"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNextFrame}
              aria-label="Next frame"
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm text-white text-lg hover:bg-white hover:text-doma-text hover:border-white transition-colors duration-300"
            >
              →
            </button>

            <div className="absolute left-4 md:left-6 bottom-4 md:bottom-6 text-white">
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/70">
                Frame {String(galleryIdx + 1).padStart(2, '0')} · {project.location}
              </div>
            </div>

            <div className="absolute right-4 md:right-6 bottom-4 md:bottom-6 hidden md:flex items-center gap-1.5">
              {project.gallery.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  type="button"
                  onClick={() => setGalleryIdx(i)}
                  aria-label={`Go to frame ${i + 1}`}
                  className={`h-px transition-all duration-500 ${
                    i === galleryIdx
                      ? 'w-8 bg-white'
                      : 'w-4 bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 md:mt-7 flex gap-2 md:gap-3 overflow-x-auto pb-2 thin-scroll">
            {project.gallery.map((src, i) => (
              <button
                key={`thumb-${src}-${i}`}
                type="button"
                onClick={() => setGalleryIdx(i)}
                aria-label={`Show frame ${i + 1}`}
                className={`relative shrink-0 w-[22vw] sm:w-[14vw] md:w-[9vw] aspect-[4/3] rounded overflow-hidden transition-all duration-500 ${
                  i === galleryIdx
                    ? 'opacity-100 ring-1 ring-white/80'
                    : 'opacity-45 hover:opacity-85'
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                <div className="absolute left-2 bottom-1.5 text-white/85 text-[10px] uppercase tracking-[0.2em] tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div
          ref={contactRef}
          className="px-[5vw] md:px-[3vw] pb-[12vh] md:pb-[14vh] flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 border-t border-white/10 pt-[6vh] md:pt-[8vh]"
        >
          <div>
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/45 mb-3">
              Enquire about this project
            </div>
            <h3 className="font-serif text-white text-[clamp(22px,3.4vw,52px)] leading-[1.05] max-w-[28ch]">
              Talk to us about {project.title}.
            </h3>
            <p className="mt-4 text-white/65 text-[14px] md:text-[16px] leading-[1.6] max-w-[52ch]">
              Send us a note and we'll come back with a sensible next step — a site visit, a similar reference, or a candid view of feasibility.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 self-start md:self-auto">
            <button
              onClick={goToContact}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/40 text-white text-xs md:text-sm uppercase tracking-[0.16em] hover:bg-white hover:text-doma-text transition-colors duration-300"
            >
              <span>Contact about this project</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={triggerClose}
              className="group inline-flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/55 hover:text-white transition-colors duration-300"
            >
              <span>← Back to {sourceLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/45 mb-1.5 md:mb-2">
        {label}
      </div>
      <div className="font-serif text-white text-[15px] md:text-[24px] leading-[1.2]">
        {value}
      </div>
    </div>
  );
}

