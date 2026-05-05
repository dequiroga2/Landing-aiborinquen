import { motion } from "framer-motion";
import { CalendarCheck, BrainCircuit, Zap } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    num: "01",
    title: "Agendamos una llamada",
    desc: "Hablamos contigo, entendemos tu negocio y diseñamos el flujo de llamadas perfecto para ti.",
  },
  {
    icon: BrainCircuit,
    num: "02",
    title: "Entrenamos al AI con tu negocio",
    desc: "Configuramos el asistente con tus servicios, precios, horarios y las preguntas más frecuentes de tus clientes.",
  },
  {
    icon: Zap,
    num: "03",
    title: "Live en 7 días",
    desc: "Tu asistente empieza a atender llamadas. Recibes un dashboard para ver todo en tiempo real.",
    highlight: true,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 border-t border-white/5 bg-white/[0.02]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
            Cómo{" "}
            <span className="text-primary">funciona</span>
          </h2>
          <p className="mt-4 text-muted-foreground">3 pasos simples, sin complicaciones técnicas.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ icon: Icon, num, title, desc, highlight }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                className="flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-6 border-2 transition-all ${
                    highlight
                      ? "bg-primary border-primary shadow-[0_0_20px_rgba(0,255,0,0.4)]"
                      : "bg-card border-white/20"
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 ${highlight ? "text-black" : "text-primary"}`}
                    strokeWidth={1.75}
                  />
                  <span
                    className={`absolute -top-2 -right-2 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                      highlight ? "bg-primary text-black" : "bg-white/10 text-muted-foreground"
                    }`}
                  >
                    {num}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
