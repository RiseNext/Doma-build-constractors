import { useEffect, useState } from 'react';

export type AboutArea = {
  id: 'expertise' | 'team' | 'services';
  num: string;
  title: string;
  intro: string;
  body: string;
  image: string;
  highlights: { label: string; value: string }[];
  bullets?: string[];
};

type Props = {
  area: AboutArea;
  onClose: () => void;
};

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export default function AboutDetail({ area, onClose }: Props) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const t = window.requestAnimationFrame(() => setEntered(true));
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.cancelAnimationFrame(t);
      document.body.style.overflow = prev;
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
    window.setTimeout(onClose, 720);
  };

  const visible = entered && !closing;

  return (
    <div
      className="fixed inset-0 z-[200] overflow-hidden"
      style={{
        backgroundColor: '#F2F2F2',
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
        <div className="sticky top-0 z-30 flex items-center justify-between px-[3vw] py-[2.4vh] bg-doma-bg/80 backdrop-blur-sm border-b border-doma-text/8">
          <button
            onClick={triggerClose}
            className="group inline-flex items-center gap-3 text-doma-text hover:text-doma-text/80 transition-colors duration-300"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-doma-text/20 group-hover:border-doma-text transition-colors duration-300">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
            </span>
            <span className="text-xs uppercase tracking-[0.16em]">Back to about</span>
          </button>
          <div className="text-xs uppercase tracking-[0.16em] text-doma-muted">
            {area.num} · {area.title}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 px-[3vw] pt-[10vh] pb-[6vh]">
            <div className="text-[11px] uppercase tracking-[0.2em] text-doma-gold mb-6">
              {area.num} / 03
            </div>
            <h1 className="font-serif text-doma-text leading-[1.02] text-[clamp(48px,6.5vw,104px)] max-w-[14ch]">
              {area.title}
            </h1>
            <p className="mt-8 max-w-[44ch] text-doma-text/80 text-[18px] md:text-[20px] leading-[1.55] font-light">
              {area.intro}
            </p>
          </div>
          <div className="lg:col-span-5 lg:pt-[10vh] lg:pb-[6vh] lg:pr-[3vw]">
            <div
              className="relative w-full aspect-[4/5] overflow-hidden rounded-md"
              style={{
                transform: visible ? 'scale(1)' : 'scale(1.05)',
                transition: `transform 1100ms ${EASE}`,
              }}
            >
              <img
                src={area.image}
                alt={area.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="px-[3vw] py-[6vh] grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-doma-text/8">
          <div className="lg:col-span-3 space-y-8">
            {area.highlights.map((h) => (
              <div key={h.label}>
                <div className="text-[11px] uppercase tracking-[0.18em] text-doma-muted mb-2">
                  {h.label}
                </div>
                <div className="font-serif text-doma-text text-[24px] md:text-[28px] leading-[1.15]">
                  {h.value}
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <p className="text-doma-text/85 text-[17px] md:text-[19px] leading-[1.7] font-light max-w-[60ch]">
              {area.body}
            </p>

            {area.bullets && (
              <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
                {area.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-baseline gap-3 py-3 border-b border-doma-text/10 text-doma-text"
                  >
                    <span className="inline-block w-6 h-px bg-doma-gold flex-shrink-0 translate-y-[-3px]" />
                    <span className="text-[15px] md:text-[16px]">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="px-[3vw] pb-[14vh] pt-[6vh] flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-doma-text/8">
          <h3 className="font-serif text-doma-text text-[clamp(28px,3.4vw,52px)] leading-[1.05] max-w-[24ch]">
            Want to understand the rest of how we work?
          </h3>
          <button
            onClick={triggerClose}
            className="group inline-flex items-center gap-3 pb-2 border-b border-doma-text/30 text-doma-text text-sm uppercase tracking-[0.16em] hover:border-doma-gold transition-colors duration-300 self-start md:self-auto"
          >
            <span>Back to about</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
