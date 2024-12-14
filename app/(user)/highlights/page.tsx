"use client"
import React from 'react'

export default function Page() {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const segments = 6;  // Number of segments you want
    const segmentLength = circumference / segments;
    const gapLength = 5;  // Small gap between the segments

    // Total length of dash plus gap, ensuring it fits within the circumference
    const dashGapLength = segmentLength + gapLength;
    const adjustedSegmentLength = (circumference - gapLength * segments) / segments; // Adjust segment length to fit within the circumference

    return (
        <div>
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle 
                    cx="50" cy="50" r={radius}
                    fill="none" stroke="green" strokeWidth="4"
                    strokeDasharray={`${adjustedSegmentLength} ${gapLength}`} 
                    strokeDashoffset={segments < 2 ? 0 : -gapLength}
                    strokeLinecap={segments < 2 ? 'square' : "round"}  // This gives the arcs rounded ends
                />
            </svg>
        </div>
    )
}
