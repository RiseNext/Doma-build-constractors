import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Contact block
      gsap.fromTo(
        contactRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Form card
      gsap.fromTo(
        formRef.current,
        { x: '6vw', opacity: 0, y: 24 },
        {
          x: 0,
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Footer
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            end: 'top 75%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-70 bg-doma-dark text-white py-[10vh] md:py-[14vh]"
    >
      <div className="px-[3vw] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
        {/* Left Contact Info */}
        <div ref={contactRef} className="will-change-transform">
          <h2 className="section-heading text-white mb-8">Start a project</h2>

          <div className="space-y-4">
            <a
              href="mailto:hello@domabuild.co.uk"
              className="block text-lg md:text-xl hover:text-doma-gold transition-colors duration-300"
            >
              hello@domabuild.co.uk
            </a>
            <a
              href="tel:+442079460123"
              className="block text-lg md:text-xl hover:text-doma-gold transition-colors duration-300"
            >
              +44 (0)20 7946 0123
            </a>
            <p className="text-doma-muted text-base mt-4">
              Unit 4, Arches Industrial Estate<br />
              London E1 4RP
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div
          ref={formRef}
          className="bg-white/5 backdrop-blur-sm rounded-md p-6 md:p-8 will-change-transform"
        >
          {submitted ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-doma-gold text-lg">Thank you. We will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/30 focus:border-doma-gold focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/30 focus:border-doma-gold focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/30 focus:border-doma-gold focus:outline-none transition-colors"
                  placeholder="+44..."
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/30 focus:border-doma-gold focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="mt-4 px-8 py-3 border border-doma-gold text-doma-gold text-sm uppercase tracking-wider rounded-full hover:bg-doma-gold hover:text-doma-dark transition-colors duration-300"
              >
                Send
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="absolute bottom-0 left-0 right-0 px-[3vw] py-[4vh] border-t border-white/10 will-change-transform"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Doma Build Contractors Ltd
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
