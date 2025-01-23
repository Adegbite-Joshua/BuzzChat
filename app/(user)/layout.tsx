"use client"

import AuthenticatedNavbar from '@/components/navbar/AuthenticatedNavbar'
import React, { useEffect, useState } from 'react'
import OnVideoCall from "@/components/calls/OnVideoCall";
import CallNotification from "@/components/calls/CallNotification";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import SocketProvider from '@/providers/SocketProvider';
import UserDetailsProvider from '@/providers/UserDetailsProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [showVideoCall, setShowVideoCall] = useState(false);
    const [showCallNotification, setShowCallNotification] = useState(true);
    const [isUserTokenVerified, setIsUserTokenVerified] = useState(false);

    const router = useRouter();

    useEffect(() => {
        axios.get(`/api/user/details`, {
            withCredentials: true,
        })
            .then(() => {
                setIsUserTokenVerified(true);
            })
            .catch(error => {
                toast.error('Invalid token')
                router.push('/login');
                console.error(error);
            });
    }, []);

    if (!isUserTokenVerified) {
        return <div></div>
    }

    return (
        <UserDetailsProvider>
            <SocketProvider>
                <main className='flex flex-grow-0 flex-shrink-0 w-screen h-screen overflow-hidden relative'>
                    <AuthenticatedNavbar />
                    {children}
                    {showVideoCall && <OnVideoCall setShowVideoCall={setShowVideoCall} />}
                    {/* <OnVoiceCall/> */}
                    {!showVideoCall && showCallNotification && <CallNotification setShowCallNotification={setShowCallNotification} setShowVideoCall={setShowVideoCall} />}
                </main>
            </SocketProvider>
        </UserDetailsProvider>
    )
}
