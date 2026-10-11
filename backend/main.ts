import "dotenv/config";
import "./src/langfuse/langfuse.ts";
import { runAgent } from "./src/graph/graph.ts";

const main = async () => {
  await runAgent();
};

main();
