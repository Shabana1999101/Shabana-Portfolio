import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Lenis from 'lenis'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ExternalLink,
  Globe2,
  Layers3,
  Mail,
  Menu,
  Network,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'
import { experiences, impactAreas, metrics, navigation, profile, skillGroups, tools, type Experience } from './content'

gsap.registerPlugin(ScrollTrigger)

const AmbientScene = lazy(() => import('./AmbientScene'))

const transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }
const heroStatement = 'I lead enterprise programs, build strategic partnerships, and deliver excellence at global scale.'
type PortfolioTheme = 'morning' | 'afternoon' | 'night'

const themeOptions = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'night', label: 'Night' },
] as const

/** Draws the animated illustration for the selected time-of-day theme. */
function ThemeSceneIcon({ theme }: { theme: PortfolioTheme }) {
  return (
    <span aria-hidden="true" className={`theme-icon-scene theme-icon-scene-${theme}`}>
      {theme === 'morning' && <svg viewBox="0 0 40 40">
        <defs><radialGradient id="morning-sun-fill"><stop stopColor="#fff8d8" /><stop offset=".7" stopColor="#ffd36e" /><stop offset="1" stopColor="#f3a83c" /></radialGradient></defs>
        <circle className="morning-sunlight" cx="20" cy="25" r="15" />
        <g className="morning-rays"><path d="M20 3v4M10 7l2.4 3.1M30 7l-2.4 3.1M5 16l4 .8M35 16l-4 .8" /></g>
        <circle className="morning-sun" cx="20" cy="25" r="8" fill="url(#morning-sun-fill)" />
        <path className="morning-cloud" d="M5.5 29.5h29c0-2.8-2.1-4.8-4.8-4.8-.9-3.1-3.6-5.2-6.9-5.2-1.6 0-3 .5-4.2 1.4-3.6-1.3-7.3.8-8.2 4.1-2.8.1-4.9 1.9-4.9 4.5Z" />
        <path className="morning-horizon" d="M3.5 33h33" />
      </svg>}
      {theme === 'afternoon' && <svg viewBox="0 0 40 40">
        <defs><radialGradient id="afternoon-sun-fill"><stop stopColor="#fff9e8" /><stop offset=".58" stopColor="#ffd66f" /><stop offset="1" stopColor="#ed9e3a" /></radialGradient></defs>
        <circle className="afternoon-halo" cx="20" cy="20" r="16" />
        <g className="afternoon-rays"><path d="M20 2.5v5M20 32.5v5M2.5 20h5M32.5 20h5M7.6 7.6l3.5 3.5M28.9 28.9l3.5 3.5M32.4 7.6l-3.5 3.5M11.1 28.9l-3.5 3.5" /></g>
        <circle className="afternoon-sun" cx="20" cy="20" r="8.5" fill="url(#afternoon-sun-fill)" />
        <path className="afternoon-flare" d="M14 19c1.3-1 2.1-2.3 2.6-3.8M23 27c1.3-1.2 1.8-2.3 2.1-3.7" />
      </svg>}
      {theme === 'night' && <svg viewBox="0 0 40 40">
        <g className="night-stars"><path d="M7 8v5M4.5 10.5h5M31 7v4M29 9h4M8 29v4M6 31h4" /><circle cx="31" cy="28" r="1" /></g>
        <g className="moon-orbit">
          <circle className="moon-halo" cx="20" cy="20" r="15" />
          <defs><clipPath id="moon-disc-clip"><circle cx="20" cy="20" r="9" /></clipPath></defs>
          <g className="moon-rotation">
            <circle className="moon-disc" cx="20" cy="20" r="9" />
            <ellipse className="moon-crater" cx="16.5" cy="17" rx="1.4" ry="1.1" />
            <ellipse className="moon-crater" cx="23.5" cy="22.5" rx="1.7" ry="1.25" />
            <circle className="moon-crater" cx="22.5" cy="15.5" r=".75" />
          </g>
          <g clipPath="url(#moon-disc-clip)"><circle className="moon-shadow" cx="20" cy="20" r="9" /></g>
        </g>
      </svg>}
    </span>
  )
}

/** Renders primary navigation and controls for the responsive menu and theme. */
function SiteHeader({ theme, onThemeChange }: { theme: PortfolioTheme; onThemeChange: (theme: PortfolioTheme) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth > 720) setIsMenuOpen(false)
    }
    window.addEventListener('resize', closeMenuOnDesktop)
    return () => window.removeEventListener('resize', closeMenuOnDesktop)
  }, [])

  const nextTheme = themeOptions[(themeOptions.findIndex((option) => option.value === theme) + 1) % themeOptions.length]

  return (
    <header className="site-header">
      <Link aria-label="Shabana Ajmin home" className="wordmark" to="/">
        <span className="wordmark-mark">SA</span>
        <span>SHABANA AJMIN</span>
      </Link>
      <button
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        type="button"
      >
        {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
      </button>
      <nav aria-label="Main navigation" className={`main-nav${isMenuOpen ? ' is-open' : ''}`}>
        {navigation.map((item) => (
          <NavLink key={item.path} onClick={() => setIsMenuOpen(false)} to={item.path}>
            {item.label}
          </NavLink>
        ))}
        <NavLink className="nav-dashboard" onClick={() => setIsMenuOpen(false)} to="/dashboard">
          Dashboard <ArrowUpRight size={13} />
        </NavLink>
      </nav>
      <motion.button aria-label={`Switch to ${nextTheme.label} theme`} className={`theme-toggle theme-toggle-${theme}`} onClick={() => onThemeChange(nextTheme.value)} title={`Switch to ${nextTheme.label} theme`} type="button" whileTap={{ scale: .88, rotate: -12 }}>
        <AnimatePresence initial={false} mode="wait">
          <motion.span animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }} aria-hidden="true" className="theme-icon-stage" exit={{ opacity: 0, rotate: 50, scale: .62, y: -7 }} initial={{ opacity: 0, rotate: -50, scale: .62, y: 7 }} key={theme} transition={{ duration: .42, ease: [0.2, 0.8, 0.2, 1] }}>
            <ThemeSceneIcon theme={theme} />
          </motion.span>
        </AnimatePresence>
      </motion.button>
      <Link className="header-contact" to="/contact">Let&apos;s connect <ArrowUpRight size={14} /></Link>
    </header>
  )
}

