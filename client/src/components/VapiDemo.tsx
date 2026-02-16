import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Phone, Loader2 } from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { insertVapiCallSchema, assistantOptions, type InsertVapiCall } from "@shared/schema";
import { useTriggerCall } from "@/hooks/use-vapi";

export function VapiDemo() {
  const triggerCall = useTriggerCall();
  const [active, setActive] = useState(false);

  const form = useForm<InsertVapiCall>({
    resolver: zodResolver(insertVapiCallSchema),
    defaultValues: {
      phoneNumber: "",
      assistantType: assistantOptions[0],
    },
  });

  const onSubmit = (data: InsertVapiCall) => {
    setActive(true);
    triggerCall.mutate(data, {
      onSuccess: () => {
        setTimeout(() => setActive(false), 5000);
      },
      onError: () => setActive(false),
    });
  };

  return (
    <section id="demo-section" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Prueba nuestra <span className="text-primary">IA de Voz</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experimenta el futuro de la atención al cliente. Selecciona un asistente y recibe una llamada en tiempo real.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <FormField
                    control={form.control}
                    name="assistantType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Asistente</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-background border-border focus:ring-primary relative z-20">
                              <SelectValue placeholder="Selecciona un asistente" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border shadow-xl z-50">
                            {assistantOptions.map((option) => (
                              <SelectItem key={option} value={option} className="hover:bg-primary/10">
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Teléfono</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+1 (555) 000-0000" 
                            {...field} 
                            className="h-12 bg-background/50 border-border focus:ring-primary font-mono"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={triggerCall.isPending}
                    className="w-full h-14 rounded-xl font-bold text-lg bg-primary text-black hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(0,255,0,0.2)] hover:shadow-[0_0_25px_rgba(0,255,0,0.4)] flex items-center justify-center gap-3"
                  >
                    {triggerCall.isPending ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Conectando...
                      </>
                    ) : (
                      <>
                        <Phone className="w-5 h-5" />
                        Llamadme Ahora
                      </>
                    )}
                  </button>
                </form>
              </Form>
            </div>
          </motion.div>

          <div className="order-1 md:order-2 flex justify-center">
            {/* Visual representation of the call */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              <div className={`absolute inset-0 bg-primary/20 rounded-full blur-3xl transition-all duration-1000 ${active ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`} />
              
              <div className="relative z-10 bg-black border border-primary/30 w-48 h-48 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,255,0,0.2)]">
                <Phone className={`w-20 h-20 text-primary transition-all duration-300 ${active ? 'animate-pulse' : ''}`} />
                
                {/* Ripple effects */}
                {active && (
                  <>
                    <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping" />
                    <div className="absolute -inset-4 rounded-full border border-primary/30 animate-ping delay-150" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
