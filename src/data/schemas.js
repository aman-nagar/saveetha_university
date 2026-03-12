// src/data/schemas.js
import { z } from "zod";

/**
 * Zod Schemas for Public Content Validation
 * Ensures data from API matches expected structure
 * Prevents runtime errors from malformed data
 */

// ===== HEADER SCHEMAS =====
const LinkSchema = z.object({
  label: z.string(),
  url: z.string().url().or(z.string().startsWith("/")),
});

const TopBarSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  links: z.array(LinkSchema),
  admissionButton: z.object({
    label: z.string(),
    url: z.string().url().or(z.string().startsWith("/")),
  }),
  languageSelector: z.boolean().optional(),
});

const BrandingSchema = z.object({
  logo: z.string(),
  universityName: z.string(),
  tagline: z.string(),
  recognition: z.string(),
  rightBanner: z.string().optional(),
});

const NavigationItemSchema = z.object({
  label: z.string(),
  url: z.string().url().or(z.string().startsWith("/")),
  submenu: z.array(LinkSchema).optional(),
});

const HeaderSchema = z.object({
  topbar: TopBarSchema,
  branding: BrandingSchema,
  navigation: z.array(NavigationItemSchema),
});

// ===== HOME PAGE SCHEMAS =====
const HeroSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  backgroundImage: z.string(),
  ctaButtons: z.array(
    z.object({
      label: z.string(),
      url: z.string().url().or(z.string().startsWith("/")),
      variant: z.enum(["primary", "secondary"]).optional(),
    }),
  ),
});

const ProgramSchema = z.object({
  id: z.number().or(z.string()),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  duration: z.string().optional(),
  link: z.string().url().or(z.string().startsWith("/")).optional(),
});

const StatsSchema = z.object({
  students: z.number(),
  faculty: z.number(),
  programs: z.number(),
  research: z.number().optional(),
});

const TestimonialSchema = z.object({
  id: z.number().or(z.string()),
  name: z.string(),
  role: z.string(),
  message: z.string(),
  avatar: z.string(),
});

const AnnouncementSchema = z.object({
  id: z.number().or(z.string()),
  title: z.string(),
  date: z.string(),
  link: z.string().url().or(z.string().startsWith("/")),
  isHighlight: z.boolean().optional(),
});

const HomeSchema = z.object({
  hero: HeroSchema,
  programs: z.array(ProgramSchema),
  stats: StatsSchema,
  testimonials: z.array(TestimonialSchema),
  announcements: z.array(AnnouncementSchema),
  about: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      image: z.string(),
      points: z.array(z.string()),
    })
    .optional(),
});

// ===== FOOTER SCHEMAS =====
const FooterSchema = z.object({
  copyright: z.string(),
  quickLinks: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url().or(z.string().startsWith("/")),
      }),
    )
    .optional(),
  social: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string().url(),
        icon: z.string().optional(),
      }),
    )
    .optional(),
  contact: z
    .object({
      phone: z.string(),
      email: z.string().email(),
      address: z.string(),
    })
    .optional(),
});

// ===== MAIN PUBLIC CONTENT SCHEMA =====
export const PublicContentSchema = z.object({
  header: HeaderSchema,
  home: HomeSchema,
  footer: FooterSchema,
  announcements: z.array(AnnouncementSchema),
});

// ===== EXPORT INDIVIDUAL SCHEMAS =====
export {
  HeaderSchema,
  HomeSchema,
  FooterSchema,
  HeroSchema,
  ProgramSchema,
  StatsSchema,
  TestimonialSchema,
  AnnouncementSchema,
};

/**
 * Validation function - use this to validate API responses
 * Example: validatePublicContent(apiData)
 */
export function validatePublicContent(data) {
  try {
    return PublicContentSchema.parse(data);
  } catch (err) {
    console.error("❌ Content validation failed:", err.errors);
    throw new Error("Invalid content structure from API");
  }
}
