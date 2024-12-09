"use client"


import AuthenticatedNavbar from '@/components/navbar/AuthenticatedNavbar'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='flex flex-grow-0 flex-shrink-0 w-screen h-screen overflow-hidden relative'>
            <AuthenticatedNavbar />
            {children}
            {/* <OnVideoCall /> */}
            {/* <OnVoiceCall/> */}
            {/* <CallNotification/> */}
        </main>
    )
}
