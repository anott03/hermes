import { NextRequest, NextResponse } from "next/server";
import { User, clerkClient, getAuth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { notifications } from "@/db/schema";

async function sendFriendRequest(user: User, friendEmail: string) {
    const notification = {
        senderId: user.id,
        recipientEmail: friendEmail,
        type: "FRIEND_REQUEST",
        message: `${user.firstName || ""} ${user.lastName || ""} <${user.emailAddresses[0].emailAddress} sent you a friend request.`,
    };
    db.insert(notifications).values(notification);
}

async function accept_friend_request(userId: string, notifcationId: number) {
    // TODO
}

export async function POST(request: NextRequest) {
    const { userId } = getAuth(request);
    if (!userId) return NextResponse.next();

    const user = await clerkClient.users.getUser(userId);
    const json = await request.json();

    if (json.method === "SEND_FRIEND_REQUEST") {
        const newFriends: string[] = json.friends;
        newFriends.forEach(async email => {
            await sendFriendRequest(user, email);
        });
    } else if (json.method === "ACCEPT_FRIEND_REQUEST") {
        accept_friend_request(user.id, json.notification_id);
    }

    return NextResponse.next();
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
