"use client";

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
    <div className="flex items-center space-x-1">
      <div className="flex items-center justify-center min-w-[2.5rem] bg-gray-900 text-white rounded-md px-2 py-1">
        <span className="text-lg font-mono font-bold">
          {hours.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-red-500 font-bold">:</span>
      <div className="flex items-center justify-center min-w-[2.5rem] bg-gray-900 text-white rounded-md px-2 py-1">
        <span className="text-lg font-mono font-bold">
          {minutes.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-red-500 font-bold">:</span>
      <div className="flex items-center justify-center min-w-[2.5rem] bg-gray-900 text-white rounded-md px-2 py-1">
        <span className="text-lg font-mono font-bold">
          {seconds.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
