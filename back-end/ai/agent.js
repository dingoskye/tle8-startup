import { AzureChatOpenAI } from "@langchain/openai"
import { createAgent, tool } from "langchain";
import {getDate, getDepartures, getTrip, retrieve} from "./tools.js"
import { MemorySaver } from "@langchain/langgraph";

const model = new AzureChatOpenAI({temperature: 0.2});
const checkpointer = new MemorySaver();

const agent = createAgent({
    model,
    tools: [getDate, getTrip, getDepartures, retrieve],
    checkpointer,
    systemPrompt: ""
});

export async function callAgent(prompt) {
    try {
        const result = await agent.invoke(
            {messages: [{ role: "user", content: prompt }]},
            { configurable: { thread_id: "1" } }
        );

        const finalMessage = result.messages.at(-1);
        console.log(finalMessage.content);

        return finalMessage.content;

    } catch (e) {
        console.log("Azure OpenAI error:", e.message);
        return "Sorry, the assistant is currently unavailable.";
    }
}

const result = await callAgent("Wat zijn de huisregels van ns")

console.log(result);
