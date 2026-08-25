/** Site content sourced from the previous portfolio (index.html + components). */

/** Prefix public assets with Vite base (needed for GitHub Pages /portfolio-/) */
const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const siteContent = {
  brand: 'NACHAPPA PP',
  /** Display name — typed + accent wherever shown in UI */
  displayName: 'Nachappa PP',
  /** Main hero headline — unique, simple, value-led */
  name: 'I help industries build smarter factories.',
  titleSuffix: ' — Smart Manufacturing & Digital Transformation',
  tagline:
    'Transforming Manufacturing with the power of Electronics, AI/ML, and Software to deliver next-gen Industry 4.0 solutions.',
  scrollHint: 'Scroll',
  ctaPrimary: { label: 'View Skills', href: '#skills' },
  ctaSecondary: { label: 'Get in Touch', href: '#contact' },
} as const

export const navLinks = [
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact', href: '#contact' },
] as const

export const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nachappa-pp-60a1b9368/',
  },
  { label: 'GitHub', href: 'https://github.com/nikinach057/portfolio-' },
] as const

export const about = {
  heading: 'About Me',
  photo: asset('images/nachappa-photo.jpg'),
  photoAlt: 'Nachappa PP',
  body: `With over 4.5 years across manufacturing floors and research labs, I help Indian MSMEs turn complex operations into clear, measurable advantage. I sit at the intersection of electronics hardware, software, and operational excellence — translating Theory of Constraints and Industry 4.0 ideas into systems that actually run on the shop floor. From IIoT sensing and AI-assisted quality to process redesign that removes bottlenecks, I design intelligent solutions that cut waste, raise throughput, and make digital transformation practical — not theoretical. I started in traditional manufacturing. I stay there — now with the tools to make it smarter.`,
  expertise: [
    { title: 'Electronics', subtitle: 'Hardware Design & IoT' },
    { title: 'AI/ML', subtitle: 'Machine Learning & Analytics' },
    { title: 'Software', subtitle: 'Full-Stack Development' },
    { title: 'Manufacturing', subtitle: 'Industry 4.0 Solutions' },
  ],
  highlights: [
    {
      title: 'Shop-floor fluent',
      text: 'Solutions shaped by real plants, MSMEs, and production constraints — not slide decks alone',
    },
    {
      title: 'Cross-domain builder',
      text: 'Electronics, software, AI/ML, and operations united into one delivery stack',
    },
    {
      title: 'Clarity under complexity',
      text: 'I turn dense technical systems into decisions leaders and teams can act on',
    },
    {
      title: 'Outcomes over buzzwords',
      text: 'Industry 4.0 that shows up as throughput, quality, and uptime — not just pilots',
    },
  ],
} as const

export const skills = {
  heading: 'Technical Skills',
  subheading: 'Multi-Domain Expertise',
  body: `Bridging the gap between traditional manufacturing and cutting-edge technology. Expert in electronics hardware design, operational excellence methodologies, and Theory of Constraints implementation. Combining software development with industrial engineering for comprehensive digital transformation solutions.`,
  tags: [
    'Electronics Design',
    'Hardware Development',
    'Operational Excellence',
    'Theory of Constraints',
    'Software Engineering',
    'Process Optimization',
    'AI/ML',
    'IIoT',
    'Industry 4.0',
  ],
  categories: [
    { title: 'Electronics', detail: 'Hardware Design & IoT' },
    { title: 'Operations', detail: 'Theory of Constraints' },
    { title: 'AI/ML', detail: 'Predictive Analytics' },
    { title: 'Manufacturing', detail: 'Industry 4.0 Solutions' },
    { title: 'Frontend', detail: 'React, Vue.js, TypeScript' },
    { title: 'Backend', detail: 'Node.js, Python, Java' },
    { title: 'Database', detail: 'MongoDB, PostgreSQL, MySQL' },
    { title: 'Cloud', detail: 'AWS, Azure, Docker' },
  ],
  resumeHref: asset('docs/Nachappa_PP_Resume_Aug26.pdf'),
  resumeLabel: 'Download Resume',
} as const

export const experience = [
  {
    id: 'ace',
    role: 'Engineer - Operational Excellence',
    company: 'Ace Designers Limited',
    period: 'Full-time',
    logo: asset('images/ADL_Logo.png'),
    summary:
      'Focused on process excellence and project management in manufacturing operations. Contributing to operational efficiency and continuous improvement initiatives.',
    tags: ['Process Excellence', 'Project Management', 'Operational Excellence'],
  },
  {
    id: 'cmti',
    role: 'Project Associate - 1',
    company: 'Central Manufacturing Technology Institute',
    period: 'May 2023 – Feb 2025 · 1 yr 10 mos',
    logo: asset('images/cmti.png'),
    summary:
      'Worked on Industry 4.0 and Smart Manufacturing technologies. Contributed to digital transformation strategies for MSMEs and manufacturing clusters. Coordinated IIoT, data analytics, and automation projects.',
    tags: ['Industry 4.0', 'IIoT', 'Smart Manufacturing'],
  },
  {
    id: 'cognizant',
    role: 'Artificial Intelligence and Analytics',
    company: 'Cognizant',
    period: 'Jan 2023 – May 2023 · 5 mos',
    logo: asset('images/cognizant.png'),
    summary:
      'Contributed to enterprise-level AI and analytics initiatives. Collaborated with cross-functional teams to design scalable, data-driven solutions. Automated reporting workflows and supported AI strategy execution.',
    tags: ['AI/ML', 'Data Analytics', 'Digital Transformation'],
  },
  {
    id: 'bhel',
    role: 'Research And Development Intern',
    company: 'Bharat Heavy Electricals Limited',
    period: 'Apr 2021 – Aug 2021 · 5 mos',
    logo: asset('images/BHEL.png'),
    summary:
      'Worked in the Solar Business division on solar cell technology innovation. Gained hands-on experience in fabrication and characterization of solar PV cells. Assisted in material analysis and performance evaluation.',
    tags: ['Solar Technology', 'R&D', 'Renewable Energy'],
  },
] as const

