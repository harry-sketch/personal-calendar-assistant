import {
  createCalendarEventTools,
  getCalendarEventTool,
} from "./calendar.tool.ts";
import { searchTool } from "./search.tool.ts";

export const tools = [
  searchTool,
  createCalendarEventTools,
  getCalendarEventTool,
];
