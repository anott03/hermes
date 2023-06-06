import { NextRequest, NextResponse } from "next/server";
import { listUsers, getIdByEmail, getUser, sendFriendRequest } from "@/db/drizzle";
import { clerkClient, getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
    const { userId } = getAuth(request);
    if (!userId) return NextResponse.next();

    const user = await clerkClient.users.getUser(userId);

    const json = await request.json();
    const newFriends: string[] = json.friends;

    newFriends.forEach(async email => {
        const friendId = await getIdByEmail(email);
        await sendFriendRequest(user.id, friendId);
    });

    return NextResponse.next();
}

// TODO: return a list of all friends associated with current user
export async function GET(request: NextRequest) {
    const friends = await listUsers();
    return NextResponse.json({ friends });
}
