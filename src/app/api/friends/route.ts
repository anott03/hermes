import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export async function POST(request: Request) {
  return NextResponse.json({ req: request });
}

export async function GET(request: Request) {
  const allUsers = await db.select().from(users);
  return NextResponse.json({ req: request, userCount: allUsers });
}
