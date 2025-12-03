import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Confetti } from "@/components/Confetti";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseNames: string[];
  giftNames: string[];
}

export const CheckoutModal = ({ open, onOpenChange, courseNames, giftNames }: CheckoutModalProps) => {
  const [paymentOption, setPaymentOption] = useState<string | undefined>(undefined);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [confettiActive, setConfettiActive] = useState(false);
  const [reelRunning, setReelRunning] = useState(true);

  useEffect(() => {
    if (!open) return;
    setSecondsLeft(15 * 60);
    setConfettiActive(true);
    setReelRunning(true);
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    const confettiTimeout = setTimeout(() => setConfettiActive(false), 2500);
    const reelTimeout = setTimeout(() => setReelRunning(false), 2000);
    return () => clearInterval(interval);
  }, [open]);

  const mm = useMemo(() => String(Math.floor(secondsLeft / 60)).padStart(2, "0"), [secondsLeft]);
  const ss = useMemo(() => String(secondsLeft % 60).padStart(2, "0"), [secondsLeft]);

  const Reel = ({ items }: { items: string[] }) => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
      if (!reelRunning) return;
      const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 120);
      return () => clearInterval(t);
    }, [reelRunning, items.length]);
    const current = reelRunning ? items[index] : items[items.length - 1] ?? items[0] ?? "";
    return (
      <div className="h-12 md:h-16 w-full rounded-lg bg-black/10 border border-accent/40 overflow-hidden flex items-center justify-center">
        <motion.span
          key={current}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-outfit font-bold text-lg md:text-xl"
        >
          {current}
        </motion.span>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-gradient-to-br from-accent/20 via-secondary/20 to-primary/20 border-2 border-accent shadow-2xl !p-4 md:!p-6 rounded-xl">
        <Confetti active={confettiActive} />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <DialogHeader>
            <DialogTitle className="font-outfit text-2xl">Falta pouco!</DialogTitle>
            <DialogDescription className="text-foreground">Complete seus dados para garantir seu benefício.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 md:space-y-6 mt-2">
            <div className="rounded-2xl border-2 border-accent bg-card/80 p-4 shadow-lg">
              <div className="font-semibold mb-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-3 py-1 rounded-full">
                  🎯 Falta pouco
                </span>
                <span>Seu pacote</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                <Reel items={[...courseNames, ...courseNames]} />
                <Reel items={[...(giftNames.length ? giftNames : ["Sem bônus"]), ...(giftNames.length ? giftNames : ["Sem bônus"])]} />
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-3 md:space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="text-sm font-medium">Nome Completo</label>
                  <Input placeholder="Seu nome" required className="h-9 md:h-10 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium">E-mail</label>
                  <Input type="email" placeholder="voce@exemplo.com" required className="h-9 md:h-10 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Celular</label>
                  <Input type="tel" placeholder="(11) 99999-9999" required className="h-9 md:h-10 text-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Forma de pagamento</label>
                <Select value={paymentOption} onValueChange={setPaymentOption}>
                  <SelectTrigger className="mt-1 !h-9 md:!h-10 text-sm">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aviso-parcelado">Pagar à vista ou em até 12x no cartão e aproveitar desconto extra</SelectItem>
                    <SelectItem value="mensal">Pagar mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-muted-foreground">
                  Contador: <span className="font-outfit font-bold text-primary">{mm}:{ss}</span>
                </div>
                <Button type="submit" className="animate-pulse rounded-2xl px-4 py-4 md:px-6 md:py-6 text-sm md:text-base font-semibold shadow-xl">
                  GARANTIR BENEFÍCIO
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
