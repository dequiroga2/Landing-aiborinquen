import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.post("/api/leads", async (req, res) => {
    try {
      console.log("Received lead data:", req.body);
      
      const normalizedBody = {
        ...req.body,
        businessDescription:
          typeof req.body?.businessDescription === "string"
            ? req.body.businessDescription
            : "",
      };

      console.log("Normalized body:", normalizedBody);

      const parsed = insertLeadSchema.safeParse(normalizedBody);
      if (!parsed.success) {
        console.error("Lead validation failed", {
          body: normalizedBody,
          issues: parsed.error.issues,
        });
        return res.status(400).json({
          error: "Invalid form data",
          details: parsed.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      const data = parsed.data;
      
      // DB is disabled - skip storage.createLead(data);
      // await storage.createLead(data);

      const webhookUrl = process.env.N8N_WEBHOOK_URL || "https://aiborinquen.app.n8n.cloud/webhook/outbound";
      const webhookPayload = {
        nombreCliente: data.name,
        email: data.email,
        telefono: data.phone,
        nombreVoz: data.voiceType,
        tipoAsistente: data.assistantType,
        ...(data.assistantType === "Asistente personalizado" && data.businessDescription
          ? { descripcionNegocio: data.businessDescription }
          : {}),
      };

      console.log("Sending webhook to N8N:", webhookUrl);
      console.log("Webhook payload:", webhookPayload);

      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookPayload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Webhook request failed:", response.status, errorText);
          return res.status(500).json({ 
            error: "Failed to send webhook", 
            details: `Status: ${response.status}` 
          });
        } else {
          console.log("Webhook sent successfully");
        }
      } catch (error) {
        console.error("Failed to send unified lead to N8N:", error);
        return res.status(500).json({ 
          error: "Failed to connect to webhook service" 
        });
      }

      res.json({ success: true, message: "Información enviada. Recibirás una llamada pronto." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid form data",
          details: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      console.error("Failed processing /api/leads", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
