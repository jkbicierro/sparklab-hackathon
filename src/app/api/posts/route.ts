import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, details, longitude, latitude, image_url } = await req.json();
    console.log(id, details, longitude, latitude);
    if (!id || !details || !longitude || !latitude || !image_url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await db.insert(posts).values({
      user_id: id,
      details: details,
      longitude: longitude,
      latitude: latitude,
      image_url: image_url,
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

export async function GET() {
  try {
    // Always return the latest posts; filtering is handled client-side.
    const data = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.created_at))
      .limit(50);

    return NextResponse.json({ posts: data }, { status: 200 });
  } catch (err) {
    console.error("Error in GET /api/posts:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
