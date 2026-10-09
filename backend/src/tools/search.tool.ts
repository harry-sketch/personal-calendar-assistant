import { TavilySearch } from "@langchain/tavily";

export const searchTool = new TavilySearch({
  maxResults: 3,
  topic: "general",
});
