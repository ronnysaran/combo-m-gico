import { useState, useEffect } from "react";
import { Clock, Flame } from "lucide-react";

export const CountdownTimer = () => {
  const [time, setTime] = useState({
    hours: 2,
    minutes: 47,
    seconds: 33,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-secondary to-red-700 rounded-xl flex items-center justify-center border-2 border-secondary/50 shadow-lg">
          <span className="font-bangers text-3xl md:text-4xl text-foreground glow-text">
            {String(value).padStart(2, "0")}
          </span>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping" />
      </div>
      <span className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-secondary/30">
      <div className="flex items-center gap-2 text-secondary">
        <Flame className="w-6 h-6 animate-pulse" />
        <span className="font-bold text-lg uppercase tracking-wider">
          Oferta expira em
        </span>
        <Flame className="w-6 h-6 animate-pulse" />
      </div>
      <div className="flex gap-3 md:gap-4">
        <TimeBox value={time.hours} label="Horas" />
        <span className="font-bangers text-4xl text-primary self-center animate-pulse">:</span>
        <TimeBox value={time.minutes} label="Min" />
        <span className="font-bangers text-4xl text-primary self-center animate-pulse">:</span>
        <TimeBox value={time.seconds} label="Seg" />
      </div>
    </div>
  );
};
