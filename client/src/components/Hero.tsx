import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
// Static import for the robot hero image
import robotImg from "@assets/image_1771268402642.png";

export function Hero() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Inteligencia Artificial de Nueva Generación</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
            Desata el <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 text-glow">poder</span> de tu IA
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
            Aprende a pedirle exactamente lo que necesitas. De respuestas mediocres a resultados expertos que transforman tu negocio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={scrollToForm}
              className="group px-8 py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] flex items-center justify-center gap-2"
            >
              Comenzar Ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById("demo-section")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 border border-white/10 transition-all duration-300"
            >
              Probar Demo
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:h-[800px] flex items-center justify-center"
        >
          {/* Glowing backdrop for image */}
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full transform translate-y-20" />
          
          <img 
            src={robotImg} 
            alt="AI Robot Assistant" 
            className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000"
          />
        </motion.div>
      </div>
    </section>
  );
}
