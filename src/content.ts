export type Experience = {
  company: string
  slug: string
  role: string
  period: string
  logo: string
  summary: string
  highlights: string[]
  tools: string[]
  accent: string
  story: {
    theme: 'apparel' | 'banking' | 'technology' | 'enterprise' | 'operations'
    industry: string
    image: string
    imageAlt: string
    headline: string
    introduction: string
    facts: { value: string; label: string; detail: string }[]
    pillars: { title: string; description: string }[]
  }
}

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Experience', path: '/experience' },
  { label: 'Leadership', path: '/leadership' },
  { label: 'Skills', path: '/skills' },
]

export const experiences: Experience[] = [
  {
    company: 'Gap Inc',
    slug: 'gap-inc',
    role: 'Technical Program Manager',
    period: '2024 — Present',
    logo: '/IMAGES/Gap-logo.png',
    summary: 'Leading enterprise programs, delivery governance, strategic partnerships, and global operating transitions.',
    highlights: [
      'Managed delivery programs across an ecosystem of 1,200+ resources.',
      'Owned an $8M+ monthly P&L and financial governance cadence.',
      'Led two strategic service providers and strengthened vendor governance.',
      'Built SLA and KPI governance frameworks; led enterprise risk management.',
      'Supported the transition of Global Business Solutions from the US to India.',
      'Recognized as a CEO Stock Award recipient.',
    ],
    tools: ['Jira', 'Confluence', 'ServiceNow', 'SAP', 'Anaplan'],
    accent: 'lime',
    story: {
      theme: 'apparel',
      industry: 'Apparel · Retail · Global operations',
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=1800&q=85',
      imageAlt: 'Apparel retail environment with clothing displays',
      headline: 'Financial discipline behind a global retail engine.',
      introduction: 'At Gap Inc, Shabana connects financial stewardship, partner performance, and global delivery operations to keep enterprise programs aligned with business priorities.',
      facts: [
        { value: '$8M+', label: 'Monthly P&L', detail: 'Financial ownership and governance' },
        { value: '1,200+', label: 'Resources', detail: 'Enterprise delivery ecosystem' },
        { value: '02', label: 'Strategic providers', detail: 'Vendor and service governance' },
      ],
      pillars: [
        { title: 'Financial stewardship', description: 'Bring visibility and ownership to monthly financial performance across a high-value delivery portfolio.' },
        { title: 'Partner accountability', description: 'Build SLA and KPI governance with two strategic service providers to support reliable execution.' },
        { title: 'Global operations', description: 'Support the transition of Global Business Solutions from the United States to India.' },
      ],
    },
  },
  {
    company: 'HSBC',
    slug: 'hsbc',
    role: 'Project Manager',
    period: '2023 — 2024',
    logo: '/IMAGES/hsbc-logo.jpg',
    summary: 'Coordinated cross-functional delivery in a complex, highly governed financial services environment.',
    highlights: ['Project planning and delivery coordination', 'Stakeholder and dependency management', 'Risk, issue, and governance practices'],
    tools: ['Jira', 'Confluence', 'MS Project', 'ServiceNow'],
    accent: 'red',
    story: {
      theme: 'banking',
      industry: 'Banking · Financial services',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85',
      imageAlt: 'Modern financial district towers',
      headline: 'Project delivery built for a high-governance environment.',
      introduction: 'As Project Manager, Shabana coordinated work across stakeholders and dependencies in a complex financial services setting, bringing clear plans and steady delivery visibility.',
      facts: [
        { value: 'Plan', label: 'Project delivery', detail: 'Planning and coordinated execution' },
        { value: 'Align', label: 'Stakeholders', detail: 'Cross-functional coordination' },
        { value: 'Steer', label: 'Risk & dependencies', detail: 'Issues, risks, and governance practices' },
      ],
      pillars: [
        { title: 'Structured planning', description: 'Coordinate scope, milestones, and delivery activity so teams can work from a shared plan.' },
        { title: 'Stakeholder alignment', description: 'Connect contributors and decision-makers across dependencies and project priorities.' },
        { title: 'Governance awareness', description: 'Keep risk, issues, and delivery status visible in a highly governed financial services environment.' },
      ],
    },
  },
  {
    company: 'ZENQ',
    slug: 'zenq',
    role: 'Project Lead',
    period: '2021 — 2023',
    logo: '/IMAGES/genq-logo.jpg',
    summary: 'Led project teams through delivery planning, execution, and stakeholder alignment.',
    highlights: ['Coordinated delivery plans and milestones', 'Aligned teams, stakeholders, and dependencies', 'Maintained delivery visibility and execution discipline'],
    tools: ['Jira', 'Confluence', 'MS Project'],
    accent: 'cyan',
    story: {
      theme: 'technology',
      industry: 'Technology · Project delivery',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85',
      imageAlt: 'Contemporary collaborative project workspace',
      headline: 'Turning project plans into coordinated team delivery.',
      introduction: 'At ZENQ, Shabana led project teams through delivery planning, execution, and stakeholder alignment, maintaining clear milestones and an operating rhythm.',
      facts: [
        { value: 'Plan', label: 'Milestones', detail: 'Coordinated delivery plans' },
        { value: 'Connect', label: 'Teams', detail: 'Stakeholders and dependencies' },
        { value: 'Deliver', label: 'Execution', detail: 'Progress visibility and follow-through' },
      ],
      pillars: [
        { title: 'Milestone clarity', description: 'Translate project goals into delivery plans teams can understand and use.' },
        { title: 'Connected execution', description: 'Align stakeholders and dependencies to keep work moving across teams.' },
        { title: 'Visible progress', description: 'Maintain delivery visibility and consistent execution discipline.' },
      ],
    },
  },
  {
    company: 'Wipro',
    slug: 'wipro',
    role: 'Senior PMO Analyst',
    period: '2015 — 2021',
    logo: '/IMAGES/wipro-logo.png',
    summary: 'Built a strong foundation in portfolio reporting, program governance, and enterprise operations.',
    highlights: ['PMO governance and portfolio reporting', 'Financial and resource planning support', 'Executive-ready status and risk visibility'],
    tools: ['MS Project', 'SAP', 'Oracle', 'Salesforce'],
    accent: 'blue',
    story: {
      theme: 'enterprise',
      industry: 'Technology services · PMO',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85',
      imageAlt: 'Close view of technology hardware and circuit components',
      headline: 'A portfolio view that makes delivery easier to steer.',
      introduction: 'Across six years at Wipro, Shabana built deep PMO experience in governance, portfolio reporting, financial and resource planning, and executive-ready visibility.',
      facts: [
        { value: '6 yrs', label: 'PMO experience', detail: '2015–2021' },
        { value: 'Portfolio', label: 'Governance', detail: 'Structured reporting and controls' },
        { value: 'Executive', label: 'Visibility', detail: 'Status, financial, and risk insights' },
      ],
      pillars: [
        { title: 'Portfolio reporting', description: 'Shape clear reporting that helps leaders understand status, progress, and emerging concerns.' },
        { title: 'Financial & resource planning', description: 'Support planning across financial and resource dimensions of enterprise programs.' },
        { title: 'Governance foundation', description: 'Strengthen the operating practices that make large delivery portfolios visible.' },
      ],
    },
  },
  {
    company: 'NECX Private Limited',
    slug: 'necx',
    role: 'Operations Executive',
    period: '2012 — 2015',
    logo: '/IMAGES/NECX-LOGO.jpg',
    summary: 'Developed a hands-on foundation in operational coordination and service delivery.',
    highlights: ['Operational coordination and execution', 'Process discipline and service support', 'Cross-team communication'],
    tools: ['Microsoft Office', 'Operations'],
    accent: 'amber',
    story: {
      theme: 'operations',
      industry: 'Business operations · Service delivery',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=85',
      imageAlt: 'Organized warehouse operations and logistics space',
      headline: 'The operational foundations of dependable delivery.',
      introduction: 'Shabana’s early operations experience at NECX developed a practical foundation in coordination, service support, process discipline, and cross-team communication.',
      facts: [
        { value: '3 yrs', label: 'Operations experience', detail: '2012–2015' },
        { value: 'Service', label: 'Delivery support', detail: 'Consistent operational coordination' },
        { value: 'Process', label: 'Discipline', detail: 'Reliable execution practices' },
      ],
      pillars: [
        { title: 'Operational coordination', description: 'Support day-to-day execution by keeping activities and people connected.' },
        { title: 'Service mindset', description: 'Build practical habits around support, communication, and dependable follow-through.' },
        { title: 'Process discipline', description: 'Establish a foundation of organized work that carries into later program leadership.' },
      ],
    },
  },
]

