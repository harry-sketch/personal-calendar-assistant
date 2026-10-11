import {
  createCalendarEventTools,
  getCalendarEventTool,
} from "./calendar.tool.ts";
import { searchContactTool } from "./search.contact.tool.ts";
import { searchTool } from "./search.tool.ts";

export const tools = [
  searchTool,
  createCalendarEventTools,
  getCalendarEventTool,
  searchContactTool,
];
