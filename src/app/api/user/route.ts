import { NextRequest, NextResponse } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
    const { userId } = getAuth(request);
    if (userId) {
        await clerkClient.users.updateUser(userId, {
            privateMetadata: { friends: [] }
        });
        return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false });
}
