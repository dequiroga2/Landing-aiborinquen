import { motion } from "framer-motion";
import { HeartPulse, Scale, Calculator, Building2, Wrench } from "lucide-react";

const industries = [
  {
    icon: HeartPulse,
    label: "Clínicas & Salud",
    desc: "Confirmaciones de citas, recordatorios y respuestas a preguntas frecuentes — las 24 horas.",
  },
  {
    icon: Scale,
    label: "Abogados",
    desc: "Captura leads, califica prospectos inicialmente y agenda consultas sin interrumpir tu trabajo.",
  },
  {
    icon: Calculator,
    label: "Contables",
    desc: "Responde preguntas sobre servicios, precios y disponibilidad mientras tú te enfocas en los números.",
  },
  {
    icon: Building2,
    label: "Real Estate",
    desc: "Seguimiento inmediato de prospectos y coordinación de tours de propiedades en tiempo real.",
  },
  {
    icon: Wrench,
    label: "Talleres & Servicios",
    desc: "Agenda servicios, entrega estimados y confirma disponibilidad sin colgar ninguna llamada.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ForWhom() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
            ¿Para quién{" "}
            <span className="text-primary">es esto?</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Si tu negocio recibe llamadas y pierde clientes por no contestar a tiempo, esto es para ti.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {industries.map(({ icon: Icon, label, desc }) => (
            <motion.div
              key={label}
              variants={cardVariants}
              className="group flex flex-col items-center text-center p-6 rounded-2xl border border-white/10 bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-base mb-2">{label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
