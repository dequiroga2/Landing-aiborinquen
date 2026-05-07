import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";

export function Team() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-white/10 bg-card/50 backdrop-blur-sm px-8 py-12 md:px-14 grid md:grid-cols-2 gap-10 items-center"
        >
          {/* Left */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
              <Users className="w-4 h-4" />
              Quiénes somos
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
              Un equipo <span className="text-primary">boricua</span> construyendo el futuro del negocio local
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Somos 10 personas basadas en San Juan, Puerto Rico — diseñadores, ingenieros y especialistas en IA que entienden de primera mano los retos de los negocios en la isla.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span>San Juan, Puerto Rico</span>
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { number: "10", label: "Personas en el equipo" },
              { number: "3+", label: "Años en IA conversacional" },
              { number: "50+", label: "Negocios implementados" },
              { number: "100%", label: "Hecho en Puerto Rico" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center"
              >
                <p className="text-3xl font-display font-extrabold text-primary leading-none">{stat.number}</p>
                <p className="mt-1.5 text-xs text-muted-foreground leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
