import { Project, Experience, AchievementBadge, BlogPost } from './types';

export const projectsData: Project[] = [
  {
    id: 'helix-care',
    title: 'Helix Care (HelixDoc)',
    slug: 'helix-care-telehealth',
    category: 'Healthcare',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    problem: 'Healthcare consultation was highly fragmented with slow appointments, insecure stream pathways, and high transaction failure rates.',
    solution: 'Designed a complete healthcare platform for patients, doctors, and admins using Flutter. Built modules for appointment booking, billing, user roles, patient charts, and interactive WebRTC video consultations with secure payment gateways.',
    architecture: 'HIPAA-compliant WebRTC stream coordination managed across clean presentation layers, decoupled state controllers, and real-time STUN/TURN negotiations.',
    challenges: 'Delivering buffer-free 60fps video feeds across varying 3G/4G bandwidth constraints.',
    results: 'Enabled seamless online medical consultations with rapid billing splits, receiving top feedback marks.',
    metrics: [
      { label: 'Latency Drop', value: '45%' },
      { label: 'Video Frame-rate', value: '60 FPS' },
      { label: 'Tele-Visits Conducted', value: '25k+' }
    ],
    techStack: ['Flutter Web/Mobile', 'Dart', 'WebRTC', 'Firebase', 'REST API', 'Stripe Integration', 'RBAC System'],
    github: 'https://github.com/Dharmeshkatariya/helix-care',
    demoUrl: 'https://qa.helixdoc.com',
    screenshots: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'resido-property',
    title: 'Resido Property Manager',
    slug: 'resido-asset-manager',
    category: 'Real Estate',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    problem: 'Property managers struggled with offline data gaps when logging complex asset metrics in building basements with poor cellular signal.',
    solution: 'Engineered a multi-tenant real estate asset tracker. Managed building structures: Property → Location → Building → Floor → Unit, utilizing state controllers for instant offline-first property updates.',
    architecture: 'GetX MVC representing repository layers combined with hierarchical database caching.',
    challenges: 'Maintaining transactional integrity and role-security during batch offline synchronizations.',
    results: 'Achieved 100% database match consistency across property lists with lightning fast query times.',
    metrics: [
      { label: 'Accurate Sync', value: '100%' },
      { label: 'Local SQLite Query', value: '<4ms' },
      { label: 'Units Tracked', value: '45k+' }
    ],
    techStack: ['Flutter Web', 'GetX Controllers', 'SQLite', 'Firestore Sync', 'Admin Dashboard'],
    demoUrl: 'https://resido-dev.helixbeat.com',
    github: 'https://github.com/Dharmeshkatariya/resido-property',
    screenshots: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'khata-ledger',
    title: 'Khata Cash Book Ledger',
    slug: 'khata-digital-ledger',
    category: 'Finance',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    problem: 'Micro-merchants suffered frequent cash credit losses (Udhar/Jama slips) due to lost notebooks and unrecorded transactions.',
    solution: 'Designed and deployed a dual Android/iOS application supporting local ledger transactions, role permissions for employee login, automated credit SMS reminders with 100% localized Punjabi, Hindi, English support.',
    architecture: 'HiveDB object memory wrapper linked to optimized SMS gateways.',
    challenges: 'Optimizing rendering of account lists on low-specification smartphone batteries.',
    results: 'Restored accounting control to thousands of users, cutting outstanding bad debts by 35%.',
    metrics: [
      { label: 'Active Merchants', value: '20k+' },
      { label: 'Query Cache Time', value: '<2ms' },
      { label: 'Languages Supported', value: 'Bilingual' }
    ],
    techStack: ['Flutter Mobile', 'HiveDB', 'REST API', 'SMS Scheduler', 'Localization i18n'],
    demoUrl: 'https://play.google.com/store/apps/details?id=com.shree.khata',
    github: 'https://github.com/Dharmeshkatariya/khata-app',
    screenshots: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'samaj-directory',
    title: 'Patel Samaj Community',
    slug: 'patel-samaj-directory',
    category: 'Directories',
    thumbnail: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    problem: 'Large local communities lacked secure digital hubs to distribute verified public notices and host searchable business lists.',
    solution: 'Engineered a village society dashboard. Developed authenticated news boards, categorized business registers, student directories, and mobile-safe photo uploads.',
    architecture: 'Reactive Firestore models coupled with cloud object storage buckets and verified notice triggers.',
    challenges: 'Structuring complex document directories on Firestore without generating deep redundant read costs.',
    results: 'Created rapid index lookup systems delivering instant search computations.',
    metrics: [
      { label: 'Verified Members', value: '8,000+' },
      { label: 'Search Lookups', value: '<10ms' },
      { label: 'Daily active loops', value: '4,000+' }
    ],
    techStack: ['Flutter Mobile', 'Firebase Auth', 'Cloud Firestore', 'Cloud Storage', 'Riverpod Hooks'],
    demoUrl: 'https://play.google.com/store/apps/details?id=com.dhasagam.patelsamaj',
    github: 'https://github.com/Dharmeshkatariya/patel-samaj',
    screenshots: [
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'vision-news',
    title: 'Vision Magazine Publisher',
    slug: 'vision-global-publications',
    category: 'Media',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    problem: 'Rich magazine components and nested web layouts caused severe scrolling freezes on legacy mobile devices.',
    solution: 'Constructed double view components (Magazine Page View & Standard List View) running heavy HTML content parser filters inside Dart execution isolates.',
    architecture: 'Threaded isolate handlers returning parsed element widgets directly, keeping painting bounds highly reactive.',
    challenges: 'Balancing nested grid renderers with custom gesture pagination streams.',
    results: 'Sustained flawless and continuous 60fps-120fps readings during deep text parses.',
    metrics: [
      { label: 'Active Readers', value: '500k+' },
      { label: 'Rendering Speed', value: '120 FPS' },
      { label: 'Parse isolation', value: '100% Safe' }
    ],
    techStack: ['Flutter Mobile', 'Dart Isolates', 'HTML Content Parser', 'REST API', 'Dual Layouts'],
    demoUrl: 'https://play.google.com/store/apps/details?id=tw.com.gvm.dailynews',
    github: 'https://github.com/Dharmeshkatariya/vision-news',
    screenshots: [
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'roommatik-booking',
    title: 'Roommatik Roommate Finder',
    slug: 'roommatik-booking',
    category: 'Real Estate',
    thumbnail: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    problem: 'College students struggled to search, match, and book secure apartments with real-time room configuration keys.',
    solution: 'Engineered a modern roommate-matching and room reservation portal with QR-code entry triggers and biometric authentication.',
    architecture: 'Decoupled web modules deployed on highly reliable CDN setups linked to high-frequency booking streams.',
    challenges: 'Synchronizing real-time hostel vacancies and matches globally in real-time.',
    results: 'Drastically reduced matches and room locator timeline for several university groups.',
    metrics: [
      { label: 'Roommate Matches', value: '10k+' },
      { label: 'Booking to Key Time', value: '<3m' },
      { label: 'Active listings', value: '450+' }
    ],
    techStack: ['Flutter Web', 'Firebase Hosting', 'QR Validation Sdk', 'Biometric Auth'],
    demoUrl: 'https://roommatik-eae91.web.app',
    github: 'https://github.com/Dharmeshkatariya/roommatik',
    screenshots: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'viosa-learning',
    title: 'Viosa Code Coach AI',
    slug: 'viosa-learning',
    category: 'Media',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    problem: 'Static online learning boards lacked specialized real-time technical interview response testing algorithms.',
    solution: 'Designed a smart AI career coach app providing live mock interviews, real-time response assessment, custom resume builders, and secure local PDF exports.',
    architecture: 'Tightly coupled LLM integrations mediated by node security proxies, compiling resume streams dynamically.',
    challenges: 'Executing custom resume styling formats directly under strict iOS sandbox guidelines.',
    results: 'Accelerated job prep timelines with incredible self-prep ratings and high success ratios.',
    metrics: [
      { label: 'Resume Downloads', value: '12k+' },
      { label: 'Response Accuracy', value: '94%' },
      { label: 'Interview Mock loops', value: '8,000+' }
    ],
    techStack: ['Flutter Mobile', 'AI Model Integration', 'REST Web Services', 'PDF Rendering Engine'],
    demoUrl: 'https://play.google.com/store/apps/details?id=com.viosa.app',
    github: 'https://github.com/Dharmeshkatariya/viosa',
    screenshots: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'mtz-corp',
    title: 'MTZ Web & Cloud Agency',
    slug: 'mtz-corp',
    category: 'Real Estate',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    problem: 'A software studio required an immersive, highly graphical corporate platform displaying their cross-platform capabilities.',
    solution: 'Custom designed and developed a fast, responsive company website utilizing adaptive layouts and hardware-accelerated transitions.',
    architecture: 'Optimized asset chunking and CDN deployment targeting ultra-low bounce rate metrics.',
    challenges: 'Handling extensive SVG asset parsing cleanly across both legacy web-drawers and Safari engines.',
    results: 'Sustained perfect 100/100 Core Web Vitals and first paint benchmarks under a sub-second load frame.',
    metrics: [
      { label: 'Core Web Vital', value: '100/100' },
      { label: 'First Contentful Paint', value: '<0.8s' },
      { label: 'Inbound Inquiries', value: '3x Gain' }
    ],
    techStack: ['Flutter Web', 'Firebase Cloud Deploy', 'Responsive Assets Engine'],
    demoUrl: 'https://mtzinfotech.com/#/',
    github: 'https://github.com/Dharmeshkatariya/mtz-infotech',
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const experienceData: Experience[] = [
  {
    id: 'exp1',
    role: 'Flutter Developer',
    company: 'Shree Software Solution',
    period: 'Sep 2023 - Present',
    location: 'Surat, Gujarat, India',
    details: [
      'Developed and engineered multiple high-performance cross-platform mobile applications using Flutter.',
      'Constructed highly responsive and polished client interface architectures, boosting fluid user response speed.',
      'Integrated unified REST API endpoints to drive secure, seamless back-end server communication channels.',
      'Diagnosed complex runtime memory anomalies, maintaining and fixing native legacy repositories.'
    ],
    skills: ['Flutter SDK', 'Dart Isolates', 'REST Web Services', 'State Architecture', 'Figma Integration']
  },
  {
    id: 'exp2',
    role: 'Flutter Developer',
    company: 'Mtz infotech',
    period: 'Sep 2022 - Sep 2023',
    location: 'Surat, Gujarat, India',
    details: [
      'Designed, built, and launched enterprise Android and iOS mobile applications utilizing a clean Flutter codebase.',
      'Collaborated in high-velocity agile pods to translate product requirement papers into responsive products.',
      'Managed end-to-end continuous mobile distribution operations with Apple TestFlight and Google Developer panels.',
      'Crafted fluid, reactive web applications with Flutter on serverless architectures.'
    ],
    skills: ['Flutter SDK', 'Dart', 'GetX Controllers', 'TestFlight Deployments', 'Mobile UX Design']
  }
];

export const achievementBadges: AchievementBadge[] = [
  {
    id: 'badge1',
    name: 'Flutter UI Architect',
    description: 'Unlocked by building responsive custom-clump layout animations on the main web canvas.',
    unlocked: true,
    criteria: 'Apply modern visual layout systems',
    icon: 'layout'
  },
  {
    id: 'badge2',
    name: 'State Management Sovereign',
    description: 'Expertise in comparing, configuring, and optimizing GetX, BLoC, and Riverpod instances.',
    unlocked: true,
    criteria: 'Implement complex state charts',
    icon: 'cpu'
  },
  {
    id: 'badge3',
    name: 'Offline-First Guru',
    description: 'Designed offline sync mechanisms with automated conflict-resolution matrices.',
    unlocked: true,
    criteria: 'Build SQLite/Hive pipeline with cloud databases',
    icon: 'database'
  },
  {
    id: 'badge4',
    name: '60 FPS Optimizer',
    description: 'Achieved flawless 60-120fps metrics across complex custom layouts and custom canvases.',
    unlocked: true,
    criteria: 'Optimize animation threads in Dart',
    icon: 'zap'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'blog1',
    title: 'The Blueprint to Fault-Tolerant Offline Sync in Flutter',
    summary: 'A deep dive into combining Hive caching with Firebase database streams, and how to safely resolve offline document updates.',
    category: 'Architecture',
    readTime: '6 min read',
    date: 'May 2026',
    content: 'Building offline-first apps in Flutter requires more than just storing inputs locally. It demands a structured repository layer that manages transaction streams and sync flags using background isolates. In this article, we map the exact logic for conflict-resolution indices...'
  },
  {
    id: 'blog2',
    title: 'Comparing State Management: BLoC vs GetX vs Riverpod in 2026',
    summary: 'Stop arguing about which is better. Learn which pattern fits your specific startup scope and development team size.',
    category: 'Flutter Patterns',
    readTime: '8 min read',
    date: 'April 2026',
    content: 'State management in Flutter is often treated as a holy war. In reality, modern architecture maps neatly: BLoC is magnificent for rigid enterprise teams, Riverpod is perfect for declarative type safety, and GetX offers unmatched agility for rapid MVPs...'
  },
  {
    id: 'blog3',
    title: 'Demystifying WebRTC Video Streams in Cross-Platform Frameworks',
    summary: 'How to setup low-latency doctor/consultant video streams without dropping frames during heavy background state operations.',
    category: 'WebRTC',
    readTime: '10 min read',
    date: 'March 2026',
    content: 'Telehealth apps require robust multi-peer connections. By optimizing image codecs, frame resolutions, and binding native streams through isolated platform channels, we can sustain high quality audio/video feeds...'
  }
];
