import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-asphalt px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 text-sm text-fog md:flex-row md:items-center md:justify-between">
        <p className="font-display font-semibold tracking-tight text-paper">{site.name}</p>
        <p>Reliable transport · Fair prices · Short-notice appointments</p>
        <p>© {new Date().getFullYear()} Mevaro Transport · Vienna</p>
      </div>
    </footer>
  );
}
