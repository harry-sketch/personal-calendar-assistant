import { SystemMessage, trimMessages } from "@langchain/core/messages";
import { groqModel } from "../../llm/groq.model.ts";
import { getSystemPrompt } from "../../prompts/system.prompt.ts";
import type { TAgentStateType } from "../../types/types.ts";

export const agentNode = async (state: TAgentStateType) => {
  try {
    const recentMessages = await trimMessages(state.messages, {
      maxTokens: 5,
      tokenCounter: (msg) => msg.length,
      strategy: "last",
      startOn: "human",
    });

    const resp = await groqModel.invoke([
      new SystemMessage(getSystemPrompt()),
      ...recentMessages,
    ]);

    return {
      messages: [resp],
    };
  } catch (error) {
    console.log("Someting went wrong while running llm", error);
  }
};
