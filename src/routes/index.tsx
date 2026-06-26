import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback, useLayoutEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  Menu,
  X,
  Search,
  Layout,
  Calendar,
  Bot,
  Utensils,
  Stethoscope,
  Dumbbell,
  Scissors,
  Building,
  Sparkles,
  Hammer,
  Hotel,
  Zap,
  ChevronDown,
  Laptop,
  TrendingUp,
  MessageSquare,
  Phone,
  Instagram,
  Mail,
} from "lucide-react";
import { HeroCanvas } from "@/components/HeroCanvas";
import { SocialSection, SelectedProjects, FinalCTA as NewFinalCTA } from "@/components/SocialPortfolioSection";

import heroImg from "@/assets/hero-architecture.jpg";
import projectRestaurant from "@/assets/project-restaurant.jpg";
import projectRealEstate from "@/assets/project-realestate.jpg";
import projectClinic from "@/assets/project-clinic.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DevFrames — Cinematic Digital Studio for Warangal's Finest" },
      {
        name: "description",
        content:
          "Premium websites, branding, SEO and automation for Warangal's restaurants, clinics, gyms, salons, and real estate. Book a discovery call.",
      },
      { property: "og:title", content: "DevFrames — Cinematic Digital Studio" },
      {
        property: "og:description",
        content: "We build the cinematic digital presence for Warangal's finest businesses.",
      },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL =
  "https://wa.me/917207086671?text=Hi%20DevFrames%2C%20I%27d%20like%20to%20book%20a%20discovery%20call.";
const BOOK_URL = "#book";

// ──────────────────────────── custom cursor ────────────────────────────

function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 15 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 15 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    setMounted(true);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer");
      setHovered(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY, reduce]);

  if (!mounted || typeof window === "undefined" || window.innerWidth < 1024 || reduce) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 -ml-3 -mt-3 size-6 rounded-full border border-accent/60 mix-blend-difference"
        style={{ x: ringX, y: ringY, scale: hovered ? 1.4 : 1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 -ml-1 -mt-1 size-2 rounded-full bg-accent-secondary"
        style={{ x: cursorX, y: cursorY }}
      />
    </>
  );
}

// ──────────────────────────── loader ────────────────────────────

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [migrating, setMigrating] = useState(false);
  const [navCoords, setNavCoords] = useState({ x: -400, y: -300 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Calculate navbar destination coords
    const isDesktop = window.innerWidth >= 768;
    const padding = isDesktop ? 48 : 24;
    const maxW = 1480;
    const startLeft = (window.innerWidth - Math.min(window.innerWidth, maxW)) / 2 + padding;

    // Logo text starts at center. Navbar target center is startLeft + 90.
    const targetX = -(window.innerWidth / 2 - startLeft - 90);
    const targetY = -(window.innerHeight / 2 - (isDesktop ? 32 : 28));

    setNavCoords({ x: targetX, y: targetY });

    if (reduce) {
      onComplete();
      return;
    }
    const duration = 2800;
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setMigrating(true);
          setTimeout(onComplete, 900);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, reduce]);

  if (reduce) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg text-text-primary"
    >
      <motion.div
        className="relative flex flex-col items-center"
        animate={
          migrating
            ? {
                scale: 0.28,
                x: navCoords.x,
                y: navCoords.y,
                opacity: 0.6,
              }
            : { scale: 1, x: 0, y: 0, opacity: 1 }
        }
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        <h1 className="relative font-sans text-4xl font-bold uppercase tracking-[0.4em] md:text-5xl select-none">
          <span className="opacity-10">DEVFRAMES</span>
          <motion.span
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute left-0 top-0 text-text-primary"
          >
            DEVFRAMES
          </motion.span>
        </h1>

        <motion.div
          className="mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-hairline"
          animate={migrating ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="h-full bg-accent transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────── shared ────────────────────────────

function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.28em] text-text-secondary opacity-80 ${className}`}
    >
      {children}
    </span>
  );
}

// ──────────────────────────── 3D Card Tilt ────────────────────────────

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(x, { stiffness: 150, damping: 15 });
  const ry = useSpring(y, { stiffness: 150, damping: 15 });
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    x.set((mx / rect.width) * 12);
    y.set((my / rect.height) * -12);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX: ry, rotateY: rx, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ──────────────────────────── Timeline Floating Geometry ────────────────────────────

function FloatingGeometry({ stepIndex }: { stepIndex: number }) {
  const rotation = [0, 45, 90, 135, 180, 225, 270][stepIndex] || 0;
  
  const renderShape = () => {
    switch (stepIndex) {
      case 0:
        return (
          <svg className="size-6 text-accent" viewBox="0 0 40 40" fill="none">
            <polygon points="20,8 32,28 8,28" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="20" cy="21" r="5" stroke="var(--color-accent-secondary)" strokeWidth="1.5" />
          </svg>
        );
      case 1:
        return (
          <svg className="size-6 text-accent-secondary" viewBox="0 0 40 40" fill="none">
            <polygon points="20,6 34,16 20,26 6,16" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="20,14 34,24 20,34 6,24" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        );
      case 2:
        return (
          <svg className="size-6 text-accent" viewBox="0 0 40 40" fill="none">
            <ellipse cx="20" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="12" x2="10" y2="28" stroke="currentColor" strokeWidth="1.5" />
            <line x1="30" y1="12" x2="30" y2="28" stroke="currentColor" strokeWidth="1.5" />
            <ellipse cx="20" cy="28" rx="10" ry="4" stroke="var(--color-accent-secondary)" strokeWidth="1.5" />
          </svg>
        );
      case 3:
        return (
          <svg className="size-6 text-accent-secondary" viewBox="0 0 40 40" fill="none">
            <rect x="10" y="10" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <line x1="20" y1="10" x2="20" y2="30" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="20" x2="30" y2="20" stroke="var(--color-accent-secondary)" strokeWidth="1" />
          </svg>
        );
      case 4:
        return (
          <svg className="size-6 text-accent" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="6" stroke="var(--color-accent-secondary)" strokeWidth="1.5" />
            <line x1="20" y1="4" x2="20" y2="36" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        );
      case 5:
        return (
          <svg className="size-6 text-accent-secondary" viewBox="0 0 40 40" fill="none">
            <path d="M20,6 L32,30 L20,24 L8,30 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="20" cy="18" r="3" fill="var(--color-accent)" />
          </svg>
        );
      case 6:
        return (
          <svg className="size-6 text-accent" viewBox="0 0 40 40" fill="none">
            <circle cx="16" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="26" cy="14" r="4" stroke="var(--color-accent-secondary)" strokeWidth="1.5" />
            <line x1="19.5" y1="19.5" x2="23" y2="16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      animate={{ y: [0, -6, 0], rotate: [rotation, rotation + 8, rotation] }}
      transition={{ repeat: Infinity, duration: 4 + stepIndex * 0.5, ease: "easeInOut" }}
      className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-bg-elevated/40 border border-hairline/60 shadow-sm"
    >
      {renderShape()}
    </motion.div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
  href,
  children,
  primary = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15 });
  const sy = useSpring(y, { stiffness: 180, damping: 15 });
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.28);
    y.set(my * 0.28);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const base = primary
    ? "bg-text-primary text-bg hover:bg-text-primary/95 shadow-subtle"
    : "border border-surface text-text-primary bg-bg-elevated/40 hover:bg-bg-elevated hover:border-accent/40 shadow-subtle";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex items-center gap-3 rounded-xl px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] transition-all hover:shadow-medium duration-300 ${base}`}
    >
      <span>{children}</span>
      <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
        →
      </span>
    </motion.a>
  );
}

