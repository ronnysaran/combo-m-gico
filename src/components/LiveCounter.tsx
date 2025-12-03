import { useEffect, useState } from "react";
import { Eye, TrendingUp, Users } from "lucide-react";

export const LiveCounter = () => {
  const [viewers, setViewers] = useState(127);
  const [sales, setSales] = useState(43);

  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewers((prev) => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(100, prev + change);
      });
    }, 3000);

    const salesInterval = setInterval(() => {
      setSales((prev) => prev + 1);
    }, 15000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(salesInterval);
    };
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {/* Live viewers */}
      <div className="flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full border border-secondary/30">
        <div className="relative">
          <Eye className="w-5 h-5 text-secondary" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full animate-ping" />
        </div>
        <span className="text-secondary font-semibold">
          <span className="font-bangers text-xl">{viewers}</span> assistindo agora
        </span>
      </div>

      {/* Sales today */}
      <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full border border-accent/30">
        <TrendingUp className="w-5 h-5 text-accent" />
        <span className="text-accent font-semibold">
          <span className="font-bangers text-xl">{sales}</span> vendas hoje
        </span>
      </div>

      {/* Limited spots */}
      <div className="flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full border border-primary/30 animate-pulse">
        <Users className="w-5 h-5 text-primary" />
        <span className="text-primary font-semibold">
          Restam apenas <span className="font-bangers text-xl">7</span> vagas!
        </span>
      </div>
    </div>
  );
};
