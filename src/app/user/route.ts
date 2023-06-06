import { listUsers, registerUser, getUser } from "@/db/drizzle";
import {
    SignedInAuthObject,
    SignedOutAuthObject,
    clerkClient,
    getAuth,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

async function newUser(auth: SignedInAuthObject | SignedOutAuthObject) {
    const { userId } = auth;
    if (userId) {
        const user = await clerkClient.users.getUser(userId);
        const u = await getUser(user.id);
        if (u.length === 0) {
            await registerUser(
                user.id || "",
                user.firstName || "",
                user.emailAddresses[0].emailAddress || ""
            );
        } else {
            console.log("user exists");
        }
    }
}

export async function GET(request: NextRequest) {
    if (request.url.toLowerCase().indexOf("?newuser=true") != -1) {
        const auth = getAuth(request);
        newUser(auth);
    }
    return NextResponse.json({ users: await listUsers() });
}
