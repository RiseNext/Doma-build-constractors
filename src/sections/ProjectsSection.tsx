import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectDetail from '../components/ProjectDetail';
import type { ProjectDetailData } from '../components/ProjectDetail';

gsap.registerPlugin(ScrollTrigger);

const projects: ProjectDetailData[] = [
  {
    title: 'Victoria Mews Residence',
    image: '/project_primary_residence.jpg',
    location: 'Hackney, London',
    year: '2024',
    scope: 'Full refurbishment + extension',
    description:
      'A heritage townhouse reimagined with restrained materiality and considered light.',
    longDescription:
      'A complete reworking of a Victorian townhouse, opening up the rear elevation with a quiet glass-and-stone extension and re-detailing the original interiors. Every joint, fixture, and finish was specified to age gracefully — oak floors, lime plaster, brushed brass — so the house reads as one continuous story rather than a renovation pasted onto a heritage shell.',
    gallery: [
      '/archive_01.jpg',
      '/archive_02.jpg',
      '/archive_03.jpg',
      '/archive_04.jpg',
      '/archive_05.jpg',
      '/archive_06.jpg',
    ],
  },
  {
    title: 'Fleet Street Loft',
    image: '/project_loft.jpg',
    location: 'Holborn, London',
    year: '2023',
    scope: 'Loft conversion + interior fit-out',
    description:
      'An open-plan loft built around oak, brass, and considered detail — a private retreat carved out of the city.',
    longDescription:
      'A working warehouse converted into a single-storey residence, retaining the original steel and exposing the brick where it served the room. We rebuilt the structure to host a full-height living volume, then layered in oak joinery, blackened steel railings, and a quiet kitchen that lets the architecture lead.',
    gallery: [
      '/archive_03.jpg',
      '/archive_05.jpg',
      '/archive_02.jpg',
      '/archive_06.jpg',
      '/archive_04.jpg',
      '/archive_01.jpg',
    ],
  },
  {
    title: 'Brixton Community Hall',
    image: '/project_community.jpg',
    location: 'Brixton, London',
    year: '2024',
    scope: 'New build · community use',
    description:
      'A neighbourhood gathering space rebuilt around community, craft, and a generous sense of welcome.',
    longDescription:
      'A community-led brief delivered as a calm, durable building. The hall holds a flexible main room, a small commercial kitchen, and a quieter side wing for meetings — all wrapped in a long timber-clad facade designed to weather softly with the street. We worked alongside local trades on every phase to keep the project rooted in its neighbourhood.',
    gallery: [
      '/archive_06.jpg',
      '/archive_04.jpg',
      '/archive_01.jpg',
      '/archive_05.jpg',
      '/archive_03.jpg',
      '/archive_02.jpg',
    ],
  },
];

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const HOVER_DURATION = 700;
const HOVER_TRANSITION = `transform ${HOVER_DURATION}ms ${EASE}, opacity ${HOVER_DURATION}ms ${EASE}, box-shadow ${HOVER_DURATION}ms ${EASE}, filter ${HOVER_DURATION}ms ${EASE}`;

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const primaryCardRef = useRef<HTMLDivElement>(null);
  const secondaryCard1Ref = useRef<HTMLDivElement>(null);
  const secondaryCard2Ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState<number | null>(null);
  const [openProject, setOpenProject] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTl.fromTo(
        primaryCardRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        secondaryCard1Ref.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        secondaryCard2Ref.current,
        { y: '60vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        labelRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        section.querySelectorAll('.card-title'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.05
      );
      scrollTl.fromTo(
        primaryCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        secondaryCard1Ref.current,
        { x: 0, opacity: 1 },
        { x: '20vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        secondaryCard2Ref.current,
        { y: 0, opacity: 1 },
        { y: '20vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

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

  return (
    <section id="projects" ref={sectionRef} className="pinned-section z-20 bg-doma-bg">
      <div
        ref={labelRef}
        className="absolute left-[3vw] top-[8vh] label-upper will-change-transform z-30"
      >
        SELECTED PROJECTS
      </div>

      <Card
        outerRef={primaryCardRef}
        position="absolute left-[3vw] top-[18vh] w-[62vw] h-[64vh]"
        idx={0}
        project={projects[0]}
        onEnter={() => setHovered(0)}
        onLeave={() => setHovered((h) => (h === 0 ? null : h))}
        onClick={() => setOpenProject(0)}
        innerStyle={innerStyle(0)}
        showCta
        large
      />

      <Card
        outerRef={secondaryCard1Ref}
        position="absolute left-[67vw] top-[18vh] w-[30vw] h-[40vh]"
        idx={1}
        project={projects[1]}
        onEnter={() => setHovered(1)}
        onLeave={() => setHovered((h) => (h === 1 ? null : h))}
        onClick={() => setOpenProject(1)}
        innerStyle={innerStyle(1)}
      />

      <Card
        outerRef={secondaryCard2Ref}
        position="absolute left-[67vw] top-[60vh] w-[30vw] h-[22vh]"
        idx={2}
        project={projects[2]}
        onEnter={() => setHovered(2)}
        onLeave={() => setHovered((h) => (h === 2 ? null : h))}
        onClick={() => setOpenProject(2)}
        innerStyle={innerStyle(2)}
      />

      {openProject !== null && (
        <ProjectDetail
          project={projects[openProject]}
          onClose={() => setOpenProject(null)}
        />
      )}
    </section>
  );
}

type CardProps = {
  outerRef: React.RefObject<HTMLDivElement | null>;
  position: string;
  idx: number;
  project: ProjectDetailData;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
  innerStyle: React.CSSProperties;
  showCta?: boolean;
  large?: boolean;
};

function Card({
  outerRef,
  position,
  project,
  onEnter,
  onLeave,
  onClick,
  innerStyle,
  showCta,
  large,
}: CardProps) {
  return (
    <div ref={outerRef} className={`${position} will-change-transform`}>
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
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div
          className={`absolute ${large ? 'left-[2.2vw] bottom-[2.6vh]' : 'left-[1.6vw] bottom-[2.2vh]'} text-white`}
        >
          <h3
            className={`card-title font-serif transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 ${large ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}
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
            className="absolute right-[2.2vw] bottom-[2.6vh] px-5 py-2 border border-white/40 text-white text-xs uppercase tracking-wider rounded-full opacity-90 transition-[opacity,background-color,color,border-color,transform] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:-translate-y-1 hover:bg-white hover:text-doma-text"
          >
            View Project
          </button>
        )}
      </div>
    </div>
  );
}
