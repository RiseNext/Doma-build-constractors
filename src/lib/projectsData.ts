import type {
  ProjectDetailData,
  ProjectCategory,
} from '../components/ProjectDetail';

export type CategoryEntry = {
  id: ProjectCategory;
  title: string;
  image: string;
  blurb: string;
};

const buildGallery = (slug: string, files: string[]) =>
  files.map((f) => `/projects/${slug}/${f}`);

export const CATEGORY_ENTRIES: CategoryEntry[] = [
  {
    id: 'community',
    title: 'Community',
    image: '/projects/community/idc/01.jpg',
    blurb: 'Civic, public, neighbourhood.',
  },
  {
    id: 'residential',
    title: 'Residential',
    image: '/projects/residential/richmond-house/01.jpeg',
    blurb: 'Houses, apartments, HMO.',
  },
  {
    id: 'commercial',
    title: 'Commercial',
    image: '/projects/community/WhatsApp Image 2026-05-06 at 8.02.36 PM.jpeg',
    blurb: 'Workspaces, retail, hospitality.',
  },
];

export const projects: ProjectDetailData[] = [
  // ─── RESIDENTIAL ──────────────────────────────────────────────────────
  {
    title: 'Archway Road',
    image: '/projects/residential/archway-road/01.jpeg',
    location: '492–494 Archway Road, London',
    year: '',
    scope: 'Residential — Refurbishment & Conversion',
    description:
      'Refurbishment and conversion across two adjoining properties — four upgraded apartments at No. 492 and a basement-led multi-unit redevelopment at No. 494.',
    longDescription:
      'A comprehensive refurbishment and conversion project delivered across two adjoining properties for a repeat developer client.\n\nAt No. 492, the works focused on the full internal refurbishment of four existing residential apartments, including upgraded mechanical and electrical systems, replacement of utility services, and improved fire compartmentation and acoustic performance between units.\n\nAt No. 494, the scheme involved a more extensive redevelopment, converting a single dwelling into multiple residential units. This included a full basement excavation supported by underpinning works and the construction of a substantial retaining wall adjacent to the A1 highway. A large rear extension was also delivered to increase the building footprint and maximise residential capacity.\n\nStructural interventions included the installation of steel support systems to accommodate the new layout and extensions, alongside full drainage and service upgrades. The project also incorporated fire safety systems, acoustic insulation, and complete internal reconfiguration, finished with new kitchens, bathrooms, and high-quality interior detailing throughout.\n\nThe development successfully combined complex structural works with high-spec refurbishment, delivering multiple modern residential units within a constrained urban environment.',
    gallery: buildGallery('residential/archway-road', [
      '01.jpeg',
      '02.jpeg',
      '03.jpeg',
      '04.jpeg',
      '05.jpeg',
      '06.jpeg',
      '07.jpeg',
      '08.jpeg',
      '09.jpeg',
      '10.jpeg',
      '11.jpeg',
      '12.jpeg',
    ]),
    category: 'residential',
  },
  {
    title: '57 Castle Street, Reading',
    image: '/projects/residential/57-castle-street-reading/01.webp',
    location: 'Reading, Berkshire',
    year: '2017',
    scope: 'Residential',
    description:
      'Full conversion of an existing office building into modern residential apartments, delivered within a tight five-month programme.',
    longDescription:
      'A full conversion of an existing office building into modern residential apartments, delivered within a tight five-month programme. The project involved complete strip-out to shell condition, installation of new electric-based utilities, drainage systems, and full internal reconfiguration. High-performance acoustic insulation, fire compartmentation, and compliant stair upgrades were implemented throughout. The development was completed with high-quality finishes including kitchens, bathrooms, flooring, and full MEP systems, transforming the building into a fully compliant residential scheme.',
    gallery: buildGallery('residential/57-castle-street-reading', [
      '01.webp',
      '02.png',
    ]),
    category: 'residential',
  },
  {
    title: 'Balham',
    image: '/projects/residential/balham/01.png',
    location: '15 Balham High Road, London',
    year: 'Ongoing',
    scope: 'Mixed-use Residential',
    description:
      'Mixed-use redevelopment with residential units and a high-end commercial space — full demolition, basement excavation, mansard and rear extension.',
    longDescription:
      'A comprehensive mixed-use redevelopment combining residential and commercial elements. The project included full demolition, basement excavation, mansard extension, and rear expansion. It delivered multiple residential units alongside a high-end commercial space, featuring bespoke interior design. Structural steelworks, full MEP installations, fire safety systems, and acoustic treatments were integrated to create a modern, high-quality development.',
    gallery: buildGallery('residential/balham', ['01.png', '02.png']),
    category: 'residential',
  },
  {
    title: 'Finchley House',
    image: '/projects/residential/finchley-house/01.png',
    location: '35 Abington Road, Finchley, London',
    year: '2025',
    scope: 'Residential — Design & Build',
    description:
      'A bespoke five-bedroom luxury residence (~450m²), delivered turnkey with fully coordinated MEP systems and premium finishes.',
    longDescription:
      'A bespoke five-bedroom luxury residence spanning approximately 450m², delivered as a full design-and-build project. The scheme included complete structural construction, utility integration, and high-spec internal layouts with multiple living spaces. Fully coordinated MEP systems and premium finishes ensured a turnkey delivery tailored for modern residential living.',
    gallery: buildGallery('residential/finchley-house', [
      '01.png',
      '02.webp',
      '03.webp',
      '04.webp',
    ]),
    category: 'residential',
  },
  {
    title: 'Finsbury Park',
    image: '/projects/residential/finsbury-park/01.jpg',
    location: '64–66 Finsbury Grove, London',
    year: '2025',
    scope: 'Residential — New Build',
    description:
      'A new-build residential development delivering 10 contemporary apartments across approximately 1,100m² with retained façade and full turnkey fit-out.',
    longDescription:
      'A new-build residential development delivering 10 contemporary apartments across approximately 1,100m². The scheme retained the existing façade while constructing a new structural frame, foundations, and extensions to maximise space. Works included zinc cladding, modern roofing systems, high-performance glazing, and full internal fit-out. The project also incorporated drainage systems, utilities, and landscaping, resulting in a complete turnkey residential development.',
    gallery: buildGallery('residential/finsbury-park', ['01.jpg', '02.jpg']),
    category: 'residential',
  },
  {
    title: 'Hitchen',
    image: '/projects/residential/hitchen/01.jpg',
    location: 'Backlesbury, Hitchin Town Centre',
    year: '2014',
    scope: 'Heritage Mixed-Use',
    description:
      'Heritage-led redevelopment completing a partially abandoned site — 10 residential units, commercial spaces, and a reconstructed 450-year-old roof.',
    longDescription:
      'A complex heritage-led redevelopment involving restoration, structural repair, and completion of a partially abandoned site. The project included reconstruction of a 450-year-old roof, restoration of historic elements, and completion of 10 residential units alongside commercial spaces. Extensive coordination, defect resolution, and full MEP completion were carried out to deliver a fully operational mixed-use development.',
    gallery: buildGallery('residential/hitchen', [
      '01.jpg',
      '02.jpeg',
      '03.jpeg',
      '04.jpeg',
      '05.jpeg',
      '06.jpeg',
      '07.jpeg',
    ]),
    category: 'residential',
  },
  {
    title: 'Richmond House',
    image: '/projects/residential/richmond-house/01.jpeg',
    location: 'Courtlands Avenue, Ealing',
    year: '2021',
    scope: 'Residential — Façade Retention',
    description:
      'Façade retention with complete reconstruction of a modern five-bedroom home, including additional floors, crown roof, landscaping and garage.',
    longDescription:
      'A large-scale residential redevelopment involving façade retention and complete reconstruction of a modern five-bedroom home. The project included new structural systems, additional floors, crown roof installation, and full internal fit-out. External works featured landscaping, boundary treatments, and garage construction, delivering a high-spec family residence.',
    gallery: buildGallery('residential/richmond-house', [
      '01.jpeg',
      '02.jpeg',
      '03.jpeg',
      '04.jpeg',
      '05.jpeg',
      '06.jpeg',
      '07.jpeg',
      '08.jpeg',
      '09.jpeg',
      '10.jpeg',
      '11.jpeg',
      '12.jpeg',
      '13.jpeg',
      '14.jpeg',
      '15.jpeg',
      '16.jpeg',
      '17.jpeg',
      '18.jpeg',
      '19.jpeg',
    ]),
    category: 'residential',
  },
  {
    title: 'Wembley',
    image: '/projects/residential/wembley/01.png',
    location: '12 Harrowdene Road, Wembley, London',
    year: '2024',
    scope: 'Residential — Penthouse Extension',
    description:
      'High-end rooftop penthouse extension on an occupied residential building — a luxury two-bedroom unit with bespoke kitchens, underfloor heating and designer wet rooms.',
    longDescription:
      'A high-end rooftop penthouse extension constructed on an occupied residential building. The project required careful structural sequencing, installation of steel frameworks, and temporary protective systems. Delivered as a luxury two-bedroom unit, the penthouse features premium finishes including bespoke kitchens, underfloor heating, designer wet rooms, and contemporary façade integration.',
    gallery: buildGallery('residential/wembley', [
      '01.png',
      '02.png',
      '03.jpg',
      '04.jpg',
      '05.jpg',
      '06.jpg',
      '07.jpg',
      '09.jpg',
      '10.jpg',
      '11.jpg',
    ]),
    category: 'residential',
  },

  // ─── COMMUNITY ────────────────────────────────────────────────────────
  {
    title: 'Isleworth Deen Centre',
    image: '/projects/community/idc/01.jpg',
    location: 'United Kingdom',
    year: '2025',
    scope: 'Community — Grade II Listed',
    description:
      'Full refurbishment and structural upgrade of a Grade II listed building, combining modern building performance with heritage preservation.',
    longDescription:
      'A full refurbishment and structural upgrade of a Grade II listed building. Works included basement construction, waterproofing systems, full MEP upgrades, and heritage restoration. The project successfully combined modern building performance with preservation requirements, delivering a high-quality community facility.',
    gallery: buildGallery('community/idc', [
      '01.jpg',
      '02.jpg',
      '03.jpeg',
      '04.jpeg',
      '05.jpeg',
      '06.jpeg',
      '07.jpeg',
      '09.jpeg',
      '10.jpeg',
      '11.jpeg',
      '12.jpeg',
      '14.jpeg',
      '15.jpeg',
      '17.jpeg',
      '18.jpeg',
      '19.jpeg',
      '20.jpeg',
      '21.jpeg',
      '22.jpeg',
      '23.jpeg',
      '24.jpeg',
      '26.jpeg',
    ]),
    category: 'community',
  },
  {
    title: 'Leyton',
    image: '/projects/community/leyton/01.jpg',
    location: 'Nurul Islam Trust, Leyton, London',
    year: '2026',
    scope: 'Community — Refurbishment & Fit-out',
    description:
      'Large-scale refurbishment and high-end fit-out of a multi-storey community building, with bespoke ablution facilities and premium internal finishes.',
    longDescription:
      'A large-scale refurbishment and high-end fit-out of a multi-storey community building. The project included full MEP installations, structural remediation, fire safety upgrades, and premium internal finishes. Standout features include bespoke ablution facilities with advanced drainage systems, custom solid surfaces, and precision detailing, delivering a durable and high-quality community space.',
    gallery: buildGallery('community/leyton', [
      '01.jpg',
      '03.jpg',
      '04.jpg',
      '08.jpg',
      '09.jpg',
      '11.jpg',
      '12.jpg',
      '14.jpg',
      '16.jpg',
      '23.jpg',
      '24.jpg',
      '29.jpg',
      '30.jpg',
      '32.jpg',
      '33.jpg',
      '34.jpg',
      '35.jpg',
      '36.jpg',
      '37.jpg',
      '38.jpg',
      '39.jpg',
      '40.jpg',
    ]),
    category: 'community',
  },
  {
    title: 'Luton',
    image: '/projects/community/luton/01.jpg',
    location: 'Saints Community Hub, St Bishopscote Road, Luton, Bedfordshire',
    year: 'Ongoing',
    scope: 'Community — New Build',
    description:
      'Large-scale community development with demolition, groundworks and new structural steel building — drainage, reinforced foundations and façade systems.',
    longDescription:
      'A large-scale community development involving demolition, groundworks, and construction of a new structural steel building. The project included drainage systems, reinforced foundations, concrete slab construction, and façade systems, forming a strong base for a modern community hub.',
    gallery: buildGallery('community/luton', [
      '01.jpg',
      '02.jpg',
      '03.jpg',
      '04.jpg',
      '05.jpg',
      '06.jpg',
      '07.jpg',
    ]),
    category: 'community',
  },
  {
    title: 'Luton Central',
    image: '/projects/community/luton-central/01.webp',
    location: 'Luton Central Mosque, Luton, Bedfordshire',
    year: '',
    scope: 'Community — Compliance & Upgrade',
    description:
      'Compliance-driven project resolving 30+ building control issues — fire systems, drainage, structural and electrical upgrades enabling full certification.',
    longDescription:
      'A complex compliance-driven project addressing long-standing building control issues. Works included upgrades to fire systems, drainage, structural elements, and electrical installations. Over 30 compliance issues were resolved, resulting in full certification and enabling the building to operate in line with modern regulations.',
    gallery: buildGallery('community/luton-central', ['01.webp']),
    category: 'community',
  },
  {
    title: 'Southall Washrooms',
    image: '/projects/community/southall-washrooms/01.webp',
    location: 'Central Jamia Masjid Southall, London',
    year: '2022',
    scope: 'Community — Washroom Refurbishment',
    description:
      'High-spec refurbishment of washroom and ablution facilities within a live religious environment — new drainage, plumbing, underfloor heating and durable fixtures.',
    longDescription:
      'A high-spec refurbishment of washroom and ablution facilities within a live religious environment. The project included new drainage, plumbing systems, underfloor heating, and mechanical upgrades. Finished with premium materials and durable fixtures, the development delivers a modern, hygienic, and efficient facility.',
    gallery: buildGallery('community/southall-washrooms', [
      '01.webp',
      '02.jpeg',
      '03.jpeg',
      '04.jpeg',
    ]),
    category: 'community',
  },

  // ─── COMMERCIAL ───────────────────────────────────────────────────────
  {
    title: 'Qaboli',
    image: '/projects/commercial/qaboli/01.jpg',
    location: '13 Station Road, United Kingdom',
    year: '2025',
    scope: 'Commercial — Restaurant',
    description:
      'Complete restaurant redevelopment — demolition, rear extension and full commercial kitchen, with a bespoke high-end interior and custom lighting.',
    longDescription:
      'A complete redevelopment of a restaurant space, including demolition, rear extension, and full commercial kitchen installation. The project features a bespoke high-end interior with custom lighting, decorative finishes, and premium materials. Designed as a flagship dining space, it combines functionality with strong architectural identity.',
    gallery: buildGallery('commercial/qaboli', ['01.jpg', '02.jpg', '03.jpg']),
    category: 'commercial',
  },
];
