import { db, registerUser } from "@/db/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
    const { userId } = getAuth(request);
    if (userId) {
        let json = await request.json();
        registerUser(userId, json.name, json.email);
        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.clerkId, userId))
            .execute();
        console.log(user);
        return NextResponse.json({
            user,
        });
    }
    return NextResponse.next();
}

export async function GET(request: NextRequest) {
    const { userId } = getAuth(request);
    if (userId) {
        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.clerkId, userId))
            .execute();
        return NextResponse.json({ user });
    }
    return NextResponse.next();
}
