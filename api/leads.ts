import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log("Received lead data:", req.body);
    
    // Validación básica
    const { name, email, phone, businessDescription, assistantType, voiceType } = req.body;
    
    if (!name || !email || !phone || !assistantType || !voiceType) {
      return res.status(400).json({
        error: "Invalid form data",
        details: "Missing required fields"
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid form data",
        details: "Invalid email format"
      });
    }

    // Validar si es personalizado
    if (assistantType === "Asistente personalizado" && (!businessDescription || businessDescription.trim().length === 0)) {
      return res.status(400).json({
        error: "Invalid form data",
        details: "Business description is required for custom assistant"
      });
    }

    const data = {
      name,
      email,
      phone,
      businessDescription: businessDescription || "",
      assistantType,
      voiceType
    };

    const webhookUrl = process.env.N8N_WEBHOOK_URL || "https://aiborinquen.app.n8n.cloud/webhook-test/outbound";
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
    } catch (webhookError) {
      console.error("Failed to send unified lead to N8N:", webhookError);
      return res.status(500).json({ 
        error: "Failed to connect to webhook service" 
      });
    }

    return res.json({ success: true, message: "Información enviada. Recibirás una llamada pronto." });
  } catch (error) {
    console.error("Failed processing /api/leads", error);
    return res.status(500).json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}

