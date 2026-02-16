import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { useSubmitLead } from "@/hooks/use-leads";

export function LeadForm() {
  const submitLead = useSubmitLead();

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessDescription: "",
    },
  });

  const onSubmit = (data: InsertLead) => {
    submitLead.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <section id="lead-form" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Impulsa tu negocio hoy
            </h2>
            <p className="text-muted-foreground">
              Déjanos tus datos y diseñaremos la estrategia de IA perfecta para ti.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-background/50" />
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
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="john@empresa.com" {...field} className="bg-background/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                name="businessDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción de tu Negocio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Cuéntanos a qué se dedica tu empresa y qué problemas te gustaría resolver con IA..." 
                        className="min-h-[120px] bg-background/50 resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={submitLead.isPending}
                className="w-full py-4 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-4"
              >
                {submitLead.isPending ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : submitLead.isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Enviado con Éxito
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Información
                  </>
                )}
              </button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
