export const siteConfig = {
  name: "Nemaha Valley Observer",
  shortName: "NVO",
  tagline: "Serving Southeast Nebraska",
  description:
    "Community news, sports, obituaries, events, and public notices for Auburn, Tecumseh, Peru, and southeast Nebraska.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://newspaper.deto.llc",
  address: {
    line1: "PO Box 250",
    city: "Auburn",
    state: "NE",
    zip: "68305",
  },
  phone: "(402) 274-3185",
  email: "news@nemahavalleyobserver.com",
  facebook: "https://www.facebook.com/",
  coverage: [
    "Auburn",
    "Tecumseh",
    "Peru",
    "Nemaha County",
    "Johnson County",
    "Southeast Nebraska",
  ],
} as const;

export const navCategories = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Sports", href: "/sports" },
  { label: "Obituaries", href: "/obituaries" },
  { label: "Community", href: "/community" },
  { label: "Events", href: "/events" },
  { label: "Schools", href: "/schools" },
  { label: "Business", href: "/business" },
  { label: "Agriculture", href: "/agriculture" },
  { label: "Public Notices", href: "/public-notices" },
  { label: "Opinion", href: "/opinion" },
  { label: "Photo Galleries", href: "/photo-galleries" },
  { label: "Classifieds", href: "/classifieds" },
  { label: "Archives", href: "/archives" },
] as const;

export const moreLinks = [
  { label: "Directory", href: "/directory" },
  { label: "Jobs", href: "/jobs" },
  { label: "Print Edition", href: "/print-edition" },
  { label: "Subscribe", href: "/subscribe" },
  { label: "Advertise", href: "/advertise" },
  { label: "Migration plan", href: "/migration" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "Staff", href: "/staff" },
] as const;
