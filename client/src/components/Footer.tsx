import logo from "@assets/image_1771268409395.png";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <img src={logo} alt="Logo" className="h-12 w-auto mb-6" />
            <p className="text-muted-foreground max-w-xs">
              Transformando negocios a través de soluciones de Inteligencia Artificial avanzadas y personalizadas.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-white">Enlaces</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-primary transition-colors">Inicio</button></li>
              <li><button onClick={() => document.getElementById("demo-section")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors">Demo IA</button></li>
              <li><button onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors">Contacto</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-white">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Términos</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AI Borinquen. Todos los derechos reservados.</p>
          <p>Potenciado por Talkoraia</p>
        </div>
      </div>
    </footer>
  );
}
