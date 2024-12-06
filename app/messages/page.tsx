"use client"


import { CallOutlined, EditAttributesOutlined, EditOutlined, GroupsOutlined, SearchOutlined, SettingsOutlined } from '@mui/icons-material'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <main className='flex flex-grow-0 flex-shrink-0 w-screen h-screen p-5'>
            <nav className='basis-2/12 border-r border-slate-600 p-3'>
                <div className='h-24'>
                    <Button className='text-blue-600 font-bold text-xl items-center' startIcon={
                        <Image src={'/logo-t.png'} alt='Logo' height={100} width={100} />
                    }>BUZZCHAT</Button>
                </div>
                <hr />
                <Link href={'/'} className={`flex items-center justify-start gap-3 p-2 my-2 ${true ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><EmailOutlined fontSize='medium' /> <span>Messages</span></Link>
                <Link href={'/'} className={`flex items-center justify-start gap-3 p-2 my-2 ${false ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><GroupsOutlined fontSize='medium' /> <span>Groups</span></Link>
                <Link href={'/'} className={`flex items-center justify-start gap-3 p-2 my-2 ${true ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><SettingsOutlined fontSize='medium' /> <span>Settings</span></Link>
                <Link href={'/'} className={`flex items-center justify-start gap-3 p-2 my-2 ${true ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><CallOutlined fontSize='medium' /> <span>Call</span></Link>
                <Link href={'/'} className={`flex items-center justify-start gap-3 p-2 my-2 ${false ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><EmailOutlined fontSize='medium' /> <span>Messages</span></Link>
                <Link href={'/'} className={`flex items-center justify-start gap-3 p-2 my-2 ${false ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><EmailOutlined fontSize='medium' /> <span>Messages</span></Link>
                <Link href={'/'} className={`flex items-center justify-start gap-3 p-2 my-2 ${true ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><EmailOutlined fontSize='medium' /> <span>Messages</span></Link>
            </nav>
            <div className='basis-10/12 flex'>
                <div className="basis-2/6 p-3">
                    <div className='h-24 flex items-center justify-between'>
                        <p className="text-xl text-blue-600">Messages</p>
                        <div>
                            <EditOutlined className='mx-2 hover:cursor-pointer' />
                            <SearchOutlined className='mx-2 hover:cursor-pointer' />
                        </div>
                    </div>
                    <hr />
                    
                </div>
                <div className='basis-4/6 bg-slate-200'></div>
            </div>
        </main>
    )
}
