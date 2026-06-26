import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Phone, ExternalLink, ArrowRight } from "lucide-react";
import { CtaCanvas } from "./CtaCanvas";

// Import screenshots
import imgVedika from "@/assets/vedika.png";
import imgRentEase from "@/assets/rentease.png";
import imgRestaurantModern from "@/assets/project-restaurant-modern.jpg";
import imgSankalpa from "@/assets/sankalpa.jpeg";

// Custom SVG Icons for Social Platforms
const InstagramIcon = () => (
  <svg className="size-6 text-pink-400 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg className="size-6 text-white fill-current" viewBox="0 0 24 24">
    <path d="M12.28 2c-5.74 0-10.28 4.54-10.28 10.28 0 5.75 4.54 10.28 10.28 10.28 2.5 0 4.8-.9 6.64-2.4l-1.34-1.34c-1.42 1.15-3.22 1.84-5.3 1.84-4.63 0-8.38-3.75-8.38-8.38s3.75-8.38 8.38-8.38 8.38 3.75 8.38 8.38v.84c0 .93-.75 1.68-1.68 1.68s-1.68-.75-1.68-1.68v-3.78c0-.62-.5-1.12-1.12-1.12h-.28c-2.3 0-4.19 1.89-4.19 4.19s1.89 4.19 4.19 4.19c1.47 0 2.76-.76 3.52-1.92.54.98 1.58 1.64 2.78 1.64 1.93 0 3.5-1.57 3.5-3.5v-.84c0-5.74-4.54-10.28-10.28-10.28zm-1.12 13.97c-1.31 0-2.38-1.07-2.38-2.38s1.07-2.38 2.38-2.38 2.38 1.07 2.38 2.38-1.07 2.38-2.38 2.38z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="size-6 text-blue-500 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="size-6 text-blue-400 fill-current" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="size-6 text-white fill-current" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="size-6 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
  </svg>
);

