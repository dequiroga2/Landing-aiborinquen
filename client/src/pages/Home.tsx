import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { UnifiedForm } from "@/components/UnifiedForm";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Home() {
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/";

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Header />
      
      <main>
        <Hero />
        
        {/* Features / Value Props Divider */}
        <section className="py-12 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                "Atención 24/7",
                "Respuestas Instantáneas",
                "Integración N8N",
                "Voces Naturales"
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mb-2" />
                  <span className="font-display font-semibold text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <UnifiedForm />

        <section className="py-20 bg-gradient-to-b from-background to-secondary/40 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-3xl border border-primary/20 bg-card/70 backdrop-blur-sm px-6 py-12 md:px-12 text-center">
              <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                ¿Quieres <span className="text-primary">Acelerar y Automatizar</span> tu proceso de ventas?
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Nuestro equipo está listo para ayudarte a implementar una estrategia de IA personalizada.
              </p>

              <div className="mt-8 flex items-center justify-center">
                <div className="flex -space-x-3">
                  {[
                    "AQ",
                    "IA",
                    "PR",
                    "AI",
                  ].map((initials, index) => (
                    <Avatar key={initials + index} className="h-14 w-14 border-2 border-background shadow-sm">
                      <AvatarFallback className="bg-secondary text-foreground font-semibold text-sm">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-muted-foreground">Agenda una llamada y te mostramos cómo aplicarlo a tu negocio.</p>

              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="min-h-12 rounded-full px-8 text-base font-semibold bg-gradient-to-r from-primary/80 to-primary text-primary-foreground hover:opacity-90"
                >
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                    Sí, agendar llamada
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
