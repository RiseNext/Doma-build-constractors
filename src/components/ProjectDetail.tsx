import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Footer from './Footer';
import ContactPanel from './ContactPanel';
import { scrollToSection } from '../lib/scroll';

export type ProjectCategory = 'commercial' | 'residential' | 'community';

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
};

type Props = {
  project: ProjectDetailData;
  categoryLabel?: string;
  onClose: () => void;
  onBackToCategory?: () => void;
  onBackToSelected?: () => void;
};

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export default function ProjectDetail({
  project,
  categoryLabel,
  onClose,
  onBackToCategory,
  onBackToSelected,
}: Props) {
  const backLabel = categoryLabel || 'Selected Projects';
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

  const goToHome = () => {
    window.location.href = '/';
  };

  const goToSelected = () => {
    if (closing) return;
    if (onBackToSelected) {
      onBackToSelected();
      return;
    }
    setClosing(true);
    window.setTimeout(() => {
      onClose();
      scrollToSection('projects');
    }, 720);
  };

  const goToCategory = () => {
    if (closing) return;
    if (onBackToCategory) {
      onBackToCategory();
      return;
    }
    triggerClose();
  };

  const handleBack = () => {
    if (onBackToCategory) {
      onBackToCategory();
      return;
    }
    triggerClose();
  };


  const visible = entered && !closing;

  return createPortal(
    <div
      className="fixed inset-0 z-[420] overflow-hidden"
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
        <div className="sticky top-0 z-30 px-[5vw] md:px-[3vw] pt-[2vh] md:pt-[2.4vh] pb-[1.6vh] md:pb-[1.8vh] bg-[#0E0E0E]/70 backdrop-blur-sm">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs uppercase tracking-[0.16em] text-white/55 overflow-x-auto thin-scroll"
            style={{ overscrollBehavior: 'contain' }}
          >
            <button
              onClick={handleBack}
              aria-label="Back"
              className="group inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/30 hover:border-white text-white/80 hover:text-white transition-colors duration-300 shrink-0"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">
                ←
              </span>
            </button>
            <BreadcrumbLink onClick={goToHome}>Doma Build</BreadcrumbLink>
            <BreadcrumbSep />
            <BreadcrumbLink onClick={goToSelected}>Projects</BreadcrumbLink>
            {categoryLabel && (
              <>
                <BreadcrumbSep />
                <BreadcrumbLink onClick={goToCategory}>
                  {categoryLabel}
                </BreadcrumbLink>
              </>
            )}
            <BreadcrumbSep />
            <span className="text-white/90 whitespace-nowrap">
              {project.title}
            </span>
          </nav>
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
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/60 mb-3 md:mb-4">
              {project.year
                ? `${project.location} · ${project.year}`
                : project.location}
            </div>
            <h1
              className="inline-block font-serif leading-[1.02] text-[clamp(32px,7vw,108px)] max-w-full md:max-w-[78vw] px-5 md:px-8 py-3 md:py-4 rounded-[2rem] md:rounded-[3rem] bg-white/10 backdrop-blur-md ring-1 ring-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              {project.title}
            </h1>
          </div>
        </div>

        <div className="px-[5vw] md:px-[3vw] py-[8vh] md:py-[10vh] grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          <div className="lg:col-span-3 grid grid-cols-3 lg:grid-cols-1 gap-5 md:gap-6 lg:gap-0 lg:space-y-8">
            <Detail label="Location" value={project.location || '—'} />
            <Detail label="Year" value={project.year || '—'} />
            <Detail label="Scope" value={project.scope || '—'} />
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

          <div className="relative w-full h-[clamp(320px,58vh,640px)] rounded-md overflow-hidden bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            {project.gallery.map((src, i) => (
              <img
                key={src + i}
                src={src}
                alt={`${project.title} frame ${i + 1}`}
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  opacity: i === galleryIdx ? 1 : 0,
                  transform: i === galleryIdx ? 'scale(1)' : 'scale(1.02)',
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
          className="px-[5vw] md:px-[3vw] py-[8vh] md:py-[10vh] border-t border-white/10"
        >
          <ContactPanel
            label="Enquire about this project"
            heading={`Talk to us about ${project.title}.`}
            description="Send us your details and we'll come back to you about this build directly. Your message is carried straight to WhatsApp."
            initialPrefill={{
              project: project.title,
              projectCategory: project.category,
            }}
          />
        </div>

        <div className="px-[5vw] md:px-[3vw] pb-[6vh] md:pb-[8vh] flex justify-start">
          <button
            onClick={handleBack}
            className="group inline-flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/55 hover:text-white transition-colors duration-300"
          >
            <span>← Back to {backLabel}</span>
          </button>
        </div>

        <Footer variant="dark" />
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

function BreadcrumbLink({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-white/55 hover:text-white transition-colors duration-300 whitespace-nowrap"
    >
      {children}
    </button>
  );
}

function BreadcrumbSep() {
  return <span className="text-white/25 shrink-0">/</span>;
}

