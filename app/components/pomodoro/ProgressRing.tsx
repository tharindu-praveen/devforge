"use client";

import { ReactNode } from "react";

interface ProgressRingProps {
  progress: number;
  children: ReactNode;
}

export default function ProgressRing({
  progress,
  children,
}: ProgressRingProps) {
  const radius = 140;
  const stroke = 12;

  const normalizedRadius = radius - stroke / 2;

  const circumference =
    normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference -
    (progress / 100) * circumference;

  return (
    <div className="relative flex h-80 w-80 items-center justify-center">

      <svg
        className="absolute -rotate-90"
        width={radius * 2}
        height={radius * 2}
      >
        {/* Background */}

        <circle
          stroke="#1e293b"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress */}

        <circle
          stroke="#22c55e"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      <div className="absolute">
        {children}
      </div>

    </div>
  );
}