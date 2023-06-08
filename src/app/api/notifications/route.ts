import { NextRequest, NextResponse } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { notifications } from "@/db/schema";

async function accept_friend_request(userId: string, notifcationId: number) {
    // TODO
}

export async function GET(request: NextRequest) {
    const { userId } = getAuth(request);
    if (userId) {
        const user = await clerkClient.users.getUser(userId);
        const userEmail = user.emailAddresses[0].emailAddress;
        const userNotifications = await db.query.notifications.findMany({
            where: eq(notifications.recipientEmail, userEmail)
        });
        return NextResponse.json({
            notifications: userNotifications,
        });
    }

    return NextResponse.json({
        error: "Error fetching notifications"
    });
}

export async function POST(request: NextRequest) {
    const { userId } = getAuth(request);
    if (userId) {
        const user = await clerkClient.users.getUser(userId);
        const json = await request.json();
        accept_friend_request(user.id, json.notification_id);
    }
}
