import { AIMessage } from "@langchain/core/messages";
import type { TAgentStateType } from "../types/types";

export const shouldContinue = (state: TAgentStateType) => {
  const lastMessage = state.messages[state.messages.length - 1];

  if (
    AIMessage.isInstance(lastMessage) &&
    (lastMessage.tool_calls?.length ?? 0) > 0
  ) {
    return "tool";
  }

  return "end";
};
