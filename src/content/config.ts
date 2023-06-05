import { defineCollection, z } from 'astro:content';

const events = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    socialDescription: z.string(),
    socialImage: z.string().optional(),
    // Transform string to Date object
    startDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    endDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    tags: z.string().array(),
    signupLink: z.string().optional()
  })
});

const speakers = defineCollection({
  schema: z.object({
    name: z.string(),
    avatar: z.string(),
    largeImage: z.string().optional(),
    socialLinks: z.object({
      github: z.string().optional(),
      twitter: z.string().optional(),
      mastodon: z.string().optional(),
      personalWebsite: z.string().optional(),
      companyWebsite: z.string().optional()
    })
  })
});

export const collections = { events, speakers };