/** Provides shared identity, location, and secondary navigation links. */
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link aria-label="Shabana Ajmin home" className="wordmark" to="/">
          <span className="wordmark-mark">SA</span><span>SHABANA AJMIN</span>
        </Link>
        <p>I lead programs that move business forward.</p>
        <a className="footer-linkedin" href={profile.linkedIn} rel="noreferrer" target="_blank">
          LinkedIn <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>Hyderabad, India <span className="status-dot" /> I&apos;m available for meaningful conversations</span>
        <nav aria-label="Footer navigation">
          {[...navigation, { label: 'Contact', path: '/contact' }].map((item) => (
            <Link key={item.path} to={item.path}>{item.label}</Link>
          ))}
        </nav>
        <span>© {new Date().getFullYear()} Shabana Ajmin</span>
      </div>
    </footer>
  )
}

/** Wraps routed pages with shared navigation, transitions, and scroll effects. */
function SiteShell({ theme, onThemeChange }: { theme: PortfolioTheme; onThemeChange: (theme: PortfolioTheme) => void }) {
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const contentRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const scrollScale = useSpring(scrollYProgress, { stiffness: 100, damping: 24, restDelta: 0.001 })

  useEffect(() => {
    if (reducedMotion) return
    const lenis = new Lenis({ autoRaf: false, lerp: .1, smoothWheel: true })
    const updateScrollTrigger = () => ScrollTrigger.update()
    const updateLenis = (time: number) => lenis.raf(time * 1000)
    lenis.on('scroll', updateScrollTrigger)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.off('scroll', updateScrollTrigger)
      lenis.destroy()
    }
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion || !contentRef.current) return
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-gsap]').forEach((element, index) => {
        gsap.fromTo(element, { y: 54, opacity: 0, scale: .96, rotateX: index % 2 ? 5 : -5, transformPerspective: 1100 }, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.1,
          delay: (index % 4) * 0.08,
          ease: 'power4.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        })
      })
      const timelineProgress = contentRef.current?.querySelector<HTMLElement>('.timeline-progress')
      if (timelineProgress) {
        gsap.fromTo(timelineProgress, { scaleY: 0 }, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: timelineProgress.parentElement, start: 'top 72%', end: 'bottom 65%', scrub: .8 },
        })
      }
      const experienceRows = gsap.utils.toArray<HTMLElement>('.experience-row')
      if (experienceRows.length) {
        gsap.fromTo(experienceRows, { x: -24, rotateY: 3, opacity: .35 }, {
          x: 0,
          rotateY: 0,
          opacity: 1,
          stagger: .12,
          ease: 'none',
          scrollTrigger: { trigger: '.experience-timeline', start: 'top 78%', end: 'bottom 68%', scrub: .7 },
        })
      }
    }, contentRef)
    return () => context.revert()
  }, [location.pathname, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const cleanupHandlers: (() => void)[] = []

    // Use quickTo setters so pointer movement stays smooth without React rerenders.
    gsap.utils.toArray<HTMLElement>('.button, .header-contact').forEach((element) => {
      const moveX = gsap.quickTo(element, 'x', { duration: .32, ease: 'power3.out' })
      const moveY = gsap.quickTo(element, 'y', { duration: .32, ease: 'power3.out' })
      const onMove = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return
        const bounds = element.getBoundingClientRect()
        moveX(((event.clientX - bounds.left) / bounds.width - .5) * 9)
        moveY(((event.clientY - bounds.top) / bounds.height - .5) * 7)
      }
      const reset = () => { moveX(0); moveY(0) }
      element.addEventListener('pointermove', onMove)
      element.addEventListener('pointerleave', reset)
      cleanupHandlers.push(() => {
        element.removeEventListener('pointermove', onMove)
        element.removeEventListener('pointerleave', reset)
        gsap.set(element, { clearProps: 'x,y' })
      })
    })

    gsap.utils.toArray<HTMLElement>('.impact-card, .skill-group, .resume-sheet, .dashboard-kpi, .company-pillar, .company-mark').forEach((element) => {
      const tiltX = gsap.quickTo(element, 'rotationX', { duration: .45, ease: 'power3.out' })
      const tiltY = gsap.quickTo(element, 'rotationY', { duration: .45, ease: 'power3.out' })
      gsap.set(element, { transformPerspective: 900, transformOrigin: 'center center' })
      const onMove = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return
        const bounds = element.getBoundingClientRect()
        tiltX(-((event.clientY - bounds.top) / bounds.height - .5) * 5)
        tiltY(((event.clientX - bounds.left) / bounds.width - .5) * 6)
      }
      const reset = () => { tiltX(0); tiltY(0) }
      element.addEventListener('pointermove', onMove)
      element.addEventListener('pointerleave', reset)
      cleanupHandlers.push(() => {
        element.removeEventListener('pointermove', onMove)
        element.removeEventListener('pointerleave', reset)
        gsap.set(element, { clearProps: 'rotationX,rotationY,transformPerspective' })
      })
    })

    return () => cleanupHandlers.forEach((cleanup) => cleanup())
  }, [location.pathname, reducedMotion])

  return (
    <div className="app-frame" data-theme={theme} onPointerMove={(event) => {
      if (event.pointerType === 'touch') return
      const bounds = event.currentTarget.getBoundingClientRect()
      pointerRef.current.x = ((event.clientX - bounds.left) / bounds.width - .5) * 2
      pointerRef.current.y = -((event.clientY - bounds.top) / bounds.height - .5) * 2
      event.currentTarget.style.setProperty('--pointer-x', `${event.clientX}px`)
      event.currentTarget.style.setProperty('--pointer-y', `${event.clientY}px`)
    }}>
      <div aria-hidden="true" className="ambient-grid" />
      <div aria-hidden="true" className="theme-morning-sky" />
      <div aria-hidden="true" className="theme-night-stars" />
      <div aria-hidden="true" className="pointer-glow" />
      <div aria-hidden="true" className="cursor-trail" />
      <Suspense fallback={null}>
        <AmbientScene pointerRef={pointerRef} reducedMotion={Boolean(reducedMotion)} theme={theme} />
      </Suspense>
      <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX: scrollScale }} />
      <SiteHeader onThemeChange={onThemeChange} theme={theme} />
      <div ref={contentRef}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="page-shell"
            exit={{ opacity: 0, y: -22, scale: .985 }}
            initial={{ opacity: 0, y: 26, scale: .985 }}
            key={location.pathname}
            transition={transition}
          >
            <Routes location={location}>
              <Route element={<HomePage theme={theme} />} path="/" />
              <Route element={<AboutPage theme={theme} />} path="/about" />
              <Route element={<ExperiencePage />} path="/experience" />
              <Route element={<CompanyStoryPage />} path="/experience/:slug" />
              <Route element={<LeadershipPage />} path="/leadership" />
              <Route element={<SkillsPage />} path="/skills" />
              <Route element={<ResumePage />} path="/resume" />
              <Route element={<ContactPage />} path="/contact" />
              <Route element={<DashboardPage />} path="/dashboard" />
              <Route element={<NotFoundPage />} path="*" />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </div>
      <SiteFooter />
    </div>
  )
}

