import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type {
  ProjectDetailData,
  ProjectCategory,
} from './ProjectDetail';

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
  onSelectProject: (project: ProjectDetailData) => void;
};

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const HOVER_DURATION = 700;
const HOVER_TRANSITION = `transform ${HOVER_DURATION}ms ${EASE}, opacity ${HOVER_DURATION}ms ${EASE}, box-shadow ${HOVER_DURATION}ms ${EASE}, filter ${HOVER_DURATION}ms ${EASE}`;

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 768px)').matches
      : true
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
};

export default function CategoryOverlay({
  category,
  projects,
  onClose,
  onSelectProject,
}: Props) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hoveredPresent, setHoveredPresent] = useState<number | null>(null);
  const [hoveredPast, setHoveredPast] = useState<number | null>(null);
  const isDesktop = useIsDesktop();

  const present = projects
    .filter((p) => p.category === category && p.status === 'present')
    .slice(0, 3);
  const past = projects
    .filter((p) => p.category === category && p.status === 'past')
    .slice(0, 3);
  const hasPast = past.length > 0;

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

  const innerStyle = (
    idx: number,
    hovered: number | null
  ): React.CSSProperties => {
    const base: React.CSSProperties = {
      transition: HOVER_TRANSITION,
      willChange: 'transform, opacity, filter',
    };
    if (hovered === null) return base;
    if (hovered === idx) {
      return {
        ...base,
        transform: 'scale(1.05)',
        boxShadow:
          '0 30px 80px rgba(0,0,0,0.18), 0 12px 30px rgba(0,0,0,0.10)',
        zIndex: 5,
      };
    }
    return {
      ...base,
      transform: 'scale(0.98)',
      opacity: 0.5,
      filter: 'blur(1.5px)',
    };
  };

  const visible = entered && !closing;
  const label = CATEGORY_LABEL[category];

  const renderTriple = (
    items: ProjectDetailData[],
    hovered: number | null,
    setHovered: (v: number | null) => void
  ) => {
    if (!isDesktop) {
      return (
        <div className="px-[5vw] flex flex-col gap-5">
          {items.map((p) => (
            <button
              key={p.title}
              onClick={() => onSelectProject(p)}
              className="relative w-full aspect-[4/5] sm:aspect-[3/2] rounded-md overflow-hidden shadow-card group text-left"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 group-active:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5 text-white">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/70 mb-1.5">
                  {p.location} · {p.year}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl leading-tight">
                  {p.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="relative w-full h-[80vh] px-[3vw]">
        {items[0] && (
          <Card
            position="absolute left-[3vw] top-0 w-[62vw] h-[64vh]"
            project={items[0]}
            large
            showCta
            onClick={() => onSelectProject(items[0])}
            onEnter={() => setHovered(0)}
            onLeave={() => setHovered(hovered === 0 ? null : hovered)}
            innerStyle={innerStyle(0, hovered)}
          />
        )}
        {items[1] && (
          <Card
            position="absolute left-[67vw] top-0 w-[30vw] h-[40vh]"
            project={items[1]}
            onClick={() => onSelectProject(items[1])}
            onEnter={() => setHovered(1)}
            onLeave={() => setHovered(hovered === 1 ? null : hovered)}
            innerStyle={innerStyle(1, hovered)}
          />
        )}
        {items[2] && (
          <Card
            position="absolute left-[67vw] top-[42vh] w-[30vw] h-[22vh]"
            project={items[2]}
            onClick={() => onSelectProject(items[2])}
            onEnter={() => setHovered(2)}
            onLeave={() => setHovered(hovered === 2 ? null : hovered)}
            innerStyle={innerStyle(2, hovered)}
          />
        )}
      </div>
    );
  };

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
          <nav className="text-[10px] md:text-xs uppercase tracking-[0.16em] text-white/55 truncate max-w-[55vw]">
            <span className="hidden sm:inline">Doma Build</span>
            <span className="hidden sm:inline mx-2 text-white/25">/</span>
            <span className="hidden sm:inline">Selected Projects</span>
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
                Present
              </h2>
            </div>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/45">
              {present.length} project{present.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {present.length > 0 ? (
          renderTriple(present, hoveredPresent, setHoveredPresent)
        ) : (
          <div className="px-[5vw] md:px-[3vw] py-[10vh] text-center text-white/45 text-[13px] uppercase tracking-[0.22em]">
            No present projects yet.
          </div>
        )}

        {hasPast && !expanded && (
          <div className="px-[5vw] md:px-[3vw] pt-[6vh] md:pt-[8vh] pb-[10vh] md:pb-[12vh] flex justify-center">
            <button
              onClick={() => setExpanded(true)}
              className="group inline-flex items-center gap-3 px-6 md:px-7 py-3 md:py-3.5 border border-white/40 rounded-full text-white text-xs md:text-sm uppercase tracking-[0.18em] font-semibold hover:bg-white hover:text-doma-text transition-colors duration-500"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-current text-[14px] leading-none transition-transform duration-300 group-hover:rotate-90">
                +
              </span>
              <span>More Projects</span>
            </button>
          </div>
        )}

        {expanded && hasPast && (
          <>
            <div className="px-[5vw] md:px-[3vw] pt-[6vh] md:pt-[8vh] pb-[2vh] md:pb-[3vh]">
              <div className="flex items-baseline justify-between border-t border-white/10 pt-[3vh] md:pt-[4vh]">
                <div className="flex items-baseline gap-3 md:gap-4">
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/45 tabular-nums">
                    02
                  </span>
                  <h2 className="font-serif text-white text-[clamp(22px,2.6vw,38px)]">
                    Past
                  </h2>
                </div>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/45">
                  {past.length} project{past.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {renderTriple(past, hoveredPast, setHoveredPast)}

            <div className="px-[5vw] md:px-[3vw] pt-[6vh] md:pt-[8vh] pb-[10vh] md:pb-[12vh] flex justify-center">
              <button
                onClick={() => setExpanded(false)}
                className="group inline-flex items-center gap-3 px-6 md:px-7 py-3 md:py-3.5 border border-white/40 rounded-full text-white text-xs md:text-sm uppercase tracking-[0.18em] font-semibold hover:bg-white hover:text-doma-text transition-colors duration-500"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-current text-[14px] leading-none transition-transform duration-300 group-hover:-rotate-90">
                  −
                </span>
                <span>Less Projects</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

type CardProps = {
  position: string;
  project: ProjectDetailData;
  onClick: () => void;
  onEnter: () => void;
  onLeave: () => void;
  innerStyle: React.CSSProperties;
  large?: boolean;
  showCta?: boolean;
};

function Card({
  position,
  project,
  onClick,
  onEnter,
  onLeave,
  innerStyle,
  large,
  showCta,
}: CardProps) {
  return (
    <div className={`${position} will-change-transform`}>
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
        className="relative w-full h-full rounded-md overflow-hidden cursor-pointer shadow-card group"
        style={innerStyle}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform [transition-duration:800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div
          className={`absolute ${large ? 'left-[2.2vw] bottom-[2.6vh]' : 'left-[1.6vw] bottom-[2.2vh]'} text-white`}
        >
          <div
            className={`uppercase tracking-[0.22em] text-white/70 mb-1.5 ${large ? 'text-[11px]' : 'text-[10px]'}`}
          >
            {project.location} · {project.year}
          </div>
          <h3
            className={`font-serif transition-transform [transition-duration:700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 ${large ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}
          >
            {project.title}
          </h3>
        </div>
        {showCta && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="absolute right-[2.2vw] bottom-[2.6vh] px-5 py-2 border border-white/40 text-white text-xs uppercase tracking-wider rounded-full opacity-90 transition-[opacity,background-color,color,border-color,transform] [transition-duration:700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:-translate-y-1 hover:bg-white hover:text-doma-text"
          >
            View Project
          </button>
        )}
      </div>
    </div>
  );
}
