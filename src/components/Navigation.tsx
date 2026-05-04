import { useState, useEffect } from 'react';

const categories = [
  { label: 'Commercial', href: '#projects', filter: 'commercial' },
  { label: 'Residential', href: '#projects', filter: 'residential' },
  { label: 'Community', href: '#projects', filter: 'community' },
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
    const prev = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const goTo = (href: string, filter?: string) => {
    setMenuOpen(false);
    if (filter) {
      window.dispatchEvent(
        new CustomEvent('projects:filter', { detail: filter })
      );
    }
    window.setTimeout(() => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (href === '#home')
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 320);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-doma-bg/80 backdrop-blur-md shadow-nav'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-[3vw] py-4">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              goTo('#home');
            }}
            className={`text-lg font-serif tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-doma-text' : 'text-white'
            }`}
          >
            Doma Build
          </a>

          <button
            onClick={() => setMenuOpen(true)}
            className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
              isScrolled ? 'text-doma-text' : 'text-white'
            }`}
          >
            Menu
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[200] bg-doma-dark transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="h-full flex flex-col px-[3vw] py-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <span className="text-lg font-serif text-white tracking-tight">
              Doma Build
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium uppercase tracking-wider text-white/60 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <ul className="lg:col-span-7 flex flex-col gap-2 md:gap-3">
              <NavMain index="01" label="Home" onClick={() => goTo('#home')} />

              <NavMain
                index="02"
                label="Selected Projects"
                onClick={() => goTo('#projects')}
              />

              <NavMain
                index="03"
                label="Contact"
                onClick={() => goTo('#contact')}
              />
            </ul>

            <div className="lg:col-span-5 lg:pl-[2vw] lg:border-l lg:border-white/10">
              <div className="text-[11px] uppercase tracking-[0.2em] text-doma-gold mb-5">
                Selected Projects
              </div>
              <div className="text-[13px] uppercase tracking-[0.18em] text-white/45 mb-3">
                Present / Past
              </div>
              <ul className="space-y-2 mb-10">
                {categories.map((c) => (
                  <li key={c.label}>
                    <button
                      onClick={() => goTo(c.href, c.filter)}
                      className="group inline-flex items-center gap-3 text-left text-white/85 hover:text-doma-gold transition-colors duration-300"
                    >
                      <span className="inline-block w-6 h-px bg-white/30 group-hover:bg-doma-gold group-hover:w-10 transition-all duration-300" />
                      <span className="font-serif text-[clamp(22px,2.4vw,32px)] leading-[1.05]">
                        {c.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="pt-8 border-t border-white/10">
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-3">
                  Studio
                </div>
                <p className="text-white/65 text-[14px] leading-[1.65] max-w-[36ch]">
                  Doma Build Contractors Ltd — design-build &amp; general
                  contracting across residential, commercial, and community
                  work.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 pb-2 mt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">
              hello@domabuild.co — +44 (0)20 0000 0000
            </div>
            <button
              onClick={() => goTo('#contact')}
              className="inline-flex items-center gap-3 px-7 py-3 border border-doma-gold text-doma-gold text-sm uppercase tracking-[0.16em] rounded-full hover:bg-doma-gold hover:text-doma-dark transition-colors duration-300 self-start md:self-auto"
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
  index: string;
  label: string;
  onClick: () => void;
};

function NavMain({ index, label, onClick }: NavMainProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="group flex items-baseline gap-5 md:gap-7 text-left w-full"
      >
        <span className="text-[11px] uppercase tracking-[0.22em] text-white/35 pt-3 group-hover:text-doma-gold transition-colors duration-300 flex-shrink-0">
          {index}
        </span>
        <span className="font-serif text-white/85 text-[clamp(46px,7vw,108px)] leading-[1.02] group-hover:text-doma-gold transition-colors duration-300">
          {label}
        </span>
      </button>
    </li>
  );
}
