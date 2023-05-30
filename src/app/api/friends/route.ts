import { NextResponse } from "next/server";
import { listUsers } from "@/db/drizzle";

export async function POST(request: Request) {
  let json = await request.json();
  console.log(json.friends);
  // TODO: add friends to friend list of current user
  return NextResponse.json({ friends: json.friends });
}

// TODO: return a list of all friends associated with current user
export async function GET(request: Request) {
  const friends = await listUsers();
  return NextResponse.json({ friends });
}
