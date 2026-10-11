import { CallbackHandler } from "@langfuse/langchain";

export const langfuseHandler = new CallbackHandler({
  sessionId: "1",
  userId: "1",
});
