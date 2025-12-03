import { Check, Gift, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface GiftCardProps {
  id: string;
  name: string;
  originalPrice: number;
  selected: boolean;
  onClick: () => void;
}

export const GiftCard = ({
  name,
  originalPrice,
  selected,
  onClick,
}: GiftCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-xl border-2 transition-all duration-300 bg-gradient-to-br from-card to-muted/30",
        selected
          ? "border-accent scale-105 shadow-lg"
          : "border-border/50 hover:border-accent/50 hover:scale-102"
      )}
      style={{
        boxShadow: selected ? "0 0 30px hsl(var(--accent) / 0.4)" : undefined,
      }}
    >
      {/* Selection indicator */}
      {selected && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center bounce-in">
          <Check className="w-4 h-4 text-accent-foreground" />
        </div>
      )}

      {/* Gift icon */}
      <div className="flex items-center justify-center mb-3">
        <div className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
          selected 
            ? "bg-gradient-to-br from-accent to-neon-blue" 
            : "bg-gradient-to-br from-neon-purple to-neon-pink"
        )}>
          <Gift className="w-7 h-7 text-foreground" />
        </div>
      </div>

      {/* Gift name */}
      <h4 className="font-semibold text-sm text-foreground mb-2">{name}</h4>

      {/* Price */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-muted-foreground line-through">
          R$ {originalPrice.toLocaleString("pt-BR")},00
        </span>
        <span className={cn(
          "font-bangers text-lg",
          selected ? "text-accent glow-text" : "text-neon-green"
        )}>
          R$ 0,00
        </span>
      </div>

      {/* Sparkle effect when selected */}
      {selected && (
        <Sparkles className="absolute top-1 left-1 w-4 h-4 text-accent animate-pulse" />
      )}
    </button>
  );
};
