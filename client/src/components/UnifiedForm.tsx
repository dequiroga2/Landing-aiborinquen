import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Phone, Loader2, Send, CheckCircle2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { insertLeadSchema, assistantOptions, type InsertLead } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function UnifiedForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessDescription: "",
      assistantType: assistantOptions[0],
    },
  });

  const onSubmit = async (data: InsertLead) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/leads", data);
      setIsSuccess(true);
      toast({
        title: "¡Llamada iniciada!",
        description: "Tu asistente virtual te llamará en unos segundos.",
        className: "bg-primary text-primary-foreground border-primary",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "No pudimos procesar tu solicitud. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="demo-section" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Pruébalo <span className="text-primary">Ahora</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Completa tus datos, elige un asistente y recibe una llamada demostrativa en tiempo real.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} className="bg-background/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="tu@email.com" {...field} className="bg-background/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 000-0000" {...field} className="bg-background/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="assistantType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Asistente</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-border relative z-20">
                              <SelectValue placeholder="Selecciona uno" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border shadow-xl z-50">
                            {assistantOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="businessDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción del Negocio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Cuéntanos sobre tu empresa..." 
                          className="min-h-[100px] bg-background/50 resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-xl font-bold text-lg bg-primary text-black hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(0,255,0,0.2)] flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : isSuccess ? (
                    <><CheckCircle2 /> ¡Llamada en camino!</>
                  ) : (
                    <><Phone className="w-5 h-5" /> Llamadme Ahora</>
                  )}
                </button>
              </form>
            </Form>
          </motion.div>

          <div className="flex flex-col gap-8">
            <div className="p-6 bg-card border border-border/50 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                <CheckCircle2 className="w-5 h-5" /> ¿Por qué probarlo?
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Experimenta la voz natural de nuestra IA</li>
                <li>• Prueba la velocidad de respuesta en tiempo real</li>
                <li>• Ve cómo manejamos situaciones específicas de tu industria</li>
                <li>• Sin compromiso, solo una demostración tecnológica</li>
              </ul>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-primary/20 bg-black flex items-center justify-center group">
               <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
               <Phone className="w-16 h-16 text-primary animate-pulse" />
               <div className="absolute bottom-4 left-4 right-4 text-center">
                 <p className="text-sm font-medium text-primary/80 uppercase tracking-widest">Demostración en Vivo</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
