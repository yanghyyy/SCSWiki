import { z } from 'zod';

export const contentCategories = [
  'about',
  'career',
  'campus',
  'competitions',
  'development',
  'faq',
  'research',
  'services',
  'start',
  'study',
] as const;

export const contentTypes = ['official-source', 'verified', 'experience', 'archived'] as const;
export const contentStatuses = ['draft', 'active', 'needs-review', 'archived'] as const;

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const frontMatterDateSchema = z.union([
  z.string().regex(datePattern, 'date must use YYYY-MM-DD'),
  z.date().transform((value) => value.toISOString().slice(0, 10)),
]);

export const sourceSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
});

export const frontMatterSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(contentCategories),
    audience: z.array(z.string().min(1)).default([]),
    content_type: z.enum(contentTypes),
    status: z.enum(contentStatuses),
    last_verified: frontMatterDateSchema,
    review_after: frontMatterDateSchema,
    maintainers: z.array(z.string().min(1)).min(1),
    sources: z.array(sourceSchema),
    meta_exempt: z.boolean().optional(),
  })
  .superRefine((value, context) => {
    if (value.review_after < value.last_verified) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['review_after'],
        message: 'review_after must not be earlier than last_verified',
      });
    }

    const highRiskCategories = new Set(['campus', 'research', 'services', 'start', 'career']);
    const isHighRiskActive = value.status === 'active' && highRiskCategories.has(value.category);
    if (
      isHighRiskActive &&
      value.content_type === 'official-source' &&
      value.sources.length === 0
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['sources'],
        message: 'active high-risk official-source pages need at least one source',
      });
    }
  });

export type FrontMatter = z.infer<typeof frontMatterSchema>;

export function isOutdated(
  reviewAfter: string,
  currentDate = new Date().toISOString().slice(0, 10),
) {
  return currentDate > reviewAfter;
}

export function validateFrontMatter(input: unknown) {
  return frontMatterSchema.safeParse(input);
}
