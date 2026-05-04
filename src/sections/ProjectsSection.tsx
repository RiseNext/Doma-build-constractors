import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectDetail from '../components/ProjectDetail';
import CategoryOverlay from '../components/CategoryOverlay';
import type {
  ProjectDetailData,
  ProjectCategory,
} from '../components/ProjectDetail';

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
    category: 'residential',
    status: 'present',
  },
  {
    title: 'Notting Hill Conversion',
    image: '/archive_05.jpg',
    location: 'Notting Hill, London',
    year: '2024',
    scope: 'Whole-house remodel',
    description:
      'A full-house remodel in stucco-fronted Notting Hill — every room reordered around light.',
    longDescription:
      'A whole-house remodel that reordered the plan around the light. We removed a heavy spine wall, opened the stair, and reworked the lower ground to give the house a single continuous flow from front door to garden. New oak joinery, a hand-troweled plaster finish, and a deeply considered lighting scheme hold the rooms together.',
    gallery: [
      '/archive_06.jpg',
      '/archive_01.jpg',
      '/archive_02.jpg',
      '/archive_03.jpg',
      '/archive_04.jpg',
      '/archive_05.jpg',
    ],
    category: 'residential',
    status: 'present',
  },
  {
    title: 'Hampstead Coach House',
    image: '/project_loft.jpg',
    location: 'Hampstead, London',
    year: '2024',
    scope: 'Conversion + extension',
    description:
      'A coach house quietly converted into a single-storey home for a writer and a sculptor.',
    longDescription:
      'A small mews coach house was reworked into a single residence with a top-lit living volume, a study set behind a sliding plaster screen, and a walled garden room finished in lime render. The brief asked for two distinct working quarters that could share a kitchen — the plan obliges without ever losing the original geometry of the building.',
    gallery: [
      '/archive_02.jpg',
      '/archive_04.jpg',
      '/archive_05.jpg',
      '/archive_01.jpg',
      '/archive_03.jpg',
      '/archive_06.jpg',
    ],
    category: 'residential',
    status: 'present',
  },

  {
    title: 'Fleet Street Loft',
    image: '/archive_03.jpg',
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
    category: 'residential',
    status: 'past',
  },
  {
    title: 'Marylebone Townhouse',
    image: '/archive_01.jpg',
    location: 'Marylebone, London',
    year: '2023',
    scope: 'Heritage refurbishment',
    description:
      'A grade-listed townhouse restored with quiet hands — original mouldings preserved, services rebuilt invisibly.',
    longDescription:
      'A grade II-listed townhouse where the brief was to restore without erasing. We worked closely with conservation officers to retain original mouldings, sash windows, and floorboards, while rebuilding the services and rear extension to modern thermal standards. The result is a house that feels untouched but performs to today.',
    gallery: [
      '/archive_02.jpg',
      '/archive_03.jpg',
      '/archive_04.jpg',
      '/archive_05.jpg',
      '/archive_06.jpg',
      '/archive_01.jpg',
    ],
    category: 'residential',
    status: 'past',
  },
  {
    title: 'Camden Mews Extension',
    image: '/archive_03.jpg',
    location: 'Camden, London',
    year: '2023',
    scope: 'Rear extension + interior',
    description:
      'A rear extension finished in handmade brick — the kind of detail that only reads at close range.',
    longDescription:
      'A modest rear extension that does a lot with a little. Handmade Belgian brick, a single-pour concrete floor, and a slim aluminium roof line that lifts away from the existing house. Inside, a kitchen built around a single oak island opens onto the garden through a wide sliding screen.',
    gallery: [
      '/archive_04.jpg',
      '/archive_05.jpg',
      '/archive_06.jpg',
      '/archive_01.jpg',
      '/archive_02.jpg',
      '/archive_03.jpg',
    ],
    category: 'residential',
    status: 'past',
  },

  {
    title: 'Shoreditch Studio',
    image: '/archive_02.jpg',
    location: 'Shoreditch, London',
    year: '2024',
    scope: 'Commercial fit-out',
    description:
      'A creative studio fit-out — exposed services, raw concrete floors, and a precise palette for working hours.',
    longDescription:
      'A 600 sqm creative studio on the upper floors of a listed warehouse. We stripped the space back to its concrete shell, exposed the services along clear lines, and inserted a calm meeting volume in blackened steel. The fit-out was delivered in twelve weeks around an active building, with all noisy works phased to evenings.',
    gallery: [
      '/archive_03.jpg',
      '/archive_04.jpg',
      '/archive_01.jpg',
      '/archive_06.jpg',
      '/archive_05.jpg',
      '/archive_02.jpg',
    ],
    category: 'commercial',
    status: 'present',
  },
  {
    title: 'Hoxton Atelier',
    image: '/archive_04.jpg',
    location: 'Hoxton, London',
    year: '2024',
    scope: 'Workshop + gallery',
    description:
      'A double-height workshop and ground-floor gallery for an independent design studio.',
    longDescription:
      'A neglected ground-floor unit reworked into a working atelier. We opened a slot through the slab to bring daylight into the workshop below, and lined the upper gallery in pale plaster so finished pieces could be seen against a quiet background. The shopfront keeps its original cast-iron mullions, deliberately uncleaned.',
    gallery: [
      '/archive_04.jpg',
      '/archive_06.jpg',
      '/archive_02.jpg',
      '/archive_05.jpg',
      '/archive_03.jpg',
      '/archive_01.jpg',
    ],
    category: 'commercial',
    status: 'present',
  },
  {
    title: 'Mayfair Press Room',
    image: '/archive_05.jpg',
    location: 'Mayfair, London',
    year: '2024',
    scope: 'Office refurbishment',
    description:
      'A press room and lounge for an editorial group — quiet, dense, and built to host long days.',
    longDescription:
      'A 220 sqm office floor reworked around the way the team actually works — a long writing room, a smaller editing wing, and a press lounge for guests. Materially the project leans on dark stained oak, deep wool carpet, and warm parchment wall finishes. Acoustic detailing was treated as a primary scope, not a finishing touch.',
    gallery: [
      '/archive_05.jpg',
      '/archive_01.jpg',
      '/archive_03.jpg',
      '/archive_06.jpg',
      '/archive_02.jpg',
      '/archive_04.jpg',
    ],
    category: 'commercial',
    status: 'present',
  },

  {
    title: 'Smithfield Workhouse',
    image: '/archive_06.jpg',
    location: 'Smithfield, London',
    year: '2022',
    scope: 'Office conversion',
    description:
      'A former meat market warehouse reworked into a single-tenant office, cast-iron column lines kept legible.',
    longDescription:
      'A 1,800 sqm warehouse on the edge of Smithfield, reordered as a single office for an architecture studio. We lifted the slab to expose the original cast-iron column grid and re-fitted the space with a long oak workbench and a series of smaller meeting volumes lined in cork. The brief asked for one continuous room that read as a workshop, not a corporate floor.',
    gallery: [
      '/archive_06.jpg',
      '/archive_03.jpg',
      '/archive_05.jpg',
      '/archive_02.jpg',
      '/archive_01.jpg',
      '/archive_04.jpg',
    ],
    category: 'commercial',
    status: 'past',
  },
  {
    title: 'Knightsbridge Boutique',
    image: '/archive_01.jpg',
    location: 'Knightsbridge, London',
    year: '2022',
    scope: 'Retail fit-out',
    description:
      'A flagship retail fit-out finished in travertine and bronzed steel — quiet on the street, generous inside.',
    longDescription:
      'A small flagship boutique in a listed terrace, finished as a single travertine room with bronzed steel display elements. We rebuilt the shopfront to original profiles and inserted a discreet stockroom and fitting suite to the rear. All site works were carried out at night to keep the street trade undisrupted.',
    gallery: [
      '/archive_01.jpg',
      '/archive_03.jpg',
      '/archive_04.jpg',
      '/archive_05.jpg',
      '/archive_02.jpg',
      '/archive_06.jpg',
    ],
    category: 'commercial',
    status: 'past',
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
    category: 'community',
    status: 'present',
  },
  {
    title: 'Stratford Library Wing',
    image: '/archive_04.jpg',
    location: 'Stratford, London',
    year: '2024',
    scope: 'Public extension',
    description:
      'A new wing for an existing public library — a long top-lit reading room and a children\'s annex.',
    longDescription:
      'A modest extension that doubles the library\'s programmable area without overshadowing the original 1930s building. The new wing sits low against the boundary, finished in a soft buff brick with deep window reveals. A long roof light brings even daylight onto the reading tables; a separate children\'s room opens onto a small enclosed garden.',
    gallery: [
      '/archive_04.jpg',
      '/archive_06.jpg',
      '/archive_02.jpg',
      '/archive_01.jpg',
      '/archive_05.jpg',
      '/archive_03.jpg',
    ],
    category: 'community',
    status: 'present',
  },
  {
    title: 'Whitechapel Garden Hall',
    image: '/archive_06.jpg',
    location: 'Whitechapel, London',
    year: '2024',
    scope: 'New build · community garden',
    description:
      'A small timber pavilion at the centre of a community garden — a sheltered room for workshops and meals.',
    longDescription:
      'A 90 sqm timber-framed hall built around a single open room with a long communal table. The structure was prefabricated off-site with a local timber contractor and assembled in a fortnight to limit disruption to the surrounding garden. A wood-burning stove, a small servery, and clerestory glazing on three sides keep the space warm and well-lit through the year.',
    gallery: [
      '/archive_06.jpg',
      '/archive_05.jpg',
      '/archive_04.jpg',
      '/archive_03.jpg',
      '/archive_02.jpg',
      '/archive_01.jpg',
    ],
    category: 'community',
    status: 'present',
  },

  {
    title: 'Highgate Pavilion',
    image: '/archive_06.jpg',
    location: 'Highgate, London',
    year: '2023',
    scope: 'Garden pavilion · new build',
    description:
      'A small timber-and-glass pavilion at the end of a long garden — a quiet room for working and reading.',
    longDescription:
      'A standalone pavilion designed as a private workroom — a single 24 sqm volume in cedar and glass, with a wood-burning stove and a writing desk facing the garden. Built off-site in panels and assembled in five days to limit disruption to the main house and surrounding planting.',
    gallery: [
      '/archive_01.jpg',
      '/archive_02.jpg',
      '/archive_03.jpg',
      '/archive_04.jpg',
      '/archive_05.jpg',
      '/archive_06.jpg',
    ],
    category: 'community',
    status: 'past',
  },
  {
    title: 'Peckham Skate Pavilion',
    image: '/archive_02.jpg',
    location: 'Peckham, London',
    year: '2022',
    scope: 'Public structure',
    description:
      'An open shelter and amenities block for a youth-run skate park — durable, generous, and unfussy.',
    longDescription:
      'A simple steel-framed shelter with a cast-in-place concrete base, designed as a meeting point for the skate park behind it. The brief was set out by the youth-run trust that operates the park — they asked for a roof, a long bench, water, and lights. We delivered exactly that, and very little else, on a fixed community-funded budget.',
    gallery: [
      '/archive_02.jpg',
      '/archive_03.jpg',
      '/archive_04.jpg',
      '/archive_05.jpg',
      '/archive_06.jpg',
      '/archive_01.jpg',
    ],
    category: 'community',
    status: 'past',
  },
];

