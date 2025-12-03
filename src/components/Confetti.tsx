import { useEffect, useState } from "react";

const colors = [
  "hsl(45, 100%, 50%)",
  "hsl(0, 100%, 60%)",
  "hsl(160, 100%, 50%)",
  "hsl(270, 100%, 65%)",
  "hsl(330, 100%, 60%)",
];

export const Confetti = ({ active }: { active: boolean }) => {
  const [pieces, setPieces] = useState<{ id: number; left: number; color: string; delay: number }[]>([]);

  useEffect(() => {
    if (active) {
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
      }));
      setPieces(newPieces);

      const timeout = setTimeout(() => {
        setPieces([]);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            width: "10px",
            height: "10px",
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
