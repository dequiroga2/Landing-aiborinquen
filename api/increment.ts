import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET (triggered by Vercel Cron) or POST
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Skip guard — prevents over-incrementing when multiple browser tabs call simultaneously
  if (Math.random() > 0.8) {
    return res.json({ skipped: true });
  }

  const bump = Math.random() < 0.7 ? 1 : 2; // 70% chance +1, 30% chance +2

  const { error } = await supabase.rpc("increment_call_counter", { bump });

  if (error) {
    console.error("increment_call_counter error:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.json({ ok: true, bump });
}
