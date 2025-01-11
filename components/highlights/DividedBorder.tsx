"use client";
import React from "react";

export default function DividedBorders({
  numberOfStatus = 1,
  imageUrl,
  onClick
}: {
  numberOfStatus: number;
  imageUrl: string;
  onClick?: (event: any) => void;
}) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference / numberOfStatus;
  const gapLength = 5;

  const dashGapLength = segmentLength + gapLength;
  const adjustedSegmentLength =
    (circumference - gapLength * numberOfStatus) / numberOfStatus; // Adjust segment length to fit within the circumference
  const imageSize = 55;
  const svgSize = radius * 2 + 20;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: `${svgSize}px`, height: `${svgSize}px` }}
      onClick={onClick}
    >
      {/* SVG Circle */}
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="absolute"
      >
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke="green"
          strokeWidth="4"
          strokeDasharray={`${adjustedSegmentLength} ${gapLength}`}
          strokeDashoffset={numberOfStatus < 2 ? 0 : -gapLength}
          strokeLinecap={numberOfStatus < 2 ? "square" : "round"}
        />
      </svg>

      {/* Centered Image */}
      <img
        src={imageUrl}
        alt="User"
        className="absolute rounded-full"
        style={{
          width: `${imageSize}px`,
          height: `${imageSize}px`,
          objectFit: "cover",
        }}
      />
    </div>
  );
}
