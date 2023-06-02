import { listUsers, registerUser } from "@/db/drizzle";
import {
    SignedInAuthObject,
    SignedOutAuthObject,
    getAuth,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

async function newUser(auth: SignedInAuthObject | SignedOutAuthObject) {
    console.log("newUser()");
    console.log(auth);
    if (auth.session) {
        registerUser(
            auth.user?.id || "",
            auth.user?.firstName || "",
            auth.user?.emailAddresses[0].emailAddress || ""
        );
        console.log("new user!", auth.userId);
    }
}

export async function GET(request: NextRequest) {
    if (request.url.toLowerCase().indexOf("?newuser=true") != -1) {
        const auth = getAuth(request);
        newUser(auth);
    }
    return NextResponse.json({ users: await listUsers() });
}
