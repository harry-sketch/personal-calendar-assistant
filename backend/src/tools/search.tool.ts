import { tool } from "@langchain/core/tools";
import { TavilySearch } from "@langchain/tavily";
import z from "zod/v3";

const tavily = new TavilySearch({
  maxResults: 1,
  topic: "general",
  includeImages: false,
});

export const webSearch = tool(
  async ({ query }) => {
    try {
      const resp = await tavily.invoke({ query });

      const result =
        typeof resp === "string" ? JSON.parse(resp).results : resp.results;

      const data = (result ?? []).map(
        ({ title, content }: { title: string; content?: string }) => ({
          title,
          content: (content ?? "").slice(0, 500),
        }),
      );
      return JSON.stringify({
        found: true,
        data,
      });
    } catch (error) {
      console.log("Something went wrong while fetching data", error);

      return JSON.stringify({
        found: false,
        message: "no search content found",
      });
    }
  },
  {
    name: "web_search",
    description:
      "Search the web for current weather or news. Call once per city or topic, with a specific query like 'current weather in Krabi Thailand'",
    schema: z.object({
      query: z
        .string()
        .describe(
          "Search query to use the web for current information like weather or news",
        ),
    }),
  },
);
