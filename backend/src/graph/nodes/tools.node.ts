import { ToolNode } from "@langchain/langgraph/prebuilt";
import { tools } from "../../tools/index.ts";

export const toolNode = new ToolNode(tools);
