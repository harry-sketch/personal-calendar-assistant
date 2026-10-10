import { tool } from "@langchain/core/tools";
import z from "zod/v3";
import { calendar } from "../google-client/calendar.client.ts";
import type { ICreateCalendarRequestBody } from "../types/types.ts";
import { timeZone } from "../utils/helpers.ts";

export const getCalendarEventTool = tool(
  async ({ timeMin, timeMax, q }) => {
    try {
      const resp = await calendar.events.list({
        calendarId: "primary",
        maxResults: 1,
        q: q || undefined,
        timeMax,
        timeMin,
        singleEvents: true,
        orderBy: "startTime",
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
  async (params: ICreateCalendarRequestBody) => {
    try {
      const { attendees, hangoutLink, end, start, summary } = params;

      const event = await calendar.events.insert({
        calendarId: "primary",
        sendUpdates: "all",
        conferenceDataVersion: 1,
        requestBody: {
          hangoutLink,
          attendees,
          start: {
            dateTime: start.dateTime,
            timeZone,
          },
          end: {
            dateTime: end.dateTime,
            timeZone,
          },
          summary,
          conferenceData: {
            createRequest: {
              requestId: crypto.randomUUID(),
              conferenceSolutionKey: {
                type: "hangoutsMeet",
              },
            },
          },
        },
      });

      if (!event.ok) {
        throw new Error("error in creating meeting");
      }

      return JSON.stringify([
        {
          success: true,
          id: event.data.id,
          summary: event.data.summary,
          start: event.data.start,
          end: event.data.end,
          meetLink: event.data.hangoutLink ?? null,
          eventLink: event.data.htmlLink,
          attendees: event.data.attendees?.map((a) => {
            return {
              email: a.email,
              displayName: a.displayName,
            };
          }),
        },
      ]);
    } catch (error) {
      console.log("Something went wrong while creating the event", error);
    }
  },
  {
    name: "create-calendar-events",
    description: "Call to create the calendar events",
    schema: z.object({
      attendees: z.array(
        z.object({
          email: z.string().describe("The email of the attendee"),
          displayName: z.string().describe("The name of the attendee"),
        }),
      ),
      hangoutLink: z
        .string()
        .describe("The absolute link of the created meeting"),
      start: z.object({
        dateTime: z
          .string()
          .regex(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
            "Use local time without timezone",
          )
          .describe(
            "Local start time WITHOUT timezone or offset, e.g. 2026-10-10T13:00:00 for 1 PM",
          ),
      }),
      end: z.object({
        dateTime: z
          .string()
          .regex(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
            "Use local time without timezone",
          )
          .describe(
            "Local end time WITHOUT timezone or offset, e.g. 2026-10-10T14:00:00",
          ),
      }),
      summary: z.string().describe("The title of the event"),
    }),
  },
);
