import { ArrowRight, Gift, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const SelectionIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="relative flex flex-col md:flex-row items-center justify-center gap-4 p-6 rounded-3xl bg-gradient-to-r from-secondary/10 via-mint/10 to-secondary/10 border-2 border-secondary/30"
    >
      <div className="relative flex items-center gap-3">
        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center animate-bounce shadow-md">
          <Gift className="w-6 h-6 text-secondary-foreground" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-foreground font-semibold text-lg md:text-xl">
            Agora selecione qual curso você vai fazer
          </span>
          <span className="text-secondary font-outfit font-bold text-xl md:text-2xl">
            com 100% de DESCONTO!
          </span>
        </div>
      </div>

      <ArrowRight className="w-8 h-8 text-secondary animate-pulse hidden md:block" />

      <div className="flex flex-col items-center md:items-start bg-card rounded-2xl p-4 border border-secondary/20 shadow-md">
        <span className="text-muted-foreground text-sm line-through">
          de R$ 5.000,00
        </span>
        <div className="flex items-center gap-2">
          <span className="text-foreground text-lg">por</span>
          <span className="font-outfit font-bold text-2xl text-secondary flex items-center gap-1">
            <Sparkles className="w-5 h-5" />
            GRÁTIS
          </span>
        </div>
        <span className="text-secondary text-sm font-medium">neste combo!</span>
      </div>
    </motion.div>
  );
};
