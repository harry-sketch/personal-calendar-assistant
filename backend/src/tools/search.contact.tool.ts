import { tool } from "@langchain/core/tools";
import type { people_v1 } from "googleapis";
import z from "zod/v3";
import { people } from "../google-client/calendar.client.ts";

export const searchContactTool = tool(
  async ({ name }) => {
    try {
      const readMask = "names,emailAddresses";

      const [saved, other] = await Promise.all([
        people.people.searchContacts({ query: name, pageSize: 4, readMask }),
        people.otherContacts.search({ query: name, pageSize: 4, readMask }),
      ]);

      const toMatch = (person: people_v1.Schema$Person | undefined) => {
        return {
          name: person?.names?.[0]?.displayName,
          emailAddresses: person?.emailAddresses?.map(({ value }) => value),
        };
      };

      const matches = [
        ...(saved.data.results ?? []),
        ...(other.data.results ?? []),
      ].map(({ person }) => toMatch(person));

      const emailsOnly = matches.filter(({ emailAddresses }) => emailAddresses);

      if (emailsOnly.length === 0) {
        return JSON.stringify({
          found: false,
          message: "No email found for this user, ask user for email address",
        });
      }

      return JSON.stringify({
        found: true,
        emailsOnly,
      });
    } catch (error) {
      console.log("Something went wrong while fetching contacts", error);
    }
  },
  {
    name: "search_google_contacts",
    description:
      "Search the user's Google Contacts by name. Use this when you need to find a person's contact details such as email address, phone number, or organization. Returns a list of matching contacts with their available details. If no match is found, returns an empty list.",
    schema: z.object({
      name: z
        .string()
        .describe(
          "The name (full or partial) of the person to search for in Google Contacts, e.g. 'Rahul' or 'Rahul Sharma'.",
        ),
    }),
  },
);
