import type {
  ArchiveEdition,
  Article,
  Author,
  BreakingNews,
  Classified,
  DirectoryListing,
  EventItem,
  Gallery,
  Game,
  JobPosting,
  Obituary,
  PublicNotice,
} from "@/types/content";

export const authors: Author[] = [
  {
    id: "staff",
    name: "NVO Staff",
    role: "Newsroom",
    bio: "Sample staff byline for demonstration content only.",
  },
  {
    id: "sports",
    name: "Sports Desk",
    role: "Sports",
    bio: "Covers southeast Nebraska school and community athletics. Demo byline.",
  },
  {
    id: "community",
    name: "Community Desk",
    role: "Community",
    bio: "Events, schools, and local features. Demo byline.",
  },
];

const placeholder = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const breakingNews: BreakingNews = {
  enabled: true,
  text: "City Council meeting agenda for Auburn posted for public review.",
  href: "/public-notices",
  level: "urgent",
  sticky: false,
};

export const articles: Article[] = [
  {
    id: "a1",
    slug: "auburn-community-center-summer-program-schedule",
    title: "Auburn Community Center Announces Summer Program Schedule",
    dek: "Registration opens next week for youth camps, senior fitness, and family evenings at the community center.",
    category: "community",
    locality: "Auburn",
    authorId: "community",
    publishedAt: "2026-07-14T10:00:00Z",
    featured: true,
    heroImage: placeholder("auburn-center"),
    heroCaption: "Auburn Community Center exterior.",
    heroCredit: "Observer photo",
    tags: ["Auburn", "Community", "Summer"],
    body: [
      "Registration details and room schedules will be posted at the community center and shared with local schools.",
      "The Auburn Community Center plans a full slate of summer activities, including youth day camps, adult fitness classes, and weekend family nights, according to a sample schedule prepared for this prototype.",
      "Organizers say registration will open online and in person, with scholarships available for qualifying families. Residents are encouraged to check the center’s bulletin board for room assignments and volunteer openings.",
      "Southeast Nebraska families looking for low-cost activities during the school break can find additional weekend events listed in the community calendar.",
    ],
    wordCount: 420,
    demo: true,
  },
  {
    id: "a2",
    slug: "local-students-regional-science-fair",
    title: "Local Students Participate in Regional Science Fair",
    dek: "Students from Auburn, Tecumseh, and Peru schools present projects focused on agriculture, water quality, and robotics.",
    category: "schools",
    locality: "Southeast Nebraska",
    authorId: "staff",
    publishedAt: "2026-07-13T15:30:00Z",
    featured: true,
    heroImage: placeholder("science-fair"),
    heroCaption: "science fair display.",
    heroCredit: "Observer photo",
    tags: ["Schools", "Science", "Youth"],
    body: [
      "Projects focused on soil health, water quality, and classroom robotics drew strong interest from families across the region.",
      "Regional science fair participants highlighted experiments on soil health, renewable energy models, and classroom robotics challenges.",
      "Teachers noted strong interest in agriculture-related projects, reflecting the region’s farming economy and classroom STEM partnerships.",
    ],
    wordCount: 310,
    demo: true,
  },
  {
    id: "a3",
    slug: "weekend-events-nemaha-johnson-counties",
    title: "Weekend Events Across Nemaha and Johnson Counties",
    dek: "Farmers markets, ballgames, and library programs headline a busy weekend for southeast Nebraska communities.",
    category: "community",
    locality: "Nemaha County",
    authorId: "community",
    publishedAt: "2026-07-12T09:00:00Z",
    featured: true,
    heroImage: placeholder("weekend-events"),
    heroCaption: "downtown weekend activity.",
    heroCredit: "Observer photo",
    tags: ["Events", "Nemaha County", "Johnson County"],
    body: [
      "Markets, youth sports, and civic meetings fill the weekend calendar. Submit events through the community form for review.",
      "Markets, youth sports, and civic meetings fill the weekend calendar. Readers can submit events for editorial review via the events form.",
    ],
    wordCount: 280,
    demo: true,
  },
  {
    id: "a4",
    slug: "auburn-youth-baseball-tournament-prep",
    title: "Auburn Youth Baseball Team Prepares for Tournament",
    dek: "Local coaches emphasize fundamentals ahead of a multi-team weekend bracket in southeast Nebraska.",
    category: "sports",
    locality: "Auburn",
    authorId: "sports",
    publishedAt: "2026-07-11T18:00:00Z",
    featured: true,
    heroImage: placeholder("youth-baseball"),
    heroCaption: "youth baseball practice.",
    heroCredit: "Observer photo",
    tags: ["Baseball", "Youth Sports", "Auburn"],
    body: [
      "Coaches emphasized pitching consistency, base running, and defensive positioning ahead of tournament play.",
      "Practice sessions this week focused on pitching consistency, base running, and defensive positioning ahead of tournament play.",
    ],
    wordCount: 260,
    demo: true,
  },
  {
    id: "a5",
    slug: "city-council-meeting-agenda-released",
    title: "City Council Meeting Agenda Released",
    dek: "Agenda items include infrastructure updates, community grants, and a public comment period.",
    category: "news",
    locality: "Auburn",
    authorId: "staff",
    publishedAt: "2026-07-10T14:00:00Z",
    featured: false,
    heroImage: placeholder("city-council"),
    heroCaption: "municipal building.",
    heroCredit: "Observer photo",
    tags: ["Government", "Auburn", "Public Meetings"],
    body: [
      "Residents may review agenda packets online or request printed copies at city hall during business hours.",
      "Residents may review agenda packets online or request printed copies at city hall during business hours.",
    ],
    wordCount: 240,
    demo: true,
  },
  {
    id: "a6",
    slug: "southeast-nebraska-farmers-harvest-season",
    title: "Southeast Nebraska Farmers Prepare for Harvest Season",
    dek: "Producers watch weather windows and grain markets as equipment maintenance wraps up across the region.",
    category: "agriculture",
    locality: "Southeast Nebraska",
    authorId: "staff",
    publishedAt: "2026-07-09T11:00:00Z",
    featured: false,
    heroImage: placeholder("harvest"),
    heroCaption: "farmland landscape.",
    heroCredit: "Observer photo",
    tags: ["Agriculture", "Harvest", "Weather"],
    body: [
      "Local elevators and co-ops typically publish harvest hours closer to peak season as weather windows open.",
      "Local elevators and co-ops typically publish harvest hours closer to peak season. This prototype uses placeholder scheduling language only.",
    ],
    wordCount: 290,
    demo: true,
  },
  {
    id: "a7",
    slug: "tecumseh-library-summer-reading-wraps",
    title: "Tecumseh Library Wraps Summer Reading Challenge",
    dek: "Young readers logged miles of pages; a closing celebration includes prizes and local authors.",
    category: "community",
    locality: "Tecumseh",
    authorId: "community",
    publishedAt: "2026-07-08T16:00:00Z",
    featured: false,
    heroImage: placeholder("tecumseh-library"),
    heroCaption: "library reading nook.",
    heroCredit: "Observer photo",
    tags: ["Tecumseh", "Library", "Youth"],
    body: [
      "Libraries across Johnson County often partner on summer literacy programs; check your local branch for closing events.",
      "Libraries across Johnson County often partner on summer literacy programs; confirm details with your local branch.",
    ],
    wordCount: 230,
    demo: true,
  },
  {
    id: "a8",
    slug: "peru-campus-community-arts-night",
    title: "Peru Campus Hosts Community Arts Night",
    dek: "Open studios, student performances, and family activities welcome visitors to campus.",
    category: "news",
    locality: "Peru",
    authorId: "staff",
    publishedAt: "2026-07-07T13:00:00Z",
    featured: false,
    heroImage: placeholder("peru-arts"),
    heroCaption: "campus arts night.",
    heroCredit: "Observer photo",
    tags: ["Peru", "Arts", "Campus"],
    body: [
      "Parking and accessibility information is posted with the campus events calendar ahead of arts night.",
      "Parking and accessibility information would normally appear here for a live event.",
    ],
    wordCount: 210,
    demo: true,
  },
  {
    id: "a9",
    slug: "auburn-bulldogs-fall-sports-preview",
    title: "Auburn Bulldogs Fall Sports Preview",
    dek: "Football, volleyball, and cross country teams outline early goals as practices begin.",
    category: "sports",
    locality: "Auburn",
    authorId: "sports",
    publishedAt: "2026-07-06T12:00:00Z",
    featured: false,
    heroImage: placeholder("bulldogs"),
    heroCaption: "high school athletics.",
    heroCredit: "Observer photo",
    tags: ["Auburn Bulldogs", "Football", "Volleyball"],
    body: [
      "Fall practices are underway as football, volleyball, and cross country teams set early-season goals.",
    ],
    wordCount: 250,
    demo: true,
  },
  {
    id: "a10",
    slug: "opinion-support-local-main-street",
    title: "Opinion: Supporting Main Street Is Supporting Community",
    dek: "An editorial reflection on shopping local, volunteering, and showing up for civic life.",
    category: "opinion",
    locality: "Southeast Nebraska",
    authorId: "staff",
    publishedAt: "2026-07-05T10:00:00Z",
    featured: false,
    heroImage: placeholder("main-street"),
    heroCaption: "downtown storefronts.",
    heroCredit: "Observer photo",
    tags: ["Opinion", "Business", "Community"],
    body: [
      "Healthy downtowns rely on readers who subscribe, advertisers who invest, and neighbors who attend local events.",
      "Healthy downtowns rely on readers who subscribe, advertisers who invest, and neighbors who attend local events.",
    ],
    wordCount: 320,
    demo: true,
  },
  {
    id: "a11",
    slug: "johnson-county-central-track-highlights",
    title: "Johnson County Central Track Athletes Post Strong Marks",
    dek: "Sample meet recap with placeholder placements for layout testing.",
    category: "sports",
    locality: "Johnson County",
    authorId: "sports",
    publishedAt: "2026-07-04T17:00:00Z",
    featured: false,
    heroImage: placeholder("track"),
    heroCaption: "track meet.",
    heroCredit: "Observer photo",
    tags: ["Track", "Johnson County Central"],
    body: [
      "Athletes posted competitive marks across sprints, jumps, and distance events in regional competition.",
    ],
    wordCount: 200,
    demo: true,
  },
  {
    id: "a12",
    slug: "nemaha-county-road-maintenance-update",
    title: "Nemaha County Shares Seasonal Road Maintenance Update",
    dek: "Crews prioritize gravel grading and bridge inspections ahead of heavier harvest traffic.",
    category: "news",
    locality: "Nemaha County",
    authorId: "staff",
    publishedAt: "2026-07-03T09:30:00Z",
    featured: false,
    heroImage: placeholder("county-roads"),
    heroCaption: "rural road.",
    heroCredit: "Observer photo",
    tags: ["Nemaha County", "Infrastructure"],
    body: [
      "Crews prioritize gravel grading and bridge inspections ahead of heavier harvest traffic.",
    ],
    wordCount: 190,
    demo: true,
  },
];

