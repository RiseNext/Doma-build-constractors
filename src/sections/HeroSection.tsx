import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      loadTl
        .fromTo(
          bgRef.current,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
        )
        .fromTo(
          wordmarkRef.current?.querySelectorAll('.word') || [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          '-=0.6'
        )
        .fromTo(
          [labelRef.current, metaRef.current, subRef.current, scrollHintRef.current],
          { x: (i) => (i % 2 === 0 ? -20 : 20), opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          '-=0.5'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([bgRef.current, wordmarkRef.current, labelRef.current, metaRef.current, subRef.current, scrollHintRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // EXIT phase (70-100%)
      scrollTl.fromTo(
        wordmarkRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-6vh', ease: 'none' },
        0.7
      );

      scrollTl.fromTo(
        [labelRef.current, metaRef.current],
        { x: 0, opacity: 1 },
        { x: '-6vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [subRef.current, scrollHintRef.current],
        { x: 0, opacity: 1 },
        { x: '6vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-[110%] h-[105%] -left-[5%] -top-[2.5%] will-change-transform"
      >
        <img
          src="/hero_architecture.jpg"
          alt="Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

      {/* Vertical Label */}
      <div
        ref={labelRef}
        className="absolute left-[2.2vw] top-1/2 -translate-y-1/2 -rotate-90 origin-center label-upper text-white/80 will-change-transform"
      >
        CONTRACTORS • LONDON
      </div>

      {/* Wordmark */}
      <h1
        ref={wordmarkRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center will-change-transform"
      >
        <span className="wordmark block">
          <span className="word inline-block">DOMA</span>{' '}
          <span className="word inline-block">BUILD</span>
        </span>
      </h1>

      {/* Bottom Left Meta */}
      <div
        ref={metaRef}
        className="absolute left-[3vw] bottom-[3vh] text-white/60 text-xs font-medium tracking-wider will-change-transform"
      >
        © 2026
      </div>

      {/* Bottom Center Subtext */}
      <p
        ref={subRef}
        className="absolute left-1/2 bottom-[3.2vh] -translate-x-1/2 text-white/80 text-sm md:text-base max-w-[38vw] text-center will-change-transform"
      >
        Premium construction, delivered with precision.
      </p>

      {/* Bottom Right Scroll Hint */}
      <div
        ref={scrollHintRef}
        className="absolute right-[3vw] bottom-[3vh] text-white/60 text-xs font-medium uppercase tracking-wider will-change-transform flex items-center gap-3"
      >
        <span>Scroll to explore</span>
        <div className="w-12 h-px bg-white/40" />
      </div>
    </section>
  );
}
