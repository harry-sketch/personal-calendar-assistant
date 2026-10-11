import { ChatGroq } from "@langchain/groq";
import { tools } from "../tools/index.ts";

export const groqModel = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
  maxRetries: 6,
  maxTokens: 800,
}).bindTools(tools);
