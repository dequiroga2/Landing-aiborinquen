import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessDescription: text("business_description").notNull(),
  assistantType: text("assistant_type").notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({ id: true });
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const assistantOptions = [
  "Asistente para clinicas y profesionales",
  "Asistente para restaurantes",
  "Asistente para hoteles",
  "Asistente general"
] as const;
