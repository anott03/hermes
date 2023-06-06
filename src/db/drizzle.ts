import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { usersTable } from "@/db/schema";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

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
