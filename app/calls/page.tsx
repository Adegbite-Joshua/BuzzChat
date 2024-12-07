"use client"

import AuthenticatedLayout from '@/components/AuthenticatedLayout'
import BottomNavbar from '@/components/navbar/BottomNavbar'
import { EditOutlined, SearchOutlined } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
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
    <AuthenticatedLayout>
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

          </div>
          <BottomNavbar />
        </div>
        <div className={`${showCalls && isMediumSize ? 'block absolute top-0 left-0 z-10 w-full h-full' : 'hidden'} md:block md:basis-4/6 bg-slate-200`}>
          <div className='h-1/6 p-3 bg-white flex items-center justify-between'>

          </div>
          <hr />
          <div className="h-5/6 p-3 relative">

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
