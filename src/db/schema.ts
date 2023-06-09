import { InferModel } from "drizzle-orm";
import { int, text, mysqlTableCreator, datetime } from "drizzle-orm/mysql-core";
import type { User as ClerkUser } from "@clerk/nextjs/server";

const hermesMySqlTable = mysqlTableCreator((name) => `hermes_${name}`)

export const notifications = hermesMySqlTable("notifications", {
    id: int("ID").autoincrement().primaryKey(),
    senderId: text("sender_id").notNull(),
    recipientEmail: text("recipient_email").notNull(),
    type: text("type").notNull(),
    message: text("message").notNull(),
    datetime: datetime("datetime").notNull(),
});
export type Notification = InferModel<typeof notifications>
export type NewNotification = InferModel<typeof notifications, "insert">

export interface User extends ClerkUser {
    privateMetadata: Record<string, string[] | undefined>
}
