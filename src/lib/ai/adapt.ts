import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { adaptationResultSchema, AdaptationResult } from "./schemas";
import { buildAdaptationPrompt } from "./prompts";
import { MarketProfile } from "../markets";

export async function adaptForMarket(
  sourceContent: string,
  market: MarketProfile
): Promise<AdaptationResult> {
  const { object } = await generateObject({
    model: openai("gpt-5-mini"),
    schema: adaptationResultSchema,
    system: buildAdaptationPrompt(market),
    prompt: `Transcreate the following marketing content for the ${market.name} market:\n\n${sourceContent}`,
  });

  return { ...object, marketId: market.id };
}
