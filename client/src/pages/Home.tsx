import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { VapiDemo } from "@/components/VapiDemo";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";

export default function Home() {
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

        <VapiDemo />
        <LeadForm />
      </main>
      
      <Footer />
    </div>
  );
}
