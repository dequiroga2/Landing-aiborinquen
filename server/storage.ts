import { leads, vapiCalls, type InsertLead, type InsertVapiCall, type Lead, type VapiCall } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  createVapiCall(call: InsertVapiCall): Promise<VapiCall>;
}

export class DatabaseStorage implements IStorage {
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async createVapiCall(insertCall: InsertVapiCall): Promise<VapiCall> {
    const [call] = await db.insert(vapiCalls).values(insertCall).returning();
    return call;
  }
}

export const storage = new DatabaseStorage();
