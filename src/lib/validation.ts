import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(5).max(200),
  dek: z.string().min(10).max(500),
  slug: z.string().min(3).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: z.string().min(2),
  locality: z.string().min(2),
  body: z.string().min(20),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  heroImage: z.string().url().optional().or(z.literal("")),
  heroCaption: z.string().optional(),
  heroCredit: z.string().optional(),
  status: z.enum(["DRAFT", "REVIEW", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
  subscriberOnly: z.boolean().default(false),
});

export const eventSubmitSchema = z.object({
  title: z.string().min(3).max(160),
  date: z.string().min(8),
  time: z.string().min(1),
  city: z.string().min(2),
  venue: z.string().min(2),
  category: z.string().min(2),
  price: z.string().default("Free"),
  description: z.string().min(10),
  email: z.string().email().optional(),
  website: z.string().optional(), // honeypot
});

export const newsletterSchema = z.object({
  email: z.string().email(),
  lists: z.array(z.string()).min(1),
  company: z.string().optional(), // honeypot
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
