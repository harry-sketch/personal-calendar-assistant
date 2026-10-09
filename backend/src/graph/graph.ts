import { system_prompt } from "../prompts/system.prompt.ts";
import { State } from "./state.ts";

const app = State.compile();

export const runAgent = async () => {
  try {
    const completions = await app.invoke({
      messages: [system_prompt, { role: "human", content: "" }],
    });

    console.log(
      `Assistant: ${completions.messages[completions.messages.length - 1]?.content}`,
    );
  } catch (error) {
    console.log(`Something went wrong ${error}`);
  }
};
