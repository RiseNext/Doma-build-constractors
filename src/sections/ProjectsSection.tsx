import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectDetail from '../components/ProjectDetail';
import CategoryOverlay from '../components/CategoryOverlay';
import type {
  ProjectDetailData,
  ProjectCategory,
} from '../components/ProjectDetail';
import { projects, CATEGORY_ENTRIES } from '../lib/projectsData';
import type { CategoryEntry } from '../lib/projectsData';
import { scrollToSection } from '../lib/scroll';

gsap.registerPlugin(ScrollTrigger);

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


const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const HOVER_DURATION = 700;
const HOVER_TRANSITION = `transform ${HOVER_DURATION}ms ${EASE}, opacity ${HOVER_DURATION}ms ${EASE}, box-shadow ${HOVER_DURATION}ms ${EASE}, filter ${HOVER_DURATION}ms ${EASE}`;

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const primaryCardRef = useRef<HTMLDivElement>(null);
  const secondaryCard1Ref = useRef<HTMLDivElement>(null);
  const secondaryCard2Ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLButtonElement>(null);

  const [hovered, setHovered] = useState<number | null>(null);
  const [openCategory, setOpenCategory] =
    useState<ProjectCategory | null>(null);
  const [openProject, setOpenProject] =
    useState<ProjectDetailData | null>(null);
  const isDesktop = useIsDesktop();

  const openProjectFromCategory = (project: ProjectDetailData) => {
    setOpenProject(project);
  };

  const goBackToSelected = () => {
    setOpenProject(null);
    setOpenCategory(null);

    // After the modals unmount, body/html overflow is restored. Force a
    // ScrollTrigger recalculation so any cached trigger positions (which
    // were measured while the page was scroll-locked) line up with the
    // live layout — otherwise scroll-driven section animations can feel
    // stuck or jumpy on the way back to the homepage.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        // Hard-reset any leftover overflow lock just in case overlapping
        // overlays didn't restore cleanly.
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        ScrollTrigger.refresh();
        scrollToSection('projects', { delay: 0 });
      });
    });
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | ProjectCategory
        | { category: ProjectCategory }
        | undefined;
      if (!detail) return;

      const category = typeof detail === 'string' ? detail : detail.category;
      if (
        category === 'commercial' ||
        category === 'residential' ||
        category === 'community'
      ) {
        setOpenCategory(category);
      }
    };
    window.addEventListener('projects:openCategory', handler);
    return () => window.removeEventListener('projects:openCategory', handler);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [
          primaryCardRef.current,
          secondaryCard1Ref.current,
          secondaryCard2Ref.current,
          labelRef.current,
        ],
        { x: 0, y: 0, opacity: 1, clearProps: 'transform' }
      );
      gsap.set(section.querySelectorAll('.card-title'), {
        y: 0,
        opacity: 1,
        clearProps: 'transform',
      });
    }, section);

    return () => ctx.revert();
  }, [isDesktop]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.mobile-category-card'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 0.6,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [isDesktop]);

  const innerStyle = (idx: number): React.CSSProperties => {
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

  if (!isDesktop) {
    return (
      <section
        id="projects"
        ref={sectionRef}
        className="relative z-20 bg-doma-bg py-[10vh]"
      >
        <div className="px-[5vw] mb-8">
          <div className="label-upper mb-3">PROJECTS</div>
          <h2 className="section-heading text-doma-text leading-[1.05]">
            Recent work
          </h2>
        </div>

        <div className="px-[5vw] flex flex-col gap-5">
          {CATEGORY_ENTRIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setOpenCategory(c.id)}
              className="mobile-category-card relative w-full aspect-[4/5] sm:aspect-[3/2] rounded-md overflow-hidden shadow-card group text-left will-change-transform bg-doma-dark"
            >
              <img
                src={c.image}
                alt={c.title}
                className={`w-full h-full ${c.id === 'community' ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-active:scale-[1.03]`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
              <div
                className="absolute left-5 right-5 bottom-5 text-white"
                style={{ textShadow: '0 2px 18px rgba(0,0,0,0.55)' }}
              >
                <div className="text-[12px] sm:text-[13px] uppercase tracking-[0.22em] text-white/90 mb-2 font-medium">
                  {c.blurb}
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl leading-tight">
                  {c.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-2 text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-white">
                  Explore <span>→</span>
                </span>
              </div>
            </button>
          ))}
        </div>

        {openCategory && (
          <CategoryOverlay
            category={openCategory}
            projects={projects}
            onClose={() => setOpenCategory(null)}
            onBackToSelected={goBackToSelected}
            onSelectProject={openProjectFromCategory}
          />
        )}

        {openProject && (
          <ProjectDetail
            project={openProject}
            categoryLabel={
              openCategory
                ? CATEGORY_ENTRIES.find((c) => c.id === openCategory)?.title
                : undefined
            }
            onBackToCategory={
              openCategory ? () => setOpenProject(null) : undefined
            }
            onBackToSelected={goBackToSelected}
            onClose={() => setOpenProject(null)}
          />
        )}
      </section>
    );
  }

  return (
    <section id="projects" ref={sectionRef} className="relative z-20 bg-doma-bg">
      <div className="pinned-section">
        <button
          ref={labelRef}
          type="button"
          className="group absolute left-[3vw] top-[7vh] z-30 inline-flex items-center gap-3 will-change-transform"
        >
          <span className="font-bold uppercase tracking-[0.18em] text-doma-text text-[13px] md:text-[15px] border-b-2 border-doma-text/25 pb-1 group-hover:border-doma-text transition-colors duration-300">
            Projects
          </span>
          <span className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border border-doma-text/30 text-doma-text text-[12px] transition-all duration-300 group-hover:border-doma-text group-hover:bg-doma-text group-hover:text-doma-bg group-hover:translate-x-1">
            →
          </span>
        </button>

        <CategoryCard
          outerRef={primaryCardRef}
          position="absolute left-[3vw] top-[16vh] w-[62vw] h-[64vh]"
          idx={0}
          entry={CATEGORY_ENTRIES[0]}
          onEnter={() => setHovered(0)}
          onLeave={() => setHovered((h) => (h === 0 ? null : h))}
          onClick={() => setOpenCategory(CATEGORY_ENTRIES[0].id)}
          innerStyle={innerStyle(0)}
          large
          showCta
        />

        <CategoryCard
          outerRef={secondaryCard1Ref}
          position="absolute left-[67vw] top-[16vh] w-[30vw] h-[40vh]"
          idx={1}
          entry={CATEGORY_ENTRIES[1]}
          onEnter={() => setHovered(1)}
          onLeave={() => setHovered((h) => (h === 1 ? null : h))}
          onClick={() => setOpenCategory(CATEGORY_ENTRIES[1].id)}
          innerStyle={innerStyle(1)}
        />

        <CategoryCard
          outerRef={secondaryCard2Ref}
          position="absolute left-[67vw] top-[58vh] w-[30vw] h-[22vh]"
          idx={2}
          entry={CATEGORY_ENTRIES[2]}
          onEnter={() => setHovered(2)}
          onLeave={() => setHovered((h) => (h === 2 ? null : h))}
          onClick={() => setOpenCategory(CATEGORY_ENTRIES[2].id)}
          innerStyle={innerStyle(2)}
        />
      </div>

      {openCategory && (
        <CategoryOverlay
          category={openCategory}
          projects={projects}
          onClose={() => setOpenCategory(null)}
          onBackToSelected={goBackToSelected}
          onSelectProject={openProjectFromCategory}
        />
      )}

      {openProject && (
        <ProjectDetail
          project={openProject}
          categoryLabel={
            openCategory
              ? CATEGORY_ENTRIES.find((c) => c.id === openCategory)?.title
              : undefined
          }
          onBackToCategory={
            openCategory ? () => setOpenProject(null) : undefined
          }
          onBackToSelected={goBackToSelected}
          onClose={() => setOpenProject(null)}
        />
      )}
    </section>
  );
}

