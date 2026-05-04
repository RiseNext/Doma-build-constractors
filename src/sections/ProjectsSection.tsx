import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Victoria Mews Residence',
    image: '/project_primary_residence.jpg',
    size: 'large',
  },
  {
    title: 'Fleet Street Loft',
    image: '/project_loft.jpg',
    size: 'tall',
  },
  {
    title: 'Brixton Community Hall',
    image: '/project_community.jpg',
    size: 'short',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const primaryCardRef = useRef<HTMLDivElement>(null);
  const secondaryCard1Ref = useRef<HTMLDivElement>(null);
  const secondaryCard2Ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

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

      // ENTRANCE (0-30%)
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
        [labelRef.current, descRef.current],
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Card titles entrance (5-30%)
      scrollTl.fromTo(
        section.querySelectorAll('.card-title'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.05
      );

      // EXIT (70-100%)
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
        [labelRef.current, descRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section z-20 bg-doma-bg"
    >
      {/* Top Label */}
      <div
        ref={labelRef}
        className="absolute left-[3vw] top-[8vh] label-upper will-change-transform"
      >
        SELECTED PROJECTS
      </div>

      {/* Top Right Description */}
      <p
        ref={descRef}
        className="absolute right-[3vw] top-[8vh] w-[28vw] text-right text-sm text-doma-muted will-change-transform hidden md:block"
      >
        Recent builds across residential, commercial, and community spaces.
      </p>

      {/* Primary Card (Large Left) */}
      <div
        ref={primaryCardRef}
        className="absolute left-[3vw] top-[18vh] w-[62vw] h-[64vh] rounded-md overflow-hidden shadow-card will-change-transform group cursor-pointer"
      >
        <img
          src={projects[0].image}
          alt={projects[0].title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-[2.2vw] bottom-[2.6vh] text-white">
          <h3 className="card-title text-xl md:text-2xl font-serif">{projects[0].title}</h3>
        </div>
        <button className="absolute right-[2.2vw] bottom-[2.6vh] px-5 py-2 border border-white/40 text-white text-xs uppercase tracking-wider rounded-full hover:bg-white hover:text-doma-text transition-colors duration-300">
          View Project
        </button>
      </div>

      {/* Secondary Card 1 (Tall Right Top) */}
      <div
        ref={secondaryCard1Ref}
        className="absolute left-[67vw] top-[18vh] w-[30vw] h-[40vh] rounded-md overflow-hidden shadow-card will-change-transform group cursor-pointer"
      >
        <img
          src={projects[1].image}
          alt={projects[1].title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-[1.6vw] bottom-[2.2vh] text-white">
          <h3 className="card-title text-lg md:text-xl font-serif">{projects[1].title}</h3>
        </div>
      </div>

      {/* Secondary Card 2 (Short Right Bottom) */}
      <div
        ref={secondaryCard2Ref}
        className="absolute left-[67vw] top-[60vh] w-[30vw] h-[22vh] rounded-md overflow-hidden shadow-card will-change-transform group cursor-pointer"
      >
        <img
          src={projects[2].image}
          alt={projects[2].title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-[1.6vw] bottom-[2.2vh] text-white">
          <h3 className="card-title text-lg md:text-xl font-serif">{projects[2].title}</h3>
        </div>
      </div>
    </section>
  );
}
