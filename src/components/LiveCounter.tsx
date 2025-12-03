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
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      {/* Live viewers */}
      <div className="flex items-center gap-2 bg-coral/10 px-4 py-2 rounded-full border border-coral/20">
        <div className="relative">
          <Eye className="w-4 h-4 text-coral" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-coral rounded-full animate-ping" />
        </div>
        <span className="text-coral font-medium text-sm">
          <span className="font-outfit font-bold">{viewers}</span> assistindo
        </span>
      </div>

      {/* Sales today */}
      <div className="flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20">
        <TrendingUp className="w-4 h-4 text-secondary" />
        <span className="text-secondary font-medium text-sm">
          <span className="font-outfit font-bold">{sales}</span> vendas hoje
        </span>
      </div>

      {/* Limited spots */}
      <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 animate-pulse">
        <Users className="w-4 h-4 text-primary" />
        <span className="text-primary font-medium text-sm">
          Restam <span className="font-outfit font-bold">7</span> vagas!
        </span>
      </div>
    </div>
  );
};
