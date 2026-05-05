import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type {
  ProjectDetailData,
  ProjectCategory,
} from './ProjectDetail';
import Footer from './Footer';

const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  commercial: 'Commercial',
  residential: 'Residential',
  community: 'Community',
};

const CATEGORY_DESCRIPTION: Record<ProjectCategory, string> = {
  commercial:
    'Workspaces, retail and hospitality — buildings shaped around the working day.',
  residential:
    'Houses and homes — restored, extended, and built new with quiet detail.',
  community:
    'Civic and community spaces designed to weather softly with the street.',
};

type Props = {
  category: ProjectCategory;
  projects: ProjectDetailData[];
  onClose: () => void;
  onBackToSelected?: () => void;
  onSelectProject: (project: ProjectDetailData) => void;
};

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export default function CategoryOverlay({
  category,
  projects,
  onClose,
  onBackToSelected,
  onSelectProject,
}: Props) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);

  const items = projects.filter((p) => p.category === category);
  const hasItems = items.length > 0;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerClose = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => onClose(), 720);
  };

  const goToSelected = () => {
    if (onBackToSelected) {
      onBackToSelected();
      return;
    }
    triggerClose();
  };

  const visible = entered && !closing;
  const label = CATEGORY_LABEL[category];

  const renderGrid = (items: ProjectDetailData[]) => {
    if (items.length === 0) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {items.map((p) => (
          <button
            key={p.title}
            onClick={() => onSelectProject(p)}
            className="relative w-full aspect-[4/3] rounded-md overflow-hidden shadow-card group text-left"
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute left-5 right-5 bottom-5 text-white">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/70 mb-1.5">
                {p.year ? `${p.location} · ${p.year}` : p.location}
              </div>
              <h3 className="font-serif text-lg md:text-xl leading-tight">
                {p.title}
              </h3>
            </div>
          </button>
        ))}
      </div>
    );
  };

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
        className="relative w-full h-full overflow-y-auto"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: `transform 800ms ${EASE}`,
        }}
      >
        <div className="sticky top-0 z-30 flex items-center justify-between gap-3 px-[5vw] md:px-[3vw] py-[2vh] md:py-[2.4vh] bg-[#0E0E0E]/70 backdrop-blur-sm">
          <button
            onClick={triggerClose}
            className="group inline-flex items-center gap-2 md:gap-3 text-white/80 hover:text-white transition-colors duration-300"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/30 group-hover:border-white transition-colors duration-300">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">
                ←
              </span>
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.16em]">
              <span className="hidden sm:inline">Back to Selected Projects</span>
              <span className="sm:hidden">Back</span>
            </span>
          </button>
          <nav
            aria-label="Breadcrumb"
            className="text-[10px] md:text-xs uppercase tracking-[0.16em] text-white/55 truncate max-w-[55vw]"
          >
            <button
              type="button"
              onClick={() => {
                window.location.href = '/';
              }}
              className="hidden sm:inline hover:text-white transition-colors duration-300"
            >
              Doma Build
            </button>
            <span className="hidden sm:inline mx-2 text-white/25">/</span>
            <button
              type="button"
              onClick={goToSelected}
              className="hidden sm:inline hover:text-white transition-colors duration-300"
            >
              Selected Projects
            </button>
            <span className="hidden sm:inline mx-2 text-white/25">/</span>
            <span className="text-white/85">{label}</span>
          </nav>
        </div>

        <div className="px-[5vw] md:px-[3vw] pt-[5vh] md:pt-[7vh] pb-[3vh] md:pb-[4vh]">
          <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/45 mb-3 md:mb-4">
            Category
          </div>
          <h1 className="font-serif text-white text-[clamp(40px,7vw,108px)] leading-[1.02] mb-4 md:mb-6">
            {label}
          </h1>
          <p className="text-white/65 text-[14px] md:text-[17px] leading-[1.65] max-w-[58ch]">
            {CATEGORY_DESCRIPTION[category]}
          </p>
        </div>

        <div className="px-[5vw] md:px-[3vw] pt-[3vh] md:pt-[5vh] pb-[2vh] md:pb-[3vh]">
          <div className="flex items-baseline justify-between border-t border-white/10 pt-[3vh] md:pt-[4vh]">
            <div className="flex items-baseline gap-3 md:gap-4">
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/45 tabular-nums">
                01
              </span>
              <h2 className="font-serif text-white text-[clamp(22px,2.6vw,38px)]">
                Projects
              </h2>
            </div>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/45">
              {items.length} project{items.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {hasItems ? (
          <div className="px-[5vw] md:px-[3vw] pb-[10vh] md:pb-[12vh]">
            {renderGrid(items)}
          </div>
        ) : (
          <div className="px-[5vw] md:px-[3vw] py-[10vh] text-center text-white/45 text-[13px] uppercase tracking-[0.22em]">
            No projects yet.
          </div>
        )}

        <Footer variant="dark" />
      </div>
    </div>,
    document.body
  );
}

