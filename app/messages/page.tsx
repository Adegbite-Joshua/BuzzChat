"use client"


import MessagedUser from '@/components/messages/MessagedUser'
import ReceiverMessage from '@/components/messages/ReceiverMessage'
import SenderMessage from '@/components/messages/SenderMessage'
import { CallOutlined, ChatRounded, EditOutlined, FmdGoodOutlined, GroupsOutlined, MoreHorizOutlined, SearchOutlined, SettingsOutlined, VideocamOutlined } from '@mui/icons-material'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <main className='flex flex-grow-0 flex-shrink-0 w-screen h-screen overflow-hidden'>
            <nav className='md:basis-2/12 border-r border-slate-200 p-3'>
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
            <div className='basis-full md:basis-10/12 flex'>
                <div className="basis-full md:basis-2/6 border-r border-slate-200">
                    <div className='h-1/6 p-3 flex items-center justify-between'>
                        <p className="text-xl text-blue-600">Messages</p>
                        <div>
                            <EditOutlined className='text-slate-400 mx-2 hover:cursor-pointer' />
                            <SearchOutlined className='text-slate-400 mx-2 hover:cursor-pointer' />
                        </div>
                    </div>
                    <hr />
                    <div className='md:h-5/6 p-3 overflow-auto scrollbar-hidden'>
                        <div>
                            <div className='text-slate-400 flex text-sm gap-3 p-2'>
                                <FmdGoodOutlined fontSize='small' />
                                <span>Pinned Message</span>
                            </div>
                            <div>
                                <MessagedUser />
                                <MessagedUser />
                            </div>
                        </div>
                        <div>
                            <div className='text-slate-400 flex text-sm gap-3 p-2'>
                                <ChatRounded fontSize='small' />
                                <span>All Message</span>
                            </div>
                            <div>
                                <MessagedUser />
                                <MessagedUser />

                            </div>
                        </div>
                    </div>
                </div>
                <div className='basis-4/6 bg-slate-200'>
                    <div className='h-1/6 p-3 bg-white flex items-center justify-between'>
                        <div className='flex gap-3'>
                            <div className='flex justify-center items-center'>
                                <img src={`/logo.png`} alt={`Another friend`} className='h-12 w-12 aspect-square rounded-full' />
                            </div>
                            <div className=''>
                                <p className="font-bold">Chinedu Oyenre</p>
                                <p className="text-green-400 text-sm">Typing...</p>
                            </div>
                        </div>
                        <div className="flex text-slate-400 gap-3 items-center">
                            <VideocamOutlined className='cursor-pointer' fontSize='large' />
                            <CallOutlined className='cursor-pointer' fontSize='large' />
                            <div className='h-10 w-10 flex justify-center items-center border rounded-full'>
                                <MoreHorizOutlined className='cursor-pointer' fontSize='large' />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='h-5/6 p-3 relative overflow-y-auto overflow-x-hidden scrollbar-hidden'>
                        <div className='absolute flex w-full'>
                            <span className='p-1 text-xs bg-white text-black rounded-md mx-auto'>Today, Dec 30</span>
                        </div>
                        <ReceiverMessage/>
                        <ReceiverMessage/>
                        <ReceiverMessage/>
                        <SenderMessage/>
                        <ReceiverMessage/>
                        <SenderMessage/>
                        <SenderMessage/>
                        <SenderMessage/>
                    </div>
                </div>
            </div>
        </main>
    )
}
