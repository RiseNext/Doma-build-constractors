import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '../lib/scroll';

gsap.registerPlugin(ScrollTrigger);

type Service = {
  title: string;
  desc: string;
  detail: string;
  related: string[];
};

const featuredServices: Service[] = [
  {
    title: 'Design & Build',
    desc: 'End-to-end delivery, one contract.',
    detail:
      'A single team carrying a project from first sketch through to handover — one point of accountability for design, programme and cost.',
    related: [
      'Concept design',
      'Planning & approvals',
      'Cost planning',
      'Site delivery',
    ],
  },
  {
    title: 'General Contracting',
    desc: 'Clear budgets, reliable timelines.',
    detail:
      'Fixed-price delivery against a developed design package — transparent costing, weekly reporting, and a tight grip on the trades on site.',
    related: [
      'Tendering & procurement',
      'Programme control',
      'Trade coordination',
      'Quality assurance',
    ],
  },
  {
    title: 'Construction Management',
    desc: 'Coordination without conflict.',
    detail:
      'A management-only engagement where we run the trades on your behalf — useful where you want full visibility on cost and direct trade contracts.',
    related: [
      'Trade packages',
      'Site management',
      'Health & safety',
      'Reporting',
    ],
  },
  {
    title: 'Refurbishment',
    desc: 'Restore detail. Upgrade performance.',
    detail:
      'Quietly comprehensive refurbishments — services rebuilt, thermal performance lifted, original detail preserved or carefully reinstated.',
    related: [
      'Heritage & listed work',
      'Services upgrade',
      'Joinery & finishes',
      'Thermal & acoustic',
    ],
  },
];

const moreServices: Service[] = [
  {
    title: 'Loft Conversions',
    desc: 'Maximize space, minimize stress.',
    detail:
      'Loft conversions — designed and delivered with a calm programme that keeps the rest of the house liveable through the works.',
    related: ['Structural design', 'Roof works', 'Insulation', 'Finishes'],
  },
  {
    title: 'Basement Excavation',
    desc: 'Excavate with engineering confidence.',
    detail:
      'Basement digs — delivered with a senior structural lead and a clear neighbour-protection strategy from day one.',
    related: [
      'Underpinning',
      'Waterproofing',
      'Party-wall management',
      'Mechanical & electrical',
    ],
  },
  {
    title: 'Extensions',
    desc: 'Add room without losing character.',
    detail:
      'Side, rear and wrap-around extensions — designed to read as part of the original house, not pasted onto it.',
    related: ['Planning', 'Glazing', 'Brick & stone', 'Roof detail'],
  },
  {
    title: 'Heritage & Listed',
    desc: 'Restore detail with care.',
    detail:
      'Listed and conservation-area work delivered with the right paper trail — close coordination with conservation officers and specialist trades.',
    related: [
      'Conservation officers',
      'Lime plaster',
      'Joinery restoration',
      'Specialist trades',
    ],
  },
];

