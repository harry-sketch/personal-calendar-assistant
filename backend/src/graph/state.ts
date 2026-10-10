import {
  END,
  MemorySaver,
  MessagesAnnotation,
  START,
  StateGraph,
} from "@langchain/langgraph";

import { shouldContinue } from "./edge.ts";

import { agentNode } from "./nodes/agent.node.ts";

import { toolNode } from "./nodes/tools.node.ts";

const checkpointer = new MemorySaver();

const State = new StateGraph(MessagesAnnotation)
  .addNode("agent", agentNode)
  .addNode("tool", toolNode)
  .addEdge(START, "agent")
  .addEdge("tool", "agent")
  .addConditionalEdges("agent", shouldContinue, {
    tool: "tool",
    end: END,
  });

export const app = State.compile({
  checkpointer,
});
