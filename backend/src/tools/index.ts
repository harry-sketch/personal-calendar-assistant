import { createCalendarEventTools } from "./create-calendar-event-tool.ts";
import { getCalendarEventTool } from "./get-calendar-event-tool.ts";
import { searchTool } from "./search.ts";

export const tools = [
  searchTool,
  createCalendarEventTools,
  getCalendarEventTool,
];