export const obituaries: Obituary[] = [
  {
    id: "o1",
    slug: "margaret-ellen-harwick",
    name: "Margaret Ellen Harwick",
    age: 84,
    city: "Auburn",
    diedOn: "2026-07-08",
    serviceAt: "2026-07-14 · 10:30 a.m.",
    serviceLocation: "Demo Chapel, Auburn",
    summary:
      "Margaret loved gardening, church choir, and Friday coffee with neighbors. A full service notice is available from the funeral home.",
    photo: placeholder("obit-1", 400, 500),
    demo: true,
  },
  {
    id: "o2",
    slug: "harold-james-whitcomb",
    name: "Harold James Whitcomb",
    age: 79,
    city: "Tecumseh",
    diedOn: "2026-07-06",
    serviceAt: "2026-07-12 · 2:00 p.m.",
    serviceLocation: "Demo Funeral Home, Tecumseh",
    summary:
      "Harold farmed for decades and mentored youth baseball coaches across Johnson County. Arrangements are pending with the family.",
    demo: true,
  },
  {
    id: "o3",
    slug: "elena-rose-campos",
    name: "Elena Rose Campos",
    age: 67,
    city: "Peru",
    diedOn: "2026-07-02",
    serviceAt: "2026-07-09 · 11:00 a.m.",
    serviceLocation: "Demo Community Church, Peru",
    summary:
      "Elena taught elementary school and organized summer reading celebrations. A memorial gathering will follow the service.",
    photo: placeholder("obit-3", 400, 500),
    demo: true,
  },
];

