"use client";

import { site } from "@/lib/site";
import { buildQuickWhatsAppUrl } from "@/lib/whatsapp";

const links = [
  { href: "#services", label: "Services" },
  { href: "#orbit", label: "How we move" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40 px-4 pt-5 md:px-8">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
        <a
          href="#top"
          className="pointer-events-auto font-display text-lg font-bold tracking-tight text-paper md:text-xl"
        >
          {site.name}
          <span className="mt-0.5 block text-[10px] font-medium tracking-[0.28em] text-sodium uppercase">
            Logistics · Vienna
          </span>
        </a>

        <nav className="glass-pill pointer-events-auto hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm text-paper/85 transition hover:bg-white/10 hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="pointer-events-auto flex items-center gap-2">
          <a
            href={`mailto:${site.email}`}
            className="hidden rounded-full border border-white/20 bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-paper md:inline-flex"
          >
            Email us
          </a>
          <a
            href={buildQuickWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-signal px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(225,29,46,0.35)] transition hover:bg-signal-hot"
          >
            WhatsApp
            <span className="grid h-5 w-5 place-items-center rounded-full bg-black/20 text-xs">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
