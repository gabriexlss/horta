import { NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function POST(req:NextRequest, res: NextResponse) {
    try{
        const body = await req.json()
    }
}