import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface PriceFooterProps {
  totalOriginal: number;
  totalWithDiscount: number;
  installmentValue: number;
  installments: number;
  bonusTotal: number;
  canCheckout: boolean;
  onCheckoutClick?: () => void;
}

export const PriceFooter = ({
  totalOriginal,
  totalWithDiscount,
  installmentValue,
  installments,
  bonusTotal,
  canCheckout,
  onCheckoutClick,
}: PriceFooterProps) => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="bg-card border-t border-border p-1 md:p-6 shadow-[0_-10px_40px_hsl(var(--foreground)/0.08)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1 md:gap-4">
          {/* Price breakdown */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            {/* Original price */}
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Valor total
              </span>
              <span className="font-outfit font-bold text-2xl text-foreground line-through decoration-destructive decoration-2 whitespace-nowrap">
                R$ {totalOriginal.toLocaleString("pt-BR")},00
              </span>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-5 h-5 text-primary hidden md:block" />

            {/* Discounted prices */}
            <div className="flex flex-col sm:flex-row items-center gap-1 md:gap-4">
              {/* Cash price */}
              <div className="relative flex flex-col items-center bg-primary/10 px-3 py-2 md:px-5 md:py-3 rounded-2xl border border-primary/20">
                <span className="text-xs text-primary uppercase tracking-wider font-semibold">
                  À Vista
                </span>
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full text-xs font-semibold shadow-md">
                  60% OFF
                </span>
                <span className="font-outfit font-bold text-lg md:text-3xl text-primary whitespace-nowrap">
                  R$ {totalWithDiscount.toLocaleString("pt-BR")},00
                </span>
              </div>

              <span className="text-muted-foreground font-medium">OU</span>

              {/* Installment price */}
              <div className="relative flex flex-col items-center bg-secondary/10 px-3 py-2 md:px-5 md:py-3 rounded-2xl border border-secondary/20">
                <span className="text-xs text-secondary uppercase tracking-wider font-semibold">
                  Parcelado
                </span>
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full text-xs font-semibold shadow-md">
                  50% OFF
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm md:text-lg text-secondary font-semibold">{installments}x</span>
                  <span className="font-outfit font-bold text-lg md:text-3xl text-secondary whitespace-nowrap">
                    R$ {installmentValue.toLocaleString("pt-BR")},00
                  </span>
                </div>
              </div>
            </div>

            {/* Bonus indicator */}
            {bonusTotal > 0 && (
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  R$ 6.246 de desconto + R$ 1.791 em bônus
                </span>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <Button
            disabled={!canCheckout}
            className={`
              relative overflow-hidden px-4 py-3 md:px-8 md:py-6 text-sm md:text-lg font-semibold rounded-2xl
              transition-all duration-300
              ${canCheckout 
                ? "bg-gradient-to-r from-primary to-lavender text-primary-foreground hover:scale-105 hover:shadow-xl" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
              }
            `}
            onClick={canCheckout ? onCheckoutClick : undefined}
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
