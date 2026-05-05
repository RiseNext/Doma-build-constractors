import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type TeamMember = {
  name: string;
  role: string;
  qualification?: string;
  avatar?: string;
  contributions?: string[];
};

type AboutArea = {
  id: 'expertise' | 'team' | 'services';
  num: string;
  title: string;
  intro: string;
  body: string;
  image: string;
  highlights: { label: string; value: string }[];
  team?: TeamMember[];
};

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
      { label: 'Senior leads', value: '5' },
      { label: 'Trades on roster', value: '40+' },
      { label: 'Avg. tenure', value: '9 years' },
    ],
    team: [
      {
        name: 'Faisal Khojah',
        role: 'Construction / Procurement Manager & Founder',
        qualification: 'HND — Marketing & Business Management',
        contributions: [
          'Sets the strategic direction for every build',
          'Owns supplier and subcontractor relationships',
          'Holds the client relationship from first call to handover',
          'Carries final accountability for cost and quality',
        ],
      },
      {
        name: 'Venu Kalyan',
        role: 'Project Manager',
        qualification:
          'MSc Construction Engineering Management · BE Civil Engineering',
        contributions: [
          'Plans and runs the build programme end to end',
          'Coordinates design, trades and procurement',
          'Owns weekly cost and timeline reporting',
          'Drives snagging and project handover',
        ],
      },
      {
        name: 'Richard Mailes',
        role: 'Senior Structural Engineer',
        contributions: [
          'Designs and validates load-bearing systems',
          'Reviews drawings and structural specifications',
          'Coordinates with architects and contractors on detail',
          'Signs off engineering packages for site',
        ],
      },
      {
        name: 'Victor Serrano',
        role: 'Senior Site Manager',
        contributions: [
          'Runs the site day-to-day across every trade',
          'Sequences works to keep the programme on track',
          'Owns site health, safety and quality on the ground',
          'Reports site status to the project manager',
        ],
      },
      {
        name: 'Mohammed Ishaq',
        role: 'Site Engineer',
        qualification: 'Diploma in Civil Engineering',
        contributions: [
          'Sets out the build to drawings on site',
          'Verifies dimensions, levels and tolerances',
          'Liaises between trades and the design team',
          'Captures progress and quality records',
        ],
      },
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
  },
];