type CategoryEntry = {
  id: ProjectCategory;
  title: string;
  image: string;
  blurb: string;
};

const CATEGORY_ENTRIES: CategoryEntry[] = [
  {
    id: 'commercial',
    title: 'Commercial',
    image: '/archive_02.jpg',
    blurb: 'Workspaces, retail, hospitality.',
  },
  {
    id: 'residential',
    title: 'Residential',
    image: '/project_primary_residence.jpg',
    blurb: 'Houses, apartments, homes.',
  },
  {
    id: 'community',
    title: 'Community',
    image: '/project_community.jpg',
    blurb: 'Civic, public, neighbourhood.',
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
          <div className="label-upper mb-3">SELECTED PROJECTS</div>
          <h2 className="section-heading text-doma-text leading-[1.05]">
            Recent work
          </h2>
        </div>

        <div className="px-[5vw] flex flex-col gap-5">
          {CATEGORY_ENTRIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setOpenCategory(c.id)}
              className="mobile-category-card relative w-full aspect-[4/5] sm:aspect-[3/2] rounded-md overflow-hidden shadow-card group text-left will-change-transform"
            >
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover transition-transform duration-700 group-active:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5 text-white">
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/70 mb-1.5">
                  {c.blurb}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl leading-tight">
                  {c.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/85">
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
            onSelectProject={openProjectFromCategory}
          />
        )}

        {openProject && (
          <ProjectDetail
            project={openProject}
            sourceLabel={
              openCategory
                ? CATEGORY_ENTRIES.find((c) => c.id === openCategory)?.title ||
                  'Selected Projects'
                : 'Selected Projects'
            }
            onBackToProjects={
              openCategory ? () => setOpenProject(null) : undefined
            }
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
            Selected Projects
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
          onSelectProject={openProjectFromCategory}
        />
      )}

      {openProject && (
        <ProjectDetail
          project={openProject}
          sourceLabel={
            openCategory
              ? CATEGORY_ENTRIES.find((c) => c.id === openCategory)?.title ||
                'Selected Projects'
              : 'Selected Projects'
          }
          onBackToProjects={
            openCategory ? () => setOpenProject(null) : undefined
          }
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
        className="relative w-full h-full rounded-md overflow-hidden cursor-pointer shadow-card group"
        style={innerStyle}
      >
        <img
          src={entry.image}
          alt={entry.title}
          className="w-full h-full object-cover transition-transform [transition-duration:800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />
        <div
          className={`absolute ${large ? 'left-[2.2vw] bottom-[2.6vh]' : 'left-[1.6vw] bottom-[2.2vh]'} text-white`}
        >
          <div
            className={`uppercase tracking-[0.22em] text-white/70 mb-1.5 ${large ? 'text-[11px]' : 'text-[10px]'}`}
          >
            {entry.blurb}
          </div>
          <h3
            className={`card-title font-serif transition-transform [transition-duration:700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 ${large ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}
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
