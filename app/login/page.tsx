"use client"

import Footer from '@/components/footer/Footer'
import Form from '@/components/login/Form'
import Navbar from '@/components/navbar/Navbar'
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
