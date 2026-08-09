"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const objects = [
  { src: "/cargo/box.svg", alt: "Moving box", className: "cargo-a w-28 md:w-40" },
  { src: "/cargo/sofa.svg", alt: "Sofa", className: "cargo-b w-40 md:w-56" },
  { src: "/cargo/machine.svg", alt: "Machine", className: "cargo-c w-28 md:w-36" },
  { src: "/cargo/speaker.svg", alt: "Event speaker", className: "cargo-d w-20 md:w-28" },
  { src: "/cargo/box.svg", alt: "Second box", className: "cargo-e w-24 md:w-32" },
] as const;

export function CargoOrbit({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      const stage = root.current;
      if (!stage) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".orbit-copy, .cargo-silhouette", { opacity: 1, clearProps: "transform" });
      });

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".orbit-copy",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: { trigger: stage, start: "top 75%" },
          },
        );
        gsap.utils.toArray<HTMLElement>(".cargo-silhouette").forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.08,
              scrollTrigger: { trigger: stage, start: "top 70%" },
            },
          );
        });
      });

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=1600",
            pin: true,
            scrub: 1,
          },
        });

        tl.fromTo(".orbit-kicker", { opacity: 0, y: 24 }, { opacity: 1, y: 0 }, 0)
          .fromTo(".orbit-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, 0.05)
          .fromTo(".orbit-body", { opacity: 0, y: 24 }, { opacity: 1, y: 0 }, 0.12)
          .fromTo(
            ".cargo-a",
            { xPercent: -160, yPercent: 40, rotate: -18, opacity: 0 },
            { xPercent: -10, yPercent: -8, rotate: -6, opacity: 1, force3D: true },
            0,
          )
          .fromTo(
            ".cargo-b",
            { xPercent: 140, yPercent: -20, rotate: 14, opacity: 0 },
            { xPercent: 18, yPercent: 12, rotate: 4, opacity: 1, force3D: true },
            0.04,
          )
          .fromTo(
            ".cargo-c",
            { xPercent: -40, yPercent: 120, rotate: 20, opacity: 0 },
            { xPercent: 35, yPercent: 28, rotate: -8, opacity: 1, force3D: true },
            0.08,
          )
          .fromTo(
            ".cargo-d",
            { xPercent: 80, yPercent: 110, rotate: -24, opacity: 0 },
            { xPercent: -28, yPercent: 35, rotate: 10, opacity: 1, force3D: true },
            0.1,
          )
          .fromTo(
            ".cargo-e",
            { xPercent: 20, yPercent: -130, rotate: 30, opacity: 0 },
            { xPercent: 48, yPercent: -22, rotate: -4, opacity: 1, force3D: true },
            0.06,
          )
          .to(".cargo-a", { xPercent: 90, yPercent: -40, rotate: 12, opacity: 0.35 }, 0.55)
          .to(".cargo-b", { xPercent: -70, yPercent: 50, rotate: -16, opacity: 0.35 }, 0.55)
          .to(".cargo-c", { xPercent: -90, yPercent: -30, rotate: 18, opacity: 0.25 }, 0.58)
          .to(".cargo-d", { xPercent: 100, yPercent: -10, rotate: -8, opacity: 0.25 }, 0.58)
          .to(".cargo-e", { xPercent: -20, yPercent: 80, rotate: 20, opacity: 0.2 }, 0.6);
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section
      id="orbit"
      ref={root}
      className="relative min-h-[100svh] overflow-hidden bg-asphalt-lift"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,176,32,0.08),transparent_55%)]" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-5 py-24 md:px-8">
        <div className="orbit-copy relative z-20 max-w-xl">
          <p className="orbit-kicker reveal-ready text-xs tracking-[0.35em] text-sodium uppercase">
            01 · Cargo in motion
          </p>
          <h2 className="orbit-title reveal-ready mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] font-bold tracking-tight">
            Objects fly.
            <span className="block text-white/70">Your job stays clear.</span>
          </h2>
          <p className="orbit-body reveal-ready mt-5 text-base leading-relaxed text-mist md:text-lg">
            Scroll and watch freight path through the frame — the same energy we
            bring to pickups across Vienna: decisive, careful, impossible to ignore.
          </p>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          {objects.map((obj) => (
            <div
              key={obj.className}
              className={`cargo-silhouette absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${obj.className}`}
            >
              <Image src={obj.src} alt={obj.alt} width={220} height={180} className="h-auto w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
