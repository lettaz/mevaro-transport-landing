"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Process({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.fromTo(
        ".process-step",
        { opacity: reduced ? 1 : 0, x: reduced ? 0 : -24 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        },
      );

      if (!reduced) {
        gsap.fromTo(
          ".process-line",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="process" ref={root} className="paper-section px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-xs tracking-[0.35em] text-sodium-dim uppercase">04 · Process</p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-bold tracking-tight text-ink">
          From first ping to final placement.
        </h2>

        <div className="relative mt-14">
          <div className="process-line absolute top-8 right-0 left-0 hidden h-px origin-left bg-ink/15 md:block" />
          <ol className="grid gap-6 md:grid-cols-3">
            {site.steps.map((step) => (
              <li
                key={step.n}
                className="process-step reveal-ready relative rounded-[1.75rem] bg-white/70 p-7 shadow-[0_20px_60px_rgba(18,20,26,0.06)]"
              >
                <span className="font-display text-sm font-bold tracking-[0.2em] text-signal">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70 md:text-base">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
