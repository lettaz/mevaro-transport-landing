import { site } from "@/lib/site";

export type WhatsAppIntake = {
  name: string;
  from: string;
  to: string;
  cargo: string;
  when: string;
};

const MAX = {
  name: 80,
  from: 120,
  to: 120,
  cargo: 240,
  when: 80,
} as const;

export function clampField(value: string, max: number): string {
  return value.trim().slice(0, max);
}

export function buildWhatsAppMessage(intake: WhatsAppIntake): string {
  const name = clampField(intake.name, MAX.name) || "—";
  const from = clampField(intake.from, MAX.from) || "—";
  const to = clampField(intake.to, MAX.to) || "—";
  const cargo = clampField(intake.cargo, MAX.cargo) || "—";
  const when = clampField(intake.when, MAX.when) || "—";

  return [
    "Hallo Mevaro Transport!",
    "",
    `Name: ${name}`,
    `Von: ${from}`,
    `Nach: ${to}`,
    `Was: ${cargo}`,
    `Wann: ${when}`,
    "",
    "Bitte um ein unverbindliches Angebot.",
  ].join("\n");
}

export function buildWhatsAppUrl(intake: WhatsAppIntake): string {
  const digits = site.phoneE164.replace(/\D/g, "");
  const text = buildWhatsAppMessage(intake);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function buildQuickWhatsAppUrl(seed?: string): string {
  const digits = site.phoneE164.replace(/\D/g, "");
  const text =
    seed?.trim() ||
    "Hallo Mevaro Transport! Ich hätte gerne ein unverbindliches Angebot.";
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export const whatsappFieldLimits = MAX;
