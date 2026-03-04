import { NextRequest, NextResponse } from "next/server";
import { markets } from "@/lib/markets";
import { adaptForMarket } from "@/lib/ai/adapt";
import { AdaptationResult } from "@/lib/ai/schemas";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { content, marketIds } = (await req.json()) as {
    content: string;
    marketIds: string[];
  };

  if (!content || !marketIds?.length) {
    return NextResponse.json(
      { error: "Content and at least one market are required" },
      { status: 400 }
    );
  }

  const selectedMarkets = markets.filter((m) => marketIds.includes(m.id));

  if (!selectedMarkets.length) {
    return NextResponse.json({ error: "No valid markets selected" }, { status: 400 });
  }

  // Stream results as each market completes (NDJSON)
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const promises = selectedMarkets.map(async (market) => {
        try {
          const result = await adaptForMarket(content, market);
          controller.enqueue(
            encoder.encode(JSON.stringify({ type: "result", data: result }) + "\n")
          );
        } catch (error) {
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "error",
                data: { marketId: market.id, error: String(error) },
              }) + "\n"
            )
          );
        }
      });

      await Promise.all(promises);
      controller.enqueue(encoder.encode(JSON.stringify({ type: "done" }) + "\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Transfer-Encoding": "chunked",
    },
  });
}
