import { ChatGroq } from "@langchain/groq";
import { tools } from "../tools/index.ts";

export const groqModel = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0.2,
  maxRetries: 3,
}).bindTools(tools);
