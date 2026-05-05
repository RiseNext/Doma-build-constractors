import { useState, useEffect } from 'react';
import { scrollToSection, scrollToTop } from '../lib/scroll';

type CategoryKey = 'commercial' | 'residential' | 'community';

const categories: { label: string; category: CategoryKey }[] = [
  { label: 'Community', category: 'community' },
  { label: 'Residential', category: 'residential' },
  { label: 'Commercial', category: 'commercial' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    const prevTouch = (document.body.style as CSSStyleDeclaration).touchAction;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      document.body.style.touchAction = prevTouch;
    };
  }, [menuOpen]);

  const goTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    if (href === '#home') {
      scrollToTop({ delay: 320 });
    } else {
      scrollToSection(id, { delay: 320 });
    }
  };

  const openCategory = (category: CategoryKey) => {
    setMenuOpen(false);
    scrollToSection('projects', { delay: 320 });
    window.setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('projects:openCategory', {
          detail: { category },
        })
      );
    }, 700);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[400] transition-all duration-500 ${
          isScrolled
            ? 'bg-doma-bg/80 backdrop-blur-md shadow-nav'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-[3vw] py-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
            }}
            className={`inline-flex items-center transition-all duration-500 ${
              isScrolled
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
            aria-label="Doma Build Contractors Ltd — home"
            aria-hidden={!isScrolled}
          >
            <img
              src="/logo/width_480.png"
              alt="Doma Build Contractors Ltd"
              className="h-8 md:h-9 w-auto select-none"
              draggable={false}
            />
          </a>

          <button
            onClick={() => setMenuOpen(true)}
            className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ml-auto ${
              isScrolled ? 'text-doma-text' : 'text-white'
            }`}
          >
            Menu
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[450] bg-doma-dark transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ overscrollBehavior: 'contain' }}
      >
        <div
          className="h-full flex flex-col px-[5vw] md:px-[3vw] py-4 overflow-y-auto"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="flex items-center justify-between mb-8 md:mb-16">
            <img
              src="/logo/width_480.png"
              alt="Doma Build Contractors Ltd"
              className="h-8 md:h-9 w-auto select-none"
              draggable={false}
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium uppercase tracking-wider text-white/60 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start">
            <ul className="lg:col-span-7 flex flex-col gap-4 md:gap-5">
              {categories.map((c) => (
                <NavMain
                  key={c.category}
                  label={c.label}
                  onClick={() => openCategory(c.category)}
                />
              ))}
            </ul>

            <div className="lg:col-span-5 lg:pl-[2vw] lg:border-l lg:border-white/10">
              {/* Mobile: tap-to-open page list */}
              <ul className="lg:hidden space-y-2 mb-8 md:mb-10">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Contact', href: '#contact' },
                ].map((item) => (
                  <li key={item.label} className="border-b border-white/10 pb-2">
                    <button
                      type="button"
                      onClick={() => goTo(item.href)}
                      className="w-full flex items-center justify-between gap-3 py-2 text-left group"
                    >
                      <span className="font-serif text-white/90 text-[clamp(22px,5.5vw,32px)] leading-[1.05] group-hover:text-doma-gold transition-colors">
                        {item.label}
                      </span>
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/30 text-white/70 group-hover:border-doma-gold group-hover:text-doma-gold transition-colors duration-300"
                        aria-hidden
                      >
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Desktop: page list */}
              <ul className="hidden lg:block space-y-5 mb-12">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Contact', href: '#contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => goTo(item.href)}
                      className="group inline-flex items-baseline gap-3 text-left text-white/85 hover:text-doma-gold transition-colors duration-300"
                    >
                      <span className="inline-block w-6 h-px bg-white/30 group-hover:bg-doma-gold group-hover:w-10 transition-all duration-300" />
                      <span className="font-serif text-[clamp(20px,2.2vw,30px)] leading-[1.05]">
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="pt-6 md:pt-8 border-t border-white/10">
                <p className="text-white/75 text-[15px] md:text-[18px] leading-[1.65] max-w-[44ch]">
                  Doma Build Contractors Ltd — design-build &amp; general
                  contracting across residential, commercial, and community
                  work.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 md:pt-8 pb-2 mt-6 md:mt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-5">
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/45 break-words">
              133 West Hendon Broadway, London NW9 7DY · +44 (0)20 8793 4511
            </div>
            <button
              onClick={() => goTo('#contact')}
              className="inline-flex items-center gap-3 px-6 md:px-7 py-2.5 md:py-3 border border-doma-gold text-doma-gold text-xs md:text-sm uppercase tracking-[0.16em] rounded-full hover:bg-doma-gold hover:text-doma-dark transition-colors duration-300 self-start md:self-auto"
            >
              <span>Start a project</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

type NavMainProps = {
  label: string;
  onClick: () => void;
};

function NavMain({ label, onClick }: NavMainProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="group flex items-baseline gap-4 md:gap-7 text-left w-full"
      >
        <span
          aria-hidden
          className="text-white/35 text-[20px] md:text-[26px] pt-2 md:pt-3 group-hover:text-doma-gold group-hover:translate-x-1 transition-[color,transform] duration-300 flex-shrink-0"
        >
          →
        </span>
        <span className="font-serif text-white/85 text-[clamp(34px,8vw,108px)] leading-[1.02] group-hover:text-doma-gold transition-colors duration-300">
          {label}
        </span>
      </button>
    </li>
  );
}