export const events: EventItem[] = [
  {
    id: "e1",
    slug: "auburn-farmers-market-july",
    title: "Auburn Farmers Market",
    date: "2026-07-19",
    time: "8:00 a.m. – 12:00 p.m.",
    city: "Auburn",
    venue: "Downtown Square",
    category: "Market",
    price: "Free",
    description: "Produce, crafts, and community booths on the downtown square.",
    demo: true,
  },
  {
    id: "e2",
    slug: "tecumseh-concert-in-park",
    title: "Concert in the Park",
    date: "2026-07-20",
    time: "7:00 p.m.",
    city: "Tecumseh",
    venue: "City Park Bandshell",
    category: "Arts",
    price: "Free",
    description: "Outdoor music evening for families at the city park bandshell.",
    demo: true,
  },
  {
    id: "e3",
    slug: "peru-alumni-weekend-kickoff",
    title: "Campus Alumni Weekend Kickoff",
    date: "2026-07-25",
    time: "5:00 p.m.",
    city: "Peru",
    venue: "Campus Green",
    category: "Campus",
    price: "Varies",
    description: "Welcome reception and campus tours for alumni weekend.",
    demo: true,
  },
  {
    id: "e4",
    slug: "nemaha-county-fair-preview-night",
    title: "County Fair Preview Night",
    date: "2026-07-26",
    time: "6:00 p.m.",
    city: "Nemaha County",
    venue: "Fairgrounds",
    category: "Fair",
    price: "$5",
    description: "Early exhibits and youth showmanship at the fairgrounds.",
    demo: true,
  },
];

