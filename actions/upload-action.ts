"use server"

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/file-format";
import { auth } from "@clerk/nextjs/server";

interface PdfSummaryType {
    userId?: string,
    fileUrl: string,
    summary: string,
    title: string,
    fileName: string
}

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

        const formattedFileName = formatFileNameAsTitle(fileName);
        return {
            success: true,
            message: "Summary Generated Successfully",
            data: { title: formattedFileName, summary }
        }
    } catch (error) {
        return {
            success: false,
            message: "File Uploaded Fail",
            data: null
        };

    }
}


async function savePdfSummary({ userId, fileUrl, summary, title, fileName }: PdfSummaryType) {
    try {
        const sql = await getDbConnection();
        await sql`INSERT INTO pdf_summaries(user_id, original_file_url, summary_text, title, file_name) VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName});`;
    } catch (error) {
        console.error("Failed to save summary", error);
        throw new Error("Error in saving summary");
    }
}

export async function storePdfSummaryAction({ fileUrl, summary, title, fileName }: PdfSummaryType) {
    let saveSummary: any;
    try {
        const { userId } = await auth();
        if (!userId) {
            return {
                success: false,
                message: "User not found",
            };
        }

        saveSummary = await savePdfSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName
        });

        if (!saveSummary) {
            return {
                success: false,
                message: "Failed to store summary. Please try again...",
            };
        }

        return {
            success: true,
            message: "Summary stored successfully"
        }

    } catch (err) {
        return {
            success: false,
            message: err instanceof Error ? err.message : "Failed to store summary",
            data: null
        };
    }
}