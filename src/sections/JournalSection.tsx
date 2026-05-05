import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    title: 'How to plan a loft conversion',
    date: 'March 2026',
    image: '/journal_01.jpg',
  },
  {
    title: 'Material palette: concrete + timber',
    date: 'February 2026',
    image: '/journal_02.jpg',
  },
  {
    title: 'Budgeting a basement dig',
    date: 'January 2026',
    image: '/journal_03.jpg',
  },
];

export default function JournalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { y: -24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );

      // Article cards
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 85%',
            end: 'top 45%',
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
      className="relative z-[60] bg-doma-bg py-[10vh] md:py-[14vh]"
    >
      <div className="px-[5vw] md:px-[3vw]">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="section-heading text-doma-text mb-10 md:mb-16 will-change-transform"
        >
          STUDIO NOTES
        </h2>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group cursor-pointer will-change-transform"
            >
              <div className="aspect-[4/3] md:aspect-auto md:h-[28vh] rounded-md overflow-hidden mb-4">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-[10px] md:text-xs text-doma-muted uppercase tracking-wider mb-2">
                {article.date}
              </div>
              <h3 className="text-base md:text-xl font-medium text-doma-text group-hover:text-doma-gold transition-colors duration-300">
                {article.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
