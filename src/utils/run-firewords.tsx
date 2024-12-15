import confetti from "canvas-confetti";

interface ConfettiOptions {
  startVelocity?: number;
  spread?: number;
  ticks?: number;
  zIndex?: number;
  particleCount?: number;
  origin?: {
    x: number;
    y: number;
  };
}

export const runFireworks = (): void => {
  const duration: number = 5 * 1000;
  const animationEnd: number = Date.now() + duration;
  const defaults: ConfettiOptions = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
  };

  function randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(() => {
    const timeLeft: number = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount: number = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};
