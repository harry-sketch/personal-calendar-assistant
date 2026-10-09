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

export const getCalendarEventTool = tool(
  async () => {
    return JSON.stringify([
      {
        title: "Harsh meeting",
        date: `${new Date().toUTCString()}`,
        time: "10 pm",
        subject: "Discussion for salary",
      },

      {
        title: "Tour meeting",
        date: "10 Oct 2026",
        time: "10am",
        subject: "Discussion for salary",
      },
    ]);
  },
  {
    name: "get-calendar-events",
    description: "Call to get the calendar events",
    schema: z.object({}),
  },
);
