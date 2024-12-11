// import { ArrowDownward, CallMadeOutlined, CallOutlined, CallReceivedOutlined, DoneAllOutlined, PhoneMissedOutlined } from '@mui/icons-material'
import { CallMadeOutlined, CallOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default function RecentCall() {
    return (
        <div className='h-20 md:h-16 grid grid-cols-9 gap-2 items-center justify-center'>
            <div className='col-span-2 flex justify-center items-center cursor-pointer'>
                <img src={`/logo.png`} alt={`Another friend`} className='h-12 w-12 aspect-square rounded-full' />
            </div>
            <div className='col-span-7 flex justify-between cursor-pointer '>
                <Link href={'/calls/calls'} className='flex flex-col justify-between items-stretch'>
                    <p className="font-bold">Chinedu Oyenre</p>
                    <div className='flex items-center gap-2'>
                        <CallMadeOutlined className='text-sm md:text-base text-green-500' />
                        {/* <PhoneMissedOutlined className='text-sm md:text-base text-green-500' /> */}
                        {/* <CallReceivedOutlined className='text-sm md:text-base text-red-500'/> */}
                        <p className="text-slate-400 text-sm md:text-base">Today, 05:11 PM</p>
                    </div>
                </Link>
                <div className='flex justify-between items-center'>
                    <Tooltip title="Call">
                        <IconButton className='inline'>
                            <CallOutlined fontSize='large' className='text-slate-400' />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}
