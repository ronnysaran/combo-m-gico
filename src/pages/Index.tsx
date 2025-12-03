import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Trophy, Zap, ArrowDown, ArrowUp } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { CourseCard } from "@/components/CourseCard";
import { SelectionIndicator } from "@/components/SelectionIndicator";
import { GiftSection } from "@/components/GiftSection";
import { PriceFooter } from "@/components/PriceFooter";
import { Confetti } from "@/components/Confetti";
 

const courses = [
  { id: "A", name: "Produto A", price: 5000 },
  { id: "B", name: "Produto B", price: 5000 },
  { id: "C", name: "Produto C", price: 5000 },
  { id: "D", name: "Produto D", price: 5000 },
  { id: "E", name: "Produto E", price: 5000 },
];

const gifts = [
  { id: "gift1", name: "Bônus Secreto #1", originalPrice: 597 },
  { id: "gift2", name: "Bônus Secreto #2", originalPrice: 597 },
  { id: "gift3", name: "Bônus Secreto #3", originalPrice: 597 },
];

const Index = () => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedGifts, setSelectedGifts] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const giftSectionRef = useRef<HTMLElement | null>(null);
  const selectionIndicatorRef = useRef<HTMLDivElement | null>(null);
  const courseGridRef = useRef<HTMLDivElement | null>(null);

  const firstSelection = selectedCourses[0];
  const secondSelection = selectedCourses[1];
  const hasFirstSelection = selectedCourses.length >= 1;
  const hasSecondSelection = selectedCourses.length >= 2;

  const handleCourseClick = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
      if (selectedCourses.length <= 2) {
        setSelectedGifts([]);
      }
    } else if (selectedCourses.length < 2) {
      setSelectedCourses([...selectedCourses, courseId]);
      if (selectedCourses.length === 1) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 100);
      }
    }
  };

  const handleGiftToggle = (giftId: string) => {
    if (selectedGifts.includes(giftId)) {
      setSelectedGifts(selectedGifts.filter((id) => id !== giftId));
    } else {
      setSelectedGifts([...selectedGifts, giftId]);
    }
  };

  const totalOriginal = 12492;
  const totalWithDiscount = 5000;
  const installmentValue = 297;
  const installments = 18;
  const bonusTotal = selectedGifts.length * 597;

  const selectedCourseNames = courses.filter((c) => selectedCourses.includes(c.id)).map((c) => c.name);
  const selectedGiftNames = gifts.filter((g) => selectedGifts.includes(g.id)).map((g) => g.name);

  useEffect(() => {
    if (hasSecondSelection && selectedGifts.length === 3) {
      setCheckoutOpen(true);
    }
  }, [hasSecondSelection, selectedGifts]);

  useEffect(() => {
    if (hasSecondSelection && giftSectionRef.current) {
      giftSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hasSecondSelection]);

  useEffect(() => {
    if (hasFirstSelection && !hasSecondSelection) {
      (selectionIndicatorRef.current ?? courseGridRef.current)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [hasFirstSelection, hasSecondSelection]);

  return (
    <div className="min-h-screen bg-background pb-40 pt-12">
      <Confetti active={showConfetti} />

      {/* Hero Section */}
      <header className="relative overflow-hidden py-8 md:py-12">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />

        <div className="relative container mx-auto px-4">
          

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-coral/10 text-coral px-5 py-2 rounded-full mb-4 border border-coral/20">
              <Zap className="w-4 h-4" />
              <span className="font-semibold text-sm uppercase tracking-wider">
                Oferta Relâmpago
              </span>
              <Zap className="w-4 h-4" />
            </div>

            <h1 className="font-outfit font-bold text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">
              <span className="gradient-text">COMPRE 1,</span>
              <br />
              <span className="gradient-text-secondary">LEVE 2!</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha <span className="text-primary font-semibold">1 curso</span> e ganhe{" "}
              <span className="text-secondary font-semibold">outro 100% GRÁTIS</span> + presentes exclusivos!
            </p>
          </motion.div>

          <CountdownTimer />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${hasFirstSelection ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${hasFirstSelection ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20 text-muted-foreground"}`}>1</span>
            <span className="font-medium text-sm">Escolha seu curso</span>
          </div>
          <div className="w-8 h-0.5 bg-border" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${hasSecondSelection ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${hasSecondSelection ? "bg-secondary text-secondary-foreground" : "bg-muted-foreground/20 text-muted-foreground"}`}>2</span>
            <span className="font-medium text-sm">Ganhe outro GRÁTIS</span>
          </div>
        </div>
        {!hasFirstSelection && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-coral/10 text-coral px-4 py-2 rounded-full border border-coral/20">
              <span className="font-semibold text-xs uppercase tracking-wider">Passo 1</span>
              <span className="text-sm">Escolha seu curso abaixo</span>
            </div>
            <ArrowDown className="w-6 h-6 mt-2 text-coral animate-bounce" />
          </motion.div>
        )}

        {/* Selection indicator */}
        <AnimatePresence>
          {hasFirstSelection && !hasSecondSelection && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
              ref={selectionIndicatorRef}
            >
              <SelectionIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Course cards */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6" ref={courseGridRef}>
            {courses.map((course, index) => {
              const isSelected = selectedCourses.includes(course.id);
              const isSecondSelection = secondSelection === course.id;
              const isDisabled = selectedCourses.length >= 2 && !isSelected;

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CourseCard
                    id={course.id}
                    name={course.name}
                    price={course.price}
                    selected={isSelected}
                    isFreeSelection={isSecondSelection}
                    disabled={isDisabled}
                    onClick={() => handleCourseClick(course.id)}
                    index={index}
                  />
                </motion.div>
              );
            })}
          </div>
        </section>

        {hasFirstSelection && !hasSecondSelection && (
          <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow">
              <span className="text-xs font-semibold uppercase">Passo 2</span>
              <span className="text-sm">Selecione seu 2º curso</span>
              <ArrowUp className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Gift section */}
        <AnimatePresence>
          {hasSecondSelection && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="mb-12 scroll-mt-24"
              ref={giftSectionRef}
            >
              <GiftSection
                gifts={gifts}
                selectedGifts={selectedGifts}
                onGiftToggle={handleGiftToggle}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Summary */}
        <AnimatePresence>
          {hasSecondSelection && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 px-8 py-4 rounded-2xl border border-primary/20">
                <Trophy className="w-7 h-7 text-primary" />
                <div className="flex flex-col items-start">
                  <span className="text-sm text-muted-foreground">Você está levando:</span>
                  <span className="font-semibold text-lg text-foreground">
                    2 Cursos + {selectedGifts.length} Bônus
                  </span>
                </div>
                <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Price Footer */}
      {hasSecondSelection && (
        <PriceFooter
          totalOriginal={totalOriginal}
          totalWithDiscount={totalWithDiscount}
          installmentValue={installmentValue}
          installments={installments}
          bonusTotal={bonusTotal}
          canCheckout={hasSecondSelection}
          onCheckoutClick={() => setCheckoutOpen(true)}
        />
      )}
      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        courseNames={selectedCourseNames}
        giftNames={selectedGiftNames}
      />
    </div>
  );
};

export default Index;
