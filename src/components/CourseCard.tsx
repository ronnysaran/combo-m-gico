import { Check, Gift, Star } from "lucide-react";
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
  "from-coral to-peach",
  "from-primary to-lavender",
  "from-secondary to-mint",
  "from-sky to-primary",
  "from-lavender to-coral",
];

const courseBg = [
  "bg-coral/10",
  "bg-primary/10",
  "bg-secondary/10",
  "bg-sky/10",
  "bg-lavender/10",
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
        "promo-card group relative p-6 w-full transition-all duration-300 cursor-pointer hover:translate-y-[-4px]",
        selected && !isFreeSelection && "promo-card-selected",
        selected && isFreeSelection && "promo-card-free",
        disabled && !selected && "opacity-50 cursor-not-allowed",
        !selected && !disabled && "hover:shadow-xl"
      )}
    >
      {/* Shine effect */}
      {selected && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="shine-effect absolute inset-0 -translate-x-full" />
        </div>
      )}

      {/* Selection indicator */}
      {selected && (
        <div
          className={cn(
            "absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center bounce-in shadow-lg",
            isFreeSelection ? "bg-secondary" : "bg-primary"
          )}
        >
          {isFreeSelection ? (
            <Gift className="w-5 h-5 text-secondary-foreground" />
          ) : (
            <Check className="w-5 h-5 text-primary-foreground" />
          )}
        </div>
      )}

      {/* FREE badge for second selection */}
      {selected && isFreeSelection && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full font-semibold text-sm animate-bounce shadow-md">
          100% GRÁTIS
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Course icon */}
        <div
          className={cn(
            "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-md",
            courseColors[index % courseColors.length]
          )}
        >
          <span className="font-outfit font-bold text-3xl text-white">{name.split(" ")[1]}</span>
        </div>

        {/* Course name */}
        <h3 className="font-outfit font-semibold text-lg text-foreground">{name}</h3>

        {/* Price */}
        <div className="flex flex-col items-center">
          {selected && isFreeSelection ? (
            <>
              <span className="text-sm text-muted-foreground line-through">
                R$ {price.toLocaleString("pt-BR")},00
              </span>
              <span className="font-outfit font-bold text-2xl text-secondary">GRÁTIS!</span>
            </>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">Valor:</span>
              <span className="font-outfit font-bold text-xl text-foreground">
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
              className="w-4 h-4 fill-accent text-accent"
            />
          ))}
        </div>
      </div>
    </button>
  );
};
