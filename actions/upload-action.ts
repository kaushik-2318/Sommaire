"use server"

import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

export async function generatePdfSummary(uploadResponse: [{
    serverData: {
        userId: string,
        file: {
            url: string,
            name: string,
        },
    }
}]) {
    if (!uploadResponse) {
        return {
            success: false,
            message: "File Uploaded Fail",
            data: null
        };
    }

    const { serverData: { userId, file: { url: pdfUrl, name: fileName } } } = uploadResponse[0];

    if (!pdfUrl) {
        return {
            success: false,
            message: "File Uploaded Fail",
            data: null
        };
    }

    try {

        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log({ pdfText })

        let summary;

        try {
            summary = await generateSummaryFromGemini(pdfText);
        } catch (geminierror) {
            console.error("Gemini Api Failed", geminierror);
            throw new Error("Failed to generate summary"); 
        }

        if (!summary) {
            return {
                success: false,
                message: "Summary Generation Fail",
                data: null
            };
        }
        return {
            success: true,
            message: "Summary Generated Successfully",
            data: { summary }
        }
    } catch (error) {
        return {
            success: false,
            message: "File Uploaded Fail",
            data: null
        };

    }
}