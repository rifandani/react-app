import { z } from 'zod';

// #region SCHEMAS
export const errorApiResponseSchema = z.object({
  message: z.string(),
});

export const resourceParamsSchema = z.object({
  limit: z.number().optional().describe('limit per page. limit=0 to clear'),
  skip: z.number().optional().describe('skip the first n items.'),
  select: z
    .string()
    .optional()
    .describe('select fields. could be comma separated'),
  delay: z.number().optional().describe('artificial delay in ms.'),
});

export const resourceListResponseSchema = z.object({
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});
// #endregion

export type ErrorApiResponseSchema = z.infer<typeof errorApiResponseSchema>;
export type ResourceParamsSchema = z.infer<typeof resourceParamsSchema>;
export type ResourceListResponseSchema = z.infer<
  typeof resourceListResponseSchema
>;
