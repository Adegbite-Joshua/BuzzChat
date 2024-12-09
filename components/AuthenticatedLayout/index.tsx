"use client"

import AuthenticatedNavbar from '@/components/navbar/AuthenticatedNavbar'
import React from 'react'
import OnVideoCall from "@/components/calls/OnVideoCall";
import CallNotification from '../calls/CallNotification';

export default function AuthenticatedLayout({ children }: {children: React.ReactNode}) {
    return (
        <main className='flex flex-grow-0 flex-shrink-0 w-screen h-screen overflow-hidden relative'>
            <AuthenticatedNavbar />
            {children}
        </main>
    )
}