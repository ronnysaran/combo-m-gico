import { ArrowRight, Gift, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

export const SelectionIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="relative flex flex-col md:flex-row items-center justify-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-accent/20 via-neon-blue/20 to-accent/20 border-2 border-accent/50"
      style={{
        boxShadow: "0 0 40px hsl(var(--accent) / 0.3)",
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(5)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-accent/50 animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex items-center gap-3">
        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center animate-bounce">
          <Gift className="w-6 h-6 text-accent-foreground" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-accent font-bold text-lg md:text-xl">
            Selecione qual curso você vai fazer
          </span>
          <span className="text-accent font-bangers text-2xl md:text-3xl glow-text">
            com 100% de DESCONTO!
          </span>
        </div>
      </div>

      <ArrowRight className="w-8 h-8 text-accent animate-pulse hidden md:block" />

      <div className="flex flex-col items-center md:items-start bg-card/50 rounded-xl p-4 border border-accent/30">
        <span className="text-muted-foreground text-sm line-through">
          de R$ 5.000,00
        </span>
        <div className="flex items-center gap-2">
          <span className="text-foreground text-lg">por</span>
          <span className="font-bangers text-3xl text-accent glow-text flex items-center gap-1">
            <Star className="w-5 h-5 fill-accent" />
            GRÁTIS
            <Star className="w-5 h-5 fill-accent" />
          </span>
        </div>
        <span className="text-accent text-sm font-semibold">neste combo!</span>
      </div>
    </motion.div>
  );
};
