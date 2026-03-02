import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessDescription: text("business_description").default("").notNull(),
  assistantType: text("assistant_type").notNull(),
  voiceType: text("voice_type").notNull(),
});

export const insertLeadSchema = createInsertSchema(leads)
  .omit({ id: true })
  .extend({
    email: z.string().email("Ingresa un email válido"),
    phone: z.string().min(10, "Ingresa un teléfono válido"),
    businessDescription: z.string().default(""),
  })
  .superRefine((data, ctx) => {
    if (
      data.assistantType === "Asistente personalizado" &&
      (!data.businessDescription || data.businessDescription.trim().length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["businessDescription"],
        message: "La descripción del negocio es requerida para asistente personalizado",
      });
    }
  });
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const assistantOptions = [
  "Asistente para clinicas",
  "Asistente para restaurantes",
  "Asistente para hoteles",
  "Asistente personalizado"
] as const;

export const assistantDetails = {
  "Asistente para clinicas": {
    businessName: "Clinic Up",
    role: "Recepcionista Virtual",
    description: "Asistente especializado en el sector salud que maneja citas médicas y consultas generales",
    capabilities: [
      "Agendar y confirmar citas médicas",
      "Proporcionar información sobre horarios y servicios",
      "Responder preguntas frecuentes sobre procedimientos",
      "Manejar solicitudes de información sobre servicios médicos",
    ],
    exampleQuestions: [
      "¿Qué horarios tiene disponibles para medicina general?",
      "¿Aceptan mi seguro médico?",
      "Necesito agendar una cita con el Dr. García"
    ]
  },
  "Asistente para restaurantes": {
    businessName: "Restaurante ItalianoTrattoria Bella",
    role: "Hostess Virtual",
    description: "Asistente diseñado para gestionar reservaciones, consultas de menú y pedidos telefónicos",
    capabilities: [
      "Reservar mesas para diferentes cantidades de personas",
      "Informar sobre el menú y platos especiales del día",
      "Tomar órdenes para llevar o delivery",
      "Responder preguntas sobre ingredientes y alergias",
      "Proporcionar información sobre horarios y ubicación"
    ],
    exampleQuestions: [
      "¿Tienen mesas disponibles para 4 personas esta noche?",
      "¿Cuáles son los especiales del día?",
      "¿El plato tiene mariscos? Soy alérgico"
    ]
  },
  "Asistente para hoteles": {
    businessName: "Hotel Aurora Suites",
    role: "Recepcionista Virtual de Hotel",
    description: "Asistente especializado en hospitalidad que gestiona reservaciones y consultas hoteleras",
    capabilities: [
      "Procesar reservaciones de habitaciones",
      "Informar sobre tarifas, servicios y amenidades",
      "Responder sobre políticas de check-in/check-out",
      "Proporcionar información turística de la zona",
      "Gestionar solicitudes especiales de huéspedes"
    ],
    exampleQuestions: [
      "¿Tienen habitaciones disponibles para el próximo fin de semana?",
      "¿Incluye desayuno? ¿Tienen piscina?",
      "¿A qué hora es el check-in?"
    ]
  },
  "Asistente personalizado": {
    businessName: "Tu Negocio",
    role: "Asistente Virtual Personalizado",
    description: "Asistente adaptado a las necesidades específicas de tu negocio según tus indicaciones. Recuerda que las instrucciones generadas seran generales y poco específicas, por lo que es importante que sepas que el asistente es una pequeña parte de lo que tu negocio necesita. El resto lo hacemos nosotros!",
    capabilities: [
      "Adaptado a tus productos o servicios específicos",
      "Configurado según el flujo de trabajo de tu empresa",
      "Entrenado con la información que proporciones",
      "Flexible para manejar casos únicos de tu industria"
    ],
    exampleQuestions: [
      "Depende de tu negocio...",
      "Por favor describe tu negocio para crear ejemplos relevantes",
      "El asistente se adaptará a tus necesidades"
    ]
  }
} as const;

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
