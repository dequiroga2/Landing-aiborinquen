import logo from "@assets/logo_aiborinquen.png";
import { Link } from "wouter";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group h-full">
            <img 
              src={logo} 
              alt="AI Borinquen Logo" 
              className="h-16 max-h-full w-auto group-hover:scale-105 transition-transform duration-300" 
            />
            <span className="font-display font-bold text-xl hidden sm:block">AI BORINQUEN</span>
          </div>
        </Link>
        
        <nav className="flex items-center gap-6">
          <button 
            onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            className="px-5 py-2.5 rounded-full border border-primary/50 text-primary text-sm font-semibold hover:bg-primary hover:text-black transition-all duration-300"
          >
            Prueba ahora
          </button>
        </nav>
      </div>
    </header>
  );
}
