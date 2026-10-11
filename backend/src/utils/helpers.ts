import { langfuseHandler } from "../langfuse/langfuse.handler.ts";

export const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const config = {
  configurable: {
    thread_id: "1",
  },
  callbacks: [langfuseHandler],
};
