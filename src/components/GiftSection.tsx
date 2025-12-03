import { motion } from "framer-motion";
import { Gift, PartyPopper, Sparkles } from "lucide-react";
import { GiftCard } from "./GiftCard";

interface Gift {
  id: string;
  name: string;
  originalPrice: number;
}

interface GiftSectionProps {
  gifts: Gift[];
  selectedGifts: string[];
  onGiftToggle: (id: string) => void;
}

export const GiftSection = ({ gifts, selectedGifts, onGiftToggle }: GiftSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border-2 border-accent/30 p-6 md:p-8 bg-gradient-to-br from-accent/5 via-peach/5 to-accent/5"
    >
      {/* Animated decorations */}
      <div className="absolute top-4 left-4">
        <PartyPopper className="w-8 h-8 text-accent animate-bounce" />
      </div>
      <div className="absolute top-4 right-4">
        <PartyPopper className="w-8 h-8 text-accent animate-bounce" style={{ animationDelay: "0.2s" }} />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-accent/20 px-6 py-2 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-accent-foreground font-semibold uppercase tracking-wider text-sm">Bônus Exclusivo</span>
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        
        <h3 className="font-outfit font-bold text-2xl md:text-3xl text-foreground mb-2">
          🎁 Selecione os PRESENTES que você leva! 🎁
        </h3>
        
        <p className="text-muted-foreground">
          Escolha quantos quiser - <span className="text-secondary font-semibold">TODOS GRATUITOS!</span>
        </p>
      </div>

      {/* Gift cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {gifts.map((gift) => (
          <GiftCard
            key={gift.id}
            id={gift.id}
            name={gift.name}
            originalPrice={gift.originalPrice}
            selected={selectedGifts.includes(gift.id)}
            onClick={() => onGiftToggle(gift.id)}
          />
        ))}
      </div>

      {/* Total savings */}
      {selectedGifts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 px-6 py-3 rounded-full border border-secondary/20">
            <Gift className="w-5 h-5 text-secondary" />
            <span className="text-secondary font-semibold">
              +R$ {gifts
                .filter((g) => selectedGifts.includes(g.id))
                .reduce((acc, g) => acc + g.originalPrice, 0)
                .toLocaleString("pt-BR")},00 em presentes adicionados!
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
