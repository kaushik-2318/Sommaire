"use server"

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/file-format";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generatePdfSummary(uploadResponse) {
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
        let summary;
        try {
            summary = await generateSummaryFromOpenAI(pdfText);
        } catch (err) {
            console.error(err);
            if (err && err.message === "Rate Limit exceeded") {
                try {
                    summary = await generateSummaryFromGemini(pdfText);

                } catch (genimiError) {
                    console.error("Gemini API Failed after OpenAI quote exceeded", genimiError)
                    throw new Error("Failed to generate summary with available AI Providers");
                }
            }
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


async function savePdfSummary({ userId, fileUrl, summary, title, fileName }) {
    try {
        const sql = await getDbConnection();
        const [savedSummary] = await sql`INSERT INTO pdf_summaries(user_id, original_file_url, summary_text, title, file_name) VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName}) RETURNING id, summary_text;`;
        return savedSummary;
    } catch (error) {
        console.error("Failed to save summary", error);
        throw new Error("Error in saving summary");
    }
}

export async function storePdfSummaryAction({ fileUrl, summary, title, fileName }) {
    let saveSummary;
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
    } catch (err) {
        return {
            success: false,
            message: err ? err.message : "Failed to store summary",
            data: null
        };
    }

    revalidatePath(`/summaries/${saveSummary.id}`)

    return {
        success: true,
        message: "Summary stored successfully",
        data: {
            id: saveSummary.id
        }
    }
}