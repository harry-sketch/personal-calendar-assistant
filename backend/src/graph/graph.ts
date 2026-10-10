import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { config } from "../utils/helpers.ts";
import { app } from "./state.ts";

export const runAgent = async () => {
  const rl = createInterface({
    input: stdin,
    output: stdout,
  });

  try {
    while (true) {
      const q = await rl.question("You: ");

      if (q.toLowerCase().trim() === "bye") {
        return "Good Bye";
      }

      const completions = await app.invoke(
        {
          messages: [{ role: "human", content: q }],
        },
        config,
      );

      console.log(
        `Assistant: ${completions.messages[completions.messages.length - 1]?.content}`,
      );
    }
  } catch (error) {
    console.log(`Something went wrong ${error}`);
  } finally {
    rl.close();
  }
};