export const galleries: Gallery[] = [
  {
    id: "g1",
    slug: "auburn-parade-highlights",
    title: "Auburn Parade Highlights",
    eventName: "Community Parade",
    date: "2026-07-04",
    photographer: "Staff photographer",
    coverImage: placeholder("gallery-parade"),
    photoCount: 24,
    images: [
      placeholder("gallery-parade-1"),
      placeholder("gallery-parade-2"),
      placeholder("gallery-parade-3"),
      placeholder("gallery-parade-4"),
    ],
    demo: true,
  },
  {
    id: "g2",
    slug: "bulldogs-homecoming-night",
    title: "Bulldogs Homecoming Night",
    eventName: "Homecoming",
    date: "2026-06-20",
    photographer: "Sports desk",
    coverImage: placeholder("gallery-homecoming"),
    photoCount: 36,
    images: [
      placeholder("gallery-hc-1"),
      placeholder("gallery-hc-2"),
      placeholder("gallery-hc-3"),
    ],
    demo: true,
  },
];

export const games: Game[] = [
  {
    id: "gm1",
    homeTeam: "Auburn Bulldogs",
    awayTeam: "Visitor Demo HS",
    homeScore: 28,
    awayScore: 14,
    date: "2026-07-10",
    sport: "Football",
    status: "final",
    demo: true,
  },
  {
    id: "gm2",
    homeTeam: "Johnson County Central",
    awayTeam: "Regional Demo",
    date: "2026-07-18",
    sport: "Baseball",
    status: "upcoming",
    demo: true,
  },
  {
    id: "gm3",
    homeTeam: "Auburn Youth Baseball",
    awayTeam: "Tecumseh Youth",
    homeScore: 4,
    awayScore: 3,
    date: "2026-07-17",
    sport: "Baseball",
    status: "live",
    demo: true,
  },
];

export const publicNotices: PublicNotice[] = [
  {
    id: "pn1",
    title: "Notice of Public Meeting — Planning Commission",
    type: "Public Meeting",
    agency: "City of Auburn",
    city: "Auburn",
    county: "Nemaha",
    date: "2026-07-22",
    summary: "Planning commission will discuss zoning items during the scheduled public meeting.",
    demo: true,
  },
  {
    id: "pn2",
    title: "Invitation to Bid — Road Maintenance Materials",
    type: "Bid",
    agency: "Nemaha County",
    city: "Auburn",
    county: "Nemaha",
    date: "2026-07-30",
    summary: "Nemaha County invites qualified vendors to bid on road maintenance materials.",
    demo: true,
  },
  {
    id: "pn3",
    title: "Budget Workshop Schedule",
    type: "Budget",
    agency: "Johnson County",
    city: "Tecumseh",
    county: "Johnson",
    date: "2026-08-05",
    summary: "Johnson County will hold a public budget workshop; the agenda is available from the county clerk.",
    demo: true,
  },
];

