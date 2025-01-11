"use client"


import AuthenticatedNavbar from '@/components/navbar/AuthenticatedNavbar'
import React, { useState } from 'react'
import OnVideoCall from "@/components/calls/OnVideoCall";
import CallNotification from "@/components/calls/CallNotification";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [showVideoCall, setShowVideoCall] = useState(false);
    const [showCallNotification, setShowCallNotification] = useState(true);
    return (
        <main className='flex flex-grow-0 flex-shrink-0 w-screen h-screen overflow-hidden relative'>
            <AuthenticatedNavbar />
            {children}
            {showVideoCall && <OnVideoCall setShowVideoCall={setShowVideoCall} />}
            {/* <OnVoiceCall/> */}
            {!showVideoCall && showCallNotification && <CallNotification setShowCallNotification={setShowCallNotification} setShowVideoCall={setShowVideoCall}/>}
        </main>
    )
}
