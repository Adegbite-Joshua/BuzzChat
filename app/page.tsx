"use client"

import Features from "@/components/landingPage/Features";
import HeroSection from "@/components/landingPage/HeroSection";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <HeroSection />
      <Features />
      <div className="my-5 grid grid-cols-2 p-36 gap-5">
        <div>
          <p className="text-4xl font-bold">Communicate more efficiently using <span className="text-blue-600">Buzzchat</span></p>
          <p className="text-slate-400 font-semibold">Send messages easily using our mobile or desktop application and with a myriad of features that can make your experience different from other applications</p>
          <div className="flex justify-between">
            <div>
              <p className="text-3xl font-bold">1K+</p>
              <p className="text-slate-400 font-bold">Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold">2K+</p>
              <p className="text-slate-400 font-bold">Downloads</p>
            </div>
            <div>
              <p className="text-3xl font-bold">1+</p>
              <p className="text-slate-400 font-bold">Years</p>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <img src="/hero-section.png" alt="" className="h-full w-auto" />
        </div>
      </div>
      <div className="my-5 grid grid-cols-2 p-36 gap-5">
        <div className="overflow-hidden">
          <img src="/hero-section.png" alt="" className="h-full w-auto" />
        </div>
        <div>
          <p className="text-4xl font-bold">Send messages in <span className="text-blue-600">Real Time</span>, without any delay between us</p>
          <p className="text-slate-400 font-semibold">Send messages easily and also without any delay between us, making the convenience of sending messages better and fun.</p>
          <Button className="bg-blue-600 text-white">Learn More</Button>
        </div>
      </div>
    </main>
  );
}