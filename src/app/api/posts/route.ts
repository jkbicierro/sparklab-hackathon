import { db } from "@/db";
import { posts } from "@/db/schema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db.insert(posts).values({
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      type: "example-type",
      details: "This is an example post",
      longitude: 12.34,
      latitude: 56.78,
    });

    return NextResponse.json(
      { message: "Post created successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error in POST request:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
