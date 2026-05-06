import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HERO_SLIDES = [
  '/projects/commercial/qaboli/02.jpg',
  '/projects/residential/57-castle-street-reading/01.webp',
  '/projects/residential/balham/02.png',
  '/projects/residential/finchley-house/04.webp',
  '/projects/residential/hitchen/07.jpeg',
];

const SLIDE_MS = 4500;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSlide((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

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
        );

      // Scroll-driven glass morph + exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=35%',
          pin: true,
          scrub: 0.25,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            gsap.set(bgRef.current, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
            gsap.set(wordmarkRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              xPercent: -50,
              yPercent: -50,
            });
            gsap.set(glassRef.current, {
              xPercent: -50,
              yPercent: -50,
              scale: 1,
              opacity: 1,
              '--glass-blur': '8px',
            });
          },
        },
      });

      // Center wordmark via GSAP transforms so scroll-driven y animation
      // doesn't clobber the centering on iOS Safari (where Tailwind's
      // -translate-x-1/2 -translate-y-1/2 gets overwritten by the inline
      // transform GSAP writes for the y tween).
      gsap.set(wordmarkRef.current, {
        xPercent: -50,
        yPercent: -50,
      });

      // Glass panel is fixed in size — centered around the wordmark
      gsap.set(glassRef.current, {
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        '--glass-blur': '8px',
      });

      // Blur intensifies as user scrolls (0 -> 0.7 of scroll)
      scrollTl.fromTo(
        glassRef.current,
        { '--glass-blur': '8px' },
        {
          '--glass-blur': '28px',
          ease: 'none',
          duration: 0.7,
        },
        0
      );

      // Background subtle parallax across full scroll
      scrollTl.to(
        bgRef.current,
        { scale: 1.04, y: '-4vh', ease: 'none', duration: 1 },
        0
      );

      // EXIT — wordmark and glass fade out tightly at the end (0.7 -> 1.0)
      scrollTl.to(
        wordmarkRef.current,
        { y: '-10vh', opacity: 0, ease: 'power2.in', duration: 0.3 },
        0.7
      );

      scrollTl.to(
        glassRef.current,
        {
          opacity: 0,
          scale: 0.96,
          ease: 'power2.in',
          duration: 0.3,
        },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="pinned-section z-10"
    >
      {/* Background Slideshow */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-[110%] h-[105%] -left-[5%] -top-[2.5%] will-change-transform"
      >
        {HERO_SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden={i !== activeSlide}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1600ms] ease-out ${
              i === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/35 pointer-events-none" />
      </div>

      {/* Glass Morph — grows + blurs on scroll */}
      <div
        ref={glassRef}
        className="glass-morph absolute left-1/2 top-1/2 will-change-transform"
      />

      {/* Wordmark */}
      <h1
        ref={wordmarkRef}
        className="absolute left-1/2 top-1/2 text-white text-center will-change-transform z-10 w-full px-6"
      >
        <span className="wordmark block">
          <span className="block whitespace-nowrap">
            <span className="word inline-block">DOMA</span>{' '}
            <span className="word inline-block">BUILD</span>
          </span>
          <span className="word block mt-2 md:mt-3 text-[clamp(11px,2.6vw,18px)] tracking-[0.24em] sm:tracking-[0.3em] uppercase font-sans font-medium text-white/85 whitespace-nowrap">
            Contractors Ltd
          </span>
        </span>
      </h1>
    </section>
  );
}
