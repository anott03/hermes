import { InferModel } from "drizzle-orm";
import { int, text, mysqlTableCreator } from "drizzle-orm/mysql-core";

const hermesMySqlTable = mysqlTableCreator((name) => `projectA_${name}`)

export const notifications = hermesMySqlTable("notifications", {
    id: int("id").autoincrement().primaryKey(),
    senderId: text("sender_id").notNull(),
    recipientEmail: text("recipient_email").notNull(),
    type: text("type").notNull(),
    message: text("message").notNull(),
});
export type Notification = InferModel<typeof notifications>
export type NewNotification = InferModel<typeof notifications, "insert">
