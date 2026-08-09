"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function ProofStrip({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.fromTo(
        ".proof-item",
        { opacity: reduced ? 1 : 0, y: reduced ? 0 : 32 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 78%" },
        },
      );
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section ref={root} className="bg-asphalt px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[1fr_1.4fr] md:items-end">
        <div>
          <p className="text-xs tracking-[0.35em] text-sodium uppercase">03 · Why Mevaro</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-bold tracking-tight">
            Reliable. Fair. Ready on short notice.
          </h2>
        </div>
        <p className="max-w-xl text-base leading-relaxed text-mist md:text-lg">
          Local transport with a cinematic standard of care — furniture, machines,
          event equipment, and everyday loads across Vienna and the surrounding area.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1400px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {site.proof.map((item) => (
          <div
            key={item.label}
            className="proof-item reveal-ready rounded-[1.5rem] border border-white/10 bg-asphalt-lift px-6 py-7"
          >
            <p className="font-display text-2xl font-bold tracking-tight text-paper md:text-3xl">
              {item.value}
            </p>
            <p className="mt-2 text-sm text-fog">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