export const classifieds: Classified[] = [
  {
    id: "c1",
    slug: "riding-mower-auburn",
    title: "Riding Mower — Lightly Used",
    category: "For Sale",
    price: "$850",
    city: "Auburn",
    postedAt: "2026-07-12",
    summary: "Local classified — equipment listing for layout only.",
    demo: true,
  },
  {
    id: "c2",
    slug: "apartment-tecumseh",
    title: "Two-Bedroom Apartment Near Downtown",
    category: "Housing",
    price: "$725/mo",
    city: "Tecumseh",
    postedAt: "2026-07-11",
    summary: "Local classified — housing listing for layout only.",
    demo: true,
  },
];

export const directory: DirectoryListing[] = [
  {
    id: "d1",
    slug: "auburn-hardware-coop",
    name: "Auburn Hardware Co-op",
    category: "Retail",
    city: "Auburn",
    phone: "(402) 555-0101",
    address: "100 Main St (demo)",
    summary: "Local business listing — hardware and farm supplies.",
    sponsored: true,
    demo: true,
  },
  {
    id: "d2",
    slug: "valley-family-clinic",
    name: "Valley Family Clinic",
    category: "Health",
    city: "Tecumseh",
    phone: "(402) 555-0144",
    address: "220 Oak Ave (demo)",
    summary: "Local business listing — primary care.",
    demo: true,
  },
];

export const jobs: JobPosting[] = [
  {
    id: "j1",
    slug: "front-desk-coordinator",
    title: "Front Desk Coordinator",
    employer: "Demo Medical Office",
    city: "Auburn",
    type: "Full-time",
    postedAt: "2026-07-10",
    summary: "Job listing — customer service and scheduling.",
    demo: true,
  },
  {
    id: "j2",
    slug: "seasonal-farm-hand",
    title: "Seasonal Farm Hand",
    employer: "Demo Family Farm",
    city: "Nemaha County",
    type: "Seasonal",
    postedAt: "2026-07-08",
    summary: "Job listing — harvest support.",
    demo: true,
  },
];

export const archives: ArchiveEdition[] = [
  {
    id: "ar1",
    year: 2026,
    month: "July",
    title: "July 10, 2026 Edition",
    source: "Nemaha Valley Observer",
    coverLabel: "Week of July 10",
    demo: true,
  },
  {
    id: "ar2",
    year: 1998,
    month: "March",
    title: "Herald Archives — March 1998",
    source: "Herald Archives",
    coverLabel: "Herald · Mar 1998",
    externalUrl: "#",
    demo: true,
  },
  {
    id: "ar3",
    year: 1985,
    month: "November",
    title: "Chieftain Archives — November 1985",
    source: "Chieftain Archives",
    coverLabel: "Chieftain · Nov 1985",
    externalUrl: "#",
    demo: true,
  },
];

export function getAuthor(id: string) {
  return authors.find((a) => a.id === id) ?? authors[0];
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Article["category"]) {
  return articles.filter((a) => a.category === category);
}

export function getFeaturedArticles() {
  return articles.filter((a) => a.featured);
}

export function getLatestArticles(limit = 8) {
  return [...articles]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit);
}

export function searchContent(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return { articles: [], obituaries: [], events: [], notices: [] };

  return {
    articles: articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.dek.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.locality.toLowerCase().includes(q) ||
        a.body.some((p) => p.toLowerCase().includes(q)),
    ),
    obituaries: obituaries.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q) ||
        o.summary.toLowerCase().includes(q),
    ),
    events: events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q),
    ),
    notices: publicNotices.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.agency.toLowerCase().includes(q) ||
        n.type.toLowerCase().includes(q),
    ),
  };
}