const allServices: Service[] = [...featuredServices, ...moreServices];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const [activeService, setActiveService] = useState<Service | null>(null);
  const [allOpen, setAllOpen] = useState(false);
  const [modalEntered, setModalEntered] = useState(false);

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
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        servicesRef.current?.querySelectorAll('.service-item') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Modal lifecycle
  useEffect(() => {
    if (!activeService) {
      setModalEntered(false);
      return;
    }
    const t = window.requestAnimationFrame(() => setModalEntered(true));
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.cancelAnimationFrame(t);
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeService]);

  const closeModal = () => setActiveService(null);

  const goToContactWithService = (svc: Service) => {
    closeModal();
    window.dispatchEvent(
      new CustomEvent('contact:prefill', {
        detail: { service: svc.title },
      })
    );
    scrollToSection('contact', { delay: 200 });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-50 bg-doma-bg py-[10vh] md:py-[14vh]"
    >
      <div className="px-[5vw] md:px-[3vw]">
        <div ref={headingRef} className="mb-8 md:mb-12 will-change-transform">
          <div className="label-upper mb-3 md:mb-4 text-[14px] md:text-[18px] tracking-[0.28em] font-bold">
            SERVICES
          </div>
          <h2 className="font-serif font-light text-doma-text leading-[1.05] text-[clamp(28px,4vw,56px)]">
            What we deliver
          </h2>
          <p className="mt-4 md:mt-5 text-doma-text/70 text-[14px] md:text-[16px] leading-[1.65] max-w-[58ch]">
            Four engagements we lead with — open any to see the related scope,
            or expand for the complete list.
          </p>
        </div>

        <div
          ref={servicesRef}
          className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 max-w-[1100px]"
        >
          {featuredServices.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              total={featuredServices.length}
              onClick={() => setActiveService(service)}
            />
          ))}
        </div>

        {/* Expanded grid for the remaining services — appears in-place below */}
        <div
          className={`grid transition-[grid-template-rows] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
            allOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-6 md:pt-8 max-w-[1100px]">
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-doma-muted mb-4 md:mb-5 border-t border-doma-text/10 pt-5 md:pt-6">
                Additional Services
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {moreServices.map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    service={service}
                    index={featuredServices.length + index}
                    total={allServices.length}
                    onClick={() => setActiveService(service)}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-10 flex justify-start max-w-[1100px]">
          <button
            type="button"
            onClick={() => setAllOpen((v) => !v)}
            className="group inline-flex items-center gap-3 px-6 md:px-7 py-3 md:py-3.5 border border-doma-text/30 rounded-full text-doma-text text-xs md:text-sm uppercase tracking-[0.18em] font-semibold hover:bg-doma-text hover:text-doma-bg transition-colors duration-500"
          >
            <span
              className={`inline-flex items-center justify-center w-5 h-5 rounded-full border border-current text-[14px] leading-none transition-transform duration-500 ${
                allOpen ? 'rotate-45' : 'group-hover:rotate-90'
              }`}
            >
              +
            </span>
            <span>{allOpen ? 'Less Services' : 'All Services'}</span>
          </button>
        </div>

      </div>

      {activeService &&
        createPortal(
          <ServiceModal
            service={activeService}
            entered={modalEntered}
            onClose={closeModal}
            onStart={() => goToContactWithService(activeService)}
          />,
          document.body
        )}
    </section>
  );
}

type ServiceCardProps = {
  service: Service;
  index: number;
  total: number;
  onClick: () => void;
  compact?: boolean;
};

function ServiceCard({
  service,
  index,
  total,
  onClick,
  compact,
}: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`service-item group text-left will-change-transform rounded-md border border-doma-text/15 hover:border-doma-text/40 transition-colors duration-500 ${
        compact ? 'px-3.5 sm:px-4 md:px-5 py-3.5 sm:py-4 md:py-5' : 'px-4 sm:px-5 md:px-7 py-4 sm:py-5 md:py-7'
      }`}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-3 md:gap-4">
        <div className="min-w-0 flex-1">
          <div
            className={`uppercase tracking-[0.18em] sm:tracking-[0.22em] text-doma-muted mb-1.5 sm:mb-2 tabular-nums ${
              compact ? 'text-[9px] md:text-[10px]' : 'text-[9px] sm:text-[10px] md:text-[11px]'
            }`}
          >
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <h3
            className={`font-medium text-doma-text group-hover:text-doma-gold transition-colors duration-300 break-words ${
              compact
                ? 'text-[14px] sm:text-base md:text-lg leading-[1.2]'
                : 'text-[15px] sm:text-lg md:text-2xl leading-[1.2]'
            }`}
          >
            {service.title}
          </h3>
          {!compact && (
            <p className="text-[12px] sm:text-[13px] md:text-sm text-doma-muted mt-1.5 max-w-[36ch] hidden sm:block">
              {service.desc}
            </p>
          )}
        </div>
        <div
          className={`hidden sm:flex shrink-0 rounded-full border border-doma-text/30 text-doma-muted items-center justify-center transition-all duration-500 group-hover:border-doma-text group-hover:text-doma-text group-hover:translate-x-1 ${
            compact ? 'w-7 h-7 md:w-8 md:h-8' : 'w-9 h-9 md:w-10 md:h-10'
          }`}
        >
          <svg
            width={compact ? '13' : '16'}
            height={compact ? '13' : '16'}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </button>
  );
}

type ServiceModalProps = {
  service: Service;
  entered: boolean;
  onClose: () => void;
  onStart: () => void;
};

function ServiceModal({
  service,
  entered,
  onClose,
  onStart,
}: ServiceModalProps) {
  const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
  return (
    <div
      className="fixed inset-0 z-[350] flex items-center justify-center px-4 md:px-6"
      style={{
        opacity: entered ? 1 : 0,
        transition: `opacity 400ms ${EASE}`,
      }}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"
      />
      <div
        className="relative w-full max-w-[720px] max-h-[88vh] flex flex-col bg-doma-dark text-white rounded-md shadow-2xl overflow-hidden"
        style={{
          transform: entered
            ? 'translateY(0) scale(1)'
            : 'translateY(20px) scale(0.97)',
          transition: `transform 500ms ${EASE}`,
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-5 border-b border-white/10">
          <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-doma-gold">
            Service
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.18em]">
              Close
            </span>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/30 group-hover:border-white transition-colors">
              ×
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 md:py-8 thin-scroll" style={{ overscrollBehavior: 'contain' }}>
          <h3 className="font-serif text-white text-[clamp(26px,3.4vw,42px)] leading-[1.05] mb-3 md:mb-4">
            {service.title}
          </h3>
          <p className="text-white/65 text-[13px] md:text-[14px] mb-5 md:mb-6">
            {service.desc}
          </p>
          <p className="text-white/80 text-[15px] md:text-[16px] leading-[1.7] mb-7 md:mb-8">
            {service.detail}
          </p>

          <div className="border-t border-white/10 pt-5 md:pt-6">
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-doma-gold mb-3 md:mb-4">
              Related scope
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 md:gap-y-1.5">
              {service.related.map((r) => (
                <li
                  key={r}
                  className="flex items-baseline gap-3 py-2 md:py-2.5 border-b border-white/8 text-white/85"
                >
                  <span className="inline-block w-5 h-px bg-doma-gold flex-shrink-0 translate-y-[-3px]" />
                  <span className="text-[13px] md:text-[14px]">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-6 md:px-8 py-4 md:py-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white/55 text-[12px] md:text-[13px]">
            Have a brief in mind? Send us a note and we'll come back with a
            sensible next step.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center justify-center gap-3 px-5 md:px-6 py-2.5 md:py-3 border border-doma-gold text-doma-gold text-xs md:text-sm uppercase tracking-[0.18em] rounded-full hover:bg-doma-gold hover:text-doma-dark transition-colors duration-300 self-start sm:self-auto"
          >
            <span>Enquire</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
