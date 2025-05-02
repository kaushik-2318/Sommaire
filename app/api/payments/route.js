import { NextResponse } from "next/server"

export const POST = async (req) => {
    return NextResponse.json({
        status: "success",
    })
}