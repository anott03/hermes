import { db } from "@/db/drizzle";
import { User, notifications } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Form from "@/components/friendForm";

export default async function FileSend() {
    const { userId } = auth();
    if (!userId) return;
    const user = await clerkClient.users.getUser(userId) as User;
    const friends: User[] = [];
    user.privateMetadata.friends?.forEach(async friendId => {
        const friend = await clerkClient.users.getUser(friendId) as User;
        friends.push(friend);
    });

    const sentRequests = await db.query.notifications.findMany({
        where: eq(notifications.senderId, user.id),
    }) || [];

    const addFriend = async (data: FormData) => {
        "use server";
        const uid = auth().userId;
        if (!uid) return;
        const u = await clerkClient.users.getUser(uid) as User;
        const email = data.get("inpt") as string;
        const currentNotifications = await db
            .select()
            .from(notifications)
            .where(eq(notifications.senderId, u.id))
            .where(eq(notifications.recipientEmail, email))
            .execute();
        if (currentNotifications.length > 0) return;
        const notification = {
            senderId: u.id,
            recipientEmail: email,
            type: "FRIEND_REQUEST",
            message: `${u.firstName || ""} ${u.lastName || ""} <${u.emailAddresses[0].emailAddress}> sent you a friend request.`,
            datetime: new Date(),
        };
        await db
            .insert(notifications)
            .values(notification)
            .execute();
        revalidatePath("/add-friends");
    }

    const cancelRequest = async (i: number) => {
        "use server";
        const n = sentRequests[i];
        await db.delete(notifications)
            .where(eq(notifications.id, n.id))
            .execute();
        revalidatePath("/add-friends");
    }

    const removeFriend = async (idx: number) => {
        "use server";
        const uid = auth().userId;
        if (!uid) return;
        const u = await clerkClient.users.getUser(uid) as User;
        // this requires that friend requests not be accepted at the same time and
        // is rather unsafe... should be redone
        const newFriends = (u.privateMetadata.friends || []).filter(
            (_, i) => i !== idx
        );

        await clerkClient.users.updateUser(u.id, {
            privateMetadata: {
                friends: newFriends,
            },
        });
        revalidatePath("/add-friends");
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-[#fbf9fc]">
            <div className="bg-white min-w-[500px] max-w-[600px] min-h-[500px] max-h-[600px] w-4/12 h-[75%] rounded rounded-lg shadow-xl drop-shadow-xl shadow-purple-500 flex flex-col p-3">
                <p className="text-2xl">Friends</p>
                <small>
                    Once they accept your friend request, you will be able to
                    send them files.
                </small>
                <Form addFriend={addFriend} />

                <p className="my-2">Pending Requests</p>
                <div className="max-h-[30%] flex flex-col gap-1">
                    {sentRequests.map((req, i) => (
                        <div key={i} className="w-full flex flex-row justify-between">
                            <p className="text-sm">{req.recipientEmail}</p>
                            <form action={async () => {
                                "use server";
                                await cancelRequest(i);
                            }}>
                                <button>x</button>
                            </form>
                        </div>
                    ))}
                </div>
                <p className="my-2">My Friends</p>
                {friends.map((friend, i) => (
                    <div key={i} className="w-full flex flex-row justify-between">
                        <p className="text-sm">{`${friend.firstName} ${friend.lastName} <${friend.emailAddresses[0].emailAddress}>`}</p>
                        <form action={async () => {
                            "use server";
                            await removeFriend(i);
                        }}>
                            <button>x</button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}
