import "dotenv/config";
import { runAgent } from "./src/graph/graph.ts";

const main = async () => {
  await runAgent();
};

main();