/** Displays the compact label used to introduce portfolio sections. */
function Eyebrow({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return <p className="eyebrow">{icon}<span>{children}</span></p>
}

/** Provides a consistent eyebrow, title, and optional summary for sections. */
function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className={`section-heading${light ? ' section-heading-light' : ''}`} data-gsap>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

/** Presents one animated portfolio metric with its label and context. */
function MetricBlock({ value, label, detail, index = 0 }: { value: string; label: string; detail: string; index?: number }) {
  return (
    <motion.article className="metric-block" initial={{ opacity: 0, y: 18 }} transition={{ ...transition, delay: index * 0.07 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}>
      <span className="metric-index">0{index + 1}</span>
      <strong>{value}</strong>
      <h3>{label}</h3>
      <p>{detail}</p>
    </motion.article>
  )
}

/** Introduces a route with its section label, heading, and summary. */
function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy: string }) {
  return (
    <section className="page-intro">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{copy}</p>
    </section>
  )
}

/** Renders the landing page, leadership snapshot, and current-theme portrait. */
function HomePage({ theme }: { theme: PortfolioTheme }) {
  return (
    <>
      <section className="hero section-wrap">
        <div aria-hidden="true" className="hero-orbit orbit-one" />
        <div aria-hidden="true" className="hero-orbit orbit-two" />
        <div className="hero-copy">
          <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} transition={{ ...transition, delay: 0.08 }}>
            <Eyebrow icon={<span className="status-dot" />}>I lead technical programs at {profile.company}</Eyebrow>
          </motion.div>
          <motion.h1 animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 26 }} transition={{ ...transition, delay: 0.16 }}>
            Shabana <span>Ajmin</span>
          </motion.h1>
          <p className="hero-statement">
            {heroStatement.split(' ').map((word, index) => <span className="hero-word" key={`${word}-${index}`} style={{ animationDelay: `${index * 90}ms` }}>{word}</span>)}
          </p>
          <motion.div className="hero-actions" animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} transition={{ ...transition, delay: 0.35 }}>
            <Link className="button button-primary" to="/experience">View journey <ArrowRight size={16} /></Link>
            <Link className="button button-quiet" to="/leadership">Leadership impact <ArrowDownRight size={16} /></Link>
          </motion.div>
          <div className="hero-meta">
            <span><span className="meta-label">CURRENTLY</span>{profile.company}</span>
            <span><span className="meta-label">BASED IN</span>{profile.location}</span>
            <span><span className="meta-label">EXPERIENCE</span>14+ years</span>
          </div>
        </div>
        <motion.div className="hero-portrait-wrap" animate={{ opacity: 1, scale: 1, y: 0 }} initial={{ opacity: 0, scale: 0.96, y: 24 }} transition={{ ...transition, delay: 0.18 }}>
          <div className="portrait-index">MY LEADERSHIP PROFILE</div>
          <div className="hero-portrait-frame">
            <img alt="Shabana Ajmin" className="hero-portrait" src={theme === 'afternoon' ? '/IMAGES/afternoon-home-page.png' : profile.portrait} />
            <div className="portrait-caption"><span>PROGRAMS WITH PURPOSE</span><span>HYDERABAD, IN</span></div>
          </div>
          <div className="portrait-note"><span className="note-line" />Building alignment<br />at every scale.</div>
        </motion.div>
        <a className="hero-scroll" href="#leadership-snapshot"><span>SCROLL TO EXPLORE</span><ChevronDown size={15} /></a>
      </section>

      <section className="snapshot-section section-wrap" id="leadership-snapshot">
        <div className="snapshot-header" data-gsap>
          <Eyebrow>Leadership at a glance</Eyebrow>
          <Link className="text-link" to="/leadership">Explore impact <ArrowUpRight size={14} /></Link>
        </div>
        <div className="metrics-grid">
          {metrics.map((metric, index) => <MetricBlock key={metric.label} {...metric} index={index} />)}
        </div>
      </section>

      <section className="home-story section-wrap">
        <div className="story-copy" data-gsap>
          <Eyebrow>How I lead</Eyebrow>
          <h2>Complexity becomes manageable when people share a clear direction.</h2>
          <p>From financial governance to global delivery transitions, I bring structure to ambiguity and connect strategic intent to dependable execution.</p>
          <Link className="text-link" to="/about">Read my approach <ArrowUpRight size={14} /></Link>
        </div>
        <div className="story-rail" data-gsap>
          <div className="rail-node"><span>01</span><div><strong>Align</strong><small>Strategy, stakeholders, outcomes</small></div></div>
          <div className="rail-node"><span>02</span><div><strong>Govern</strong><small>Risk, finance, partners, performance</small></div></div>
          <div className="rail-node"><span>03</span><div><strong>Deliver</strong><small>Momentum, accountability, impact</small></div></div>
        </div>
      </section>

      <section className="career-preview section-wrap">
        <div className="preview-heading" data-gsap><Eyebrow>Career journey</Eyebrow><h2>Built through delivery.<br /><span>Expanded through leadership.</span></h2></div>
        <div className="company-strip">
          {experiences.map((item, index) => <CompanyMark experience={item} index={index} key={item.company} />)}
        </div>
        <Link className="button button-outline" to="/experience">Explore experience <ArrowRight size={15} /></Link>
      </section>

      <ContactBand />
    </>
  )
}

