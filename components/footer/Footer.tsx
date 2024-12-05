import Android from '@mui/icons-material/Android'
import Apple from '@mui/icons-material/Apple'
import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className='bg-black text-white md:p-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 p-5 md:p-20'>
                <p className="text-5xl">Want to stay Connected?</p>
                <div className='flex flex-row justify-evenly'>
                    <button className='flex flex-row gap-2 items-center text-white font-semibold px-3 py-2 hover:bg-blue-600 hover:border-blue-600 duration-300 ease-in-out rounded-full border border-white'><Apple /> Download</button>
                    <button className='flex flex-row gap-2 items-center text-white font-semibold px-3 py-2 hover:bg-blue-600 hover:border-blue-600 duration-300 ease-in-out rounded-full border border-white'><Android /> Download</button>
                </div>
            </div>
            <hr />
            <div className='grid grid-cols-1 md:grid-cols-2 p-5 md:p-20'>
                <div>
                    <Button className='text-white font-bold text-3xl items-center' startIcon={
                        <Image src={'/logo-t.png'} alt='Logo' height={100} width={100} />
                    }>BUZZCHAT</Button>

                    <p className='md:w-2/4 text-slate-200'>Platform for sending messages with a myriad of features by prioritizing the user experience</p>
                    <a href="mailto:mail@buzzchat.com.ng">mail@buzzchat.com.ng</a>
                </div>
                <div className='flex flex-row justify-evenly items-end'>
                    <div>
                        <p className='text-xl font-bold'>Home</p>
                        <ul>
                            <li className='my-5'><Link href={'/'}>About</Link></li>
                            <li className='my-5'><Link href={'/'}>Press</Link></li>
                            <li className='my-5'><Link href={'/'}>Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className='text-xl font-bold'>Home</p>
                        <ul>
                            <li className='my-5'><Link href={'/'}>About</Link></li>
                            <li className='my-5'><Link href={'/'}>Press</Link></li>
                            <li className='my-5'><Link href={'/'}>Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className='text-xl font-bold'>Home</p>
                        <ul>
                            <li className='my-5'><Link href={'/'}>About</Link></li>
                            <li className='my-5'><Link href={'/'}>Press</Link></li>
                            <li className='my-5'><Link href={'/'}>Careers</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <small className='block text-center'>All rights reserved by Buzzchat</small>
        </footer>
    )
}
