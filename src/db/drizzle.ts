import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { usersTable } from "@/db/schema";

const connection = connect({
    host: process.env["DATABASE_HOST"],
    username: process.env["DATABASE_USERNAME"],
    password: process.env["DATABASE_PASSWORD"],
});

export const db = drizzle(connection);

export async function registerUser(
    clerkId: string,
    name: string,
    email: string
) {
    await db.insert(usersTable).values({ clerkId, name, email });
}

export async function listUsers() {
    return db.select().from(usersTable);
}
