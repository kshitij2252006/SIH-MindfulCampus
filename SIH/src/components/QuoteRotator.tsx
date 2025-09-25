import { useState, useEffect } from "react";

const quotes = [
  "Believe you can and you're halfway there.",
  "Every day is a new beginning.",
  "You are stronger than you think.",
  "Difficult roads often lead to beautiful destinations.",
  "Your only limit is your mind.",
  "Small steps every day lead to big results.",
  "Progress, not perfection.",
  "You have the power to change your story.",
  "Keep going. Everything you need will come to you.",
  "Success is the sum of small efforts repeated day in and day out."
];

export function QuoteRotator() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [nextQuoteIndex, setNextQuoteIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentQuoteIndex(nextQuoteIndex);
        setNextQuoteIndex((nextQuoteIndex + 1) % quotes.length);
        setIsAnimating(false);
      }, 350);
    }, 4000);

    return () => clearInterval(interval);
  }, [nextQuoteIndex]);

  return (
    <div className="relative h-20 my-6 max-w-3xl mx-auto text-center">
      <span 
        className={`absolute left-0 right-0 text-xl md:text-2xl text-white/95 font-light italic transition-all duration-700 will-change-transform drop-shadow-md ${
          isAnimating 
            ? 'opacity-0 -translate-y-10' 
            : 'opacity-100 translate-y-0'
        }`}
      >
        "{quotes[currentQuoteIndex]}"
      </span>
    </div>
  );
}