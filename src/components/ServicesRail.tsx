"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function ServicesRail({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      const section = root.current;
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!section || !pin || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const getTravel = () => {
          const total = track.scrollWidth;
          const view = window.innerWidth;
          return Math.max(total - view, 0);
        };

        gsap.set(track, { x: 0 });

        const tween = gsap.to(track, {
          x: () => -getTravel(),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getTravel()}`,
            pin,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        const refresh = () => ScrollTrigger.refresh();
        void document.fonts.ready.then(refresh);
        requestAnimationFrame(refresh);

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          ".service-card",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.6,
            scrollTrigger: { trigger: section, start: "top 75%" },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="services" ref={root} className="paper-section relative">
      <div ref={pinRef} className="relative w-full">
        <div className="mx-auto max-w-[1400px] px-5 pt-20 md:px-8 md:pt-28">
          <p className="text-xs tracking-[0.35em] text-sodium-dim uppercase">02 · Services</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] font-bold tracking-tight text-ink">
            Everything you need to move cargo faster, smarter, seamlessly.
          </h2>
        </div>

        <div className="mt-12 overflow-x-clip md:mt-16">
          <div
            ref={trackRef}
            className="h-track flex w-max gap-5 px-5 pb-24 will-change-transform md:gap-7 md:px-8 md:pb-28"
          >
            {site.services.map((service, index) => (
              <article
                key={service.id}
                className="service-card relative flex h-[360px] w-[min(82vw,340px)] shrink-0 flex-col justify-between rounded-[2rem] bg-ink p-7 text-paper md:h-[420px] md:w-[380px] md:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-bold text-white/15 md:text-6xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-signal px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
                    Mevaro
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">
                    {service.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
