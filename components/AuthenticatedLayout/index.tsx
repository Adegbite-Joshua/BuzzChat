"use client"

import AuthenticatedNavbar from '@/components/navbar/AuthenticatedNavbar'
import React from 'react'

export default function AuthenticatedLayout({ children }: {children: React.ReactNode}) {
    return (
        <main className='flex flex-grow-0 flex-shrink-0 w-screen h-screen overflow-hidden'>
            <AuthenticatedNavbar />
            {children}
        </main>
    )
}