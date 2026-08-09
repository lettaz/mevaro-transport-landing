"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/MagneticButton";
import { site } from "@/lib/site";
import { buildQuickWhatsAppUrl } from "@/lib/whatsapp";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2400&q=80";

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set([".hero-line", ".hero-sub", ".hero-cta", ".hero-stats"], { opacity: 1, y: 0, yPercent: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-line",
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.1, duration: 1.15 },
      )
        .fromTo(".hero-sub", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.75 }, "-=0.45")
        .fromTo(".hero-cta", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.35")
        .fromTo(".hero-stats", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.25");

      gsap.to(".hero-media", {
        yPercent: 16,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative min-h-[100svh] overflow-hidden bg-asphalt"
    >
      <div className="hero-media absolute inset-0 scale-110">
        <Image
          src={HERO_IMAGE}
          alt="Red transport truck on a wet night road"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
        <div className="hero-grain absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pb-10 pt-28 md:px-8 md:pb-14">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs tracking-[0.35em] text-sodium uppercase">
            {site.city} · Surrounding area
          </p>
          <h1 className="font-display text-[clamp(2.6rem,8vw,5.6rem)] leading-[0.95] font-bold tracking-tight text-paper">
            <span className="block overflow-hidden">
              <span className="hero-line reveal-ready inline-block">Smarter transport.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line reveal-ready inline-block text-white/90">
                Faster deliveries.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line reveal-ready inline-block">Vienna reach.</span>
            </span>
          </h1>
          <p className="hero-sub reveal-ready mt-6 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            Small transports, furniture pickups, loading help, and event gear —
            reliable crews, fair prices, short-notice appointments possible.
          </p>
          <div className="hero-cta reveal-ready mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton
              href={buildQuickWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-paper px-6 py-3.5 text-sm font-semibold text-ink"
            >
              Get a free quote
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-paper">→</span>
            </MagneticButton>
            <MagneticButton
              href="#orbit"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3.5 text-sm font-medium text-paper transition hover:bg-white/10"
            >
              See how it moves
            </MagneticButton>
          </div>
        </div>

        <div className="hero-stats reveal-ready mt-12 grid grid-cols-1 gap-6 border-t border-white/15 pt-6 sm:grid-cols-3">
          {[
            "Reliable crews · fair prices",
            "Willhaben · IKEA · furniture stores",
            "Free visit · no-obligation offers",
          ].map((item) => (
            <p key={item} className="text-sm leading-snug text-mist">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
