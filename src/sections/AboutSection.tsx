import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '18+', label: 'Years in construction' },
  { value: '120+', label: 'Projects delivered' },
  { value: 'FMB', label: 'Federation of Master Builders' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Statement block
      gsap.fromTo(
        statementRef.current,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statementRef.current,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.5,
          },
        }
      );

      // Stats row
      gsap.fromTo(
        statsRef.current?.querySelectorAll('.stat-item') || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );

      // Right image
      gsap.fromTo(
        imageRef.current,
        { x: '10vw', opacity: 0, scale: 1.03 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.5,
          },
        }
      );

      // Caption
      gsap.fromTo(
        captionRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: captionRef.current,
            start: 'top 90%',
            end: 'top 60%',
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
      className="relative z-30 bg-doma-bg py-[10vh] md:py-[12vh]"
    >
      {/* Top Label */}
      <div className="absolute left-[3vw] top-[8vh] label-upper">
        ABOUT
      </div>

      <div className="px-[3vw] pt-[14vh] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
        {/* Left Content */}
        <div>
          <div ref={statementRef} className="max-w-[44vw] will-change-transform">
            <h2 className="section-heading text-doma-text mb-6">
              A team that builds with clarity.
            </h2>
            <p className="text-doma-muted text-base md:text-lg leading-relaxed max-w-lg">
              We manage timelines, trades, and budgets—so you get quality without surprises.
            </p>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="mt-16 flex flex-wrap gap-10 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item will-change-transform">
                <div className="text-4xl md:text-5xl font-serif text-doma-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-doma-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div
            ref={imageRef}
            className="w-full lg:w-[41vw] h-[50vh] md:h-[56vh] rounded-md overflow-hidden will-change-transform"
          >
            <img
              src="/about_site_work.jpg"
              alt="On-site coordination"
              className="w-full h-full object-cover"
            />
          </div>
          <p
            ref={captionRef}
            className="mt-4 text-sm text-doma-muted italic will-change-transform"
          >
            On-site coordination, every stage.
          </p>
        </div>
      </div>
    </section>
  );
}
