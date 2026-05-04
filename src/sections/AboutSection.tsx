import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutDetail from '../components/AboutDetail';
import type { AboutArea } from '../components/AboutDetail';

gsap.registerPlugin(ScrollTrigger);

const areas: AboutArea[] = [
  {
    id: 'expertise',
    num: '01',
    title: 'Our Expertise',
    intro:
      'Eighteen years of careful, considered construction across residential, commercial, and community work.',
    body:
      'With over 18 years of experience in the construction industry, Doma Build Contractors Ltd has become a trusted name in the field of construction. Our team of experts has the knowledge, skills, and expertise to handle any project, big or small. We have completed numerous projects ranging from residential homes to commercial buildings, and our clients can attest to our commitment to quality and excellence.',
    image: '/services_building.jpg',
    highlights: [
      { label: 'Experience', value: '18+ yrs' },
      { label: 'Delivered', value: '120+ projects' },
      { label: 'Accredited', value: 'FMB' },
    ],
  },
  {
    id: 'team',
    num: '02',
    title: 'Our Team',
    intro:
      'Skilled hands, considered minds — a small senior team that owns each build end to end.',
    body:
      'Our team is made up of experienced and skilled individuals who are passionate about what they do. From our project managers to our skilled tradespeople, we work together to ensure that every project is completed to the highest standard. We believe in building lasting relationships with our clients, and it shows in the way we approach every project.',
    image: '/about_site_work.jpg',
    highlights: [
      { label: 'Senior leads', value: '6 partners' },
      { label: 'Trades on roster', value: '40+' },
      { label: 'Avg. tenure', value: '9 years' },
    ],
  },
  {
    id: 'services',
    num: '03',
    title: 'Our Services',
    intro:
      'A complete vocabulary of build — design-build, contracting, management — sized to the brief.',
    body:
      'At Doma Build Contractors Ltd, we offer a wide range of services to meet the diverse needs of our clients. Our services include design-build, general contracting, construction management, and more. We work closely with our clients to understand their unique needs and deliver solutions that exceed their expectations. We are committed to delivering projects that are on time, within budget, and of the highest quality.',
    image: '/archive_03.jpg',
    highlights: [
      { label: 'Engagements', value: '4 models' },
      { label: 'On-budget', value: '96%' },
      { label: 'On-time', value: '94%' },
    ],
    bullets: [
      'Design & Build',
      'General Contracting',
      'Construction Management',
      'Loft Conversions',
      'Basement Excavation',
      'Extensions',
      'Refurbishment',
      'Heritage & Listed',
    ],
  },
];

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const HOVER_DURATION = 700;

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState<number | null>(null);
  const [openArea, setOpenArea] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        tilesRef.current?.querySelectorAll('.about-tile') || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tilesRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 bg-doma-bg py-[12vh] md:py-[16vh] overflow-hidden"
    >
      <div className="absolute left-[3vw] top-[6vh] label-upper">ABOUT</div>

      <div className="px-[3vw] grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-[8vh]">
        <div ref={headingRef} className="lg:col-span-8 will-change-transform">
          <h2 className="section-heading text-doma-text max-w-[18ch]">
            A team that builds with clarity.
          </h2>
        </div>
        <p className="lg:col-span-4 text-doma-muted text-[15px] md:text-[16px] leading-[1.6] max-w-[40ch] lg:justify-self-end">
          Three things shape every project we deliver — the depth of what we know, the people on site, and the way we hold the build together.
        </p>
      </div>

      <div ref={tilesRef} className="px-[3vw] grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
        {areas.map((area, idx) => (
          <Tile
            key={area.id}
            area={area}
            idx={idx}
            hovered={hovered}
            onEnter={() => setHovered(idx)}
            onLeave={() => setHovered((h) => (h === idx ? null : h))}
            onClick={() => setOpenArea(idx)}
          />
        ))}
      </div>

      <div className="px-[3vw] mt-[10vh] flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <p className="text-doma-muted text-[14px] md:text-[15px] leading-[1.6] max-w-[44ch]">
          Each of these opens into a deeper view — process, people, and the work that sits behind the headline.
        </p>
        <div className="text-[11px] uppercase tracking-[0.18em] text-doma-muted">
          Click any card to read more
        </div>
      </div>

      {openArea !== null && (
        <AboutDetail
          area={areas[openArea]}
          onClose={() => setOpenArea(null)}
        />
      )}
    </section>
  );
}

type TileProps = {
  area: AboutArea;
  idx: number;
  hovered: number | null;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
};

function Tile({ area, idx, hovered, onEnter, onLeave, onClick }: TileProps) {
  const isActive = hovered === idx;
  const isDimmed = hovered !== null && hovered !== idx;

  const style: React.CSSProperties = {
    transition: `transform ${HOVER_DURATION}ms ${EASE}, opacity ${HOVER_DURATION}ms ${EASE}, box-shadow ${HOVER_DURATION}ms ${EASE}`,
    transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
    opacity: isDimmed ? 0.55 : 1,
    boxShadow: isActive
      ? '0 30px 70px rgba(0,0,0,0.18), 0 12px 28px rgba(0,0,0,0.10)'
      : '0 6px 18px rgba(0,0,0,0.06)',
  };

  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="about-tile group relative text-left rounded-md overflow-hidden bg-doma-dark cursor-pointer will-change-transform"
      style={style}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={area.image}
          alt={area.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          style={{
            opacity: isActive ? 1 : 0.78,
            transition: `opacity ${HOVER_DURATION}ms ${EASE}, transform 1100ms ${EASE}`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/15" />

        <div className="absolute inset-0 p-[2vw] flex flex-col justify-between text-white">
          <div className="flex items-start justify-between">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/70">
              {area.num} / 03
            </div>
            <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/30 transition-colors duration-300 group-hover:border-white"
              style={{
                transform: isActive ? 'translate(2px, -2px) rotate(-12deg)' : 'rotate(0deg)',
                transition: `transform ${HOVER_DURATION}ms ${EASE}, border-color ${HOVER_DURATION}ms ${EASE}`,
              }}
            >
              <span className="text-base">↗</span>
            </span>
          </div>

          <div>
            <h3 className="font-serif text-[clamp(28px,2.6vw,40px)] leading-[1.02]">
              {area.title}
            </h3>
            <p
              className="mt-3 max-w-[34ch] text-white/75 text-[14px] md:text-[15px] leading-[1.55]"
              style={{
                opacity: isActive ? 1 : 0.85,
                transform: isActive ? 'translateY(0)' : 'translateY(2px)',
                transition: `opacity ${HOVER_DURATION}ms ${EASE}, transform ${HOVER_DURATION}ms ${EASE}`,
              }}
            >
              {area.intro}
            </p>
            <div
              className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/85"
              style={{
                opacity: isActive ? 1 : 0.7,
                transition: `opacity ${HOVER_DURATION}ms ${EASE}`,
              }}
            >
              <span>Read more</span>
              <span
                className="inline-block"
                style={{
                  transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                  transition: `transform ${HOVER_DURATION}ms ${EASE}`,
                }}
              >
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
