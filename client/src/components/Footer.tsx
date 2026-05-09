import logo from "@assets/logo_aiborinquen.png";
import { Lock, MapPin, Phone, Mail, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">

        {/* Privacy trust bar */}
        <div className="flex items-center justify-center gap-2.5 text-sm text-muted-foreground bg-white/[0.03] border border-white/8 rounded-xl px-5 py-3 mb-12 max-w-xl mx-auto text-center">
          <Lock className="w-4 h-4 text-primary flex-shrink-0" />
          <span>Tus llamadas se almacenan encriptadas. Cumplimos con HIPAA y leyes de privacidad de PR y USA.</span>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <img src={logo} alt="Logo AI Borinquen" className="h-16 max-h-full w-auto mb-6" />
            <p className="text-muted-foreground max-w-xs mb-5">
              Transformando negocios a través de soluciones de Inteligencia Artificial avanzadas y personalizadas, hechas en Puerto Rico.
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                San Juan, Puerto Rico
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:9393040491" className="hover:text-primary transition-colors">939-304-0491</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:contact@aiborinquen.co" className="hover:text-primary transition-colors">contact@aiborinquen.co</a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="https://instagram.com/aiborinquen" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@aiborinquen</a>
              </li>
            </ul>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-white">Enlaces</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-primary transition-colors">Inicio</button></li>
              <li><button onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors">Demo IA</button></li>
              <li><button onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors">FAQ</button></li>
              <li><button onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors">Contacto</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-white">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Términos</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AI Borinquen. Todos los derechos reservados.</p>
          <p>Empresa registrada en Puerto Rico — <span className="text-foreground font-medium">AI BORINQUEN LLC</span></p>
        </div>
      </div>
    </footer>
  );
}