export const metrics = [
  { value: '14+', label: 'Years of experience', detail: 'Program and operations leadership' },
  { value: '1,200+', label: 'Resources managed', detail: 'Enterprise delivery ecosystem' },
  { value: '$8M+', label: 'Monthly P&L', detail: 'Financial ownership and governance' },
  { value: '2', label: 'Strategic providers', detail: 'Partner and vendor governance' },
  { value: '5', label: 'Organizations', detail: 'Across a progressive career' },
  { value: 'CEO', label: 'Stock Award', detail: 'Recognition for impact' },
]

export const impactAreas = [
  {
    number: '01',
    title: 'Financial leadership',
    value: '$8M+',
    unit: 'monthly P&L',
    description: 'Financial stewardship grounded in visibility, accountability, and disciplined governance.',
  },
  {
    number: '02',
    title: 'Enterprise scale',
    value: '1,200+',
    unit: 'resources',
    description: 'Delivery programs coordinated across a broad, multi-team operating ecosystem.',
  },
  {
    number: '03',
    title: 'Strategic partnerships',
    value: '02',
    unit: 'service providers',
    description: 'Partner accountability supported by SLA, KPI, and vendor governance frameworks.',
  },
  {
    number: '04',
    title: 'Global transformation',
    value: 'US → India',
    unit: 'operations transition',
    description: 'Enabled the Global Business Solutions transition from the United States to India.',
  },
]

export const skillGroups = [
  {
    title: 'Program & portfolio',
    number: '01',
    skills: ['Program Management', 'Portfolio Management', 'Delivery Management', 'Resource Planning'],
  },
  {
    title: 'Governance & finance',
    number: '02',
    skills: ['Financial Governance', 'P&L Management', 'Vendor Governance', 'Contract Lifecycle Management', 'Risk Management'],
  },
  {
    title: 'Leadership & transformation',
    number: '03',
    skills: ['Stakeholder Management', 'Team Leadership', 'Business Transformation', 'Operational Excellence'],
  },
  {
    title: 'Delivery methods',
    number: '04',
    skills: ['Agile', 'Waterfall', 'SLA / KPI Governance', 'Enterprise Delivery'],
  },
]

export const tools = [
  'Microsoft Copilot', 'Claude', 'Jira', 'Confluence', 'MS Project', 'ServiceNow',
  'SAP', 'Oracle', 'Salesforce', 'Anaplan', 'Sirion',
]

export const profile = {
  name: 'Shabana Ajmin',
  role: 'Technical Program Manager',
  company: 'Gap Inc',
  location: 'Hyderabad, India',
  email: 'shaikajmin7@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/shabana-ajmin-9907a413b',
  portrait: '/IMAGES/shabana-about-page.png',
  aboutPortrait: '/IMAGES/updated about page pic.png',
}