import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[75vh] flex items-center pt-28 md:pt-20 pb-8 overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>#1 Primer asistente de llamadas en Puerto Rico</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-display font-bold leading-tight">
            El primer asistente de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 text-glow">recepción y contacto</span> en Puerto Rico
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Recibe llamadas, atiende prospectos y da seguimiento automático con IA conversacional diseñada para negocios en Puerto Rico.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={scrollToForm}
              className="group px-8 py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] flex items-center justify-center gap-2"
            >
              Probar Asistente
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:h-[500px] flex items-center justify-center"
        >
          {/* Glowing backdrop for subtle depth */}
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full transform translate-y-20" />
          
          <div className="relative z-10 w-full max-w-lg mx-auto aspect-square rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-3xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent animate-pulse" />
            <div className="relative text-center p-8 space-y-4">
              <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                <div className="w-12 h-12 bg-primary rounded-full animate-ping opacity-20" />
                <div className="absolute w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold">Innovación Inteligente</h3>
              <p className="text-muted-foreground">Optimizando el futuro de Puerto Rico a través de tecnología de vanguardia.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
