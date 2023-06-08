import { db } from "@/db/drizzle";
import { notifications, type Notification } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

function Notification({ notification }: { notification: Notification }) {
    return (
        <div className="p-2">
            {notification.message}
            <button className="p-1 text-sm hover:bg-gray-100">Accept</button>
            <button className="p-1 text-sm hover:bg-gray-100">Decline</button>
        </div>
    )
}

export default async function Notifications() {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.redirect("http://localhost:3000/sign-in");
    }
    const user = await clerkClient.users.getUser(userId);
    const userEmail = user.emailAddresses[0].emailAddress;
    const userNotifications = await db.query.notifications.findMany({
        where: eq(notifications.recipientEmail, userEmail)
    });

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-[#fbf9fc]">
            <div className="bg-white min-w-[500px] max-w-[600px] min-h-[500px] max-h-[600px] w-4/12 h-[75%] rounded rounded-lg shadow-xl drop-shadow-xl shadow-purple-500 flex flex-col justify-center items-start  p-3">
                <p className="text-2xl">Notifications</p>
                <div className="w-full h-full flex-1">
                    {userNotifications.map((notification, i) => <Notification key={i} notification={notification} />)}
                </div>
            </div>
        </div>
    );
}
