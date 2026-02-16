import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { InsertVapiCall } from "@shared/schema";

export function useTriggerCall() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertVapiCall) => {
      const res = await fetch(api.vapi.call.path, {
        method: api.vapi.call.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to trigger call");
      }

      return api.vapi.call.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "¡Llamada iniciada!",
        description: "Tu asistente virtual te llamará en unos segundos.",
        className: "bg-primary text-primary-foreground border-primary",
      });
    },
    onError: (error) => {
      toast({
        title: "Error de conexión",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
