import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./button";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const scrollToTop = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleScroll = () => {
    setIsVisible(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={scrollToTop}
        className="fixed bottom-6 right-12 rounded-full shadow-xl hover:scale-110  transition-all transform "
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    )
  );
};

export default ScrollToTopButton;
