"use client";

import { FormEvent, useId, useState } from "react";
import {
  buildWhatsAppUrl,
  whatsappFieldLimits,
  type WhatsAppIntake,
} from "@/lib/whatsapp";

const empty: WhatsAppIntake = {
  name: "",
  from: "",
  to: "",
  cargo: "",
  when: "",
};

export function WhatsAppDock() {
  const formId = useId();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<WhatsAppIntake>(empty);

  const update = (key: keyof WhatsAppIntake) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppUrl(form);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {open ? (
        <div
          className="w-[min(100vw-2rem,360px)] overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink text-paper shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
          role="dialog"
          aria-label="WhatsApp booking form"
        >
          <div className="flex items-center justify-between bg-[#128C7E] px-5 py-4">
            <div>
              <p className="text-sm font-semibold">Mevaro on WhatsApp</p>
              <p className="text-xs text-white/80">Fill in → we open the chat for you</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full bg-black/20 text-sm"
              aria-label="Close chat form"
            >
              ✕
            </button>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-3 px-4 py-4">
            <Field
              id={`${formId}-name`}
              label="Name"
              value={form.name}
              maxLength={whatsappFieldLimits.name}
              onChange={update("name")}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                id={`${formId}-from`}
                label="From"
                value={form.from}
                maxLength={whatsappFieldLimits.from}
                onChange={update("from")}
                placeholder="e.g. IKEA Wien"
                required
              />
              <Field
                id={`${formId}-to`}
                label="To"
                value={form.to}
                maxLength={whatsappFieldLimits.to}
                onChange={update("to")}
                placeholder="District / address"
                required
              />
            </div>
            <Field
              id={`${formId}-cargo`}
              label="What to move"
              value={form.cargo}
              maxLength={whatsappFieldLimits.cargo}
              onChange={update("cargo")}
              placeholder="Sofa, boxes, machine…"
              required
            />
            <Field
              id={`${formId}-when`}
              label="When"
              value={form.when}
              maxLength={whatsappFieldLimits.when}
              onChange={update("when")}
              placeholder="Date / ASAP"
            />
            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-ink transition hover:brightness-105"
            >
              Open WhatsApp with message
              <span aria-hidden>→</span>
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-3 rounded-full bg-[#25D366] py-3 pr-5 pl-3 text-ink shadow-[0_18px_50px_rgba(37,211,102,0.4)] transition hover:scale-[1.02]"
        aria-expanded={open}
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-lg text-[#25D366]">
          ✦
        </span>
        <span className="text-left leading-tight">
          <span className="block text-sm font-bold">Chat & book</span>
          <span className="block text-xs font-medium text-ink/70">WhatsApp intake</span>
        </span>
      </button>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  maxLength,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={id} className="block text-xs text-fog">
      {label}
      <input
        id={id}
        value={value}
        maxLength={maxLength}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-white/10 bg-asphalt-lift px-3 py-2.5 text-sm text-paper outline-none placeholder:text-white/30 focus:border-sodium"
      />
    </label>
  );
}
