import { z } from "zod";

export const culturalInsightSchema = z.object({
  original: z.string().describe("The original phrase or element that was changed"),
  adapted: z.string().describe("What it was changed to"),
  reason: z.string().describe("WHY this change was made — the cultural reasoning"),
});

export const adaptationResultSchema = z.object({
  marketId: z.string(),
  adaptedContent: z.string().describe("The fully transcreated content for this market"),
  culturalScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Cultural relevance score from 0-100"),
  insights: z
    .array(culturalInsightSchema)
    .describe("List of key cultural adaptations with explanations"),
  toneSummary: z
    .string()
    .describe("Brief description of the overall tone and approach used for this market"),
  brandVoiceAlignment: z
    .string()
    .nullable()
    .describe(
      "How the brand voice was preserved in this adaptation, including any tension points between brand voice and cultural norms. Return null if no brand voice guidelines were provided."
    ),
});

export type CulturalInsight = z.infer<typeof culturalInsightSchema>;
export type AdaptationResult = z.infer<typeof adaptationResultSchema>;
