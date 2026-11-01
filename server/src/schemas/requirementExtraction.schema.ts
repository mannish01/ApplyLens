
import { z } from 'zod';

export const RequirementExtractionSchema = z.object({
  requirements: z.array(
    z.object({
      category: z.enum([
        'CGPA',
        'BRANCH',
        'GRADUATION_YEAR',
        'SKILL',
        'OTHER',
      ]),

      description: z.string(),

      isMandatory: z.boolean(),

      expectedValue: z.string().nullable(),

      evidence: z.object({
        pageNumber: z.number().int().positive(),
        quote: z.string(),
      }),
    }),
  ),
});

export type RequirementExtraction = z.infer<
  typeof RequirementExtractionSchema
>;
