import "dotenv/config";
// import { server } from "./src/server.ts";
import { runAgent } from "./src/graph/graph.ts";

const main = async () => {
  await runAgent();
  // await server();
};

main();
