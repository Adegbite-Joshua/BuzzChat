import { Button } from '@mui/material'
import React from 'react'
import Feature from './Feature'
import Face5 from '@mui/icons-material/Face5'
import PunchClock from '@mui/icons-material/PunchClock'
import Timelapse from '@mui/icons-material/Timelapse'
import Timeline from '@mui/icons-material/Timeline'
import Timer from '@mui/icons-material/Timer'
import Lock from '@mui/icons-material/Lock'

export default function Features() {
  return (
    <section className='text-center my-5'>
        <Button className='text-blue-600 bg-slate-100 font-semibold px-4 py-3 hover:bg-blue-600 hover:text-white duration-300 ease-in-out rounded-full '>Featured</Button>
        <p className="text-2xl my-4">Reasons why you should choose <span className='text-3xl text-blue-600'>Buzzchat.</span></p>
        <p className='text-slate-400 mx-auto md:w-2/4 font-semibold'>Buzzchat has several that make the reason why you choose Buzzchat.</p>

        <div className='grid grid-cols-3 p-20 gap-5'>
            <Feature icon={<Face5/>} title='Easy to use' text='Easy and simple to use for anyone.'/>
            <Feature icon={<Timelapse/>} title='Real Time' text='Connect with others in real time.'/>
            <Feature icon={<Lock/>} title='Safety & Private' text='Enjoy your comfort and safety when communicating.'/>
        </div>
    </section>
  )
}
