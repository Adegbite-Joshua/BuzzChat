"use client"

import Features from "@/components/landingPage/Features";
import HeroSection from "@/components/landingPage/HeroSection";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <main className="">
      <Navbar/>
      <HeroSection/>
      <Features/>
      <div className="my-5 grid">

      </div>
    </main>
  );
}
