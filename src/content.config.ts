import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const editorial = defineCollection({
  loader: glob({ base: './src/content/editorial', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    pieceTitle: z.string(),
    pieceSummary: z.string(),
    title: z.string(),
    chapterNumber: z.number().int().positive(),
    summary: z.string(),
    published: z.boolean(),
    publishDate: z.coerce.date().optional(),
  }),
});

const text = defineCollection({
  loader: glob({ base: './src/content/text', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    excerpt: z.string(),
    coverImage: z.string().optional(),
    pdfUrl: z.string().optional(),
    published: z.boolean(),
    publishDate: z.coerce.date().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
  schema: z
    .object({
      title: z.string(),
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      category: z.enum(['tattoos', 'logos', 'jewellery']),
      summary: z.string().optional(),
      image: z.string().optional(),
      pdfUrl: z.string().optional(),
      behanceUrl: z.string().url().optional(),
      sortOrder: z.number().int().nonnegative(),
    })
    .superRefine((data, ctx) => {
      if (data.category === 'logos') {
        if (!data.pdfUrl) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['pdfUrl'],
            message: 'Logo entries require a local PDF path.',
          });
        } else if (!data.pdfUrl.startsWith('/pdfs/')) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['pdfUrl'],
            message: 'Logo PDF paths must resolve from /public/pdfs via /pdfs/* URLs.',
          });
        }

        if (data.behanceUrl) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['behanceUrl'],
            message: 'External logo links are disabled; use local PDFs only.',
          });
        }
      }

      if ((data.category === 'tattoos' || data.category === 'jewellery') && !data.image) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['image'],
          message: 'Gallery entries require a local image path.',
        });
      }
    }),
});

const shop = defineCollection({
  loader: glob({ base: './src/content/shop', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    description: z.string(),
    status: z.literal('out_of_stock'),
    heroImage: z.string(),
    gallery: z.array(z.string()).optional(),
    inquirySubject: z.string(),
    sortOrder: z.number().int().nonnegative(),
  }),
});

export const collections = {
  editorial,
  text,
  work,
  shop,
};
