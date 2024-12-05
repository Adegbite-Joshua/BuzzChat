"use client"

import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import Form from '@/components/signup/Form';
import React from 'react'
 

export default function page() {
  return (
    <main>
        <Navbar/>
        <div className='my-5 p-2'>
          <p className="text-3xl text-center text-blue-600 font-bold">BuzzChat</p>
          <Form/>
        </div>
        <Footer/>
    </main>
  )
}
