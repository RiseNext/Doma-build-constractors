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

export const CATEGORY_ENTRIES: CategoryEntry[] = [
  {
    id: 'community',
    title: 'Community',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/WhatsApp%20Image%202026-05-06%20at%208.02.36%20PM.jpeg',
    blurb: 'Civic, public, neighbourhood.',
  },
  {
    id: 'residential',
    title: 'Residential',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/01.jpeg',
    blurb: 'Houses, apartments, HMO.',
  },
  {
    id: 'commercial',
    title: 'Commercial',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/03.jpeg',
    blurb: 'Workspaces, retail, hospitality.',
  },
];

export const projects: ProjectDetailData[] = [
  // ─── RESIDENTIAL ──────────────────────────────────────────────────────
  {
    title: 'Archway Road',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/archway-road/01.jpeg',
    location: '492–494 Archway Road, London',
    year: '',
    scope: 'Residential — Refurbishment & Conversion',
    description:
      'Refurbishment and conversion across two adjoining properties — four upgraded apartments at No. 492 and a basement-led multi-unit redevelopment at No. 494.',
    longDescription:
      'A comprehensive refurbishment and conversion project delivered across two adjoining properties for a repeat developer client.\n\nAt No. 492, the works focused on the full internal refurbishment of four existing residential apartments, including upgraded mechanical and electrical systems, replacement of utility services, and improved fire compartmentation and acoustic performance between units.\n\nAt No. 494, the scheme involved a more extensive redevelopment, converting a single dwelling into multiple residential units. This included a full basement excavation supported by underpinning works and the construction of a substantial retaining wall adjacent to the A1 highway. A large rear extension was also delivered to increase the building footprint and maximise residential capacity.\n\nStructural interventions included the installation of steel support systems to accommodate the new layout and extensions, alongside full drainage and service upgrades. The project also incorporated fire safety systems, acoustic insulation, and complete internal reconfiguration, finished with new kitchens, bathrooms, and high-quality interior detailing throughout.\n\nThe development successfully combined complex structural works with high-spec refurbishment, delivering multiple modern residential units within a constrained urban environment.',
    gallery:[
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/archway-road/01.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/archway-road/02.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/archway-road/03.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/archway-road/04.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/archway-road/05.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/archway-road/06.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/archway-road/07.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/archway-road/08.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/archway-road/09.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/archway-road/10.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/archway-road/11.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/archway-road/12.jpeg',
    ],
    category: 'residential',
  },
  {
    title: '57 Castle Street, Reading',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/57-castle-street-reading/01.webp',
    location: 'Reading, Berkshire',
    year: '2017',
    scope: 'Residential',
    description:
      'Full conversion of an existing office building into modern residential apartments, delivered within a tight five-month programme.',
    longDescription:
      'A full conversion of an existing office building into modern residential apartments, delivered within a tight five-month programme. The project involved complete strip-out to shell condition, installation of new electric-based utilities, drainage systems, and full internal reconfiguration. High-performance acoustic insulation, fire compartmentation, and compliant stair upgrades were implemented throughout. The development was completed with high-quality finishes including kitchens, bathrooms, flooring, and full MEP systems, transforming the building into a fully compliant residential scheme.',
    gallery: [
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/57-castle-street-reading/01.webp',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/57-castle-street-reading/02.png',
    ],
    category: 'residential',
  },
  {
    title: 'Balham',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/balham/01.png',
    location: '15 Balham High Road, London',
    year: 'Ongoing',
    scope: 'Mixed-use Residential',
    description:
      'Mixed-use redevelopment with residential units and a high-end commercial space — full demolition, basement excavation, mansard and rear extension.',
    longDescription:
      'A comprehensive mixed-use redevelopment combining residential and commercial elements. The project included full demolition, basement excavation, mansard extension, and rear expansion. It delivered multiple residential units alongside a high-end commercial space, featuring bespoke interior design. Structural steelworks, full MEP installations, fire safety systems, and acoustic treatments were integrated to create a modern, high-quality development.',
    gallery: ['https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/balham/01.png', 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/balham/02.png'],
    category: 'residential',
  },
  {
    title: 'Finchley House',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/finchley-house/01.png',
    location: '35 Abington Road, Finchley, London',
    year: '2025',
    scope: 'Residential — Design & Build',
    description:
      'A bespoke five-bedroom luxury residence (~450m²), delivered turnkey with fully coordinated MEP systems and premium finishes.',
    longDescription:
      'A bespoke five-bedroom luxury residence spanning approximately 450m², delivered as a full design-and-build project. The scheme included complete structural construction, utility integration, and high-spec internal layouts with multiple living spaces. Fully coordinated MEP systems and premium finishes ensured a turnkey delivery tailored for modern residential living.',
    gallery: [
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/finchley-house/01.png',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/finchley-house/02.webp',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/finchley-house/03.webp',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/finchley-house/04.webp',
    ],
    category: 'residential',
  },
  {
    title: 'Finsbury Park',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/finsbury-park/01.jpg',
    location: '64–66 Finsbury Grove, London',
    year: '2025',
    scope: 'Residential — New Build',
    description:
      'A new-build residential development delivering 10 contemporary apartments across approximately 1,100m² with retained façade and full turnkey fit-out.',
    longDescription:
      'A new-build residential development delivering 10 contemporary apartments across approximately 1,100m². The scheme retained the existing façade while constructing a new structural frame, foundations, and extensions to maximise space. Works included zinc cladding, modern roofing systems, high-performance glazing, and full internal fit-out. The project also incorporated drainage systems, utilities, and landscaping, resulting in a complete turnkey residential development.',
    gallery: ['https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/finsbury-park/01.jpg', 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/finsbury-park/02.jpg'],
    category: 'residential',
  },
  {
    title: 'Hitchen',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/hitchen/01.jpg',
    location: 'Backlesbury, Hitchin Town Centre',
    year: '2014',
    scope: 'Heritage Mixed-Use',
    description:
      'Heritage-led redevelopment completing a partially abandoned site — 10 residential units, commercial spaces, and a reconstructed 450-year-old roof.',
    longDescription:
      'A complex heritage-led redevelopment involving restoration, structural repair, and completion of a partially abandoned site. The project included reconstruction of a 450-year-old roof, restoration of historic elements, and completion of 10 residential units alongside commercial spaces. Extensive coordination, defect resolution, and full MEP completion were carried out to deliver a fully operational mixed-use development.',
    gallery: [
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/hitchen/01.jpg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/hitchen/02.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/hitchen/03.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/hitchen/04.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/hitchen/05.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/hitchen/06.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/hitchen/07.jpeg',
    ],
    category: 'residential',
  },
  {
    title: 'Richmond House',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/01.jpeg',
    location: 'Courtlands Avenue, Ealing',
    year: '2021',
    scope: 'Residential — Façade Retention',
    description:
      'Façade retention with complete reconstruction of a modern five-bedroom home, including additional floors, crown roof, landscaping and garage.',
    longDescription:
      'A large-scale residential redevelopment involving façade retention and complete reconstruction of a modern five-bedroom home. The project included new structural systems, additional floors, crown roof installation, and full internal fit-out. External works featured landscaping, boundary treatments, and garage construction, delivering a high-spec family residence.',
    gallery: [
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/01.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/02.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/03.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/04.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/05.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/06.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/07.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/08.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/09.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/10.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/11.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/12.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/13.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/14.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/15.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/16.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/17.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/18.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/richmond-house/19.jpeg',
    ],
    category: 'residential',
  },
  {
    title: 'Wembley',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/wembley/01.png',
    location: '12 Harrowdene Road, Wembley, London',
    year: '2024',
    scope: 'Residential — Penthouse Extension',
    description:
      'High-end rooftop penthouse extension on an occupied residential building — a luxury two-bedroom unit with bespoke kitchens, underfloor heating and designer wet rooms.',
    longDescription:
      'A high-end rooftop penthouse extension constructed on an occupied residential building. The project required careful structural sequencing, installation of steel frameworks, and temporary protective systems. Delivered as a luxury two-bedroom unit, the penthouse features premium finishes including bespoke kitchens, underfloor heating, designer wet rooms, and contemporary façade integration.',
    gallery: [
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/wembley/01.png',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/wembley/02.png',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/wembley/03.jpg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/wembley/04.jpg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/wembley/05.jpg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/wembley/06.jpg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/wembley/07.jpg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/wembley/08.jpg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/wembley/09.jpg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/wembley/10.jpg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/residential/wembley/11.jpg',
    ],
    category: 'residential',
  },

  // ─── COMMUNITY ────────────────────────────────────────────────────────
  {
    title: 'Isleworth Deen Centre',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/01.jpg',
    location: 'United Kingdom',
    year: '2025',
    scope: 'Community — Grade II Listed',
    description:
      'Full refurbishment and structural upgrade of a Grade II listed building, combining modern building performance with heritage preservation.',
    longDescription:
      'A full refurbishment and structural upgrade of a Grade II listed building. Works included basement construction, waterproofing systems, full MEP upgrades, and heritage restoration. The project successfully combined modern building performance with preservation requirements, delivering a high-quality community facility.',
    gallery: [
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/01.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/02.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/03.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/04.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/05.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/06.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/07.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/08.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/09.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/10.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/11.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/12.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/13.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/14.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/15.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/16.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/17.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/18.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/19.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/20.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/21.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/22.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/23.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/24.jpg',
  'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/idc/26.jpg',
    ],
    category: 'community',
  },
  {
    title: 'NOOR UL ISLAM',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/01.jpg',
    location: 'Nurul Islam Trust, Leyton, London',
    year: '2026',
    scope: 'Community — Refurbishment & Fit-out',
    description:
      'Large-scale refurbishment and high-end fit-out of a multi-storey community building, with bespoke ablution facilities and premium internal finishes.',
    longDescription:
      'A large-scale refurbishment and high-end fit-out of a multi-storey community building. The project included full MEP installations, structural remediation, fire safety upgrades, and premium internal finishes. Standout features include bespoke ablution facilities with advanced drainage systems, custom solid surfaces, and precision detailing, delivering a durable and high-quality community space.',
    gallery: [
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/01.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/03.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/04.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/08.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/09.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/11.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/12.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/14.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/16.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/23.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/24.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/29.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/30.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/32.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/33.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/34.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/35.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/36.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/37.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/38.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/39.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/leyton/40.jpg',
    ],
    category: 'community',
  },
  {
    title: 'Luton',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/luton/01.jpg',
    location: 'Saints Community Hub, St Bishopscote Road, Luton, Bedfordshire',
    year: 'Ongoing',
    scope: 'Community — New Build',
    description:
      'Large-scale community development with demolition, groundworks and new structural steel building — drainage, reinforced foundations and façade systems.',
    longDescription:
      'A large-scale community development involving demolition, groundworks, and construction of a new structural steel building. The project included drainage systems, reinforced foundations, concrete slab construction, and façade systems, forming a strong base for a modern community hub.',
    gallery: [
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/luton/01.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/luton/02.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/luton/03.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/luton/04.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/luton/05.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/luton/06.jpg',
'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/luton/07.jpg',
    ],
    category: 'community',
  },
  {
    title: 'Luton Central',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/luton-central/01.webp',
    location: 'Luton Central Mosque, Luton, Bedfordshire',
    year: '',
    scope: 'Community — Compliance & Upgrade',
    description:
      'Compliance-driven project resolving 30+ building control issues — fire systems, drainage, structural and electrical upgrades enabling full certification.',
    longDescription:
      'A complex compliance-driven project addressing long-standing building control issues. Works included upgrades to fire systems, drainage, structural elements, and electrical installations. Over 30 compliance issues were resolved, resulting in full certification and enabling the building to operate in line with modern regulations.',
    gallery: ['https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/luton-central/01.webp'],
    category: 'community',
  },
  {
    title: 'Southall Washrooms',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/southall-washrooms/01.webp',
    location: 'Central Jamia Masjid Southall, London',
    year: '2022',
    scope: 'Community — Washroom Refurbishment',
    description:
      'High-spec refurbishment of washroom and ablution facilities within a live religious environment — new drainage, plumbing, underfloor heating and durable fixtures.',
    longDescription:
      'A high-spec refurbishment of washroom and ablution facilities within a live religious environment. The project included new drainage, plumbing systems, underfloor heating, and mechanical upgrades. Finished with premium materials and durable fixtures, the development delivers a modern, hygienic, and efficient facility.',
    gallery: [
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/southall-washrooms/01.webp',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/southall-washrooms/02.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/southall-washrooms/03.jpeg',
      'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/community/southall-washrooms/04.jpeg',
    ],
    category: 'community',
  },

  // ─── COMMERCIAL ───────────────────────────────────────────────────────
  {
    title: 'Qaboli',
    image: 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/commercial/qaboli/01.jpg',
    location: '13 Station Road, United Kingdom',
    year: '2025',
    scope: 'Commercial — Restaurant',
    description:
      'Complete restaurant redevelopment — demolition, rear extension and full commercial kitchen, with a bespoke high-end interior and custom lighting.',
    longDescription:
      'A complete redevelopment of a restaurant space, including demolition, rear extension, and full commercial kitchen installation. The project features a bespoke high-end interior with custom lighting, decorative finishes, and premium materials. Designed as a flagship dining space, it combines functionality with strong architectural identity.',
    gallery: ['https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/commercial/qaboli/01.jpg', 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/commercial/qaboli/02.jpg', 'https://cplysydmfhmyfchfzzvr.supabase.co/storage/v1/object/public/website-images/commercial/qaboli/03.jpg'],
    category: 'commercial',
  },
];