// Reusable Magnetic Hover Card Component
function SocialCard({
  href,
  logo: Logo,
  platform,
  handle,
  description,
}: {
  href: string;
  logo: React.ComponentType;
  platform: string;
  handle: string;
  description: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const reduce = useReducedMotion();

  // Spring animation values for smooth movement
  const springX = useSpring(x, { stiffness: 100, damping: 12 });
  const springY = useSpring(y, { stiffness: 100, damping: 12 });
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 12 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 12 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coordinates relative to the card's center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Shift offset
    x.set(mouseX * 0.18);
    y.set(mouseY * 0.18);

    // Tilt rotation limits
    rotateX.set((mouseY / height) * -15);
    rotateY.set((mouseX / width) * 15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(255,255,255,0.02)] h-full cursor-pointer min-h-[190px] select-none perspective-[1000px]"
    >
      {/* Background Animated Gradient Outline */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#7fa9d1]/20 via-transparent to-[#e6c9d8]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -inset-[1px] -z-20 rounded-2xl bg-gradient-to-r from-[#7fa9d1]/40 to-[#e6c9d8]/40 opacity-0 blur-[8px] group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Section */}
      <div style={{ transform: "translateZ(30px)" }} className="transition-transform duration-300">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="rounded-full border border-white/10 bg-white/5 p-1.5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300">
            <ExternalLink className="size-3 text-white/60" />
          </div>
        </div>
        <h4 className="mt-5 text-sm font-semibold tracking-wider text-white uppercase font-mono">
          {platform}
        </h4>
        <p className="mt-1 text-xs text-white/50 group-hover:text-white/80 transition-colors duration-300 font-mono">
          {handle}
        </p>
      </div>

      {/* Bottom Description */}
      <p style={{ transform: "translateZ(15px)" }} className="mt-4 text-xs leading-relaxed text-white/40 group-hover:text-white/60 transition-colors duration-300 transition-transform duration-300">
        {description}
      </p>
    </motion.a>
  );
}

// Executive Business Card Component
function ContactCard({
  name,
  role,
  phone,
  tagline,
  phoneRaw,
}: {
  name: string;
  role: string;
  phone: string;
  tagline: string;
  phoneRaw: string;
}) {
  const whatsappUrl = `https://wa.me/${phoneRaw.replace(/\s+/g, "").replace("+", "")}?text=Hi%20${name}%2C%20I%27d%20like%20to%20discuss%20a%20project.`;
  const callUrl = `tel:${phoneRaw.replace(/\s+/g, "")}`;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-lg shadow-xl transition-all duration-500 hover:border-white/25 hover:bg-white/[0.04]">
      {/* Animated gradient pulse behind card */}
      <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-[#7fa9d1]/10 to-[#e6c9d8]/10 opacity-30 blur-xl group-hover:opacity-60 transition-opacity duration-700" />
      <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-gradient-to-br from-[#7fa9d1]/20 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
      
      {/* Subtle pulse border animation */}
      <div className="absolute inset-0 border border-transparent bg-gradient-to-r from-[#7fa9d1]/30 via-transparent to-[#e6c9d8]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" style={{ maskImage: "linear-gradient(white, white) content-box, linear-gradient(white, white)" }} />

      <div className="flex flex-col justify-between h-full relative z-10">
        <div>
          {/* Eyebrow Label */}
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#7fa9d1]">
            {tagline}
          </span>
          
          {/* Name & Title */}
          <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
            {name}
          </h3>
          <p className="mt-1 text-xs text-white/50 font-mono uppercase tracking-widest">
            {role}
          </p>

          {/* Phone */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <Phone className="size-3.5 text-white/70" />
            </div>
            <a href={callUrl} className="text-sm font-semibold tracking-wider text-white hover:text-[#7fa9d1] transition-colors font-mono">
              {phone}
            </a>
          </div>
        </div>

        {/* Buttons Stack */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <a
            href={callUrl}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-colors"
          >
            Call Now
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-white text-black py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all shadow-lg hover:shadow-white/5"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// Macbook Screen Mockup Component
function LaptopMockup({ img, alt }: { img: string; alt: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[620px] perspective-[1200px]">
      {/* Screen container */}
      <div className="group relative z-10 overflow-hidden rounded-t-2xl border-[8px] border-[#1d1b1a] bg-[#1d1b1a] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:rotate-x-[1.5deg]">
        {/* Safari Style Top bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#141212] border-b border-white/[0.03]">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-red-500/80" />
            <span className="size-2 rounded-full bg-yellow-500/80" />
            <span className="size-2 rounded-full bg-green-500/80" />
          </div>
          <div className="h-4 w-44 rounded bg-white/5 text-[8px] text-white/30 flex items-center justify-center font-mono select-none">
            {alt.toLowerCase().replace(/\s+/g, "")}.devframes.com
          </div>
          <div className="w-10" />
        </div>

        {/* Device Screen Content */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d0d0d]">
          <img
            src={img}
            alt={alt}
            className="absolute top-0 left-0 w-full h-[135%] object-cover object-top transition-transform duration-[10s] ease-in-out group-hover:translate-y-[-25%]"
          />
          {/* Glass Reflection Flare */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-[1.8s] ease-out group-hover:translate-x-full" />
        </div>
      </div>

      {/* Laptop Base */}
      <div className="relative z-20 -mt-[8px] h-4 w-[106%] -ml-[3%] rounded-b-2xl bg-[#302c2a] border-t border-white/10 shadow-[0_12px_20px_rgba(0,0,0,0.6)]">
        <div className="absolute top-0 left-1/2 h-2 w-20 -translate-x-1/2 rounded-b-lg bg-[#141212]" />
      </div>
      {/* Floor Shadow */}
      <div className="absolute -bottom-6 left-[4%] h-5 w-[92%] rounded-[50%] bg-black/70 blur-md pointer-events-none" />
    </div>
  );
}

// iPhone Screen Mockup Component
function PhoneMockup({ img, alt }: { img: string; alt: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[290px] perspective-[1200px]">
      {/* Phone Casing */}
      <div className="group relative z-10 overflow-hidden rounded-[40px] border-[10px] border-[#1d1b1a] bg-[#1d1b1a] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:rotate-y-[3deg] hover:rotate-x-[1deg]">
        
        {/* Dynamic Island Camera Notch */}
        <div className="absolute top-3.5 left-1/2 z-20 h-4.5 w-18 -translate-x-1/2 rounded-full bg-black flex items-center justify-center">
          <div className="size-1.5 rounded-full bg-neutral-900 ml-auto mr-1.5" />
        </div>

        {/* Screen Content */}
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[30px] bg-[#0d0d0d]">
          <img
            src={img}
            alt={alt}
            className={
              `absolute top-0 left-0 w-full transition-transform duration-[10s] ease-in-out ` +
              (img.includes("rentease")
                ? "h-[95%] object-cover object-center group-hover:translate-y-[-8%]"
                : "h-[140%] object-cover object-top group-hover:translate-y-[-28%]")
            }
          />
          {/* Glass Reflection Flare */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-[1.8s] ease-out group-hover:translate-x-full" />
        </div>

        {/* Bottom bar indicator */}
        <div className="absolute bottom-2 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-white/20" />
      </div>
      {/* Floor Shadow */}
      <div className="absolute -bottom-4 left-[5%] h-4 w-[90%] rounded-[50%] bg-[#2C2420]/10 blur-md pointer-events-none" />
    </div>
  );
}

// Project Showcase Chapter Component
function SelectedProjectChapter({
  num,
  title,
  description,
  liveUrl,
  tech,
  img,
  device,
  flip,
}: {
  num: string;
  title: string;
  description: string;
  liveUrl: string;
  tech: string[];
  img: string;
  device: "laptop" | "phone";
  flip: boolean;
}) {
  return (
    <div className={`w-full py-20 md:py-28 ${flip ? "bg-black/[0.15]" : "bg-transparent"}`}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className={`grid gap-12 md:grid-cols-2 md:gap-20 items-center ${flip ? "md:[&>div:first-child]:order-2" : ""}`}>
          
          {/* Content */}
          <div className="flex flex-col items-start">
            {/* Number Indicator */}
            <span className="font-mono text-5xl font-bold tracking-tight bg-gradient-to-br from-[#7fa9d1] to-[#e6c9d8] bg-clip-text text-transparent opacity-40">
              {num}
            </span>

            {/* Title */}
            <h3 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white">
              {title}
            </h3>

            {/* Description */}
            <p className="mt-5 text-sm md:text-base leading-relaxed text-white/60 max-w-lg">
              {description}
            </p>

            {/* Tech Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/55"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-black shadow-lg shadow-white/5 hover:bg-neutral-100 transition-all duration-300"
            >
              <span>View Live Project</span>
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Device Mockup */}
          <div className="flex items-center justify-center p-4">
            {device === "laptop" ? (
              <LaptopMockup img={img} alt={title} />
            ) : (
              <PhoneMockup img={img} alt={title} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// 1. Social Section component
export function SocialSection() {
  const socialPlatforms = [
    {
      platform: "Instagram",
      handle: "@devframe.26",
      href: "https://www.instagram.com/devframe.26/",
      logo: InstagramIcon,
      description: "Explore our daily design insights, behind-the-scenes craft, and cinematic visual branding updates.",
    },
    {
      platform: "Threads",
      handle: "@devframe.26",
      href: "https://www.threads.com/@devframe.26",
      logo: ThreadsIcon,
      description: "Join the open conversation, read our quick thoughts on tech, and connect with us in real-time.",
    },
    {
      platform: "Facebook",
      handle: "DevFrame",
      href: "https://www.facebook.com/profile.php?id=61591401721246",
      logo: FacebookIcon,
      description: "Stay updated with our studio announcements, client project showcases, and local business articles.",
    },
    {
      platform: "LinkedIn",
      handle: "DevFrames",
      href: "https://www.linkedin.com/in/devframes-undefined-02712841a/",
      logo: LinkedinIcon,
      description: "Connect with our professional network and see how we scale local businesses with web automation.",
    },
    {
      platform: "GitHub",
      handle: "devframe26",
      href: "https://github.com/devframe26",
      logo: GithubIcon,
      description: "Browse our open-source repositories, lightweight code components, and clean development frameworks.",
    },
    {
      platform: "Email",
      handle: "devframe26@gmail.com",
      href: "mailto:devframe26@gmail.com",
      logo: EmailIcon,
      description: "Drop us an email. Let's arrange a direct chat or schedule a discovery meeting for your enterprise.",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#070708] border-t border-white/[0.05] px-6 pt-24 pb-20 md:px-12 md:pt-32">
      {/* Background stars / ambient background design elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-1/4 left-1/4 size-[500px] rounded-full bg-[#7fa9d1]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 size-[400px] rounded-full bg-[#e6c9d8]/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-[1280px]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7fa9d1]">
            Get In Touch
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">
            Connect With DevFrame
          </h2>
          <p className="mt-4 text-sm text-white/50">
            Follow our journey, explore our work, and stay connected across every platform.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {socialPlatforms.map((soc) => (
            <SocialCard
              key={soc.platform}
              platform={soc.platform}
              handle={soc.handle}
              href={soc.href}
              logo={soc.logo}
              description={soc.description}
            />
          ))}
        </div>

        {/* Contact Cards Sub-Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <ContactCard
            name="Karthik"
            role="Business Development"
            phone="+91 76739 23505"
            tagline="Primary Contact"
            phoneRaw="+91 76739 23505"
          />
          <ContactCard
            name="Rithwik"
            role="Client Relations"
            phone="+91 72070 86671"
            tagline="Project Discussions"
            phoneRaw="+91 72070 86671"
          />
        </div>
      </div>
    </div>
  );
}

// 2. Selected Projects Section component
export function SelectedProjects() {
  return (
    <section id="work" className="relative overflow-hidden bg-[#070708] border-t border-white/[0.05] pt-24 md:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/3 size-[500px] rounded-full bg-[#7fa9d1]/5 blur-[120px]" />
      </div>

      <div className="px-6 md:px-12 mx-auto max-w-[1280px]">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7fa9d1]">
            Portfolio
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">
            Selected Projects
          </h2>
          <p className="mt-4 text-sm text-white/50 max-w-lg">
            A glimpse into digital experiences we've designed and developed.
          </p>
        </div>
      </div>

      {/* Alternating Project Showcase Chapters */}
      <div className="mt-12 md:mt-16 flex flex-col">
        <SelectedProjectChapter
          num="01"
          title="Vedika Sutra"
          description="An ultra-premium, luxury traditional brand website showcasing handcrafted apparel. Designed with a sleek visual narrative, gorgeous typography, and immersive animations that highlight the fine artistry of the garments."
          liveUrl="https://vedika-sutra-8zpt.vercel.app"
          tech={["React", "Framer Motion", "Tailwind CSS", "Luxury Brand"]}
          img={imgVedika}
          device="laptop"
          flip={false}
        />
        <SelectedProjectChapter
          num="02"
          title="RentEase"
          description="A modern, conversion-focused furniture & appliance rental platform. Built with a highly responsive, streamlined catalog interface, simple step-by-step checkout widgets, and lightning-fast load speeds."
          liveUrl="https://rent-ease-furniture-appliance-renta.vercel.app/"
          tech={["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"]}
          img={imgRentEase}
          device="phone"
          flip={true}
        />
        <SelectedProjectChapter
          num="03"
          title="Sankalpa"
          description="A 3D-first web experience blending sculptural visuals and interactive storytelling. Sankalpa showcases real-time 3D models, rich material shaders, and spatial audio to present a contemplative online installation."
          liveUrl="https://idyllic-sprinkles-aeb87f.netlify.app"
          tech={["Three.js", "WebGL", "React", "3D Design"]}
          img={imgSankalpa}
          device="laptop"
          flip={false}
        />
      </div>
    </section>
  );
}

// 3. Final CTA component
export function FinalCTA() {
  return (
    <section
      id="book"
      className="relative overflow-hidden bg-[#070708] px-6 py-28 md:px-12 md:py-36 border-t border-white/[0.05]"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(0,0,0,0.85) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[450px] rounded-full bg-[#7fa9d1]/10 blur-[90px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[300px] rounded-full bg-[#e6c9d8]/10 blur-[80px]" style={{ animation: "pulse 6s ease-in-out infinite" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] grid gap-12 md:grid-cols-2 items-center">
        <div className="text-left flex flex-col items-start">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7fa9d1]">
            Get Started
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Ready to Build Something <span className="text-[#7fa9d1]">Extraordinary?</span>
          </h2>
          <p className="mt-6 max-w-xl text-sm md:text-base leading-relaxed text-white/50">
            Let's transform your vision into a stunning digital experience that leaves a lasting impression.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="https://wa.me/917207086671?text=Hi%20Karthik%2C%20I%27d%20like%20to%20book%2520a%2520discovery%2520call."
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center rounded-xl bg-white px-8 py-4.5 text-[11px] font-bold uppercase tracking-[0.2em] text-black shadow-xl hover:bg-neutral-100 transition-colors"
            >
              Schedule a Discovery Call
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-colors"
            >
              Explore More Projects
            </a>
          </div>
        </div>

        {/* 3D Echo Centerpiece */}
        <div className="w-full">
          <CtaCanvas />
        </div>
      </div>
    </section>
  );
}
