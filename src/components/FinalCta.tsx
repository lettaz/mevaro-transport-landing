"use client";

import { MagneticButton } from "@/components/MagneticButton";
import { site } from "@/lib/site";
import { buildQuickWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-asphalt px-5 py-24 md:px-8 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(225,29,46,0.22),transparent_50%),radial-gradient(ellipse_at_20%_80%,rgba(255,176,32,0.16),transparent_45%)]" />
      <div className="relative z-10 mx-auto max-w-[1400px] text-center">
        <p className="text-xs tracking-[0.35em] text-sodium uppercase">Let&apos;s move</p>
        <h2 className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,7vw,5rem)] leading-[0.98] font-bold tracking-tight">
          Ready when you are.
          <span className="block text-white/65">Vienna&apos;s freight, on call.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-mist md:text-lg">
          Free visit if needed. No-obligation offers. Message us on WhatsApp or email —
          every inquiry and recommendation is welcome.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton
            href={buildQuickWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-signal px-7 py-4 text-sm font-semibold text-white shadow-[0_16px_50px_rgba(225,29,46,0.4)]"
          >
            WhatsApp {site.phoneDisplay}
            <span className="grid h-7 w-7 place-items-center rounded-full bg-black/20">→</span>
          </MagneticButton>
          <MagneticButton
            href={`mailto:${site.email}`}
            className="inline-flex items-center rounded-full border border-white/20 bg-white px-7 py-4 text-sm font-semibold text-ink"
          >
            {site.email}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
