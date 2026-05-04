import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Services', href: '#services' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
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

  return (
    <>
      {/* Top Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-doma-bg/80 backdrop-blur-md shadow-nav'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-[3vw] py-4">
          {/* Logo */}
          <a
            href="#"
            className={`text-lg font-serif tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-doma-text' : 'text-white'
            }`}
          >
            Doma Build
          </a>

          {/* Menu Button */}
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

      {/* Fullscreen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[200] bg-doma-dark transition-transform duration-700 ease-out ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="h-full flex flex-col px-[3vw] py-4">
          {/* Overlay Header */}
          <div className="flex items-center justify-between mb-16">
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

          {/* Nav Links */}
          <div className="flex-1 flex flex-col justify-center">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-4xl md:text-6xl font-serif text-white/80 hover:text-doma-gold transition-colors duration-300 py-3 block"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="pb-8">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-block px-8 py-3 border border-doma-gold text-doma-gold text-sm uppercase tracking-wider rounded-full hover:bg-doma-gold hover:text-doma-dark transition-colors duration-300"
            >
              Start a project
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
