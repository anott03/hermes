import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { usersTable, notificationsTable } from "@/db/schema";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { assert } from "console";

const connection = connect({
    host: process.env["DATABASE_HOST"],
    username: process.env["DATABASE_USERNAME"],
    password: process.env["DATABASE_PASSWORD"],
});

export const db = drizzle(connection, { schema });

export async function registerUser(
    clerkId: string,
    name: string,
    email: string
) {
    await db.insert(usersTable).values({ clerkId, name, email });
}

export async function listUsers() {
    return await db.select().from(usersTable);
}

export async function getUser(clerkId: string) {
    return await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.clerkId, clerkId));
}

export async function getNotifications(recipientId: number) {
    return await db
        .select()
        .from(notificationsTable)
        .where(eq(notificationsTable.recipientId, recipientId));
}

export async function postNotification(senderId: number, recipientId: number, type: string, message: string) {
    await db.insert(notificationsTable).values({
        senderId, recipientId, type, message
    });
}

export async function addFriend(userId: number, friendId: number) {
    const users = await db.select()
        .from(usersTable)
        .where(eq(usersTable.id, userId));
    const user = users[0];
    const currentFriends: number[] = JSON.parse(user.friends || "");
    if (!currentFriends.includes(friendId)) {
        currentFriends.push(friendId);
        await db.update(usersTable).set({ friends: JSON.stringify(currentFriends) }).where(eq(usersTable.id, userId));
    }
}

/*
 * Currently, I only store one of the users emails... could be worth refactoring to store all
 * associated emails to make this UX better.
 */
export async function getIdByEmail(email: string) {
    const matches = await db.select().from(usersTable).where(eq(usersTable.email, email));
    // TODO: different validation
    assert(matches.length == 1);
    return matches[0].id;
}
