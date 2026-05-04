import { useEffect, useRef, useState } from 'react';

export type ProjectDetailData = {
  title: string;
  image: string;
  location: string;
  year: string;
  scope: string;
  description: string;
  longDescription: string;
  gallery: string[];
};

type Props = {
  project: ProjectDetailData;
  onClose: () => void;
};

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export default function ProjectDetail({ project, onClose }: Props) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className="fixed inset-0 z-[200] overflow-hidden"
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
        <div className="sticky top-0 z-30 flex items-center justify-between px-[3vw] py-[2.4vh] bg-[#0E0E0E]/70 backdrop-blur-sm">
          <button
            onClick={triggerClose}
            className="group inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 group-hover:border-white transition-colors duration-300">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
            </span>
            <span className="text-xs uppercase tracking-[0.16em]">Back to projects</span>
          </button>
          <div className="text-xs uppercase tracking-[0.16em] text-white/55">
            Doma Build / Case Study
          </div>
        </div>

        <div className="relative w-full h-[78vh] overflow-hidden">
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
          <div className="absolute left-[3vw] right-[3vw] bottom-[6vh] text-white">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/60 mb-3">
              {project.location} · {project.year}
            </div>
            <h1 className="font-serif leading-[1.02] text-[clamp(48px,7vw,108px)] max-w-[78vw]">
              {project.title}
            </h1>
            <p className="mt-6 max-w-[42vw] text-white/75 text-[15px] md:text-[17px] leading-[1.6]">
              {project.description}
            </p>
          </div>
        </div>

        <div className="px-[3vw] py-[10vh] grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3 space-y-8">
            <Detail label="Location" value={project.location} />
            <Detail label="Year" value={project.year} />
            <Detail label="Scope" value={project.scope} />
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <p className="text-white/80 text-[17px] md:text-[19px] leading-[1.7] font-light">
              {project.longDescription}
            </p>
          </div>
        </div>

        <div className="px-[3vw] pb-[12vh]">
          <div className="flex items-baseline justify-between mb-[5vh]">
            <h2 className="font-serif text-white text-[clamp(28px,3vw,44px)]">
              Inside the build
            </h2>
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
              Gallery · {project.gallery.length} frames
            </span>
          </div>
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {project.gallery.map((src, i) => {
              const span = galleryClass(i);
              return (
                <div
                  key={src + i}
                  className={`relative overflow-hidden rounded-md ${span}`}
                >
                  <img
                    src={src}
                    alt={`${project.title} gallery ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-[3vw] pb-[14vh] flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-white/10 pt-[8vh]">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-3">
              Considering a project?
            </div>
            <h3 className="font-serif text-white text-[clamp(28px,3.4vw,52px)] leading-[1.05] max-w-[28ch]">
              Let's build something with the same care.
            </h3>
          </div>
          <button
            onClick={triggerClose}
            className="group inline-flex items-center gap-3 pb-2 border-b border-white/30 text-white text-sm uppercase tracking-[0.16em] hover:border-doma-gold transition-colors duration-300 self-start md:self-auto"
          >
            <span>Back to projects</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-2">
        {label}
      </div>
      <div className="font-serif text-white text-[20px] md:text-[24px] leading-[1.2]">
        {value}
      </div>
    </div>
  );
}

function galleryClass(i: number): string {
  const pattern = [
    'col-span-12 md:col-span-7 aspect-[16/10]',
    'col-span-12 md:col-span-5 aspect-[4/5]',
    'col-span-12 md:col-span-4 aspect-[4/5]',
    'col-span-12 md:col-span-8 aspect-[16/9]',
    'col-span-12 md:col-span-6 aspect-[5/4]',
    'col-span-12 md:col-span-6 aspect-[5/4]',
  ];
  return pattern[i % pattern.length];
}
