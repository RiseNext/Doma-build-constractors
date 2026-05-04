import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const archiveItems = [
  { title: 'Stair detail', image: '/archive_01.jpg', from: { x: '-50vw', y: '-40vh' } },
  { title: 'Concrete study', image: '/archive_02.jpg', from: { x: '50vw', y: '-40vh' } },
  { title: 'Kitchen composition', image: '/archive_03.jpg', from: { x: '-50vw', y: '40vh' } },
  { title: 'Basement excavation', image: '/archive_04.jpg', from: { x: '50vw', y: '40vh' } },
  { title: 'Timber facade', image: '/archive_05.jpg', from: { x: '-60vw', y: 0 } },
  { title: 'Stone bath', image: '/archive_06.jpg', from: { x: '60vw', y: 0 } },
];

export default function ArchiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Heading ENTRANCE (0-30%)
      scrollTl.fromTo(
        headingRef.current,
        { y: '-20vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Tiles ENTRANCE (0-30%) - staggered shatter
      tilesRef.current.forEach((tile, i) => {
        if (!tile) return;
        const from = archiveItems[i].from;
        scrollTl.fromTo(
          tile,
          { x: from.x, y: from.y, opacity: 0, scale: 0.92 },
          { x: 0, y: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        );
      });

      // Captions ENTRANCE (12-30%)
      scrollTl.fromTo(
        section.querySelectorAll('.tile-caption'),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.12
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        headingRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      tilesRef.current.forEach((tile) => {
        if (!tile) return;
        scrollTl.fromTo(
          tile,
          { scale: 1, opacity: 1 },
          { scale: 1.06, opacity: 0, ease: 'power2.in' },
          0.7
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section z-40 bg-doma-bg"
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="absolute left-1/2 top-[10vh] -translate-x-1/2 section-heading text-doma-text will-change-transform"
      >
        THE ARCHIVE
      </h2>

      {/* Grid */}
      <div className="absolute inset-0 pt-[22vh] px-[3vw]">
        <div className="grid grid-cols-3 gap-4 h-[68vh]">
          {archiveItems.map((item, index) => {
            const col = index % 3;
            const row = Math.floor(index / 3);
            return (
              <div
                key={index}
                ref={(el) => { tilesRef.current[index] = el; }}
                className="relative rounded-md overflow-hidden shadow-card will-change-transform group cursor-pointer"
                style={{
                  gridColumn: col + 1,
                  gridRow: row + 1,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute left-4 bottom-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="tile-caption text-sm font-medium">{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
