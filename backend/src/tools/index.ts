import {
  createCalendarEventTools,
  getCalendarEventTool,
} from "./calendar.tool.ts";
import { searchContactTool } from "./search.contact.tool.ts";
import { webSearch } from "./search.tool.ts";

export const tools = [
  webSearch,
  createCalendarEventTools,
  getCalendarEventTool,
  searchContactTool,
];
