"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone();
      if (rootRef.current) rootRef.current.style.display = "none";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const counter = { value: 0 };
    const el = rootRef.current?.querySelector<HTMLElement>("[data-loader-count]");
    const bar = rootRef.current?.querySelector<HTMLElement>("[data-loader-bar]");
    const root = rootRef.current;
    if (!root) {
      finish();
      return;
    }

    const tl = gsap.timeline({ onComplete: finish });

    tl.to(counter, {
      value: 100,
      duration: 1.35,
      ease: "power2.inOut",
      onUpdate: () => {
        if (el) el.textContent = String(Math.round(counter.value)).padStart(3, "0");
        if (bar) bar.style.transform = `scaleX(${counter.value / 100})`;
      },
    }).to(root, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      data-loader
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-asphalt px-6 py-8 text-paper md:px-10"
      aria-hidden
    >
      <div className="flex items-start justify-between font-display text-sm tracking-[0.2em] uppercase text-fog">
        <span>Mevaro</span>
        <span>Vienna</span>
      </div>
      <div className="flex flex-col gap-4">
        <p
          data-loader-count
          className="font-display text-[clamp(4rem,18vw,10rem)] leading-none tracking-tight"
        >
          000
        </p>
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div
            data-loader-bar
            className="h-full origin-left scale-x-0 bg-signal"
          />
        </div>
        <p className="max-w-sm text-sm text-fog">Routing freight through the night…</p>
      </div>
    </div>
  );
}
