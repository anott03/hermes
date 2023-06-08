import { NextRequest, NextResponse } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { notifications, type User } from "@/db/schema";
import { eq } from "drizzle-orm";

async function sendFriendRequest(user: User, friendEmail: string) {
    const currentNotifications = await db
        .select()
        .from(notifications)
        .where(eq(notifications.senderId, user.id))
        .where(eq(notifications.recipientEmail, friendEmail));
    // ensure that there isn't already an existing friend request
    if (currentNotifications.length === 0) {
        const notification = {
            senderId: user.id,
            recipientEmail: friendEmail,
            type: "FRIEND_REQUEST",
            message: `${user.firstName || ""} ${user.lastName || ""} <${user.emailAddresses[0].emailAddress}> sent you a friend request.`,
        };
        await db
            .insert(notifications)
            .values(notification)
            .execute();
    } else {
        console.log("friend request exists");
    }
}

export async function POST(request: NextRequest) {
    const { userId } = getAuth(request);
    if (!userId) return NextResponse.redirect("http://localhost:3000/sign-in");

    const user = await clerkClient.users.getUser(userId) as User;
    const json = await request.json();

    const newFriends: string[] = json.friends;
    newFriends.forEach(async email => {
        if (!user.privateMetadata?.friends?.includes(email)) {
            await sendFriendRequest(user, email);
        }
    });

    return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest) {
    const { userId } = getAuth(request);
    if (userId) {
        const user = await clerkClient.users.getUser(userId);
        const friends = user.privateMetadata.friends;
        if (!friends) {
            await clerkClient.users.updateUser(userId, {
                privateMetadata: { friends: [] }
            });
            return NextResponse.json({ friends: [] });
        }
        return NextResponse.json({ friends });
    }
    return NextResponse.json({
        error: "Error getting friends",
    });
}
