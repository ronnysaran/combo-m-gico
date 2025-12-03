import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

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

  const format = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-destructive text-destructive-foreground">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-semibold text-xs md:text-sm uppercase tracking-wider">Oferta expira em</span>
          </div>
          <div className="flex items-center gap-2 font-outfit font-bold text-lg md:text-xl">
            <span>{format(time.hours)}</span>
            <span>:</span>
            <span>{format(time.minutes)}</span>
            <span>:</span>
            <span>{format(time.seconds)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
