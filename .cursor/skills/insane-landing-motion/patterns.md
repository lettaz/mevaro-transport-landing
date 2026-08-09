# Scene recipes

## Hero kinetic reveal

```ts
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
tl.from('.hero-line', { yPercent: 110, stagger: 0.08, duration: 1.1 })
  .from('.hero-sub', { opacity: 0, y: 24, duration: 0.7 }, '-=0.5')
  .from('.hero-cta', { opacity: 0, y: 16, duration: 0.5 }, '-=0.3')

gsap.to('.hero-media', {
  yPercent: 18,
  ease: 'none',
  force3D: true,
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
})
```

## Pinned horizontal services

```ts
const track = container.querySelector('.h-track')
const distance = () => track.scrollWidth - window.innerWidth

gsap.to(track, {
  x: () => -distance(),
  ease: 'none',
  force3D: true,
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: () => `+=${distance()}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
  },
})
```

## Magnetic button

```ts
const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' })
const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' })

btn.addEventListener('pointermove', (e) => {
  const r = btn.getBoundingClientRect()
  xTo((e.clientX - r.left - r.width / 2) * 0.35)
  yTo((e.clientY - r.top - r.height / 2) * 0.35)
})
btn.addEventListener('pointerleave', () => { xTo(0); yTo(0) })
```

## Stat count-up on enter

```ts
ScrollTrigger.create({
  trigger: el,
  start: 'top 80%',
  once: true,
  onEnter: () => {
    gsap.fromTo(el, { textContent: 0 }, {
      textContent: target,
      duration: 1.6,
      ease: 'power1.out',
      snap: { textContent: 1 },
      onUpdate: () => { el.textContent = Math.round(Number(el.textContent)).toLocaleString('de-AT') },
    })
  },
})
```

## WhatsApp deep link

```ts
const digits = phone.replace(/\D/g, '')
const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
window.open(url, '_blank', 'noopener,noreferrer')
```

Message template example:

```
Hallo Mevaro Transport!

Name: {name}
Von: {from}
Nach: {to}
Was: {cargo}
Wann: {when}

Bitte um ein unverbindliches Angebot.
```
