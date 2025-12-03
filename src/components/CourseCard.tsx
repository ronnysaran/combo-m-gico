import { Check, Gift, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id: string;
  name: string;
  price: number;
  selected: boolean;
  isFreeSelection: boolean;
  disabled: boolean;
  onClick: () => void;
  index: number;
}

const courseColors = [
  "from-neon-pink to-neon-purple",
  "from-neon-blue to-neon-purple",
  "from-neon-green to-neon-blue",
  "from-primary to-orange-500",
  "from-neon-red to-neon-pink",
];

export const CourseCard = ({
  id,
  name,
  price,
  selected,
  isFreeSelection,
  disabled,
  onClick,
  index,
}: CourseCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "promo-card group relative p-6 w-full transition-all duration-500 cursor-pointer",
        selected && !isFreeSelection && "promo-card-selected scale-105",
        selected && isFreeSelection && "promo-card-free scale-105",
        disabled && !selected && "opacity-40 cursor-not-allowed",
        !selected && !disabled && "hover:scale-102 hover:border-primary/50"
      )}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="shine-effect absolute inset-0 -translate-x-full" />
      </div>

      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-20 rounded-2xl bg-gradient-to-br",
          courseColors[index % courseColors.length]
        )}
      />

      {/* Selection indicator */}
      {selected && (
        <div
          className={cn(
            "absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center bounce-in",
            isFreeSelection ? "bg-accent" : "bg-primary"
          )}
        >
          {isFreeSelection ? (
            <Gift className="w-5 h-5 text-accent-foreground" />
          ) : (
            <Check className="w-5 h-5 text-primary-foreground" />
          )}
        </div>
      )}

      {/* FREE badge for second selection */}
      {selected && isFreeSelection && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full font-bold text-sm animate-bounce shadow-lg">
          <span className="flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            100% GRÁTIS
            <Sparkles className="w-4 h-4" />
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Course icon */}
        <div
          className={cn(
            "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-xl",
            courseColors[index % courseColors.length]
          )}
        >
          <span className="font-bangers text-3xl text-foreground">{name.split(" ")[1]}</span>
        </div>

        {/* Course name */}
        <h3 className="font-bold text-lg text-foreground">{name}</h3>

        {/* Price */}
        <div className="flex flex-col items-center">
          {selected && isFreeSelection ? (
            <>
              <span className="text-sm text-muted-foreground line-through">
                R$ {price.toLocaleString("pt-BR")},00
              </span>
              <span className="font-bangers text-2xl text-accent glow-text">GRÁTIS!</span>
            </>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">Valor:</span>
              <span className="font-bold text-xl text-primary">
                R$ {price.toLocaleString("pt-BR")},00
              </span>
            </>
          )}
        </div>

        {/* Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-primary text-primary"
            />
          ))}
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
          !disabled && "group-hover:opacity-100"
        )}
        style={{
          boxShadow: `inset 0 0 30px hsl(var(--primary) / 0.2)`,
        }}
      />
    </button>
  );
};
