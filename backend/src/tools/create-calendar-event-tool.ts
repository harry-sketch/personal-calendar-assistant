import { tool } from "@langchain/core/tools";
import z from "zod/v3";

export const createCalendarEventTools = tool(
  async () => {
    return "The Meeting has been created";
  },
  {
    name: "create-calendar-events",
    description: "Call to create the calendar events",
    schema: z.object({
      query: z.string().describe("The Query to use in creating calendar event"),
    }),
  },
);
