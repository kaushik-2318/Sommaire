import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummaryFromOpenAI(pdftext) {
    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: SUMMARY_SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdftext}.`
                },
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });
        return completion.choices[0].message.content;
    } catch (err) {
        if (err?.status === 429) {
            throw new Error("Rate Limit exceeded");
        }
        throw err;
    }
}


