import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.post("/api/leads", async (req, res) => {
    try {
      const data = insertLeadSchema.parse(req.body);
      await storage.createLead(data);

      // Trigger N8N Webhook with unified data
      if (process.env.N8N_WEBHOOK_URL) {
        try {
          await fetch(process.env.N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'unified_lead_call', ...data })
          });
        } catch (error) {
          console.error("Failed to send unified lead to N8N:", error);
        }
      }

      res.json({ success: true, message: "Información enviada. Recibirás una llamada pronto." });
    } catch (error) {
      res.status(400).json({ error: "Invalid form data" });
    }
  });

  return httpServer;
}
