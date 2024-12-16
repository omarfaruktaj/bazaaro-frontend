import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endTime: Date;
}

export default function CountdownTimer({ endTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +endTime - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { hours, minutes, seconds } = timeLeft as {
    hours: number;
    minutes: number;
    seconds: number;
  };

  return (
    <div className="flex space-x-2 text-lg font-bold">
      <span>{hours.toString().padStart(2, "0")}:</span>
      <span>{minutes.toString().padStart(2, "0")}:</span>
      <span>{seconds.toString().padStart(2, "0")}</span>
    </div>
  );
}
