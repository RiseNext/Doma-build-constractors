import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Design & Build', desc: 'End-to-end delivery, one contract.' },
  { title: 'General Contracting', desc: 'Clear budgets, reliable timelines.' },
  { title: 'Construction Management', desc: 'Coordination without conflict.' },
  { title: 'Loft Conversions', desc: 'Maximize space, minimize stress.' },
  { title: 'Basements', desc: 'Excavate with engineering confidence.' },
  { title: 'Extensions', desc: 'Add room without losing character.' },
  { title: 'Refurbishment', desc: 'Restore detail. Upgrade performance.' },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading
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

      // Service items
      gsap.fromTo(
        servicesRef.current?.querySelectorAll('.service-item') || [],
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );

      // Right image
      gsap.fromTo(
        imageRef.current,
        { x: '10vw', opacity: 0, scale: 1.04 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );

      // Badge
      gsap.fromTo(
        badgeRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: badgeRef.current,
            start: 'top 90%',
            end: 'top 70%',
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
      className="relative z-50 bg-doma-bg py-[10vh] md:py-[14vh]"
    >
      <div className="px-[3vw] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
        {/* Left Content */}
        <div>
          <div ref={headingRef} className="mb-12 will-change-transform">
            <div className="label-upper mb-4">SERVICES</div>
            <h2 className="section-heading text-doma-text">What we deliver</h2>
          </div>

          <div ref={servicesRef} className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-item group cursor-pointer will-change-transform"
              >
                <div className="flex items-baseline justify-between border-b border-doma-text/10 pb-4 transition-colors duration-300 group-hover:border-doma-gold">
                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-doma-text group-hover:text-doma-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-doma-muted mt-1">{service.desc}</p>
                  </div>
                  <div className="text-doma-muted group-hover:text-doma-gold transition-colors duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div
            ref={imageRef}
            className="w-full lg:w-[45vw] h-[60vh] md:h-[72vh] rounded-md overflow-hidden will-change-transform"
          >
            <img
              src="/services_building.jpg"
              alt="Building under construction"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            ref={badgeRef}
            className="absolute left-4 bottom-8 px-4 py-2 bg-doma-dark/80 backdrop-blur-sm text-white text-xs uppercase tracking-wider rounded-full will-change-transform"
          >
            Design + Build
          </div>
        </div>
      </div>
    </section>
  );
}
