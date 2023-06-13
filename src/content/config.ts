import { defineCollection, reference, z } from 'astro:content';

const speakers = defineCollection({
  schema: z.object({
    name: z.string(),
    avatar: z.string(),
    pronouns: z.string(),
    socialDescription: z.string(),
    socialImage: z.string().optional(),
    socialLinks: z.object({
      mastodon: z.string().optional(),
      instagram: z.string().optional(),
      github: z.string().optional(),
      twitter: z.string().optional(),
      personalWebsite: z.string().optional(),
      companyWebsite: z.string().optional()
    })
  })
});

const events = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    socialDescription: z.string(),
    socialImage: z.string().optional(),
    speakers: z.array(reference('speakers')),
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

const resources = defineCollection({
  schema: z.object({
    title: z.string(),
    socialDescription: z.string().optional(),
    socialImage: z.string().optional(),
    pubDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
    updatedDate: z
    .string()
    .optional()
    .transform((str) => (str ? new Date(str) : undefined))
  })
})

export const collections = { events, speakers };
