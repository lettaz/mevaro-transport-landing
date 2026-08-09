import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mevaro Transport · Vienna",
  description:
    "Reliable transport in Vienna and surrounding areas — small transports, Willhaben & IKEA pickup, furniture, machines, event equipment, and disposal by arrangement.",
  openGraph: {
    title: "Mevaro Transport · Vienna",
    description:
      "Fair prices, short-notice appointments, free visit if needed. WhatsApp +43 660 9360398",
    locale: "en_AT",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
