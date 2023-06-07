import { NextRequest, NextResponse } from "next/server";
import { getIdByEmail, getNotifications } from "@/db/drizzle";
import { clerkClient, getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
    const { userId } = getAuth(request);
    if (userId) {
        const user = await clerkClient.users.getUser(userId);
        const id = await getIdByEmail(user.emailAddresses[0].emailAddress);
        return NextResponse.json({
            notifications: getNotifications(id),
        });
    }
    return NextResponse.next();
}
