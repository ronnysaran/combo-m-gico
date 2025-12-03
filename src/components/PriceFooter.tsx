import { motion } from "framer-motion";
import { CreditCard, ShoppingCart, Sparkles, Zap } from "lucide-react";
import { Button } from "./ui/button";

interface PriceFooterProps {
  totalOriginal: number;
  totalWithDiscount: number;
  installmentValue: number;
  installments: number;
  bonusTotal: number;
  canCheckout: boolean;
}

export const PriceFooter = ({
  totalOriginal,
  totalWithDiscount,
  installmentValue,
  installments,
  bonusTotal,
  canCheckout,
}: PriceFooterProps) => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div
        className="border-t-2 border-primary/50 p-4 md:p-6"
        style={{
          background: "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(240 10% 6%) 100%)",
          boxShadow: "0 -10px 40px hsl(var(--primary) / 0.2)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Price breakdown */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            {/* Original price */}
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Valor total
              </span>
              <span className="text-lg text-muted-foreground line-through">
                R$ {totalOriginal.toLocaleString("pt-BR")},00
              </span>
            </div>

            {/* Arrow */}
            <Zap className="w-6 h-6 text-primary animate-pulse hidden md:block" />

            {/* Discounted prices */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Cash price */}
              <div className="flex flex-col items-center bg-primary/10 px-4 py-2 rounded-xl border border-primary/30">
                <span className="text-xs text-primary uppercase tracking-wider font-bold">
                  À Vista
                </span>
                <span className="font-bangers text-2xl md:text-3xl text-primary glow-text">
                  R$ {totalWithDiscount.toLocaleString("pt-BR")},00
                </span>
              </div>

              <span className="text-muted-foreground font-bold">OU</span>

              {/* Installment price */}
              <div className="flex flex-col items-center bg-accent/10 px-4 py-2 rounded-xl border border-accent/30">
                <span className="text-xs text-accent uppercase tracking-wider font-bold">
                  Parcelado
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg text-accent font-bold">{installments}x</span>
                  <span className="font-bangers text-2xl md:text-3xl text-accent glow-text">
                    R$ {installmentValue.toLocaleString("pt-BR")},00
                  </span>
                </div>
              </div>
            </div>

            {/* Bonus indicator */}
            {bonusTotal > 0 && (
              <div className="flex items-center gap-2 text-neon-green">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  +R$ {bonusTotal.toLocaleString("pt-BR")} em bônus!
                </span>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <Button
            disabled={!canCheckout}
            className={`
              relative overflow-hidden px-8 py-6 text-lg font-bold rounded-xl
              transition-all duration-300
              ${canCheckout 
                ? "bg-gradient-to-r from-accent via-neon-blue to-accent text-accent-foreground hover:scale-105 animate-pulse" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
              }
            `}
            style={{
              boxShadow: canCheckout ? "0 0 30px hsl(var(--accent) / 0.5)" : undefined,
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              {canCheckout ? "GARANTIR MINHA VAGA!" : "Selecione 2 cursos"}
            </span>
            {canCheckout && (
              <div className="absolute inset-0 shine-effect" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
