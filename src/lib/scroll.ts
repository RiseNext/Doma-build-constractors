// Centralized smooth-scroll helpers. Used by Navigation, ProjectDetail,
// ServicesSection, ProjectsSection — anywhere we anchor-jump between the
// page's main sections. Routes through a double-rAF so layout has settled
// (e.g. after a fixed-overlay modal unmounts and releases body overflow)
// before measuring offsets.

const EXTRA_OFFSET = 0; // tweak here if a sticky header ever needs clearance

export const scrollToSection = (
  id: string,
  options: { delay?: number } = {}
) => {
  const run = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const top =
          window.scrollY + el.getBoundingClientRect().top - EXTRA_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  };

  if (options.delay && options.delay > 0) {
    window.setTimeout(run, options.delay);
  } else {
    run();
  }
};

export const scrollToTop = (options: { delay?: number } = {}) => {
  const run = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  if (options.delay && options.delay > 0) {
    window.setTimeout(run, options.delay);
  } else {
    run();
  }
};
