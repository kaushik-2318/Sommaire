import { GoogleGenerativeAI } from '@google/generative-ai';
import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';

const geneAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export const generateSummaryFromGemini = async (pdfText) => {
    try {
        const model = geneAI.getGenerativeModel({
            model: 'gemini-1.5-pro-002',
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1500,
            }
        });

        const prompt = {
            contents: [{
                role: 'user',
                parts: [{ text: SUMMARY_SYSTEM_PROMPT }, {
                    text: `Transform this document into an engaging, easy—to—read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
                }
                ]
            }]
        };
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = await response.text();
        if (!responseText) {
            throw new Error(`Empty Response from Gemini`);
        }
        return responseText;

    } catch (err) {
        console.error('Gemini API Error', err);
        throw err;
    }
}