/** Shows a compact company logo and dates in the career preview. */
function CompanyMark({ experience, index }: { experience: Experience; index: number }) {
  return (
    <div className="company-mark" data-gsap>
      <span className="company-mark-index">0{index + 1}</span>
      <img alt={`${experience.company} logo`} loading="lazy" src={experience.logo} />
      <span>{experience.period}</span>
    </div>
  )
}

/** Presents the executive biography, leadership approach, and career roadmap. */
function AboutPage({ theme }: { theme: PortfolioTheme }) {
  return (
    <>
      <PageIntro eyebrow="About me" title={<>Leadership grounded<br /><em>in delivery.</em></>} copy="I bring people, partners, and priorities together to move complex enterprise work forward with intention." />
      <section className="about-feature section-wrap">
        <div className="about-photo" data-gsap><img alt="Shabana Ajmin, Technical Program Manager" decoding="async" loading="eager" src={theme === 'afternoon' ? '/IMAGES/afternoon-about-page.png' : profile.aboutPortrait} /><span>HYDERABAD · INDIA</span></div>
        <div className="about-narrative" data-gsap>
          <Eyebrow>Executive bio</Eyebrow>
          <h2>Clarity is a leadership practice.</h2>
          <p className="lead-copy">I am a Technical Program Manager at Gap Inc with more than 14 years of experience across program execution, PMO, project leadership, and operations.</p>
          <p>My work sits at the intersection of strategy and delivery: shaping governance, building partnerships, managing financial and operational complexity, and creating the conditions for teams to deliver together.</p>
          <p>Across five enterprise organizations, my focus has stayed consistent: make priorities visible, surface risk early, and turn commitments into outcomes people can trust.</p>
          <div className="about-signoff"><span className="signature-mark">SA</span><span>SHABANA AJMIN<br /><small>PROGRAM LEADERSHIP</small></span></div>
        </div>
      </section>
      <section className="philosophy-section section-wrap">
        <SectionHeading eyebrow="Professional philosophy" title="Good governance creates room for better work." copy="I build practical ways of working around people, clear decisions, and consistent follow-through." />
        <div className="principle-grid">
          {[
            { number: '01', title: 'Make the outcome clear', copy: 'I connect day-to-day execution to business results so teams know what matters and why.' },
            { number: '02', title: 'Treat risk as information', copy: 'I surface emerging dependencies and issues early, then work with teams to resolve them.' },
            { number: '03', title: 'Build trust through cadence', copy: 'I use steady communication and transparent measures to make accountability useful.' },
          ].map((item) => <article className="principle" data-gsap key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}
        </div>
      </section>
      <section className="approach-section section-wrap">
        <div className="approach-intro" data-gsap><Eyebrow>Program management approach</Eyebrow><h2>From intent<br />to <em>operating rhythm.</em></h2></div>
        <div className="approach-steps">
          {[
            ['01', 'Frame', 'I define the outcome, scope, decision owners, and measures of success.'],
            ['02', 'Connect', 'I align teams and partners around dependencies, capacity, and milestones.'],
            ['03', 'Steer', 'I use governance and performance signals to manage risk and maintain momentum.'],
            ['04', 'Sustain', 'I establish ownership and operating practices that help changes last.'],
          ].map(([number, title, copy]) => <div className="approach-step" data-gsap key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}
        </div>
      </section>
      <section className="roadmap-section section-wrap">
        <SectionHeading eyebrow="Career roadmap" title="A progression of scope and perspective." />
        <CareerRoadmap />
      </section>
      <ContactBand />
    </>
  )
}

/** Lists roles in chronological order with their company and dates. */
function CareerRoadmap() {
  return <div className="roadmap-list">{experiences.map((item, index) => <div className="roadmap-row" data-gsap key={item.company}><span className="roadmap-dot">0{index + 1}</span><img alt="" loading="lazy" src={item.logo} /><div><strong>{item.role}</strong><span>{item.company}</span></div><time>{item.period}</time><ArrowUpRight aria-hidden="true" size={15} /></div>)}</div>
}

/** Lists career roles and links each one to its detailed company story. */
function ExperiencePage() {
  return (
    <>
      <PageIntro eyebrow="Experience" title={<>Five organizations.<br /><em>One through-line.</em></>} copy="I have taken on increasingly complex delivery, broader stakeholder ecosystems, and a steady focus on execution excellence." />
      <section className="experience-page section-wrap">
        <div className="timeline-intro"><span>2012 — PRESENT</span><span>SELECT A ROLE FOR DETAILS <ArrowDownRight size={14} /></span></div>
        <div className="experience-timeline">
          <div aria-hidden="true" className="timeline-progress" />
          {experiences.map((item, index) => <Link aria-label={`Explore ${item.company} experience`} className={`experience-row accent-${item.accent}`} key={item.company} to={`/experience/${item.slug}`}>
            <span className="timeline-marker">0{index + 1}</span>
            <span className="experience-logo"><img alt="" loading="lazy" src={item.logo} /></span>
            <span className="experience-main"><span className="experience-period">{item.period}</span><strong>{item.role}</strong><span className="experience-company">{item.company}</span><span className="experience-summary">{item.summary}</span></span>
            <span className="experience-open"><ArrowUpRight size={19} /></span>
          </Link>)}
        </div>
      </section>
      <ContactBand />
    </>
  )
}

/** Renders the selected role's company context, outcomes, and navigation. */
function CompanyStoryPage() {
  const { slug } = useParams()
  const reducedMotion = useReducedMotion()
  const experienceIndex = experiences.findIndex((item) => item.slug === slug)
  const experience = experiences[experienceIndex]

  if (!experience) return <NotFoundPage />

  const previousExperience = experiences[experienceIndex - 1]
  const nextExperience = experiences[experienceIndex + 1]

  return (
    <div className={`company-story-page company-theme-${experience.story.theme}`}>
      <section className="company-story-hero section-wrap">
        <div className="company-story-copy">
          <Link className="story-back-link" to="/experience"><ArrowDownRight size={15} /> Career journey</Link>
          <Eyebrow>{experience.company} · {experience.story.industry}</Eyebrow>
          <h1>{experience.story.headline}</h1>
          <p>{experience.story.introduction}</p>
          <div className="company-story-meta"><span>{experience.role}</span><span>{experience.period}</span></div>
        </div>
        <motion.div animate={{ opacity: 1, y: 0 }} className="company-story-art" initial={{ opacity: 0, y: 28 }} transition={{ ...transition, duration: 1 }}>
          <img alt={experience.story.imageAlt} className="company-story-image" loading="eager" onError={(event) => { event.currentTarget.style.opacity = '0' }} src={experience.story.image} />
          <div aria-hidden="true" className="company-art-wash" />
          <div aria-hidden="true" className="company-art-grid" />
          <motion.div animate={reducedMotion ? { y: 0 } : { y: [0, -9, 0] }} className="company-logo-float" transition={{ duration: 5, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}>
            <img alt={`${experience.company} logo`} src={experience.logo} />
            <span>{experience.story.industry}</span>
          </motion.div>
          <span className="company-art-index">PROGRAM STORY / 0{experienceIndex + 1}</span>
        </motion.div>
      </section>

      <section className="company-facts section-wrap">
        <div className="company-facts-heading" data-gsap><Eyebrow>Leadership in context</Eyebrow><h2>Work shaped by the business.</h2><p>{experience.summary}</p></div>
        <div className="company-facts-grid">
          {experience.story.facts.map((fact, index) => <motion.article className="company-fact" initial={{ opacity: 0, y: 24 }} key={fact.label} transition={{ ...transition, delay: index * 0.12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }}>
            <span>0{index + 1}</span><strong>{fact.value}</strong><h3>{fact.label}</h3><p>{fact.detail}</p>
          </motion.article>)}
        </div>
      </section>

      <section className="company-pillars section-wrap">
        <div className="company-pillars-heading" data-gsap><Eyebrow>Program leadership</Eyebrow><h2>How the work moves forward.</h2></div>
        <div className="company-pillar-list">
          {experience.story.pillars.map((pillar, index) => <article className="company-pillar" data-gsap key={pillar.title}>
            <span className="company-pillar-index">0{index + 1}</span><div><h3>{pillar.title}</h3><p>{pillar.description}</p></div><ArrowUpRight aria-hidden="true" size={17} />
          </article>)}
        </div>
      </section>

      <section className="company-tools section-wrap" data-gsap>
        <div><Eyebrow>Tools & platforms</Eyebrow><h2>Delivery infrastructure.</h2></div>
        <div className="company-tool-list">{experience.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
      </section>

      <nav aria-label="Company experience navigation" className="company-pagination section-wrap">
        <Link className="company-page-link" to={previousExperience ? `/experience/${previousExperience.slug}` : '/experience'}><span>PREVIOUS EXPERIENCE</span><strong>{previousExperience?.company ?? 'Career overview'}</strong></Link>
        <Link className="company-page-link company-page-link-next" to={nextExperience ? `/experience/${nextExperience.slug}` : '/experience'}><span>NEXT EXPERIENCE</span><strong>{nextExperience?.company ?? 'Career overview'} <ArrowRight size={16} /></strong></Link>
      </nav>
      <ContactBand />
    </div>
  )
}

/** Highlights portfolio outcomes, operating disciplines, and recognition. */
function LeadershipPage() {
  return (
    <>
      <PageIntro eyebrow="Leadership impact" title={<>Scale is a number.<br /><em>Impact is what it enables.</em></>} copy="I deliver enterprise outcomes through financial stewardship, partner performance, and global delivery." />
      <section className="impact-feature section-wrap">
        <div className="impact-banner" data-gsap>
          <div><Eyebrow icon={<Zap size={14} />}>Executive portfolio snapshot</Eyebrow><strong>$8M<span>+</span></strong><p>monthly P&amp;L managed</p></div>
          <div className="banner-rule" />
          <div className="banner-context"><span>FINANCIAL STEWARDSHIP</span><p>Visibility, governance, and ownership across a high-value delivery portfolio.</p></div>
          <span className="banner-index">01 — 04</span>
        </div>
        <div className="impact-grid">
          {impactAreas.map((item) => <article className="impact-card" data-gsap key={item.number}><span className="impact-number">{item.number}</span><div className="impact-card-top"><h2>{item.title}</h2><ArrowUpRight size={16} /></div><strong>{item.value}</strong><span className="impact-unit">{item.unit}</span><p>{item.description}</p></article>)}
        </div>
      </section>
      <section className="governance-section section-wrap">
        <div className="governance-copy" data-gsap><Eyebrow icon={<ShieldCheck size={14} />}>Operating discipline</Eyebrow><h2>Governance that makes performance visible.</h2><p>I use clear agreements and a shared view of progress to bring consistency to execution and decision-making.</p></div>
        <div className="governance-list">{[
          ['SLA', 'Service performance expectations'],
          ['KPI', 'Outcome and delivery visibility'],
          ['RISK', 'Enterprise risk management'],
          ['VENDOR', 'Strategic partner governance'],
        ].map(([label, copy], index) => <div className="governance-row" data-gsap key={label}><span>0{index + 1}</span><strong>{label}</strong><p>{copy}</p><Check size={15} /></div>)}</div>
      </section>
      <section className="recognition-section section-wrap" data-gsap>
        <div className="recognition-icon"><Award size={22} /></div>
        <div><Eyebrow>Recognition</Eyebrow><h2>CEO Stock Award recipient</h2><p>I received this recognition for my contribution and impact at Gap Inc.</p></div>
        <span className="recognition-year">GAP INC · CEO</span>
      </section>
      <ContactBand />
    </>
  )
}

/** Filters leadership capabilities and tools using the visitor's search. */
function SkillsPage() {
  const [search, setSearch] = useState('')
  const normalizedSearch = search.trim().toLowerCase()
  const visibleGroups = skillGroups.map((group) => ({ ...group, skills: group.skills.filter((skill) => skill.toLowerCase().includes(normalizedSearch)) })).filter((group) => group.skills.length > 0)
  const visibleTools = tools.filter((tool) => tool.toLowerCase().includes(normalizedSearch))

  return (
    <>
      <PageIntro eyebrow="Capabilities" title={<>A leadership toolkit<br /><em>built for delivery.</em></>} copy="I use enterprise program disciplines, governance capabilities, and technology to create alignment and momentum." />
      <section className="skills-page section-wrap">
        <label className="skills-search"><span>FILTER CAPABILITIES</span><input aria-label="Filter skills and tools" onChange={(event) => setSearch(event.target.value)} placeholder="Search capabilities or tools" value={search} /><span className="search-shortcut">⌕</span></label>
        <div className="skills-layout">
          <div className="skill-groups">{visibleGroups.map((group) => <article className="skill-group" data-gsap key={group.number}><div className="skill-group-heading"><span>{group.number}</span><h2>{group.title}</h2><span className="skill-count">{String(group.skills.length).padStart(2, '0')}</span></div><div className="skill-list">{group.skills.map((skill) => <span key={skill}>{skill}<ArrowUpRight size={13} /></span>)}</div></article>)}{visibleGroups.length === 0 && <p className="empty-state">No capability matches that search.</p>}</div>
          <aside className="tools-panel" data-gsap><div className="tools-panel-heading"><Layers3 size={17} /><span>TECHNOLOGY ECOSYSTEM</span></div><p>I use these tools for planning, collaboration, governance, and intelligent work.</p><div className="tool-cloud">{visibleTools.map((tool) => <span key={tool}>{tool}</span>)}{visibleTools.length === 0 && <span className="empty-state">No tools found</span>}</div><div className="ai-note"><Sparkles size={16} /><span>How I use AI<br /><small>Microsoft Copilot · Claude</small></span></div></aside>
        </div>
      </section>
      <section className="skills-principle section-wrap"><Network size={20} /><p>Tools change. I stay focused on <strong>clarity, alignment, and accountable delivery.</strong></p><Link className="text-link" to="/leadership">View impact <ArrowUpRight size={14} /></Link></section>
      <ContactBand />
    </>
  )
}

/** Summarizes resume highlights and links to the full resume document. */
function ResumePage() {
  return (
    <>
      <PageIntro eyebrow="Resume" title={<>A clear view of<br /><em>the full journey.</em></>} copy="I share my experience, leadership scope, and enterprise delivery capabilities." />
      <section className="resume-page section-wrap">
        <div className="resume-sheet" data-gsap>
          <div className="resume-sheet-top"><span>MY EXECUTIVE PROFILE</span><span>SHABANA AJMIN · 2026</span></div>
          <h2>Technical Program<br />Manager</h2>
          <p>Enterprise delivery · Strategic partnerships · Program governance</p>
          <div className="resume-rule" />
          <div className="resume-columns"><div><span>EXPERIENCE</span><strong>14+ years</strong></div><div><span>CURRENT ROLE</span><strong>Gap Inc</strong></div><div><span>LOCATION</span><strong>Hyderabad, India</strong></div></div>
          <div className="resume-watermark">SA</div>
        </div>
        <div className="resume-note" data-gsap><Eyebrow>Resume document</Eyebrow><h2>View my full resume.</h2><p>I keep my current resume in Google Drive.</p><a className="button button-primary" href={profile.resumeUrl} rel="noreferrer" target="_blank">View resume <ExternalLink size={15} /></a></div>
      </section>
      <ContactBand />
    </>
  )
}

/** Provides direct email, LinkedIn, and location details. */
function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" title={<>Let&apos;s make<br /><em>good work happen.</em></>} copy="I welcome conversations about enterprise delivery, strategic program leadership, and future opportunities." />
      <section className="contact-page section-wrap">
        <div className="contact-main" data-gsap><Eyebrow>Direct contact</Eyebrow><h2>Start with a conversation.</h2><p>I don&apos;t use a contact form; you can reach me directly by email or LinkedIn.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={17} /></a><a className="button button-primary" href={profile.linkedIn} rel="noreferrer" target="_blank">Connect on LinkedIn <ExternalLink size={15} /></a></div>
        <div className="contact-details">
          <a className="contact-detail" data-gsap href={`mailto:${profile.email}`}><span className="contact-icon"><Mail size={17} /></span><span><small>EMAIL</small><strong>{profile.email}</strong></span><ArrowUpRight size={15} /></a>
          <a className="contact-detail" data-gsap href={profile.linkedIn} rel="noreferrer" target="_blank"><span className="contact-icon linkedin-icon">in</span><span><small>LINKEDIN</small><strong>View professional profile</strong></span><ArrowUpRight size={15} /></a>
          <div className="contact-detail" data-gsap><span className="contact-icon"><Globe2 size={17} /></span><span><small>LOCATION</small><strong>{profile.location}</strong></span><span className="location-time">IST · UTC+5:30</span></div>
        </div>
      </section>
      <div className="contact-note section-wrap" data-gsap><span className="status-dot" />I&apos;m open to thoughtful conversations and new perspectives.</div>
    </>
  )
}

const dashboardPanels = [
  { title: 'Career overview', value: '14+', countTo: 14, note: 'Years of progressive experience', icon: BriefcaseBusiness },
  { title: 'Leadership scope', value: '1,200+', countTo: 1200, note: 'Resources in delivery ecosystem', icon: Network },
  { title: 'Financial ownership', value: '$8M+', countTo: 8, note: 'Monthly P&L managed', icon: Layers3 },
  { title: 'Recognition', value: 'CEO', note: 'Stock Award recipient', icon: Award },
]

/** Animates a dashboard value while respecting reduced-motion preferences. */
function DashboardCount({ value, countTo }: { value: string; countTo?: number }) {
  const reducedMotion = useReducedMotion()
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    if (countTo === undefined) return
    if (reducedMotion) {
      setCurrent(countTo)
      return
    }
    const duration = 1800
    const start = Date.now()
    const timerId = window.setInterval(() => {
      const progress = Math.min((Date.now() - start) / duration, 1)
      if (progress >= 1) {
        setCurrent(countTo)
        window.clearInterval(timerId)
        return
      }
      const easedProgress = 1 - (1 - progress) ** 3
      setCurrent(Math.round(1 + (countTo - 1) * easedProgress))
    }, 32)
    return () => window.clearInterval(timerId)
  }, [countTo, reducedMotion])

  if (countTo === undefined) return <strong className="dashboard-count">{value}</strong>

  const prefix = value.startsWith('$') ? '$' : ''
  const unit = value.includes('M') ? 'M' : ''
  const hasPlus = value.endsWith('+')
  const isComplete = current >= countTo

  return (
    <strong aria-label={value} className="dashboard-count">
      {prefix}{current.toLocaleString('en-US')}{unit}
      {hasPlus && <span className={`dashboard-count-plus${isComplete ? ' is-complete' : ''}`}>
        +
      </span>}
    </strong>
  )
}

