import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const activities = sqliteTable("activities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  timestamp: text("timestamp"),
});

export type Activity = typeof activities.$inferSelect;
