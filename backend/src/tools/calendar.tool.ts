import { tool } from "@langchain/core/tools";
import z from "zod/v3";
import { calendar } from "../google/calendar.client.ts";

export const getCalendarEventTool = tool(
  async ({ timeMin, timeMax, q }) => {
    try {
      const resp = await calendar.events.list({
        calendarId: "primary",
        maxResults: 1,
        q,
        timeMax,
        timeMin,
      });

      const results = resp.data.items;

      if (!results || results.length === 0) {
        console.log("No upcoming events found.");
        return;
      }

      const events = results.map(
        ({
          id,
          start,
          end,
          organizer,
          hangoutLink,
          attendees,
          summary,
          status,
          description,
          eventType,
        }) => {
          return {
            id,
            summary,
            start,
            end,
            organizer,
            hangoutLink,
            attendees,
            status,
            description,
            eventType,
          };
        },
      );

      return JSON.stringify(events);
    } catch (error) {
      console.log("Failed to connect to the calendar", error);
    }
  },
  {
    name: "get-calendar-events",
    description: "Call to get the calendar events",
    schema: z.object({
      q: z
        .string()
        .describe(
          "The query to be used ti get events from google calnedar. It can be one of these values: summary, description, localion ,attendees display name, attendees email, organiser's name, organiser's email",
        ),
      timeMax: z
        .string()
        .describe("The to datetime in UTC format for the event"),
      timeMin: z
        .string()
        .describe("The from datetime in UTC format for the event"),
    }),
  },
);

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
