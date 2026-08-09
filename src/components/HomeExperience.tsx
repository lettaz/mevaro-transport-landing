"use client";

import { useCallback, useState } from "react";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { CargoOrbit } from "@/components/CargoOrbit";
import { ServicesRail } from "@/components/ServicesRail";
import { ProofStrip } from "@/components/ProofStrip";
import { Process } from "@/components/Process";
import { FinalCta } from "@/components/FinalCta";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppDock } from "@/components/WhatsAppDock";

export function HomeExperience() {
  const [ready, setReady] = useState(false);
  const onLoaderDone = useCallback(() => setReady(true), []);

  return (
    <SmoothScroll>
      <Preloader onDone={onLoaderDone} />
      <SiteHeader />
      <main>
        <Hero ready={ready} />
        <CargoOrbit ready={ready} />
        <ServicesRail ready={ready} />
        <ProofStrip ready={ready} />
        <Process ready={ready} />
        <FinalCta />
      </main>
      <SiteFooter />
      <WhatsAppDock />
    </SmoothScroll>
  );
}
