import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { InsertLead } from "@shared/schema";

export function useSubmitLead() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertLead) => {
      const res = await fetch(api.leads.submit.path, {
        method: api.leads.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit lead");
      }

      return api.leads.submit.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "¡Información recibida!",
        description: "Nos pondremos en contacto contigo pronto.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
