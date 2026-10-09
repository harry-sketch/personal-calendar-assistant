import { tool } from "@langchain/core/tools";
import z from "zod/v3";

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
