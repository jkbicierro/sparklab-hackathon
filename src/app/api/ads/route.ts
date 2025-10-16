import { db } from "@/db";
import { advertistments } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.select().from(advertistments).limit(50);
    return NextResponse.json({ advertistments: data }, { status: 200 });
  } catch (err) {
    console.error("Error in GET /api/advertistments:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
