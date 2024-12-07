import { DoneAllOutlined } from '@mui/icons-material'
import Link from 'next/link'
import React from 'react'

export default function MessagedUser() {
    return (
        <div className='h-20 md:h-16 grid grid-cols-9 gap-2 items-center justify-center'>
            <div className='col-span-2 flex justify-center items-center cursor-pointer'>
                <img src={`/logo.png`} alt={`Another friend`} className='h-12 w-12 aspect-square rounded-full' />
            </div>
            <Link href={'/messages?messages=true'} className='col-span-7 flex flex-col justify-center cursor-pointer'>
                <div className='flex justify-between items-stretch'>
                    <p className="font-bold">Chinedu Oyenre</p>
                    <p className="text-slate-400 text-sm md:text-base">05:11 PM</p>
                </div>
                <div className='flex justify-between'>
                    <p className="text-green-400 text-sm">Typing...</p>
                    {/* <p className="bg-red-600 text-white text-sm h-5 w-5 flex font-bold justify-center items-center rounded-full"><span>2</span></p> */}
                    {/* <MarkChatRead/> */}
                    <DoneAllOutlined className={`${1 ? 'text-slate-400' : 'text-green-400'} text-sm md:text-xl`}/>
                </div>
            </Link>
        </div>
    )
}