/** Presents a curated, non-live overview of career and delivery metrics. */
function DashboardPage() {
  const reducedMotion = useReducedMotion()
  return (
    <>
      <section className="dashboard-heading section-wrap"><div><Eyebrow icon={<span className="status-dot" />}>MY EXECUTIVE PORTFOLIO</Eyebrow><h1>Leadership<br /><em>command center.</em></h1><p>I use this dashboard to share selected program, operating, and delivery highlights.</p></div><div className="dashboard-date"><span>PORTFOLIO DATA</span><strong>UPDATED FOR 2026</strong><small>Curated figures · not live business data</small></div></section>
      <section className="dashboard-page section-wrap">
        <div className="dashboard-kpis">{dashboardPanels.map((panel, index) => { const Icon = panel.icon; return <article className="dashboard-kpi" key={panel.title}><span className="dashboard-kpi-top"><Icon size={16} /><span>0{index + 1}</span></span><DashboardCount countTo={panel.countTo} value={panel.value} /><span>{panel.title}</span><small>{panel.note}</small></article> })}</div>
        <div className="dashboard-grid">
          <motion.section className="dashboard-panel career-panel" initial={reducedMotion ? false : { opacity: 0, x: -72 }} transition={{ ...transition, delay: 0.08 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }}><div className="panel-heading"><div><span>CAREER TIMELINE</span><h2>Experience overview</h2></div><Link aria-label="View full experience" to="/experience"><ArrowUpRight size={16} /></Link></div><div className="dashboard-career-list">{experiences.map((item, index) => <div className="dashboard-career-row" key={item.company}><span className="dashboard-career-index">0{index + 1}</span><img alt="" loading="lazy" src={item.logo} /><span><strong>{item.company}</strong><small>{item.role}</small></span><time>{item.period}</time></div>)}</div></motion.section>
          <motion.section className="dashboard-panel" initial={reducedMotion ? false : { opacity: 0, x: 72 }} transition={{ ...transition, delay: 0.18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }}><div className="panel-heading"><div><span>DELIVERY MODEL</span><h2>Operating strengths</h2></div><ShieldCheck size={17} /></div><div className="maturity-list">{[
            ['Financial governance', 'P&L · budget · performance'], ['Partner ecosystem', 'SLA · KPI · vendor governance'], ['Enterprise risk', 'Visibility · mitigation · cadence'], ['Global transformation', 'US to India operations transition'],
          ].map(([title, detail], index) => <div className="maturity-row" key={title}><span className="maturity-marker">0{index + 1}</span><div><strong>{title}</strong><small>{detail}</small></div><Check size={14} /></div>)}</div></motion.section>
          <motion.section className="dashboard-panel" initial={reducedMotion ? false : { opacity: 0, x: -72 }} transition={{ ...transition, delay: 0.08 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }}><div className="panel-heading"><div><span>CAPABILITY PORTFOLIO</span><h2>Leadership disciplines</h2></div><Link aria-label="Explore skills" to="/skills"><ArrowUpRight size={16} /></Link></div><div className="capability-tiles">{skillGroups.map((group) => <div className="capability-tile" key={group.number}><span>{group.number}</span><strong>{group.title}</strong><small>{group.skills.length} capabilities</small></div>)}</div></motion.section>
          <motion.section className="dashboard-panel ecosystem-panel" initial={reducedMotion ? false : { opacity: 0, x: 72 }} transition={{ ...transition, delay: 0.18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }}><div className="panel-heading"><div><span>TECHNOLOGY ECOSYSTEM</span><h2>Platforms & tools</h2></div><Layers3 size={17} /></div><div className="dashboard-tools">{tools.map((tool) => <span key={tool}>{tool}</span>)}</div><div className="ecosystem-footer"><Sparkles size={14} />AI-enabled ways of working: Copilot · Claude</div></motion.section>
        </div>
        <p className="dashboard-disclaimer">I share these figures as a snapshot of my portfolio; this is not live business data.</p>
      </section>
      <ContactBand />
    </>
  )
}

/** Provides a recovery link when a route does not match a portfolio page. */
function NotFoundPage() {
  return <section className="not-found section-wrap"><Eyebrow>404 · PAGE NOT FOUND</Eyebrow><h1>This path<br /><em>isn't on the map.</em></h1><Link className="button button-primary" to="/">Return home <ArrowRight size={15} /></Link></section>
}

/** Reuses the contact call to action at the end of portfolio pages. */
function ContactBand() {
  return <section className="contact-band section-wrap" data-gsap><div><Eyebrow>Next step</Eyebrow><h2>Strong outcomes start<br />with a <em>clear conversation.</em></h2></div><Link className="button button-primary" to="/contact">Let's connect <ArrowUpRight size={15} /></Link></section>
}

/** Restores and persists the theme before rendering the shared portfolio shell. */
export default function App() {
  const [theme, setTheme] = useState<PortfolioTheme>(() => {
    const savedTheme = window.localStorage.getItem('shabana-portfolio-theme')
    return savedTheme === 'afternoon' || savedTheme === 'night' ? savedTheme : 'morning'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('shabana-portfolio-theme', theme)
  }, [theme])

  return <SiteShell onThemeChange={setTheme} theme={theme} />
}