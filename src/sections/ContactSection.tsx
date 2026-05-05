import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import ContactPanel from '../components/ContactPanel';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: innerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-[70] bg-doma-dark text-white pt-[6vh] md:pt-[8vh] scroll-mt-2"
    >
      <div
        ref={innerRef}
        className="px-[5vw] md:px-[3vw] pb-[10vh] md:pb-[14vh] will-change-transform"
      >
        <ContactPanel listenToGlobalPrefill />
      </div>

      <Footer variant="dark" />
    </section>
  );
}
