import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { system_prompt } from "../prompts/system.prompt.ts";
import { State } from "./state.ts";

const app = State.compile();

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

      const completions = await app.invoke({
        messages: [
          system_prompt,
          { role: "human", content: "Do I have any meetings today ?" },
        ],
      });

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
