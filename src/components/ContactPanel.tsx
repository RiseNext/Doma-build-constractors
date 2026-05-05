import { useEffect, useRef, useState } from 'react';
import { CATEGORY_ENTRIES, projects } from '../lib/projectsData';
import type { ProjectCategory } from './ProjectDetail';

const SERVICE_OPTIONS = [
  'Design & Build',
  'General Contracting',
  'Construction Management',
  'Refurbishment',
  'Loft Conversions',
  'Basement Excavation',
  'Extensions',
  'Heritage & Listed',
];

const WHATSAPP_NUMBER = '447535697887';

export type ContactPrefill = {
  project?: string;
  projectCategory?: string;
  service?: string;
};

type Props = {
  label?: string;
  heading?: string;
  description?: string;
  initialPrefill?: ContactPrefill;
  /** When true, listens for global `contact:prefill` window events. */
  listenToGlobalPrefill?: boolean;
};

const resolveCategory = (
  detail: ContactPrefill,
  fallback: ProjectCategory | ''
): ProjectCategory | '' => {
  if (
    detail.projectCategory === 'commercial' ||
    detail.projectCategory === 'residential' ||
    detail.projectCategory === 'community'
  ) {
    return detail.projectCategory;
  }
  if (detail.project) {
    const found = projects.find((p) => p.title === detail.project);
    if (found) return found.category;
  }
  return fallback;
};

