import { LangfuseSpanProcessor } from "@langfuse/otel";
import { NodeSDK } from "@opentelemetry/sdk-node";

export const langfuse = new NodeSDK({
  spanProcessors: [new LangfuseSpanProcessor()],
});

langfuse.start();

process.on("SIGINT", async () => {
  await langfuse.shutdown();
  process.exit(0);
});
