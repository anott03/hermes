import { db } from "@/db/drizzle";
import { notifications, type Notification, User } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { RefreshCw } from "@/components/Icons";
import { Suspense } from "react";

export default async function Notifications() {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.redirect("http://localhost:3000/sign-in");
    }
    const user = await clerkClient.users.getUser(userId) as User;
    /* FOR TESTING PURPOSES ONLY */
    // await clerkClient.users.updateUser(user.id, {
    //     privateMetadata: { friends: [] },
    // });
    /* -------------------------- */
    const userEmail = user.emailAddresses[0].emailAddress;
    const userNotifications = await db.query.notifications.findMany({
        where: eq(notifications.recipientEmail, userEmail)
    });

    const rejectNotification = async (i: number) => {
        "use server";
        const n = userNotifications[i];
        await db.delete(notifications)
            .where(eq(notifications.id, n.id))
            .execute();
        revalidatePath("/notifications");
    }

    const acceptNotification = async (i: number) => {
        "use server";
        const _userId = auth().userId;
        if (!_userId) return;
        const u = await clerkClient.users.getUser(_userId) as User;

        const n = userNotifications[i];
        const friend = await clerkClient.users.getUser(n.senderId) as User;
        const friendFriends = friend.privateMetadata.friends || [];
        await clerkClient.users.updateUser(friend.id, {
            privateMetadata: {
                friends: [...friendFriends, u.id],
            }
        });
        await clerkClient.users.updateUser(u.id, {
            privateMetadata: {
                friends: [...u.privateMetadata.friends || [], friend.id],
            }
        });
        await db.delete(notifications)
            .where(eq(notifications.id, n.id))
            .execute();
        revalidatePath("/notifications");
        revalidatePath("/add-friends");
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-[#fbf9fc]">
            <div className="bg-white min-w-[500px] max-w-[600px] min-h-[500px] max-h-[600px] w-4/12 h-[75%] rounded rounded-lg shadow-xl drop-shadow-xl shadow-purple-500 flex flex-col justify-center items-start  p-3">
                <div className="flex flex-row items-center justify-between w-full">
                    <p className="text-2xl">Notifications</p>
                    <form action={async () => {
                        "use server";
                        revalidatePath("/notifications");
                    }}>
                        <button><RefreshCw /></button>
                    </form>
                </div>
                <div className="w-full h-full flex-1">
                    <div className="border-b border-violet-300"></div>
                    <Suspense fallback={<p>Loading...</p>}>
                        {userNotifications.length > 0 ? userNotifications.map((notification, i) =>
                            <div key={i} className="p-2 flex flex-col border-b border-violet-300">
                                <p className="text-sm">{notification.message}</p>
                                <div className="w-full justify-end flex flex-row">
                                    <form action={async () => {
                                        "use server";
                                        rejectNotification(i)
                                    }}><button className="p-2 text-sm hover:bg-violet-100">Decline</button></form>
                                    <form action={async () => {
                                        "use server";
                                        acceptNotification(i)
                                    }}><button className="p-2 text-sm hover:bg-violet-100">Accept</button></form>
                                </div>
                            </div>
                        ) :
                            <div className="w-full h-full flex-1 flex flex-col justify-center items-center">
                                <p className="text-sm">Your inbox is empty!</p>
                            </div>
                        }
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
