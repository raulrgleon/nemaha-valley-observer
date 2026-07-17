export type ArticleCategory =
  | "news"
  | "sports"
  | "community"
  | "schools"
  | "business"
  | "agriculture"
  | "opinion"
  | "obituaries";

export type Locality =
  | "Auburn"
  | "Tecumseh"
  | "Peru"
  | "Nemaha County"
  | "Johnson County"
  | "Southeast Nebraska";

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: ArticleCategory;
  locality: Locality;
  authorId: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  heroImage: string;
  heroCaption: string;
  heroCredit: string;
  tags: string[];
  body: string[];
  wordCount: number;
  demo: true;
}

export interface Obituary {
  id: string;
  slug: string;
  name: string;
  age: number;
  city: string;
  diedOn: string;
  serviceAt: string;
  serviceLocation: string;
  summary: string;
  photo?: string;
  demo: true;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  city: Locality | string;
  venue: string;
  category: string;
  price: string;
  description: string;
  demo: true;
}

export interface Gallery {
  id: string;
  slug: string;
  title: string;
  eventName: string;
  date: string;
  photographer: string;
  coverImage: string;
  photoCount: number;
  images: string[];
  demo: true;
}

export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  sport: string;
  status: "upcoming" | "live" | "final";
  demo: true;
}

export interface PublicNotice {
  id: string;
  title: string;
  type: string;
  agency: string;
  city: string;
  county: string;
  date: string;
  summary: string;
  demo: true;
}

export interface Classified {
  id: string;
  slug: string;
  title: string;
  category: string;
  price?: string;
  city: string;
  postedAt: string;
  summary: string;
  demo: true;
}

export interface DirectoryListing {
  id: string;
  slug: string;
  name: string;
  category: string;
  city: string;
  phone: string;
  address: string;
  summary: string;
  sponsored?: boolean;
  demo: true;
}

export interface JobPosting {
  id: string;
  slug: string;
  title: string;
  employer: string;
  city: string;
  type: string;
  postedAt: string;
  summary: string;
  demo: true;
}

export interface ArchiveEdition {
  id: string;
  year: number;
  month: string;
  title: string;
  source: "Herald Archives" | "Chieftain Archives" | "Nemaha Valley Observer";
  coverLabel: string;
  externalUrl?: string;
  demo: true;
}

export interface BreakingNews {
  enabled: boolean;
  text: string;
  href: string;
  level: "alert" | "weather" | "urgent";
  sticky: boolean;
}
