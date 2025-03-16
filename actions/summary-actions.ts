'use server'

import { getDbConnection } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction({ summaryId }: { summaryId: string }) {
    try {
        const user = await currentUser();
        const userId = user?.id;

        if (!userId) {
            return { success: false, error: "User not found" }
        }

        const sql = await getDbConnection();
        const result = await sql`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${userId} RETURNING id;`

        if (result.length > 0) {
            revalidatePath('/dashboard');
            return { success: true };
        }

        return {
            success: false, error: "Summary not found"
        }
    } catch (error) {
        console.log("Error Deleting Summary", error);
        return { success: false, error }
    }
    return { success: true }

}