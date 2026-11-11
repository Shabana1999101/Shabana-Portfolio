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
  { label: 'Resume', path: '/resume' },
]

export const experiences: Experience[] = [
  {
    company: 'Gap Inc',
    slug: 'gap-inc',
    role: 'Technical Program Manager',
    period: '2024 — Present',
    logo: '/IMAGES/Gap-logo.png',
    summary: 'I lead enterprise programs and manage delivery governance, strategic partnerships, and global operating transitions.',
    highlights: [
      'I manage delivery programs across an ecosystem of 1,200+ resources.',
      'I own an $8M+ monthly P&L and lead its financial governance cadence.',
      'I have led two strategic service providers and strengthened vendor governance.',
      'I built SLA and KPI governance frameworks and led enterprise risk management.',
      'I supported the transition of Global Business Solutions from the US to India.',
      'I received a CEO Stock Award for my contribution and impact.',
    ],
    tools: ['Jira', 'Confluence', 'ServiceNow', 'SAP', 'Anaplan'],
    accent: 'lime',
    story: {
      theme: 'apparel',
      industry: 'Apparel · Retail · Global operations',
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=1800&q=85',
      imageAlt: 'Apparel retail environment with clothing displays',
      headline: 'How I bring financial discipline to a global retail engine.',
      introduction: 'At Gap Inc, I connect financial stewardship, partner performance, and global delivery operations to keep enterprise programs aligned with business priorities.',
      facts: [
        { value: '$8M+', label: 'Monthly P&L', detail: 'Financial ownership and governance' },
        { value: '1,200+', label: 'Resources', detail: 'Enterprise delivery ecosystem' },
        { value: '02', label: 'Strategic providers', detail: 'Vendor and service governance' },
      ],
      pillars: [
        { title: 'Financial stewardship', description: 'I bring visibility and ownership to monthly financial performance across a high-value delivery portfolio.' },
        { title: 'Partner accountability', description: 'I build SLA and KPI governance with two strategic service providers to support reliable execution.' },
        { title: 'Global operations', description: 'I supported the transition of Global Business Solutions from the United States to India.' },
      ],
    },
  },
  {
    company: 'HSBC',
    slug: 'hsbc',
    role: 'Project Manager',
    period: '2023 — 2024',
    logo: '/IMAGES/hsbc-logo.jpg',
    summary: 'I coordinated cross-functional delivery in a complex, highly governed financial services environment.',
    highlights: ['I planned projects and coordinated delivery', 'I managed stakeholders and dependencies', 'I used risk, issue, and governance practices'],
    tools: ['Jira', 'Confluence', 'MS Project', 'ServiceNow'],
    accent: 'red',
    story: {
      theme: 'banking',
      industry: 'Banking · Financial services',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85',
      imageAlt: 'Modern financial district towers',
      headline: 'How I deliver projects in a high-governance environment.',
      introduction: 'As Project Manager, I coordinated stakeholders and dependencies in a complex financial services setting, creating clear plans and steady delivery visibility.',
      facts: [
        { value: 'Plan', label: 'Project delivery', detail: 'Planning and coordinated execution' },
        { value: 'Align', label: 'Stakeholders', detail: 'Cross-functional coordination' },
        { value: 'Steer', label: 'Risk & dependencies', detail: 'Issues, risks, and governance practices' },
      ],
      pillars: [
        { title: 'Structured planning', description: 'I coordinated scope, milestones, and delivery so teams could work from a shared plan.' },
        { title: 'Stakeholder alignment', description: 'I connected contributors and decision-makers across dependencies and project priorities.' },
        { title: 'Governance awareness', description: 'I kept risk, issues, and delivery status visible in a highly governed financial services environment.' },
      ],
    },
  },
  {
    company: 'ZENQ',
    slug: 'zenq',
    role: 'Project Lead',
    period: '2021 — 2023',
    logo: '/IMAGES/genq-logo.jpg',
    summary: 'I led project teams through delivery planning, execution, and stakeholder alignment.',
    highlights: ['I coordinated delivery plans and milestones', 'I aligned teams, stakeholders, and dependencies', 'I maintained delivery visibility and execution discipline'],
    tools: ['Jira', 'Confluence', 'MS Project'],
    accent: 'cyan',
    story: {
      theme: 'technology',
      industry: 'Technology · Project delivery',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85',
      imageAlt: 'Contemporary collaborative project workspace',
      headline: 'How I turn project plans into coordinated team delivery.',
      introduction: 'At ZENQ, I led project teams through planning, execution, and stakeholder alignment, maintaining clear milestones and a steady operating rhythm.',
      facts: [
        { value: 'Plan', label: 'Milestones', detail: 'Coordinated delivery plans' },
        { value: 'Connect', label: 'Teams', detail: 'Stakeholders and dependencies' },
        { value: 'Deliver', label: 'Execution', detail: 'Progress visibility and follow-through' },
      ],
      pillars: [
        { title: 'Milestone clarity', description: 'I translated project goals into delivery plans teams could understand and use.' },
        { title: 'Connected execution', description: 'I aligned stakeholders and dependencies to keep work moving across teams.' },
        { title: 'Visible progress', description: 'I maintained delivery visibility and consistent execution discipline.' },
      ],
    },
  },
  {
    company: 'Wipro',
    slug: 'wipro',
    role: 'Senior PMO Analyst',
    period: '2015 — 2021',
    logo: '/IMAGES/wipro-logo.png',
    summary: 'I built a strong foundation in portfolio reporting, program governance, and enterprise operations.',
    highlights: ['I supported PMO governance and portfolio reporting', 'I supported financial and resource planning', 'I prepared executive-ready status and risk updates'],
    tools: ['MS Project', 'SAP', 'Oracle', 'Salesforce'],
    accent: 'blue',
    story: {
      theme: 'enterprise',
      industry: 'Technology services · PMO',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85',
      imageAlt: 'Close view of technology hardware and circuit components',
      headline: 'How I make delivery easier to steer through portfolio reporting.',
      introduction: 'During my six years at Wipro, I built deep PMO experience in governance, portfolio reporting, financial and resource planning, and executive-ready visibility.',
      facts: [
        { value: '6 yrs', label: 'PMO experience', detail: '2015–2021' },
        { value: 'Portfolio', label: 'Governance', detail: 'Structured reporting and controls' },
        { value: 'Executive', label: 'Visibility', detail: 'Status, financial, and risk insights' },
      ],
      pillars: [
        { title: 'Portfolio reporting', description: 'I shaped clear reports to help leaders understand status, progress, and emerging concerns.' },
        { title: 'Financial & resource planning', description: 'I supported financial and resource planning across enterprise programs.' },
        { title: 'Governance foundation', description: 'I strengthened the practices that made large delivery portfolios visible.' },
      ],
    },
  },
  {
    company: 'NECX Private Limited',
    slug: 'necx',
    role: 'Operations Executive',
    period: '2012 — 2015',
    logo: '/IMAGES/NECX-LOGO.jpg',
    summary: 'I developed a hands-on foundation in operational coordination and service delivery.',
    highlights: ['I coordinated and executed operational work', 'I supported service delivery with disciplined processes', 'I communicated across teams'],
    tools: ['Microsoft Office', 'Operations'],
    accent: 'amber',
    story: {
      theme: 'operations',
      industry: 'Business operations · Service delivery',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=85',
      imageAlt: 'Organized warehouse operations and logistics space',
      headline: 'How I built the operational foundations of dependable delivery.',
      introduction: 'My early operations experience at NECX gave me a practical foundation in coordination, service support, process discipline, and cross-team communication.',
      facts: [
        { value: '3 yrs', label: 'Operations experience', detail: '2012–2015' },
        { value: 'Service', label: 'Delivery support', detail: 'Consistent operational coordination' },
        { value: 'Process', label: 'Discipline', detail: 'Reliable execution practices' },
      ],
      pillars: [
        { title: 'Operational coordination', description: 'I supported day-to-day execution by keeping activities and people connected.' },
        { title: 'Service mindset', description: 'I built practical habits around support, communication, and dependable follow-through.' },
        { title: 'Process discipline', description: 'I established organized work practices that I carried into program leadership.' },
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
    description: 'I bring visibility, accountability, and disciplined governance to financial stewardship.',
  },
  {
    number: '02',
    title: 'Enterprise scale',
    value: '1,200+',
    unit: 'resources',
    description: 'I coordinate delivery programs across a broad, multi-team operating ecosystem.',
  },
  {
    number: '03',
    title: 'Strategic partnerships',
    value: '02',
    unit: 'service providers',
    description: 'I strengthen partner accountability through SLA, KPI, and vendor governance frameworks.',
  },
  {
    number: '04',
    title: 'Global transformation',
    value: 'US → India',
    unit: 'operations transition',
    description: 'I helped enable the Global Business Solutions transition from the United States to India.',
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
  resumeUrl: 'https://drive.google.com/file/d/1IxDJDvUzrklBFcp6CLGJ2bnOJkIPDkkk/view?usp=drive_link',
  portrait: '/IMAGES/shabana-about-page.png',
  aboutPortrait: '/IMAGES/updated about page pic.png',
}