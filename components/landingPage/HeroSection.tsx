import Android from '@mui/icons-material/Android'
import Apple from '@mui/icons-material/Apple'
import { Button } from '@mui/material'
import React from 'react'

export default function HeroSection() {
  return (
    <section className='grid grid-cols-2 items-center p-20 text-white bg-blue-600 h-[350px] relative'>
        <h2 className='text-4xl'>
            Get the best <span className="font-extrabold">experience</span> when communicating
        </h2>
        <div>
            <p>Platform used to send messages with a myriad of features, by priotizing the user experience</p>
            <div className='my-5 flex flex-col justify-end items-end gap-3'>
              <button className='flex flex-row gap-2 text-white font-semibold px-3 py-2 hover:bg-slate-100 hover:text-blue-600 duration-300 ease-in-out rounded-full border border-white'><Apple/> Download</button>
              <button className='flex flex-row gap-2 text-white font-semibold px-3 py-2 hover:bg-slate-100 hover:text-blue-600 duration-300 ease-in-out rounded-full border border-white'><Android/> Download</button>
            </div>
        </div>
        <img src="/hero-section.png" alt="" className='absolute h-full' />
    </section>
  )
}