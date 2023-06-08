import { db } from "@/db/drizzle";
import { notifications } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export default async function Dash() {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.redirect("http://localhost:3000/sign-in");
    }
    const user = await clerkClient.users.getUser(userId);
    const userEmail = user.emailAddresses[0].emailAddress;
    const userNotifications = await db.query.notifications.findMany({
        where: eq(notifications.recipientEmail, userEmail)
    });
    console.log(userNotifications);


    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-[#fbf9fc]">
            <div className="bg-white min-w-[500px] max-w-[600px] min-h-[500px] max-h-[600px] w-4/12 h-[75%] rounded rounded-lg shadow-xl drop-shadow-xl shadow-purple-500 flex flex-col justify-center items-start  p-3">
                <p className="text-2xl">Notifications</p>
                <div className="w-full h-full flex-1">
                    Notifications go here.
                </div>
            </div>
        </div>
    );
}
