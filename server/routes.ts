import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertVapiCallSchema } from "@shared/schema";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.post("/api/leads", async (req, res) => {
    try {
      const data = insertLeadSchema.parse(req.body);
      await storage.createLead(data);

      // Trigger N8N Webhook for Lead
      if (process.env.N8N_WEBHOOK_URL) {
        try {
          await fetch(process.env.N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'lead', ...data })
          });
        } catch (error) {
          console.error("Failed to send lead to N8N:", error);
        }
      } else {
        console.log("N8N_WEBHOOK_URL not set, skipping webhook trigger for lead");
      }

      res.json({ success: true, message: "Lead captured successfully" });
    } catch (error) {
      res.status(400).json({ error: "Invalid lead data" });
    }
  });

  app.post("/api/vapi/call", async (req, res) => {
    try {
      const data = insertVapiCallSchema.parse(req.body);
      await storage.createVapiCall(data);

      // Trigger N8N Webhook for VAPI Call
      if (process.env.N8N_WEBHOOK_URL) {
        try {
          await fetch(process.env.N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'vapi_call', ...data })
          });
        } catch (error) {
          console.error("Failed to send call request to N8N:", error);
        }
      } else {
        console.log("N8N_WEBHOOK_URL not set, skipping webhook trigger for call");
      }

      res.json({ success: true, message: "Call request received" });
    } catch (error) {
      res.status(400).json({ error: "Invalid call data" });
    }
  });

  return httpServer;
}
