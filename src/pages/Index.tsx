import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Trophy, Zap } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { CourseCard } from "@/components/CourseCard";
import { SelectionIndicator } from "@/components/SelectionIndicator";
import { GiftSection } from "@/components/GiftSection";
import { PriceFooter } from "@/components/PriceFooter";
import { Confetti } from "@/components/Confetti";
import { LiveCounter } from "@/components/LiveCounter";

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

  const firstSelection = selectedCourses[0];
  const secondSelection = selectedCourses[1];
  const hasFirstSelection = selectedCourses.length >= 1;
  const hasSecondSelection = selectedCourses.length >= 2;

  const handleCourseClick = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      // Deselect
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
      if (selectedCourses.length <= 2) {
        setSelectedGifts([]);
      }
    } else if (selectedCourses.length < 2) {
      // Select
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

  // Calculate totals
  const totalOriginal = 10000; // 2 courses x R$ 5,000
  const totalWithDiscount = 5000; // 50% off
  const installmentValue = 297;
  const installments = 18;
  const bonusTotal = selectedGifts.length * 597;

  return (
    <div className="min-h-screen bg-background pb-40">
      <Confetti active={showConfetti} />

      {/* Hero Section */}
      <header className="relative overflow-hidden py-8 md:py-12">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4">
          {/* Live counter */}
          <div className="mb-8">
            <LiveCounter />
          </div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-secondary px-6 py-2 rounded-full mb-4 animate-bounce">
              <Zap className="w-5 h-5 text-secondary-foreground" />
              <span className="text-secondary-foreground font-bold uppercase tracking-wider">
                Oferta Relâmpago
              </span>
              <Zap className="w-5 h-5 text-secondary-foreground" />
            </div>

            <h1 className="font-bangers text-5xl md:text-7xl lg:text-8xl text-foreground mb-4">
              <span className="text-primary glow-text">COMPRE 1,</span>
              <br />
              <span className="text-accent glow-text">LEVE 2!</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha <span className="text-primary font-bold">1 curso</span> e ganhe{" "}
              <span className="text-accent font-bold">outro 100% GRÁTIS</span> + presentes exclusivos!
            </p>
          </motion.div>

          {/* Countdown */}
          <div className="flex justify-center mb-8">
            <CountdownTimer />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${hasFirstSelection ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</span>
            <span className="font-semibold">Escolha seu curso</span>
          </div>
          <div className="w-8 h-0.5 bg-border" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${hasSecondSelection ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${hasSecondSelection ? "bg-accent text-accent-foreground" : "bg-muted-foreground/30 text-muted-foreground"}`}>2</span>
            <span className="font-semibold">Ganhe outro GRÁTIS</span>
          </div>
        </div>

        {/* Selection indicator - shows after first selection */}
        <AnimatePresence>
          {hasFirstSelection && !hasSecondSelection && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <SelectionIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Course cards */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {courses.map((course, index) => {
              const isSelected = selectedCourses.includes(course.id);
              const isFirstSelection = firstSelection === course.id;
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

        {/* Gift section - shows after both courses selected */}
        <AnimatePresence>
          {hasSecondSelection && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="mb-12"
            >
              <GiftSection
                gifts={gifts}
                selectedGifts={selectedGifts}
                onGiftToggle={handleGiftToggle}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Summary section when complete */}
        <AnimatePresence>
          {hasSecondSelection && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 px-8 py-4 rounded-2xl border border-primary/30">
                <Trophy className="w-8 h-8 text-primary" />
                <div className="flex flex-col items-start">
                  <span className="text-sm text-muted-foreground">Você está levando:</span>
                  <span className="font-bold text-lg text-foreground">
                    2 Cursos + {selectedGifts.length} Bônus
                  </span>
                </div>
                <Sparkles className="w-6 h-6 text-accent animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Price Footer */}
      <PriceFooter
        totalOriginal={totalOriginal}
        totalWithDiscount={totalWithDiscount}
        installmentValue={installmentValue}
        installments={installments}
        bonusTotal={bonusTotal}
        canCheckout={hasSecondSelection}
      />
    </div>
  );
};

export default Index;
