"use client";

import { useRef, type ReactNode, type ComponentPropsWithoutRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = ComponentPropsWithoutRef<"a"> & {
  children: ReactNode;
  className?: string;
};

export function MagneticButton({ children, className = "", ...props }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const btn = ref.current;
      if (!btn) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });

      const onMove = (e: PointerEvent) => {
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.35);
        yTo((e.clientY - r.top - r.height / 2) * 0.35);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      btn.addEventListener("pointermove", onMove);
      btn.addEventListener("pointerleave", onLeave);
      return () => {
        btn.removeEventListener("pointermove", onMove);
        btn.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <a ref={ref} className={className} {...props}>
      {children}
    </a>
  );
}
