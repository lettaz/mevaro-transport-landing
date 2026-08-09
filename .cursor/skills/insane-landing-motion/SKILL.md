---
name: insane-landing-motion
description: Use when building premium, Awwwards-style, or cinematic marketing landing pages with scroll-driven animation, kinetic typography, pinned chapters, object parallax, horizontal scrub, magnetic CTAs, Lenis smooth scroll, GSAP ScrollTrigger, or "insane" motion graphics — especially transport, logistics, product launch, and agency one-pagers.
---

# Insane Landing Motion

Motion is the product. Scroll is the playhead. Build film grammar, not slide decks.

Distilled from 2026 immersive stacks (Lenis + GSAP), cinematic-scroll craft, and Awwwards React patterns. Use with the project's frontend design rules; this skill owns **motion architecture**, not a fixed aesthetic.

## Stack (default)

| Need | Tool |
|------|------|
| Smooth scroll | `lenis` (`lenis/react`) — package name is `lenis`, not `@studio-freight/lenis` |
| Scroll choreography | `gsap` + `ScrollTrigger` + `@gsap/react` (`useGSAP`) |
| Framework | Next.js App Router (or Vite) — client islands for motion |
| Micro UI | CSS + small GSAP tweens; avoid adding Motion/Framer unless layout transitions need it |

**Never** run Lenis and GSAP ScrollSmoother together.

## Mandatory Lenis ↔ GSAP sync

Two RAF loops = jank. Canonical wiring:

```ts
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

const lenis = new Lenis({ syncTouch: true, autoRaf: false })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

CSS: `html { scroll-behavior: auto !important; }` — never `scroll-behavior: smooth` with ScrollTrigger.

Init scroll scenes after `document.fonts.ready` (or equivalent) so trigger positions are correct.

## Narrative before pixels

1. Write a 2-sentence through-line: "As you scroll, X becomes Y, proving Z."
2. Cap at **3–5 acts**. Each act = one idea the visitor can read.
3. Storyboard per beat: trigger, mechanic, scroll distance, readable text, reduced-motion fallback, mobile fallback.
4. Pin budget: each pin ≤ `+=2000` (~2× viewport). Total pinned scroll should not feel like a trap.

## Motion grammar (pick 3–5, ship hard)

| Film move | Scroll mechanic |
|-----------|-----------------|
| Dolly / push-in | Pin + scale scrub on hero media |
| Tracking shot | Horizontal pin scrub (`xPercent`) |
| Parallax depth | Multi-layer `yPercent` / `xPercent` on objects |
| Rack focus | Opacity + blur swap between foreground/copy (blur sparingly) |
| Object fly-through | Absolute cargo/product SVGs/images tweened across a pinned stage |
| Kinetic type | Split lines/words; clip-path or y% reveal |
| Magnetic CTA | `quickTo` on pointer move within ~80px |
| Velocity skew | Light `skewY` from Lenis velocity (desktop only) |

**Animate only `transform` and `opacity`** (+ `clip-path` when needed). Use `force3D: true`. No animating `top`/`left`/`width`/`height` for scroll scenes.

## Object-motion pattern (signature beat)

For "crazy objects on scroll": pin a stage, keep copy readable, scrub 3–8 objects on independent paths (enter from edges, arc, settle, exit). Stagger depths with different `yPercent` ranges so it feels 3D without WebGL.

```ts
gsap.timeline({
  scrollTrigger: { trigger: stage, start: 'top top', end: '+=1600', pin: true, scrub: 1 },
})
  .fromTo(boxA, { xPercent: -140, yPercent: 40, rotate: -12 }, { xPercent: 20, yPercent: -10, rotate: 0 }, 0)
  .fromTo(boxB, { xPercent: 120, yPercent: -30, rotate: 8 }, { xPercent: -10, yPercent: 15, rotate: -3 }, 0.05)
```

## React hygiene

- Scope with `useGSAP(() => { ... }, { scope: containerRef })` so triggers kill on unmount.
- Use `gsap.matchMedia()` — desktop pins/horizontals; mobile = fades + short vertical reveals, no scroll-jacking.
- Hide reveal targets with CSS `opacity: 0` first; tween with `fromTo` to avoid FOUC.
- Preloader optional; if used, hold Lenis until exit, then `ScrollTrigger.refresh()`.

## Taste guardrails

- Brand-first hero; one composition; full-bleed hero media when promotional.
- No card grids in the hero; cards only for interactive widgets.
- Avoid AI-default looks: purple gradients, cream+terracotta serif kitsch, broadsheet hairlines, glow soup, emoji decoration.
- Ship **2–3 intentional signature motions**, not 20 weak fades.
- Something readable at every scroll position.

## Accessibility & performance

- Gate heavy motion with `gsap.matchMedia('(prefers-reduced-motion: no-preference)', ...)`.
- Reduced motion: static layout, simple opacity, native scroll (disable Lenis).
- Hero LCP: no lazy-load; `fetchpriority="high"`; explicit dimensions.
- Prefer WebP/AVIF; keep decorative object assets tiny (SVG/CSS shapes beat multi-MB photos).
- Pause control for any continuous autoplay motion (WCAG 2.2.2).

## Conversion beat (local business)

For service businesses, end motion with an obvious CTA. Floating WhatsApp: collect 2–4 fields in a panel, then open `https://wa.me/<digits>?text=<encoded>` with a structured first message. Never block the float behind scroll theater.

## Anti-patterns

| Excuse | Reality |
|--------|---------|
| "Just fade sections in" | That's a template, not cinematic. Pin + object path required for "insane". |
| "Skip Lenis sync, it'll be fine" | Desync is the #1 jank source. |
| "Pin for 5000px, it's cool" | Users bounce. Cap ~2000px per pin. |
| "Dark purple glow = premium" | Banned convergence look. Derive palette from brand/place. |
| "Same motion on mobile" | Simplify; preserve story, drop pins/WebGL. |
| "Animate everything" | Three sharp beats beat twenty soft ones. |

## Build order

1. Narrative + storyboard (acts, through-line)
2. Visual system (tokens, type, imagery direction)
3. Wire Lenis + GSAP sync + reduced-motion gate
4. Hero + one signature pinned object scene
5. Remaining sections + CTA + WhatsApp intake
6. Mobile pass + Lighthouse sanity + `ScrollTrigger.refresh()` after images/fonts

## References (read when needed)

- [patterns.md](patterns.md) — copy-paste scene recipes
- Sources of truth in the wild: Lenis+GSAP sync guides, Codrops scroll demos, cinematic-scroll / awwwards-animations skill ecosystems
