import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const { data, error } = await supabase
    .from("call_counter")
    .select("count")
    .eq("id", 1)
    .single();

  if (error || !data) {
    return res.status(500).json({ error: "Failed to fetch counter" });
  }

  res.setHeader("Cache-Control", "no-store");
  return res.json({ callsThisMonth: data.count });
}
