export const site = {
  name: "Mevaro Transport",
  tagline: "Reliable transport across Vienna and beyond.",
  phoneDisplay: "+43 660 9360398",
  phoneE164: "+436609360398",
  email: "mevaro-transport@hotmail.com",
  city: "Vienna",
  services: [
    {
      id: "small",
      title: "Small transports",
      copy: "Boxes, appliances, store pickups — moved clean and on time.",
    },
    {
      id: "pickup",
      title: "Willhaben & IKEA pickup",
      copy: "We collect your finds from Willhaben, IKEA, and furniture stores.",
    },
    {
      id: "load",
      title: "Loading & unloading",
      copy: "Careful hands for stairs, tight courtyards, and heavy pieces.",
    },
    {
      id: "freight",
      title: "Furniture, machines & events",
      copy: "From sofas to stage gear — packed, secured, delivered.",
    },
    {
      id: "disposal",
      title: "Disposal by arrangement",
      copy: "Clear-outs and haul-away when you need the space back.",
    },
  ],
  proof: [
    { label: "Short-notice appointments", value: "Same week" },
    { label: "Service area", value: "Vienna +" },
    { label: "Free visit", value: "On request" },
    { label: "Offers", value: "No obligation" },
  ],
  steps: [
    {
      n: "01",
      title: "Tell us the job",
      copy: "WhatsApp the route, items, and timing — or use the quick form.",
    },
    {
      n: "02",
      title: "Get a fair quote",
      copy: "Clear pricing. Free visit if the load needs a look first.",
    },
    {
      n: "03",
      title: "We move it",
      copy: "Reliable crew, careful handling, done when we say.",
    },
  ],
} as const;