export type Project = {
  id: string
  title: string
  summary: string
  description: string
  stack: string[]
  accent: string
}

export const projects: Project[] = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    summary: 'Full-stack e-commerce solution with React & Node.js',
    description:
      'A full-stack commerce experience with catalog browsing, cart flows, and order management. Built as a showcase of modern React UI patterns paired with a Node.js API and MongoDB persistence.',
    stack: ['React', 'Node.js', 'MongoDB'],
    accent: '#c9a66b',
  },
  {
    id: 'task-app',
    title: 'Task Management App',
    summary: 'Cross-platform mobile app for team collaboration',
    description:
      'A cross-platform collaboration app for teams to track tasks, assign owners, and sync progress in real time using React Native and Firebase.',
    stack: ['React Native', 'Firebase'],
    accent: '#8a9bb5',
  },
  {
    id: 'analytics',
    title: 'Analytics Dashboard',
    summary: 'Real-time data visualization and reporting system',
    description:
      'A real-time analytics dashboard for manufacturing and operations KPIs — charts, filters, and exportable reports powered by Vue.js, Python services, and PostgreSQL.',
    stack: ['Vue.js', 'Python', 'PostgreSQL'],
    accent: '#a8c5a0',
  },
]

export const publications = [
  {
    id: 'gdt-yolo',
    title:
      'Intelligent GD&T symbol detection in mechanical drawings: a comparative study of YOLOv11, Faster R-CNN, and RetinaNet for quality assurance',
    authors:
      'Tadigotla Narendra Reddy, Nitesh Kumar, Nachappa Pemmanda Ponnappa, Nagasiri Mohana, Prakash Vinod, Mervin A. Herbert, Shrikantha S. Rao',
    venue: 'Journal of Intelligent Manufacturing (2025)',
    summary:
      'Comparative analysis of three state-of-the-art deep learning models for automated GD&T symbol detection in CAD engineering drawings — addressing cost-effective indigenous solutions for SMEs and MSMEs, with YOLOv11 offering the best accuracy / real-time balance.',
    href: 'https://link.springer.com/article/10.1007/s10845-025-02669-3',
    cta: 'View Publication',
  },
  {
    id: 'oee-opcua',
    title:
      'Overall equipment efficiency module and losses using machine-to-machine connectivity for smart factory',
    authors:
      'Tadigotla Narendra Reddy, Nachappa Pemmanda Ponnappa, Prakash Vinod, Mervin A. Herbert, Shrikantha S. Rao',
    venue: 'ISSS Journal of Micro and Smart Systems, Volume 14, pages 87–99 (2025)',
    summary:
      'Implements Overall Equipment Effectiveness (OEE) using OPC UA in smart manufacturing — combining CNC machine data with plant schedules for real-time OEE and loss identification, deployable on-premises or in the cloud.',
    href: 'https://link.springer.com/article/10.1007/s41683-025-00134-0',
    cta: 'View Publication',
  },
  {
    id: 'iiot-msme',
    title:
      'Development of Low-Cost IIoT Solution for Smart Factories in MSME Industries: Utilizing Current Measurements for Machine and Factory Monitoring',
    authors:
      'T. Narendra Reddy, Shri Prakash Vinod, P. P. Nachappa, Mervin A. Herbert, Shrikantha S. Rao',
    venue:
      'Industry 4.0 and Advanced Manufacturing (I-4AM 2024), Lecture Notes in Mechanical Engineering',
    summary:
      'Affordable IIoT productivity monitoring for MSMEs — cost-effective sensing hardware, controller-based acquisition/analysis, and an edge gateway for cloud storage with Email/SMS automated reporting.',
    href: 'https://link.springer.com/chapter/10.1007/978-981-97-6176-0_3',
    cta: 'View Chapter',
  },
  {
    id: 'welding-i40',
    title:
      'An Industry 4.0 Approach: Data Acquisition and Machine Monitoring for Welding Machines',
    authors:
      'T. Narendra Reddy, Nachappa Pemmanda Ponnappa, P. Prasad, Prakash Vinod, Mervin A. Herbert, Shrikantha S. Rao',
    venue:
      'Smart Materials and Manufacturing Technologies for Sustainable Development (SME 2023)',
    summary:
      'IIoT-based performance monitoring for welding machines — including legacy equipment — delivering real-time shop-floor updates via OT/IT integration with hall-effect sensors, voltage transducers, and PLCs.',
    href: 'https://link.springer.com/chapter/10.1007/978-3-031-63909-8_6',
    cta: 'View Chapter',
  },
] as const

export const contact = {
  heading: "Let's Connect",
  body: "I'm always interested in new opportunities and exciting projects. Let's discuss how we can work together.",
  email: 'nikinachappa57@gmail.com',
  phone: '+91 9108330616',
  location: 'Bangalore, India',
} as const

export const footer = {
  copy: '© 2025 Nachappa PP. All rights reserved.',
} as const
