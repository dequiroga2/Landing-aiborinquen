import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "¿Mi cliente se va a dar cuenta de que es un AI?",
    a: 'La voz es tan natural que el 90% no lo nota. Probablemente ya hablaste con un AI esta semana sin saberlo. Pero no nos creas — llena el formulario de "Pruébalo Ahora", recibe la llamada, y juzga tú mismo. Si pregunta directo "¿eres un robot?", el AI contesta con honestidad y sigue ayudándolo.',
  },
  {
    q: "Mi negocio es muy específico. ¿Cómo va a saber contestar?",
    a: "El primer paso es una entrevista contigo donde mapeamos tus servicios, precios, horarios y las preguntas más comunes que recibes. Con esa info entrenamos al AI específicamente para tu negocio. Y si llega algo que no sabe, transfiere la llamada a tu equipo o agenda un callback — nunca inventa.",
  },
  {
    q: "¿Cuánto cuesta y cómo sé que voy a recuperar la inversión?",
    a: "El precio depende del volumen y la complejidad. Por eso la primera llamada es para darte un número exacto sin sorpresas. La mayoría de clientes recupera la inversión en 30 días solo con las citas que antes perdían por no contestar. En la llamada calculamos contigo, con tus números reales, si el ROI cuadra. Si no cuadra, te lo decimos.",
  },
  {
    q: "¿Y si esto falla? ¿Quién me responde?",
    a: "Garantía de 30 días: si no recibes mínimo 50 llamadas atendidas y 15 citas agendadas en el primer mes, seguimos trabajando gratis hasta lograrlo. Soporte directo del equipo técnico que monta tu asistente, no un call center. Y monitoreo 24/7 — si algo se daña, lo sabemos antes que tú.",
  },
  {
    q: "Yo no soy técnico. ¿Esto va a ser complicado?",
    a: "Tú no tocas nada. Nosotros hacemos la integración completa con tu línea, WhatsApp, calendario y CRM. Recibes un dashboard simple para ver llamadas, citas y grabaciones. Si quieres cambiar un precio, horario u oferta, nos avisas y lo actualizamos en 24 horas. De inicio a go-live: 7 días.",
  },
  {
    q: "Suena bien pero necesito pensarlo. ¿Qué hago?",
    a: "Válido. Pero piénsalo con números, no con miedo: calcula cuántos leads pierdes al mes por no contestar a tiempo, multiplica por tu ticket promedio, y compara con la inversión. Si quieres traer a tu socio a la próxima llamada, agendamos los dos en una sola sesión. Si decides que no es el momento, te quedamos como contacto sin seguimiento agresivo.",
  },
];

const HIGHLIGHTS = [
  "garantía de 30 días",
  "30 días",
  "7 días",
  "24 horas",
  "50 llamadas",
  "15 citas",
];

function highlightAnswer(text: string): string {
  let result = text;
  for (const term of HIGHLIGHTS) {
    result = result.replace(
      new RegExp(`(${term})`, "gi"),
      '<strong class="text-primary font-semibold">$1</strong>'
    );
  }
  return result;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    };
    const existing = document.getElementById("faq-schema");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.getElementById("faq-schema")?.remove();
    };
  }, []);

  return (
    <section id="faq" className="py-20 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
            Preguntas que nos hacen{" "}
            <span className="text-primary">todos los días</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Si tienes una duda que no está aquí, te la respondemos en la llamada.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-xl border backdrop-blur-sm overflow-hidden transition-colors duration-200 ${
                  isOpen
                    ? "border-primary/30 bg-card/70"
                    : "border-white/10 bg-card/40"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base leading-snug">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="flex-shrink-0 flex items-center justify-center text-primary"
                  >
                    <Plus className="w-5 h-5" strokeWidth={2.5} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        className="px-6 pb-6 text-muted-foreground leading-relaxed font-normal"
                        dangerouslySetInnerHTML={{
                          __html: highlightAnswer(faq.a),
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
