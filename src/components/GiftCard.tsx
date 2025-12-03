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
        "relative p-5 rounded-2xl border-2 transition-all duration-300 bg-card hover:translate-y-[-4px]",
        selected
          ? "border-secondary shadow-lg"
          : "border-border hover:border-secondary/50 hover:shadow-md"
      )}
      style={{
        boxShadow: selected ? "0 8px 30px hsl(var(--secondary) / 0.2)" : undefined,
      }}
    >
      {/* Selection indicator */}
      {selected && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center bounce-in shadow-md">
          <Check className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}

      {/* Gift icon */}
      <div className="flex items-center justify-center mb-3">
        <div className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
          selected 
            ? "bg-gradient-to-br from-secondary to-mint" 
            : "bg-gradient-to-br from-lavender to-primary"
        )}>
          <Gift className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Gift name */}
      <h4 className="font-outfit font-semibold text-sm text-foreground mb-2">{name}</h4>

      {/* Price */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-muted-foreground line-through">
          R$ {originalPrice.toLocaleString("pt-BR")},00
        </span>
        <span className={cn(
          "font-outfit font-bold text-lg",
          selected ? "text-secondary" : "text-secondary"
        )}>
          R$ 0,00
        </span>
      </div>

      {/* Sparkle effect when selected */}
      {selected && (
        <Sparkles className="absolute top-2 left-2 w-4 h-4 text-secondary animate-pulse" />
      )}
    </button>
  );
};
