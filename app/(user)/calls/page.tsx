"use client"

import RecentCall from '@/components/calls/RecentCall'
import BottomNavbar from '@/components/navbar/BottomNavbar'
import { CallOutlined, DeleteOutline, EditOutlined, EmailOutlined, MoreHorizOutlined, RecentActors, SearchOutlined, VideocamOutlined } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [showCalls, setShowCalls] = useState(false);
  const [isMediumSize, setIsMediumSize] = useState(false);
  const searchParams = useSearchParams();



  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMediumSize(width <= 1024);
    };

    const isMessagesVisible = searchParams.get('calls') === 'true';
    setShowCalls(isMessagesVisible);

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [searchParams]);
  return (
      <div className='basis-full md:basis-10/12 flex'>
        <div className="basis-full md:basis-2/6 border-r border-slate-200">
          <div className='h-[10%] md:h-1/6 p-3 flex items-center justify-between'>
            <div>
              <Button className='md:hidden text-blue-600 font-bold text-sm items-center' startIcon={
                <Image src={'/logo-t.png'} alt='Logo' height={40} width={40} />
              }>BUZZCHAT</Button>
              <p className="text-sm md:text-xl text-blue-600">Calls</p>
            </div>
            <div>
              <IconButton>
                <EditOutlined className='text-slate-400 mx-2' />
              </IconButton>
              <IconButton>
                <SearchOutlined className='text-slate-400 mx-2' />
              </IconButton>
            </div>
          </div>
          <hr />
          <div className='h-[80%] md:h-5/6 p-3 overflow-auto scrollbar-hidden'>
            <div>
              <div className='text-slate-400 flex text-sm gap-3 p-2'>
                <RecentActors fontSize='small' />
                <span>Recent calls</span>
              </div>
              <div>
                <RecentCall />
                <RecentCall />
                <RecentCall />
                <RecentCall />
                <RecentCall />
                <RecentCall />
                <RecentCall />
                <RecentCall />
                <RecentCall />
                <RecentCall />
                <RecentCall />
                <RecentCall />
              </div>
            </div>
          </div>
          <BottomNavbar />
        </div>
        <div className={`${showCalls && isMediumSize ? 'block absolute top-0 left-0 z-10 w-full h-full' : 'hidden'} md:block md:basis-4/6 bg-slate-200`}>
          <div className='h-1/6 p-3 bg-white flex items-center justify-between'>
            <div className='flex gap-3'>
              <Link href={'/messages'} className='flex justify-center items-center'>
                <img src={`/logo.png`} alt={`Another friend`} className='h-12 w-12 aspect-square rounded-full' />
              </Link>
              <div className=''>
                <p className="font-bold">Chinedu Oyenre</p>
                <p className="text-green-400 text-sm">Short bio ...</p>
              </div>
            </div>
            <div className="flex text-slate-400 gap-3 items-center">
              <IconButton>
                <EmailOutlined fontSize='large' />
              </IconButton>
              <IconButton>
                <VideocamOutlined fontSize='large' />
              </IconButton>
              <IconButton>
                <CallOutlined fontSize='large' />
              </IconButton>
              <IconButton>
                <DeleteOutline className='text-red-500' fontSize='large' />
              </IconButton>
            </div>
          </div>
          <hr />
          <div className="h-5/6 p-3 relative">

          </div>
        </div>
      </div>
  )
}
