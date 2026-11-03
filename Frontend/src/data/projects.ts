export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  role: string;
  link: string;
  github?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: 'himalbytes',
    title: 'HimalBytes',
    description: 'A multi-vendor Nepali e-commerce marketplace empowering local vendors with modern digital storefronts and secure escrow payments.',
    tech: ['Django', 'Next.js', 'PostgreSQL', 'TailwindCSS'],
    role: 'Lead Full-Stack Developer',
    link: 'https://himalbytes.com',
    github: 'https://github.com/AdityaXD007/himalbytes',
    image: '/assets/skillswap.png',
  },
  {
    id: 'yokohama',
    title: 'Yokohama Nepal',
    description: 'Official corporate website and dynamic product catalog showcasing premium tires and automotive solutions across Nepal.',
    tech: ['Next.js', 'Django CMS', 'TailwindCSS', 'REST APIs'],
    role: 'Frontend Architect',
    link: 'https://yokohamanepal.com',
    image: '/assets/bloghaven.png',
  },
  {
    id: 'solvo',
    title: 'Solvo Hospitality',
    description: 'Comprehensive digital hospitality platform featuring automated guest reservations, dining orders, and hotel operations dashboard.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    role: 'Full-Stack Developer',
    link: 'https://solvohospitality.com',
  },
  {
    id: 'grow-nepal',
    title: 'Grow Nepal',
    description: 'Impact-driven initiative website supporting grassroots entrepreneurial growth, funding applications, and community events.',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    role: 'Frontend Developer',
    link: 'https://grownepal.org',
  },
  {
    id: 'everest-billing',
    title: 'Everest Billing',
    description: 'Offline-first cross-platform point-of-sale and invoice billing application built for retail businesses and inventory tracking.',
    tech: ['React Native', 'SQLite', 'TypeScript', 'TailwindCSS'],
    role: 'Mobile Developer',
    link: 'https://techeverest.com/billing',
    image: '/assets/Treksathi.jpg',
  },
  {
    id: 'teen-patti-tracker',
    title: 'Teen Patti Tracker',
    description: 'Interactive multiplayer card game & real-time tournament manager with room synchronisation, chip mechanics, and live scoring.',
    tech: ['React Native', 'Expo', 'Socket.IO', 'Node.js'],
    role: 'Mobile & Backend Developer',
    link: 'https://play.google.com/store/apps/details?id=com.techeverest.teenpattitracker',
    image: '/assets/teenpatti.png',
  },
  {
    id: 'cheater-ludo',
    title: 'Cheater Ludo',
    description: 'A wildly entertaining twist on classic board gameplay with customized trick mechanics, multiplayer matchmaking, and turn management.',
    tech: ['Flutter', 'Flame Engine', 'Dart', 'Firebase'],
    role: 'Game Developer',
    link: 'https://play.google.com/store/apps/details?id=com.techeverest.cheaterludo',
    image: '/assets/cheaterludo.png',
  },
];

