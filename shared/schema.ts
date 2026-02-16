import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We're not persisting to DB as per instructions, but we use schema for type definitions and validation
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessDescription: text("business_description").notNull(),
});

export const vapiCalls = pgTable("vapi_calls", {
  id: serial("id").primaryKey(),
  phoneNumber: text("phone_number").notNull(),
  assistantType: text("assistant_type").notNull(), // One of the 4 options
});

export const insertLeadSchema = createInsertSchema(leads).omit({ id: true });
export const insertVapiCallSchema = createInsertSchema(vapiCalls).omit({ id: true });

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type InsertVapiCall = z.infer<typeof insertVapiCallSchema>;
export type Lead = typeof leads.$inferSelect;
export type VapiCall = typeof vapiCalls.$inferSelect;

export const assistantOptions = [
  "Asistente para clinicas y profesionales",
  "Asistente para restaurantes",
  "Asistente para hoteles",
  "Asistente general"
] as const;
