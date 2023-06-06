import { NextResponse } from "next/server";
import { listUsers } from "@/db/drizzle";

export async function POST(request: Request) {
    const json = await request.json();


    return NextResponse.next();
}

// TODO: return a list of all friends associated with current user
export async function GET(request: Request) {
    const friends = await listUsers();
    return NextResponse.json({ friends });
}
