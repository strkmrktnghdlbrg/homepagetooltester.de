import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const imageObject = z.object({
  url: z.string(),
  credit: z.string(),
  creditUrl: z.string(),
});

const builders = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/builders' }),
  schema: z.object({
    rank: z.number(),
    name: z.string(),
    slug: z.string(),
    logoText: z.string(),
    color: z.string(),
    tagline: z.string(),
    bestFor: z.string(),
    award: z.string().optional(),
    scoreOverall: z.number(),
    scores: z.object({
      bedienung: z.number(),
      design: z.number(),
      funktionen: z.number(),
      seo: z.number(),
      preis: z.number(),
      support: z.number(),
    }),
    priceFrom: z.string(),
    priceNote: z.string(),
    shop: z.boolean(),
    deServer: z.boolean(),
    free: z.enum(['yes', 'partial', 'no']),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    verdict: z.string(),
    websiteLabel: z.string(),
    affiliateUrl: z.string(),
    heroImage: imageObject,
  }),
});

const usecases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/usecases' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    accentEmoji: z.string(),
    heroHighlight: z.string(),
    lede: z.string(),
    requirements: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        text: z.string(),
      })
    ),
    topBuilders: z.array(
      z.object({
        builderSlug: z.string(),
        why: z.array(z.string()),
      })
    ),
    steps: z.array(
      z.object({
        title: z.string(),
        text: z.string(),
      })
    ),
    faq: z.array(
      z.object({
        q: z.string(),
        a: z.string(),
      })
    ),
    image: imageObject,
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    excerpt: z.string(),
    author: z.string(),
    date: z.string(),
    readingTime: z.string(),
    image: imageObject,
  }),
});

export const collections = { builders, usecases, articles };
