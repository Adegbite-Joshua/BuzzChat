"use client"


import AuthenticatedNavbar from '@/components/navbar/AuthenticatedNavbar'
import React from 'react'
import OnVideoCall from "@/components/calls/OnVideoCall";
import CallNotification from "@/components/calls/CallNotification";

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