const credentials: { value: string; label: string }[] = [
  { value: '18+', label: 'Years of build experience' },
  { value: '120+', label: 'Projects delivered' },
  { value: '96%', label: 'On-budget delivery' },
  { value: '94%', label: 'On-time delivery' },
  { value: 'FMB', label: 'Federation accredited' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const credsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [modalEntered, setModalEntered] = useState(false);

  useEffect(() => {
    if (!activeMember) {
      setModalEntered(false);
      return;
    }
    const t = window.requestAnimationFrame(() => setModalEntered(true));
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMember(null);
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.cancelAnimationFrame(t);
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [activeMember]);

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
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      gsap.fromTo(
        credsRef.current?.querySelectorAll('.cred-stat') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: credsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('.pillar-row').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });

      // Safety net: refresh after layout in case fonts/images shift triggers,
      // and force any rows already past the start to their final state.
      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-30 bg-doma-bg pt-[14vh] pb-[12vh] md:pt-[16vh] md:pb-[14vh] overflow-hidden"
    >
      <div className="absolute left-[5vw] md:left-[3vw] top-[5vh] md:top-[6vh] label-upper">
        ABOUT
      </div>

      <div
        ref={headingRef}
        className="px-[5vw] md:px-[3vw] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end mb-[8vh] md:mb-[10vh] will-change-transform"
      >
        <div className="lg:col-span-7">
          <h2 className="section-heading text-doma-text leading-[1.02] max-w-[18ch]">
            A team that builds with clarity.
          </h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="text-doma-text/70 text-[15px] md:text-[17px] leading-[1.65] max-w-[44ch]">
            Three things shape every project we deliver — the depth of what we
            know, the people on site, and the way we hold the build together.
          </p>
          <div className="mt-5 md:mt-6 inline-flex items-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-doma-muted">
            <span className="w-8 h-px bg-doma-text/30" />
            <span>Doma Build · since 2007</span>
          </div>
        </div>
      </div>

      <div
        ref={credsRef}
        className="border-y border-doma-text/10 bg-doma-text/[0.02]"
      >
        <div className="px-[5vw] md:px-[3vw] grid grid-cols-2 md:grid-cols-5">
          {credentials.map((c, i) => (
            <div
              key={c.label}
              className={`cred-stat px-3 sm:px-4 md:px-6 py-6 md:py-9 will-change-transform border-doma-text/10
                ${i % 2 === 1 ? 'border-l md:border-l-0' : ''}
                ${i >= 2 ? 'border-t md:border-t-0' : ''}
                ${i > 0 ? 'md:border-l' : ''}`}
            >
              <div className="font-serif text-doma-text text-[clamp(28px,3.6vw,56px)] leading-[1] tabular-nums">
                {c.value}
              </div>
              <div className="mt-2.5 md:mt-4 text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-doma-muted leading-[1.4] max-w-[20ch]">
                {c.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={pillarsRef}
        className="mt-[10vh] md:mt-[14vh] flex flex-col gap-[10vh] md:gap-[14vh]"
      >
        {areas.map((area, idx) => (
          <PillarRow
            key={area.id}
            area={area}
            reverse={idx % 2 === 1}
            onSelectMember={setActiveMember}
          />
        ))}
      </div>

      {activeMember &&
        createPortal(
          <TeamMemberModal
            member={activeMember}
            entered={modalEntered}
            onClose={() => setActiveMember(null)}
          />,
          document.body
        )}
    </section>
  );
}

type PillarProps = {
  area: AboutArea;
  reverse: boolean;
  onSelectMember: (m: TeamMember) => void;
};

function PillarRow({ area, reverse, onSelectMember }: PillarProps) {
  return (
    <div className="pillar-row px-[5vw] md:px-[3vw] will-change-transform">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
      <div
        className={`lg:col-span-7 ${reverse ? 'lg:order-2 lg:col-start-6' : ''}`}
      >
        <div className="relative w-full aspect-[16/10] md:aspect-[3/2] rounded-md overflow-hidden shadow-card group">
          <img
            src={area.image}
            alt={area.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform [transition-duration:1100ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
          <div className="absolute left-5 md:left-7 bottom-5 md:bottom-7 flex items-center gap-3 text-white">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/85 tabular-nums">
              {area.num} / 03
            </span>
            <span className="w-10 h-px bg-white/50" />
          </div>
        </div>
      </div>

      <div
        className={`lg:col-span-5 ${reverse ? 'lg:order-1 lg:col-start-1 lg:pr-[3vw]' : 'lg:pl-[2vw]'}`}
      >
        <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-doma-gold mb-4 md:mb-5">
          {area.num} — Pillar
        </div>
        <h3 className="font-serif text-doma-text text-[clamp(28px,4.2vw,68px)] leading-[1.05] mb-5 md:mb-6">
          {area.title}
        </h3>
        <p className="text-doma-text/85 text-[15px] md:text-[18px] leading-[1.65] max-w-[46ch] mb-5 md:mb-6 font-light">
          {area.intro}
        </p>
        <p className="text-doma-text/70 text-[14px] md:text-[16px] leading-[1.7] max-w-[52ch] mb-7 md:mb-9 font-light">
          {area.body}
        </p>

        <div className="grid grid-cols-3 gap-4 md:gap-6 border-t border-doma-text/10 pt-5 md:pt-6">
          {area.highlights.map((h) => (
            <div key={h.label}>
              <div className="text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-doma-muted mb-1.5 md:mb-2 leading-[1.4]">
                {h.label}
              </div>
              <div className="font-serif text-doma-text text-[16px] md:text-[22px] leading-[1.15] tabular-nums">
                {h.value}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>

    {area.team && (
      <div className="mt-10 md:mt-14 border-t border-doma-text/10 pt-7 md:pt-9">
        <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-doma-gold mb-5 md:mb-7">
          Senior team
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4">
          {area.team.map((m, i) => {
            const total = area.team!.length;
            let lgPlacement = '';
            if (total === 5) {
              if (i === 3) lgPlacement = 'lg:col-start-2';
              if (i === 4) lgPlacement = 'lg:col-start-4';
            }
            return (
              <li
                key={m.name}
                className={`lg:col-span-2 ${lgPlacement}`}
              >
                <button
                  type="button"
                  onClick={() => onSelectMember(m)}
                  className="group w-full h-full text-left flex items-start gap-4 p-4 md:p-5 rounded-xl border border-doma-text/10 bg-doma-text/[0.015] hover:bg-doma-text/[0.04] hover:border-doma-gold/40 hover:-translate-y-0.5 transition-[transform,background-color,border-color] duration-300"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block w-6 h-px bg-doma-gold/60 flex-shrink-0 transition-all duration-300 group-hover:w-9 group-hover:bg-doma-gold"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-serif text-doma-text text-[16px] md:text-[18px] leading-[1.2] line-clamp-1">
                      {m.name}
                    </div>
                    <div className="text-[11px] md:text-[12px] text-doma-text/75 leading-[1.45] mt-1 line-clamp-2">
                      {m.role}
                    </div>
                    {m.qualification && (
                      <div className="text-[10px] md:text-[11px] text-doma-muted mt-1.5 leading-[1.45] line-clamp-1">
                        {m.qualification}
                      </div>
                    )}
                  </div>
                  <span
                    aria-hidden
                    className="ml-1 mt-0.5 text-doma-muted text-[15px] transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-doma-gold"
                  >
                    →
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    )}
    </div>
  );
}

type TeamMemberModalProps = {
  member: TeamMember;
  entered: boolean;
  onClose: () => void;
};

function TeamMemberModal({ member, entered, onClose }: TeamMemberModalProps) {
  const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const initials = member.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div
      className="fixed inset-0 z-[480] flex items-center justify-center px-4 md:px-6 py-6"
      style={{
        opacity: entered ? 1 : 0,
        transition: `opacity 400ms ${EASE}`,
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} — ${member.role}`}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-[3px]"
      />
      <div
        className="relative w-full max-w-[640px] max-h-[90vh] flex flex-col bg-doma-dark text-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/10"
        style={{
          transform: entered
            ? 'translateY(0) scale(1)'
            : 'translateY(20px) scale(0.97)',
          transition: `transform 500ms ${EASE}`,
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-9 pt-5 md:pt-6 pb-4">
          <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-doma-gold">
            Senior team
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 -mr-2 rounded-full flex items-center justify-center text-white/65 hover:text-white hover:bg-white/5 transition-colors text-[22px] leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="px-6 md:px-9 pb-8 md:pb-10 overflow-y-auto">
          <div className="flex flex-col items-center text-center pt-3 pb-7 md:pb-9">
            {member.avatar ? (
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/15 shadow-lg shadow-black/30">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full flex-shrink-0 ring-1 ring-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.14] flex items-center justify-center shadow-lg shadow-black/30">
                <span className="font-serif text-white/90 text-[34px] md:text-[42px] tracking-wide">
                  {initials || '·'}
                </span>
              </div>
            )}
            <h4 className="font-serif text-white text-[26px] md:text-[32px] leading-[1.1] mt-6 md:mt-7">
              {member.name}
            </h4>
            <div className="text-[11px] md:text-[12px] text-doma-gold uppercase tracking-[0.2em] mt-3 max-w-[40ch]">
              {member.role}
            </div>
          </div>

          {member.contributions && member.contributions.length > 0 && (
            <div className="border-t border-white/10 pt-6 md:pt-7">
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4 md:mb-5">
                What they bring
              </div>
              <ul className="space-y-2.5 md:space-y-3">
                {member.contributions.map((c) => (
                  <li
                    key={c}
                    className="flex items-baseline gap-3 text-white/85 text-[14px] md:text-[15px] leading-[1.55]"
                  >
                    <span className="inline-block w-5 md:w-6 h-px bg-doma-gold flex-shrink-0 translate-y-[-3px]" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {member.qualification && (
            <div className="border-t border-white/10 mt-6 md:mt-7 pt-5 md:pt-6">
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/45 mb-2 md:mb-3">
                Qualifications
              </div>
              <p className="text-white/80 text-[13px] md:text-[14px] leading-[1.6]">
                {member.qualification}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