// ──────────────────────────── nav ────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      // Only hide/show after passing hero area
      if (y > 400) {
        setHidden(y > lastScrollY.current && y - lastScrollY.current > 5);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    ["Work", "#work"],
    ["Process", "#process"],
    ["Services", "#services"],
    ["FAQ", "#faq"],
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "backdrop-blur-md bg-bg/75 border-b border-hairline/80 shadow-subtle"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-6 py-4 md:px-12 md:py-5">
          <a
            href="#top"
            className="group font-sans text-xs uppercase tracking-[0.32em] font-bold text-text-primary flex items-center gap-2"
          >
            <span className="size-2 rounded-full bg-accent transition-transform duration-500 group-hover:scale-125" />
            DEVFRAMES<span className="text-text-secondary opacity-60"> — WG</span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map(([l, h]) => (
              <a
                key={l}
                href={h}
                className="relative py-1 text-[11px] uppercase tracking-[0.22em] font-medium text-text-secondary transition-colors hover:text-text-primary group"
              >
                <span>{l}</span>
                <span className="absolute bottom-0 left-1/2 h-[1.5px] w-0 bg-accent transition-all duration-300 -translate-x-1/2 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={BOOK_URL}
              className="rounded-xl border border-accent/20 bg-bg-elevated/40 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-primary transition-all shadow-subtle hover:bg-bg hover:border-accent hover:-translate-y-0.5"
            >
              Book Discovery
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex size-9 items-center justify-center rounded-xl border border-hairline bg-bg-elevated/40 text-text-primary md:hidden active:scale-95 transition-transform"
              aria-label="Open Menu"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-hairline">
              <a
                href="#top"
                className="font-sans text-xs uppercase tracking-[0.32em] font-bold text-text-primary flex items-center gap-2"
              >
                <span className="size-2 rounded-full bg-accent" />
                DEVFRAMES
              </a>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex size-9 items-center justify-center rounded-xl border border-hairline bg-bg-elevated/40 text-text-primary"
                aria-label="Close Menu"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
              {navLinks.map(([l, h], i) => (
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  key={l}
                  href={h}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold uppercase tracking-[0.25em] text-text-primary hover:text-accent transition-colors"
                >
                  {l}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                href={BOOK_URL}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 rounded-xl bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-bg shadow-medium"
              >
                Book Discovery
              </motion.a>
            </div>
            <div className="py-8 text-center text-[10px] uppercase tracking-[0.22em] text-text-secondary opacity-60">
              Warangal · Telangana
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ──────────────────────────── hero ────────────────────────────

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.92]);
  const canvasRotate = useTransform(scrollYProgress, [0, 0.3], [0, 3]);
  const reduce = useReducedMotion();

  // GSAP scroll-scrubbed 3D micro-transformation
  useEffect(() => {
    if (reduce || !canvasWrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(canvasWrapRef.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "30% top",
          scrub: 1.5,
        },
        y: 30,
        scale: 0.95,
        rotateX: 2,
        ease: "none",
      });
    });
    return () => ctx.revert();
  }, [reduce]);

  return (
    <header
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-10 pt-32 md:px-12 md:pb-16 md:pt-40"
    >
      {/* Drifting background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 size-[400px] rounded-full bg-accent/15 blur-[120px] animate-drift-slow-1" />
        <div className="absolute top-1/2 right-1/4 size-[300px] rounded-full bg-accent-secondary/15 blur-[100px] animate-drift-slow-2" />
      </div>
      {/* Giant background wordmark */}
      <div className="pointer-events-none absolute inset-x-4 top-16 md:top-20 select-none z-0">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 0.04, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="text-right text-[22vw] font-bold leading-[0.82] tracking-tighter md:text-[14vw]"
        >
          DEV
          <br />
          FRAMES
        </motion.h1>
      </div>

      <div className="relative z-10 max-w-4xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-hairline bg-bg-elevated/60 px-4 py-1.5 shadow-subtle">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-text-secondary">
              Digital Growth Studio · Warangal
            </span>
          </div>
        </motion.div>
        {/* Mask-clip headline reveal — each line independently */}
        <div className="overflow-hidden">
          <motion.h2
            initial={reduce ? false : { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
            className="text-pretty text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl text-text-primary"
          >
            We build the{" "}
            <span className="font-display italic font-normal text-accent">cinematic</span> digital
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            initial={reduce ? false : { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.5 }}
            className="text-pretty text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl text-text-primary"
          >
            presence for Warangal's finest.
          </motion.h2>
        </div>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-text-secondary md:text-lg"
        >
          Websites, branding, SEO and automation — crafted for restaurants, clinics, gyms, salons,
          real estate and hotels who want to look as premium online as they feel in person.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <MagneticButton href={BOOK_URL} primary>
            Book a Discovery Call
          </MagneticButton>
          <a
            href="#work"
            className="text-[12px] uppercase tracking-[0.22em] font-semibold border-b border-text-primary/25 pb-1 transition-colors hover:border-accent"
          >
            See our work
          </a>
        </motion.div>
      </div>

      {/* Large centered visual centerpiece — scroll-scrubbed */}
      <motion.div
        ref={canvasWrapRef}
        style={reduce ? undefined : { y, scale: canvasScale, rotateX: canvasRotate }}
        className="relative z-10 mt-12 h-[42vh] min-h-[280px] w-full overflow-hidden rounded-[28px] border border-hairline shadow-medium md:mt-16 md:h-[52vh] will-change-transform"
      >
        <HeroCanvas />
      </motion.div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[9px] uppercase tracking-[0.32em] text-text-secondary opacity-60 pointer-events-none">
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-3.5 w-[1px] bg-text-secondary"
        />
      </div>
    </header>
  );
}

// ──────────────────────────── industries strip ────────────────────────────

const INDUSTRIES = [
  "Restaurants",
  "Clinics",
  "Gyms",
  "Salons",
  "Real Estate",
  "Boutiques",
  "Builders",
  "Hotels",
];

function getIndustryIcon(name: string) {
  switch (name) {
    case "Restaurants":
      return <Utensils className="size-4.5 text-accent-secondary" />;
    case "Clinics":
      return <Stethoscope className="size-4.5 text-accent" />;
    case "Gyms":
      return <Dumbbell className="size-4.5 text-accent-secondary" />;
    case "Salons":
      return <Scissors className="size-4.5 text-accent" />;
    case "Real Estate":
      return <Building className="size-4.5 text-accent-secondary" />;
    case "Boutiques":
      return <Sparkles className="size-4.5 text-accent" />;
    case "Builders":
      return <Hammer className="size-4.5 text-accent-secondary" />;
    case "Hotels":
      return <Hotel className="size-4.5 text-accent" />;
    default:
      return null;
  }
}

function Industries() {
  return (
    <section
      id="industries"
      aria-label="Industries served"
      className="border-y border-hairline py-8 bg-gradient-to-r from-bg-elevated/40 via-bg/25 to-bg-elevated/40"
    >
      <div className="overflow-hidden">
        <div className="flex w-max gap-12 animate-marquee whitespace-nowrap pl-16 hover:[animation-play-state:paused] cursor-pointer">
          {[...INDUSTRIES, ...INDUSTRIES].map((name, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl border border-hairline/60 bg-bg-elevated/40 px-6 py-3.5 backdrop-blur-sm shadow-subtle hover:border-accent/30 hover:bg-bg transition-all duration-300">
              <div className="flex size-9 items-center justify-center rounded-full bg-bg-elevated border border-hairline shadow-inner">
                {getIndustryIcon(name)}
              </div>
              <span className="font-display italic text-xl text-text-primary/90">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────── what we solve ────────────────────────────

// Custom illustrations for Solve cards
const SearchIllustration = () => (
  <svg className="size-10 text-accent" viewBox="0 0 100 100" fill="none">
    <circle cx="45" cy="45" r="22" stroke="currentColor" strokeWidth="2" />
    <path d="M61 61 L82 82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="45" cy="45" r="10" stroke="var(--color-accent-secondary)" strokeWidth="1.2" strokeDasharray="3 3" />
    <path d="M45 25 A 20 20 0 0 1 65 45" stroke="var(--color-accent-secondary)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DesignIllustration = () => (
  <svg className="size-10 text-accent" viewBox="0 0 100 100" fill="none">
    <rect x="15" y="20" width="70" height="60" rx="6" stroke="currentColor" strokeWidth="2" />
    <line x1="15" y1="35" x2="85" y2="35" stroke="currentColor" strokeWidth="1.2" />
    <rect x="25" y="45" width="22" height="25" rx="3" fill="var(--color-accent-secondary)" opacity="0.25" stroke="var(--color-accent-secondary)" strokeWidth="1.2" />
    <line x1="55" y1="48" x2="75" y2="48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="55" y1="56" x2="75" y2="56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="55" y1="64" x2="68" y2="64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CalendarIllustration = () => (
  <svg className="size-10 text-accent" viewBox="0 0 100 100" fill="none">
    <rect x="20" y="20" width="60" height="60" rx="8" stroke="currentColor" strokeWidth="2" />
    <line x1="20" y1="38" x2="80" y2="38" stroke="currentColor" strokeWidth="1.2" />
    <line x1="38" y1="14" x2="38" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="62" y1="14" x2="62" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="35" cy="50" r="3.5" fill="var(--color-accent-secondary)" />
    <circle cx="50" cy="50" r="3.5" fill="currentColor" />
    <circle cx="65" cy="50" r="3.5" fill="currentColor" />
    <circle cx="35" cy="65" r="3.5" fill="currentColor" />
    <circle cx="50" cy="65" r="3.5" fill="var(--color-accent-secondary)" />
    <circle cx="65" cy="65" r="3.5" fill="currentColor" />
  </svg>
);

const BotIllustration = () => (
  <svg className="size-10 text-accent" viewBox="0 0 100 100" fill="none">
    <rect x="25" y="30" width="50" height="46" rx="10" stroke="currentColor" strokeWidth="2" />
    <circle cx="40" cy="48" r="4.5" fill="var(--color-accent-secondary)" />
    <circle cx="60" cy="48" r="4.5" fill="var(--color-accent-secondary)" />
    <path d="M42 61 Q 50 65 58 61" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="50" y1="16" x2="50" y2="30" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="50" cy="14" r="4" fill="currentColor" />
    <path d="M25 53 L18 53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M75 53 L82 53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PROBLEMS = [
  {
    p: "Customers can't find you on Google.",
    s: "We fix your local visibility so the right people land on your page first.",
    illustration: SearchIllustration,
  },
  {
    p: "Your website looks like everyone else's.",
    s: "We design a brand presence that feels distinctly yours — and distinctly premium.",
    illustration: DesignIllustration,
  },
  {
    p: "No way to book or order online.",
    s: "We build booking, ordering and lead capture directly into your site.",
    illustration: CalendarIllustration,
  },
  {
    p: "WhatsApp & enquiries are unmanaged.",
    s: "We automate replies, reminders and follow-ups so nothing slips.",
    illustration: BotIllustration,
  },
];

function Solve() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // mobile uses Framer fallback

    const ctx = gsap.context(() => {
      const pairs = gsap.utils.toArray<HTMLElement>(".solve-pair");
      pairs.forEach((pair) => {
        const problem = pair.querySelector(".solve-problem");
        const solution = pair.querySelector(".solve-solution");
        if (!problem || !solution) return;

        gsap.fromTo(
          problem,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: pair,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          solution,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: pair,
              start: "top 80%",
              end: "top 35%",
              scrub: 1,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-24 md:px-12 md:py-36">
      {/* Background drifting blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/3 left-1/4 size-[400px] rounded-full bg-accent/10 blur-[100px] animate-drift-slow-1" />
        <div className="absolute bottom-1/3 right-1/4 size-[300px] rounded-full bg-accent-secondary/10 blur-[90px] animate-drift-slow-2" />
      </div>
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <Eyebrow>What we solve</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-3xl text-pretty text-4xl font-semibold tracking-tight md:text-5xl">
            Most customers check Google before they check your{" "}
            <span className="font-display italic font-normal text-accent">shop</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-text-secondary leading-relaxed">
            If they don't find something they trust, they keep scrolling — to the next listing.
            Here's what we fix, quietly and quickly.
          </p>
        </Reveal>

        <div className="mt-16 space-y-6 md:space-y-8">
          {PROBLEMS.map((item, i) => {
            const Illustration = item.illustration;
            return (
              <div
                key={i}
                className="solve-pair grid gap-4 md:grid-cols-2 md:gap-8 items-stretch"
              >
                <Reveal delay={reduce ? i * 0.08 : 0} className="h-full">
                  <TiltCard className="h-full">
                    <div className="solve-problem group rounded-2xl border border-hairline bg-bg-elevated/40 p-8 md:p-10 transition-all duration-300 hover:shadow-medium hover:bg-bg h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-accent">0{i + 1}</span>
                        <Illustration />
                      </div>
                      <p className="mt-6 text-pretty text-lg font-semibold tracking-tight md:text-xl text-text-primary">
                        {item.p}
                      </p>
                    </div>
                  </TiltCard>
                </Reveal>
                <Reveal delay={reduce ? i * 0.08 + 0.04 : 0}>
                  <div className="solve-solution rounded-2xl border border-accent/15 bg-bg p-8 md:p-10 transition-all duration-300 hover:shadow-medium h-full flex items-center">
                    <p className="text-sm leading-relaxed text-text-secondary md:text-base">
                      {item.s}
                    </p>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────── laptop & phone mockups ────────────────────────────

function LaptopMockup({ img, alt }: { img: string; alt: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[540px] perspective-[1000px]">
      <div className="group relative z-10 overflow-hidden rounded-t-[14px] border-[6px] border-[#2C2420] bg-[#2C2420] shadow-medium transition-transform duration-700 hover:rotate-x-[2deg]">
        <div className="absolute top-[2px] left-1/2 z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#1A1513]" />

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[3px] bg-bg-elevated">
          <img
            src={img}
            alt={alt}
            className="h-full w-full object-cover object-top transition-transform duration-[12s] ease-in-out group-hover:translate-y-[8%]"
          />
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-[1.2s] ease-out group-hover:translate-x-full" />
        </div>
      </div>

      <div className="relative z-20 -mt-[6px] h-3.5 w-[108%] -ml-[4%] rounded-b-xl bg-[#EFE8E1] border-t border-[#D5C9BE] shadow-subtle">
        <div className="absolute top-0 left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-b-md bg-[#2C2420]" />
      </div>
      <div className="absolute -bottom-3 left-[2%] h-3 w-[96%] rounded-[50%] bg-[#2C2420]/8 blur-md pointer-events-none" />
    </div>
  );
}

function PhoneMockup({ img, alt }: { img: string; alt: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[270px] perspective-[1000px]">
      <div className="group relative z-10 overflow-hidden rounded-[38px] border-[9px] border-[#2C2420] bg-[#2C2420] shadow-medium transition-transform duration-700 hover:rotate-y-[4deg] hover:rotate-x-[2deg]">
        <div className="absolute top-3 left-1/2 z-20 h-4.5 w-16 -translate-x-1/2 rounded-full bg-[#1A1513] flex items-center justify-center">
          <div className="size-1.5 rounded-full bg-[#3C302B]" />
        </div>

        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[29px] bg-bg-elevated">
          <img
            src={img}
            alt={alt}
            className="h-full w-full object-cover object-top transition-transform duration-[14s] ease-in-out group-hover:translate-y-[12%]"
          />
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-[1.2s] ease-out group-hover:translate-x-full" />
        </div>

        <div className="absolute bottom-2.5 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-[#2C2420]/30" />
      </div>
      <div className="absolute -bottom-4 left-[5%] h-4 w-[90%] rounded-[50%] bg-[#2C2420]/10 blur-md pointer-events-none" />
    </div>
  );
}

// ──────────────────────────── portfolio ────────────────────────────

const PROJECTS = [
  {
    num: "01",
    tag: "Hospitality & Dining",
    title: "The Spice Garden",
    label: "Concept Project",
    accent: "text-accent",
    img: projectRestaurant,
    device: "laptop",
    problem:
      "Fine dining relies on physical ambiance, but most restaurant sites feel sterile and generic — failing to translate that in-person warmth online.",
    solution:
      "We crafted an editorial, typography-driven menu experience and a custom 3-step booking flow that replicates their physical hospitality.",
    result:
      "Designed to keep visitors engaged longer and make booking feel effortless — not an afterthought.",
    metrics: [
      ["Booking flow", "3 steps"],
      ["Mobile-first", "Always"],
      ["Editorial menu", "Full"],
    ],
  },
  {
    num: "02",
    tag: "Real Estate",
    title: "Skyline Ventures",
    label: "Concept Project",
    accent: "text-accent-secondary",
    img: projectRealEstate,
    device: "laptop",
    problem:
      "Generic listing platforms look crowded and fail to convey the scale and premium quality of luxury residential estates.",
    solution:
      "We designed an image-first, spacious portfolio structure with fluid transitions and a clean WhatsApp inquiry link directly on each listing.",
    result: "Built to generate qualified leads directly via WhatsApp — no portal middlemen, no form fatigue.",
    metrics: [
      ["Property pages", "Modular"],
      ["Lead capture", "WhatsApp"],
      ["Image-first", "Always"],
    ],
  },
  {
    num: "03",
    tag: "Wellness & Clinics",
    title: "Nadi Wellness",
    label: "Concept Project",
    accent: "text-accent",
    img: projectClinic,
    device: "phone",
    problem:
      "Patients found scheduling appointments confusing, causing office staff to waste hours manually managing calendar overlaps.",
    solution:
      "We developed a clean, patient-centric clinic portal featuring a one-tap calendar booking system integrated with direct confirmation alerts.",
    result: "Designed to eliminate manual scheduling overhead with instant automated reminders and one-tap booking.",
    metrics: [
      ["Online booking", "Built-in"],
      ["WhatsApp", "Connected"],
      ["Trust signals", "Throughout"],
    ],
  },
];

function PortfolioChapter({
  project,
  flip,
  bgClass,
}: {
  project: (typeof PROJECTS)[number];
  flip: boolean;
  bgClass: string;
}) {
  return (
    <div className={`w-full py-24 md:py-32 ${bgClass}`}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div
          className={`grid gap-12 md:grid-cols-2 md:gap-16 items-center ${flip ? "md:[&>div:first-child]:order-2" : ""}`}
        >
          <div className="md:sticky md:top-32 md:self-start">
            <Reveal>
              <span className={`font-mono text-5xl font-semibold ${project.accent} opacity-50`}>
                {project.num}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-5 flex items-center gap-3">
                <Eyebrow>{project.tag}</Eyebrow>
                <span className="rounded-full border border-hairline px-3 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-text-secondary opacity-70">
                  {project.label}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="mt-5 text-pretty text-4xl font-semibold tracking-tight md:text-5xl text-text-primary">
                {project.title}
              </h3>
            </Reveal>

            {/* Structured Micro-Narrative */}
            <Reveal delay={0.15}>
              <div className="mt-6 space-y-4 max-w-md text-sm leading-relaxed text-text-secondary">
                <p>
                  <strong className="text-text-primary">Problem: </strong> {project.problem}
                </p>
                <p>
                  <strong className="text-text-primary">Solution: </strong> {project.solution}
                </p>
                <p>
                  <strong className="text-text-primary">Result: </strong>{" "}
                  <span className="text-text-primary font-medium">{project.result}</span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-8 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline">
                {project.metrics.map(([k, v]) => (
                  <div key={k} className="bg-bg px-3 py-4 text-center md:text-left">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-secondary opacity-70">
                      {k}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-text-primary">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative flex items-center justify-center p-4">
              {project.device === "laptop" ? (
                <LaptopMockup img={project.img} alt={project.title} />
              ) : (
                <PhoneMockup img={project.img} alt={project.title} />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
// Portfolio has been replaced by the imported SelectedProjects from SocialPortfolioSection.tsx

// ──────────────────────────── process ────────────────────────────

const STEPS = [
  ["Discovery", "Audit & align"],
  ["Strategy", "Frame the bet"],
  ["Design", "Draft the blueprint"],
  ["Development", "Build it clean"],
  ["Testing", "Quietly polish"],
  ["Launch", "Ship with care"],
  ["Growth", "Keep refining"],
];

function ProcessPath() {
  const ref = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const path = ref.current;
    const container = containerRef.current;
    if (!path || !container || reduce) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const ctx = gsap.context(() => {
      // Scrub the path draw
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          end: "bottom 50%",
          scrub: 1.2,
        },
      });

      // Pop in each node as the line reaches it
      const nodes = gsap.utils.toArray<HTMLElement>(".process-node");
      nodes.forEach((node, i) => {
        gsap.fromTo(
          node,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: container,
              start: `${15 + i * (70 / nodes.length)}% 70%`,
              end: `${25 + i * (70 / nodes.length)}% 60%`,
              scrub: 1,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={containerRef} className="relative">
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 top-[26px] hidden h-[40px] w-full md:block"
      >
        <path
          ref={ref}
          d="M 40 40 Q 200 0 360 40 T 680 40 T 1000 40 T 1160 40"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-7 md:gap-2">
        {STEPS.map(([step, sub], i) => (
          <li key={step} className="process-node flex flex-col items-start md:items-center md:text-center animate-fade-in" style={reduce ? undefined : { opacity: 0 }}>
            <FloatingGeometry stepIndex={i} />
            <span className="grid size-[52px] place-items-center rounded-full border border-hairline bg-bg font-mono text-[10px] uppercase tracking-[0.18em] text-accent shadow-subtle">
              0{i + 1}
            </span>
            <p className="mt-5 text-sm font-semibold text-text-primary">{step}</p>
            <p className="mt-1 text-xs text-text-secondary">{sub}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function MobileProcessPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container || reduce) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1.2,
        },
      });

      const nodes = gsap.utils.toArray<HTMLElement>(".mobile-process-node");
      nodes.forEach((node, i) => {
        gsap.fromTo(
          node,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={containerRef} className="relative pl-10 md:hidden">
      <svg
        className="absolute left-[26px] top-4 h-[calc(100%-32px)] w-2"
        preserveAspectRatio="none"
        viewBox="0 0 10 500"
      >
        <path
          ref={pathRef}
          d="M 5 0 L 5 500"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <ol className="relative flex flex-col gap-10">
        {STEPS.map(([step, sub], i) => (
          <li key={step} className="mobile-process-node flex gap-6 items-start" style={reduce ? undefined : { opacity: 0 }}>
            <div className="flex flex-col items-center shrink-0">
              <FloatingGeometry stepIndex={i} />
              <span className="grid size-[52px] place-items-center rounded-full border border-hairline bg-bg font-mono text-[10px] uppercase tracking-[0.18em] text-accent shadow-subtle">
                0{i + 1}
              </span>
            </div>
            <div className="pt-2">
              <p className="text-sm font-semibold text-text-primary">{step}</p>
              <p className="mt-1 text-xs text-text-secondary">{sub}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Process() {
  return (
    <section
      id="process"
      className="bg-bg-elevated/40 px-6 py-24 md:px-12 md:py-36 border-y border-hairline"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-20 text-center">
          <Reveal>
            <Eyebrow>The method</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-pretty text-4xl font-semibold tracking-tight md:text-5xl text-text-primary">
              A sequence of{" "}
              <span className="font-display italic font-normal text-accent">precision</span>.
            </h2>
          </Reveal>
        </div>
        {/* Desktop timeline */}
        <div className="hidden md:block">
          <ProcessPath />
        </div>
        {/* Mobile timeline */}
        <MobileProcessPath />
      </div>
    </section>
  );
}

// ──────────────────────────── value commitments ────────────────────────────

const COMMITMENTS = [
  {
    statement: "Every project custom-built",
    detail: "No templates, no page builders. Your site is designed and coded from scratch.",
  },
  {
    statement: "Direct access to the builder",
    detail: "You talk to the person actually designing and building — no account managers in between.",
  },
  {
    statement: "Built for industries we understand",
    detail: "Restaurants, clinics, salons, real estate — we know what your customers expect online.",
  },
  {
    statement: "Weekly previews, zero surprises",
    detail: "You see progress every week and sign off before we move forward. No big reveal anxiety.",
  },
];

function ValueCommitments() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-3xl text-pretty text-4xl font-semibold tracking-tight md:text-5xl text-text-primary">
            Commitments, not{" "}
            <span className="font-display italic font-normal text-accent">claims</span>.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {COMMITMENTS.map((c, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-hairline bg-bg-elevated/30 p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-medium hover:bg-bg">
                <p className="text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
                  {c.statement}
                </p>
                <div className="my-4 h-px w-10 bg-accent/40" />
                <p className="text-sm leading-relaxed text-text-secondary">{c.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────── services ────────────────────────────

const SERVICES = [
  {
    t: "Website Development",
    d: "Cinematic, fast, conversion-led sites built from scratch.",
    icon: Laptop,
  },
  {
    t: "Brand Identity",
    d: "Wordmarks, palettes and systems that feel distinctly yours.",
    icon: Sparkles,
  },
  {
    t: "SEO & Local Search",
    d: "Show up first when your customers search nearby.",
    icon: Search,
  },
  {
    t: "Automation",
    d: "WhatsApp, bookings, follow-ups — running themselves.",
    icon: Zap,
  },
  {
    t: "AI Tools",
    d: "Lightweight AI workflows tailored to your specific business.",
    icon: Bot,
  },
  {
    t: "Growth & Marketing",
    d: "Quiet, measured campaigns that compound month over month.",
    icon: TrendingUp,
  },
];

function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, rotateY: -8, rotateX: 4, y: 40 },
          {
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            delay: i * 0.08,
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden border-y border-hairline bg-bg-elevated/40 px-6 py-24 md:px-12 md:py-36"
    >
      {/* Background drifting blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/3 size-[400px] rounded-full bg-accent-secondary/10 blur-[110px] animate-drift-slow-1" />
      </div>

      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>What we offer</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-pretty text-4xl font-semibold tracking-tight md:text-5xl text-text-primary">
                Six disciplines.{" "}
                <span className="font-display italic font-normal text-accent">One studio.</span>
              </h2>
            </Reveal>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3" style={{ perspective: "800px" }}>
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.t}
                className="service-card group h-full rounded-2xl border border-hairline bg-bg p-8 transition-all duration-500 hover:shadow-medium md:p-10 will-change-transform"
                style={reduce ? undefined : { opacity: 0 }}
              >
                <TiltCard className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                        0{i + 1}
                      </span>
                      <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-accent/10 to-accent-secondary/15 border border-accent/25 shadow-inner transition-all duration-500 group-hover:rotate-[15deg]">
                        <Icon className="size-5 text-accent" />
                      </div>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold tracking-tight text-text-primary">
                      {s.t}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{s.d}</p>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────── working with us ────────────────────────────

function WorkingWithUs() {
  const beats = [
    ["Week 1", "Discovery call, audit and shared narrative."],
    ["Weeks 2–3", "Strategy, sitemap and brand direction signed off."],
    ["Weeks 3–6", "Design and build, with weekly previews — no surprises."],
    ["Launch week", "We go live together, monitor, and tune."],
  ];
  return (
    <section className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-[1fr_1.4fr] items-center">
        <div>
          <Reveal>
            <Eyebrow>What working with us looks like</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-pretty text-4xl font-semibold tracking-tight md:text-5xl text-text-primary">
              Calm, measured,{" "}
              <span className="font-display italic font-normal text-accent">never rushed</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm leading-relaxed text-text-secondary">
              We work with a small handful of clients at a time — so when it's your turn, you're not
              waiting for our attention.
            </p>
          </Reveal>
        </div>
        <ol className="divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-bg-elevated/40">
          {beats.map(([w, d], i) => (
            <Reveal key={w} delay={i * 0.05}>
              <li className="flex items-start gap-8 bg-bg/60 p-8 hover:bg-bg transition-colors">
                <span className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {w}
                </span>
                <span className="text-base leading-relaxed text-text-primary">{d}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}



// ──────────────────────────── faq ────────────────────────────

const FAQS = [
  [
    "How long does a project take?",
    "Most engagements run 3–6 weeks from kickoff to launch, depending on scope. We share weekly previews so you always know where we are.",
  ],
  [
    "Do you only work with businesses in Warangal?",
    "We're based in Warangal and love working with local businesses, but we also take on projects from anywhere in India remotely.",
  ],
  [
    "I already have a website — can you redesign it?",
    "Yes. We start with a free audit, identify what's holding it back, and propose a focused redesign rather than a full rebuild if that's the right call.",
  ],
  [
    "Do you write the content too?",
    "We help shape the messaging and copy direction, and write polished copy for key pages. For long-form content, we collaborate with you on tone.",
  ],
  [
    "What if I'm not technical at all?",
    "Most of our clients aren't — and that's by design. You'll never need to touch code, hosting, or anything technical. We handle it all.",
  ],
  [
    "How does the engagement start?",
    "It starts with a free 30-minute discovery call. We discuss your business, audit your current online presence, and outline what a project would look like. Scope, timeline, and investment are all discussed personally on that call based on your specific needs.",
  ],
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="py-5 border-b border-hairline">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between gap-6 text-left"
      >
        <span className="text-pretty text-lg font-semibold tracking-tight text-text-primary md:text-xl">
          {q}
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary">{a}</p>
      </motion.div>
    </div>
  );
}

function Faq() {
  return (
    <section id="faq" className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-[1fr_1.6fr]">
        <div>
          <Reveal>
            <Eyebrow>Common questions</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-pretty text-4xl font-semibold tracking-tight md:text-5xl text-text-primary">
              Asked &amp;{" "}
              <span className="font-display italic font-normal text-accent">answered</span>.
            </h2>
          </Reveal>
        </div>
        <div className="border-t border-hairline">
          {FAQS.map(([q, a]) => (
            <FaqItem key={q} q={q} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

// FinalCTA has been replaced by the imported FinalCTA (NewFinalCTA) from SocialPortfolioSection.tsx

// ──────────────────────────── footer ────────────────────────────

function Footer() {
  const footerLinks = [
    [
      "Studio",
      [
        ["Work", "#work"],
        ["Process", "#process"],
        ["Services", "#services"],
        ["FAQ", "#faq"],
      ],
    ],
    [
      "Industries",
      [
        ["Restaurants", "#industries"],
        ["Clinics", "#industries"],
        ["Real Estate", "#industries"],
        ["Hotels", "#industries"],
      ],
    ],
  ];

  const contactDetails = [
    {
      label: "Phone",
      value: "+91 72070 86671",
      href: "tel:+917207086671",
      icon: Phone,
    },
    {
      label: "Alternate Phone",
      value: "+91 76739 23505",
      href: "tel:+917673923505",
      icon: Phone,
    },
    {
      label: "Instagram",
      value: "@devframe.26",
      href: "https://www.instagram.com/devframe.26/",
      icon: Instagram,
    },
    {
      label: "Email",
      value: "devframe26@gmail.com",
      href: "mailto:devframe26@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="border-t border-hairline px-6 py-16 md:px-12 md:py-20 bg-bg">
      <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.32em] font-bold text-text-primary">
            DevFrames — Warangal
          </p>
          <p className="mt-5 max-w-xs font-display text-xl italic leading-snug text-text-primary opacity-80">
            Crafting the digital standard for Telangana's emerging businesses.
          </p>
        </div>
        {footerLinks.map(([title, items]) => (
          <div key={title as string}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold text-text-secondary opacity-80">
              {title as string}
            </p>
            <ul className="mt-5 space-y-3">
              {(items as [string, string][]).map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="relative py-0.5 text-sm text-text-secondary hover:text-text-primary transition-colors group inline-block"
                  >
                    <span>{label}</span>
                    <span className="absolute bottom-0 left-1/2 h-[1px] w-0 bg-accent transition-all duration-300 -translate-x-1/2 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold text-text-secondary opacity-80">
            Contact Us
          </p>
          <div className="mt-5 space-y-4">
            {contactDetails.map(({ label, value, href, icon: Icon }) => (
              <a
                key={value}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-white/10"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.24em] text-text-secondary opacity-80">
                    {label}
                  </span>
                  <span className="block text-sm text-text-primary">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1280px] flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8 text-[10px] uppercase tracking-[0.22em] text-text-secondary opacity-60">
        <span>© {new Date().getFullYear()} DevFrames Studio</span>
        <span>Warangal · Telangana · India</span>
      </div>
    </footer>
  );
}

// ──────────────────────────── scroll progress ────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const reduce = useReducedMotion();

  if (reduce) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-accent/30"
      style={{ scaleX }}
    />
  );
}

// ──────────────────────────── page ────────────────────────────

function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = sessionStorage.getItem("devframes_visited");
      if (hasVisited) {
        setIsLoading(false);
      }
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("devframes_visited", "true");
  };

  return (
    <div className="sky-grain bg-bg text-text-primary select-none">
      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <Nav />
      <main>
        <Hero />
        <Industries />
        <Solve />
        <SocialSection />
        <SelectedProjects />
        <Process />
        <ValueCommitments />
        <Services />
        <WorkingWithUs />
        <Faq />
        <NewFinalCTA />
      </main>
      <Reveal>
        <Footer />
      </Reveal>
    </div>
  );
}
