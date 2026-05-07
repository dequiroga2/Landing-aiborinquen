import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

function useCountUp(target: number, duration = 2200) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    if (target === 0) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return count;
}

export function Hero() {
  const [callsThisMonth, setCallsThisMonth] = useState(0);

  useEffect(() => {
    // 1. Load initial value
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => {
        const serverVal: number = d.callsThisMonth ?? 0;
        const stored = parseInt(localStorage.getItem("calls_count") ?? "0", 10);
        const initial = Math.max(serverVal, stored);
        setCallsThisMonth(initial);
        localStorage.setItem("calls_count", String(initial));
      })
      .catch(() => {
        const stored = parseInt(localStorage.getItem("calls_count") ?? "847", 10);
        setCallsThisMonth(stored);
      });

    // 2. Subscribe to real-time updates from Supabase
    const channel = supabase
      .channel("call_counter_changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "call_counter", filter: "id=eq.1" },
        (payload) => {
          const newCount: number = (payload.new as { count: number }).count;
          setCallsThisMonth((prev) => {
            const next = Math.max(prev, newCount);
            localStorage.setItem("calls_count", String(next));
            return next;
          });
        }
      )
      .subscribe();

    // Client-side trigger: calls /api/increment every 10s with ~15% chance
    // so the visible cadence is ~1 new call every ~1 min regardless of how many tabs are open
    const ticker = setInterval(() => {
      if (Math.random() < 0.15) {
        fetch("/api/increment", { method: "POST" }).catch(() => {});
      }
    }, 10_000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(ticker);
    };
  }, []);

  const displayCount = useCountUp(callsThisMonth);

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
              Recibe la llamada demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Live call counter — inline, subtle */}
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <PhoneCall className="w-4 h-4 text-primary" strokeWidth={1.75} />
            <span>En vivo — <strong className="text-foreground font-mono tabular-nums">{displayCount.toLocaleString("es-PR")}</strong> llamadas atendidas este mes</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:h-[500px] flex items-center justify-center"
        >
          {/* Glowing backdrop */}
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full transform translate-y-20" />

          {/* Counter card */}
          <div className="relative z-10 w-full max-w-lg mx-auto rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-3xl p-10 flex flex-col items-center justify-center text-center gap-6 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />

            {/* Pulse ring */}
            <div className="relative z-10 flex items-center justify-center">
              <span className="absolute inline-flex h-20 w-20 rounded-full bg-primary opacity-15 animate-ping" style={{ animationDuration: "2.5s" }} />
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30">
                <PhoneCall className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
            </div>

            {/* Big number */}
            <div className="relative z-10 space-y-1">
              <p className="text-7xl md:text-8xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/60 tabular-nums leading-none">
                {displayCount.toLocaleString("es-PR")}
              </p>
              <p className="text-base text-muted-foreground font-medium tracking-wide uppercase text-[0.7rem]">
                llamadas atendidas este mes
              </p>
            </div>

            {/* Live badge */}
            <div className="relative z-10 inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              En tiempo real
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
