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

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-lavender rounded-2xl flex items-center justify-center shadow-lg">
          <span className="font-outfit font-bold text-3xl md:text-4xl text-primary-foreground">
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-card border border-border shadow-lg">
      <div className="flex items-center gap-2 text-coral">
        <Clock className="w-5 h-5" />
        <span className="font-semibold text-sm uppercase tracking-wider">
          Oferta expira em
        </span>
      </div>
      <div className="flex gap-3 md:gap-4 items-center">
        <TimeBox value={time.hours} label="Horas" />
        <span className="font-outfit font-bold text-2xl text-primary">:</span>
        <TimeBox value={time.minutes} label="Min" />
        <span className="font-outfit font-bold text-2xl text-primary">:</span>
        <TimeBox value={time.seconds} label="Seg" />
      </div>
    </div>
  );
};
