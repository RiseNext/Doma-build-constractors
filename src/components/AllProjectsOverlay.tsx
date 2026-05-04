import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ProjectDetailData } from './ProjectDetail';

type Props = {
  projects: ProjectDetailData[];
  onClose: () => void;
  onSelect: (idx: number) => void;
};

const PAGE_SIZE = 3;
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export default function AllProjectsOverlay({ projects, onClose, onSelect }: Props) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const t = window.requestAnimationFrame(() => setEntered(true));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.cancelAnimationFrame(t);
      document.body.style.overflow = prevOverflow;
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

  const visible = entered && !closing;
  const shown = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

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
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.16em]">Back</span>
          </button>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.16em] text-white/55">
            All Projects · {projects.length}
          </div>
        </div>

        <div className="px-[5vw] md:px-[3vw] pt-[5vh] md:pt-[6vh] pb-[12vh] md:pb-[14vh]">
          <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/55 mb-3 md:mb-4">
            The full archive
          </div>
          <h1 className="font-serif text-white text-[clamp(28px,5.5vw,80px)] leading-[1.05] mb-[2vh] md:mb-[2.4vh] max-w-[18ch]">
            Every build, in one place.
          </h1>
          <p className="text-white/60 text-[14px] md:text-[16px] max-w-[44ch] mb-[6vh] md:mb-[8vh] leading-[1.6]">
            The full archive of work delivered across residential, commercial, and community briefs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {shown.map((p, i) => (
              <button
                key={p.title + i}
                onClick={() => onSelect(i)}
                className="all-project-card group relative overflow-hidden rounded-md aspect-[4/5] text-left will-change-transform shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                style={{
                  animation: `apFadeUp 700ms ${EASE} ${Math.min(i, 5) * 60}ms both`,
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform [transition-duration:1100ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute left-[1.6vw] right-[1.6vw] bottom-[2.4vh] text-white">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/60 mb-2">
                    {p.location} · {p.year}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl leading-[1.1] transition-transform [transition-duration:700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                    {p.title}
                  </h3>
                  <div className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span>View project</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center mt-[8vh] gap-3">
            {hasMore ? (
              <button
                onClick={() =>
                  setVisibleCount((n) => Math.min(n + PAGE_SIZE, projects.length))
                }
                className="group inline-flex items-center gap-3 px-7 py-3.5 border border-white/40 rounded-full text-white text-xs md:text-sm uppercase tracking-[0.18em] font-semibold hover:bg-white hover:text-doma-text transition-colors duration-500"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-current text-[14px] leading-none transition-transform duration-300 group-hover:rotate-90">
                  +
                </span>
                <span>More Projects</span>
              </button>
            ) : (
              projects.length > PAGE_SIZE && (
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                  Showing all {projects.length} projects
                </span>
              )
            )}
            {hasMore && (
              <button
                onClick={() => setVisibleCount(projects.length)}
                className="text-[11px] uppercase tracking-[0.22em] text-white/55 hover:text-white transition-colors duration-300 underline-offset-4 hover:underline"
              >
                Show all projects
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes apFadeUp {
          0%   { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>,
    document.body
  );
}
