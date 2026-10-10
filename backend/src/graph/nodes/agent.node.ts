import { SystemMessage } from "@langchain/core/messages";
import { groqModel } from "../../llm/groq.model.ts";
import { getSystemPrompt } from "../../prompts/system.prompt.ts";
import type { TAgentStateType } from "../../types/types.ts";

export const agentNode = async (state: TAgentStateType) => {
  try {
    const resp = await groqModel.invoke([
      new SystemMessage(getSystemPrompt()),
      ...state.messages,
    ]);

    return {
      messages: [resp],
    };
  } catch (error) {
    console.log("Someting went wrong while running llm", error);
  }
};
