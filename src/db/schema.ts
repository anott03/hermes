import { InferModel } from "drizzle-orm";
// import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { mysqlTable, int, text } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
    id: int("id").autoincrement().primaryKey(),
    clerkId: text("clerkId").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    friends: text("friends"),
});

export const notificationsTable = mysqlTable("notifications", {
    id: int("id").autoincrement().primaryKey(),
    senderId: int("sender_id").notNull(),
    recieverId: int("reciever_id").notNull(),
    type: text("type").notNull(),
    message: text("message").notNull(),
});

export type User = InferModel<typeof usersTable>;
export type NewUser = InferModel<typeof usersTable, "insert">;
