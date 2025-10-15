import { NextRequest, NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { users } from "@/db/schema";
import { db } from "@/db";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.user_id, id))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    await db.insert(users).values({ user_id: id });

    return NextResponse.json(
      { message: "User saved to the database." },
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
