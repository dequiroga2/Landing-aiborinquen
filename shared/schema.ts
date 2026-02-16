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
  voiceType: text("voice_type").notNull(),
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

export const voiceOptions = [
  {
    id: "oscar",
    name: "Oscar - Voz Puerto Rico",
    description: "Voz masculina con acento puertorriqueño auténtico",
    audioUrl: "https://xxjbozeynifkswavtcqh.supabase.co/storage/v1/object/public/AI%20BORINQUEN/oscar.mp3"
  },
  {
    id: "vale",
    name: "Valentina - Voz Colombia",
    description: "Voz femenina con acento colombiano cálido y amigable",
    audioUrl: "https://xxjbozeynifkswavtcqh.supabase.co/storage/v1/object/public/AI%20BORINQUEN/vale.mp3"
  },
  {
    id: "sebas",
    name: "Sebastian - Voz Argentina",
    description: "Voz masculina con acento argentino carismático y cercano",
    audioUrl: "https://xxjbozeynifkswavtcqh.supabase.co/storage/v1/object/public/AI%20BORINQUEN/sebas.mp3"
  },
  {
    id: "tony",
    name: "Tony - Voz República Dominicana",
    description: "Voz masculina con acento dominicano carismático y cercano",
    audioUrl: "https://xxjbozeynifkswavtcqh.supabase.co/storage/v1/object/public/AI%20BORINQUEN/tony.mp3"
  },
  {
    id: "alejo",
    name: "Alejandro - Voz España",
    description: "Voz masculina con acento español versátil y profesional",
    audioUrl: "https://xxjbozeynifkswavtcqh.supabase.co/storage/v1/object/public/AI%20BORINQUEN/alejo.mp3"
  },
  {
    id: "susana",
    name: "Susana - Voz Mexico",
    description: "Voz femenina con acento mexicano cálido y amigable",
    audioUrl: "https://xxjbozeynifkswavtcqh.supabase.co/storage/v1/object/public/AI%20BORINQUEN/susana.mp3"
  }
] as const;