export default function ContactPanel({
  label,
  heading = 'Start a project',
  description,
  initialPrefill,
  listenToGlobalPrefill = false,
}: Props) {
  const initialCategory = initialPrefill
    ? resolveCategory(initialPrefill, '')
    : '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: initialPrefill?.project
      ? `I'd like to talk about ${initialPrefill.project}.`
      : '',
    projectCategory: initialCategory as '' | ProjectCategory,
    projectTitle: initialPrefill?.project ?? '',
    service: initialPrefill?.service ?? '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openPicker, setOpenPicker] = useState<'project' | 'service' | null>(
    null
  );
  const [pickerStep, setPickerStep] = useState<'category' | 'project'>(
    initialCategory ? 'project' : 'category'
  );
  const [pickerCategory, setPickerCategory] = useState<ProjectCategory | null>(
    (initialCategory as ProjectCategory) || null
  );

  const appliedInitialRef = useRef(false);

  const applyPrefill = (detail: ContactPrefill) => {
    const cat = resolveCategory(detail, '');

    setFormData((prev) => {
      const next = { ...prev };
      if (cat) next.projectCategory = cat;
      if (detail.project) next.projectTitle = detail.project;
      if (detail.service) next.service = detail.service;
      if (!prev.message.trim()) {
        if (detail.project) {
          next.message = `I'd like to talk about ${detail.project}.`;
        } else if (detail.service) {
          next.message = `I'd like to discuss your ${detail.service} service.`;
        }
      }
      return next;
    });

    if (cat) {
      setPickerCategory(cat);
      setPickerStep('project');
    } else {
      setPickerCategory(null);
      setPickerStep('category');
    }
    setOpenPicker(null);
  };

  // Apply initial prefill exactly once after mount.
  useEffect(() => {
    if (!initialPrefill || appliedInitialRef.current) return;
    appliedInitialRef.current = true;
    applyPrefill(initialPrefill);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Optionally listen to global prefill events (used by the homepage instance).
  useEffect(() => {
    if (!listenToGlobalPrefill) return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as ContactPrefill | undefined;
      if (!detail) return;
      applyPrefill(detail);
    };
    window.addEventListener('contact:prefill', handler);
    return () => window.removeEventListener('contact:prefill', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listenToGlobalPrefill]);

  // Reset picker state when dropdown closes
  useEffect(() => {
    if (openPicker !== 'project') {
      // intentional: keep selection visible, just collapse the dropdown
    }
  }, [openPicker]);

  const buildWhatsAppMessage = () => {
    const lines: string[] = ['New enquiry from domabuild.co.uk', ''];
    if (formData.name) lines.push(`Name: ${formData.name}`);
    if (formData.email) lines.push(`Email: ${formData.email}`);
    if (formData.phone) lines.push(`Phone: ${formData.phone}`);

    const projectCategoryLabel = formData.projectCategory
      ? CATEGORY_ENTRIES.find((c) => c.id === formData.projectCategory)?.title
      : '';
    if (projectCategoryLabel || formData.projectTitle) {
      const parts = [projectCategoryLabel, formData.projectTitle].filter(
        Boolean
      );
      lines.push(`Project: ${parts.join(' · ')}`);
    }
    if (formData.service) lines.push(`Service: ${formData.service}`);
    if (formData.message) lines.push('', 'Message:', formData.message);
    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(buildWhatsAppMessage());
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const projectFieldDisplay = (() => {
    const cat = formData.projectCategory
      ? CATEGORY_ENTRIES.find((c) => c.id === formData.projectCategory)
          ?.title ?? ''
      : '';
    if (formData.projectTitle && cat)
      return `${cat} · ${formData.projectTitle}`;
    if (formData.projectTitle) return formData.projectTitle;
    return cat;
  })();

  const projectsInCategory = pickerCategory
    ? projects.filter((p) => p.category === pickerCategory)
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-8">
      {/* Left: contact info */}
      <div>
        {label && (
          <div className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/45 mb-3 md:mb-4">
            {label}
          </div>
        )}
        <h2 className="section-heading text-white mb-6 md:mb-8">{heading}</h2>

        {description && (
          <p className="text-white/65 text-[14px] md:text-[16px] leading-[1.65] max-w-[48ch] mb-7 md:mb-10">
            {description}
          </p>
        )}

        <div className="space-y-3 md:space-y-4">
          <a
            href="tel:+442087934511"
            className="block text-base md:text-xl hover:text-doma-gold transition-colors duration-300"
          >
            +44 (0)20 8793 4511
          </a>
          <a
            href="tel:+447535697887"
            className="block text-base md:text-xl hover:text-doma-gold transition-colors duration-300"
          >
            +44 (0)7535 697 887
          </a>
          <p className="text-doma-muted text-sm md:text-base mt-4 leading-[1.7]">
            Doma Build Contractors Ltd
            <br />
            133 West Hendon Broadway
            <br />
            London, NW9 7DY
            <br />
            United Kingdom
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="bg-white/5 backdrop-blur-sm rounded-md p-4 sm:p-5 md:p-8">
        {submitted ? (
          <div className="h-full flex items-center justify-center min-h-[280px] text-center px-4">
            <div>
              <p className="text-doma-gold text-lg">Opening WhatsApp…</p>
              <p className="text-white/60 text-sm mt-2">
                We've prefilled your message — just hit send in WhatsApp to
                reach us.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Project picker — hierarchical */}
              <div className="relative">
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                  Project type
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setOpenPicker((p) => (p === 'project' ? null : 'project'))
                  }
                  className={`w-full bg-transparent border-b py-2 text-left flex items-center justify-between gap-3 transition-colors duration-300 ${
                    openPicker === 'project'
                      ? 'border-doma-gold'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  aria-expanded={openPicker === 'project'}
                >
                  <span
                    className={`truncate ${
                      projectFieldDisplay ? 'text-white' : 'text-white/30'
                    }`}
                  >
                    {projectFieldDisplay || 'Select project'}
                  </span>
                  <span className="flex items-center gap-2 text-white/55 shrink-0">
                    {(formData.projectCategory || formData.projectTitle) && (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData((d) => ({
                            ...d,
                            projectCategory: '',
                            projectTitle: '',
                          }));
                          setPickerCategory(null);
                          setPickerStep('category');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            setFormData((d) => ({
                              ...d,
                              projectCategory: '',
                              projectTitle: '',
                            }));
                            setPickerCategory(null);
                            setPickerStep('category');
                          }
                        }}
                        className="text-[11px] uppercase tracking-[0.16em] hover:text-white transition-colors cursor-pointer"
                        aria-label="Clear"
                      >
                        clear
                      </span>
                    )}
                    <span
                      className={`inline-block transition-transform duration-300 ${
                        openPicker === 'project' ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </span>
                </button>

                <div
                  className={`absolute left-0 right-0 mt-2 z-30 origin-top transition-[opacity,transform] duration-300 ${
                    openPicker === 'project'
                      ? 'opacity-100 scale-y-100 pointer-events-auto'
                      : 'opacity-0 scale-y-95 pointer-events-none'
                  }`}
                  style={{ transformOrigin: 'top' }}
                >
                  <div className="bg-doma-dark border border-white/15 rounded-md shadow-2xl overflow-hidden">
                    {pickerStep === 'category' && (
                      <ul>
                        {CATEGORY_ENTRIES.map((c) => (
                          <li key={c.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setPickerCategory(c.id);
                                setPickerStep('project');
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-3 transition-colors duration-200 ${
                                formData.projectCategory === c.id
                                  ? 'bg-white/10 text-doma-gold'
                                  : 'text-white/85 hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              <span>{c.title}</span>
                              <span className="text-white/45">→</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    {pickerStep === 'project' && pickerCategory && (
                      <div>
                        <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-white/10 bg-white/[0.03]">
                          <button
                            type="button"
                            onClick={() => {
                              setPickerStep('category');
                              setPickerCategory(null);
                            }}
                            className="text-[11px] uppercase tracking-[0.18em] text-white/55 hover:text-white transition-colors inline-flex items-center gap-2"
                          >
                            <span>←</span>
                            <span>Categories</span>
                          </button>
                          <span className="text-[11px] uppercase tracking-[0.18em] text-doma-gold">
                            {
                              CATEGORY_ENTRIES.find(
                                (c) => c.id === pickerCategory
                              )?.title
                            }
                          </span>
                        </div>
                        <ul
                          className="max-h-[260px] overflow-y-auto thin-scroll"
                          style={{ overscrollBehavior: 'contain' }}
                        >
                          <li>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((d) => ({
                                  ...d,
                                  projectCategory: pickerCategory,
                                  projectTitle: '',
                                }));
                                setOpenPicker(null);
                              }}
                              className="w-full text-left px-4 py-2.5 text-[13px] text-white/65 italic hover:bg-white/5 hover:text-white transition-colors"
                            >
                              Any{' '}
                              {CATEGORY_ENTRIES.find(
                                (c) => c.id === pickerCategory
                              )?.title.toLowerCase()}{' '}
                              project
                            </button>
                          </li>
                          {projectsInCategory.map((p) => (
                            <li key={p.title}>
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData((d) => ({
                                    ...d,
                                    projectCategory: pickerCategory,
                                    projectTitle: p.title,
                                  }));
                                  setOpenPicker(null);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 ${
                                  formData.projectTitle === p.title
                                    ? 'bg-white/10 text-doma-gold'
                                    : 'text-white/85 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                <span className="block">{p.title}</span>
                                <span className="block text-[11px] text-white/45 mt-0.5">
                                  {[p.location, p.year]
                                    .filter(Boolean)
                                    .join(' · ')}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Service picker — flat list */}
              <div className="relative">
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                  Service
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setOpenPicker((p) => (p === 'service' ? null : 'service'))
                  }
                  className={`w-full bg-transparent border-b py-2 text-left flex items-center justify-between gap-3 transition-colors duration-300 ${
                    openPicker === 'service'
                      ? 'border-doma-gold'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  aria-expanded={openPicker === 'service'}
                >
                  <span
                    className={`truncate ${
                      formData.service ? 'text-white' : 'text-white/30'
                    }`}
                  >
                    {formData.service || 'Select service'}
                  </span>
                  <span className="flex items-center gap-2 text-white/55 shrink-0">
                    {formData.service && (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData((d) => ({ ...d, service: '' }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            setFormData((d) => ({ ...d, service: '' }));
                          }
                        }}
                        className="text-[11px] uppercase tracking-[0.16em] hover:text-white transition-colors cursor-pointer"
                        aria-label="Clear"
                      >
                        clear
                      </span>
                    )}
                    <span
                      className={`inline-block transition-transform duration-300 ${
                        openPicker === 'service' ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </span>
                </button>

                <div
                  className={`absolute left-0 right-0 mt-2 z-30 origin-top transition-[opacity,transform] duration-300 ${
                    openPicker === 'service'
                      ? 'opacity-100 scale-y-100 pointer-events-auto'
                      : 'opacity-0 scale-y-95 pointer-events-none'
                  }`}
                  style={{ transformOrigin: 'top' }}
                >
                  <ul
                    className="bg-doma-dark border border-white/15 rounded-md shadow-2xl overflow-hidden max-h-[280px] overflow-y-auto thin-scroll"
                    style={{ overscrollBehavior: 'contain' }}
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <li key={opt}>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((d) => ({ ...d, service: opt }));
                            setOpenPicker(null);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 ${
                            formData.service === opt
                              ? 'bg-white/10 text-doma-gold'
                              : 'text-white/85 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/30 focus:border-doma-gold focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              className="mt-4 inline-flex items-center gap-3 px-8 py-3 border border-doma-gold text-doma-gold text-sm uppercase tracking-wider rounded-full hover:bg-doma-gold hover:text-doma-dark transition-colors duration-300"
            >
              <span>Send via WhatsApp</span>
              <span aria-hidden>→</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