type CategoryCardProps = {
  outerRef?: React.RefObject<HTMLDivElement | null>;
  position: string;
  idx: number;
  entry: CategoryEntry;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
  innerStyle: React.CSSProperties;
  large?: boolean;
  showCta?: boolean;
};

function CategoryCard({
  outerRef,
  position,
  entry,
  onEnter,
  onLeave,
  onClick,
  innerStyle,
  large,
  showCta,
}: CategoryCardProps) {
  return (
    <div ref={outerRef} className={`${position} will-change-transform`}>
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
        className="relative w-full h-full rounded-md overflow-hidden cursor-pointer shadow-card group bg-doma-dark"
        style={innerStyle}
      >
        <img
          src={entry.image}
          alt={entry.title}
          className={`w-full h-full ${entry.id === 'community' ? 'object-contain' : 'object-cover'} transition-transform [transition-duration:800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 pointer-events-none" />
        <div
          className={`absolute ${large ? 'left-[2.2vw] right-[2.2vw] bottom-[2.6vh]' : 'left-[1.6vw] right-[1.6vw] bottom-[2.2vh]'} text-white`}
          style={{ textShadow: '0 2px 18px rgba(0,0,0,0.55)' }}
        >
          <div
            className={`uppercase tracking-[0.22em] text-white/90 mb-2 font-medium ${large ? 'text-[13px] md:text-[14px]' : 'text-[11px] md:text-[12px]'}`}
          >
            {entry.blurb}
          </div>
          <h3
            className={`card-title font-serif transition-transform [transition-duration:700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 ${large ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-2xl md:text-3xl lg:text-4xl'}`}
          >
            {entry.title}
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
            Explore Category
          </button>
        )}
      </div>
    </div>
  );
}
