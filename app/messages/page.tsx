"use client"

import AuthenticatedLayout from '@/components/AuthenticatedLayout'
import AttachmentPopover from '@/components/messages/AttachmentPopover'
import MessagedUser from '@/components/messages/MessagedUser'
import ReceiverMessage from '@/components/messages/ReceiverMessage'
import SenderMessage from '@/components/messages/SenderMessage'
import BottomNavbar from '@/components/navbar/BottomNavbar'
import { AttachFileOutlined, CallOutlined, ChatRounded, EditOutlined, FmdGoodOutlined, MicOutlined, MoreHorizOutlined, SearchOutlined, SendOutlined, VideocamOutlined } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'


export default function page() {
    const searchParams = useSearchParams();
    const [showMessages, setShowMessages] = useState(false);
    const [isMediumSize, setIsMediumSize] = useState(false);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleAttachmentClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleSelectAttachment = (type: string) => {

    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMediumSize(width <= 1024);
        };

        const isMessagesVisible = searchParams.get('messages') === 'true';
        setShowMessages(isMessagesVisible);

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [searchParams]);

    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <AuthenticatedLayout>
            <div className='basis-full md:basis-10/12 flex'>
                <div className="basis-full md:basis-2/6 border-r border-slate-200">
                    <div className='h-[10%] md:h-1/6 p-3 flex items-center justify-between'>
                        <div>
                            <Button className='md:hidden text-blue-600 font-bold text-sm items-center' startIcon={
                                <Image src={'/logo-t.png'} alt='Logo' height={40} width={40} />
                            }>BUZZCHAT</Button>
                            <p className="text-sm md:text-xl text-blue-600">Messages</p>
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
                                <FmdGoodOutlined fontSize='small' />
                                <span>Pinned Message</span>
                            </div>
                            <div>
                                <MessagedUser />
                                <MessagedUser />
                            </div>
                        </div>
                        <div className=''>
                            <div className='text-slate-400 flex text-sm gap-3 p-2'>
                                <ChatRounded fontSize='small' />
                                <span>All Message</span>
                            </div>
                            <div>
                                <MessagedUser />
                                <MessagedUser />
                                <MessagedUser />
                                <MessagedUser />
                                <MessagedUser />
                                <MessagedUser />
                                <MessagedUser />

                            </div>
                        </div>
                    </div>
                    <BottomNavbar />
                </div>
                <div className={`${showMessages && isMediumSize ? 'block absolute top-0 left-0 z-10 w-full h-full' : 'hidden'} md:block md:basis-4/6 bg-slate-200`}>
                    <div className='h-1/6 p-3 bg-white flex items-center justify-between'>
                        <div className='flex gap-3'>
                            <Link href={'/messages'} className='flex justify-center items-center'>
                                <img src={`/logo.png`} alt={`Another friend`} className='h-12 w-12 aspect-square rounded-full' />
                            </Link>
                            <div className=''>
                                <p className="font-bold">Chinedu Oyenre</p>
                                <p className="text-green-400 text-sm">Typing...</p>
                            </div>
                        </div>
                        <div className="flex text-slate-400 gap-3 items-center">
                            <IconButton>
                                <VideocamOutlined fontSize='large' />
                            </IconButton>
                            <IconButton>
                                <CallOutlined fontSize='large' />
                            </IconButton>
                            <IconButton className='h-10 w-10 flex justify-center items-center border rounded-full'>
                                <MoreHorizOutlined fontSize='large' />
                            </IconButton>
                        </div>
                    </div>
                    <hr />
                    <div className="h-5/6 p-3 relative">
                        {/* Date Label */}
                        <div className='h-[calc(100%-56px)] overflow-y-auto scrollbar-hidden'>
                            <div className="absolute flex w-full">
                                <span className="p-1 text-xs bg-white text-black rounded-md mx-auto">
                                    Today, Dec 30
                                </span>
                            </div>

                            {/* Messages */}
                            <div>
                                <ReceiverMessage />
                                <ReceiverMessage />
                                <ReceiverMessage />
                                <SenderMessage />
                                <ReceiverMessage />
                                <SenderMessage />
                                <SenderMessage />
                                <SenderMessage />
                                <span ref={lastMessageRef} className="h-0"></span>
                            </div>
                        </div>

                        <AttachmentPopover
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handlePopoverClose}
                            onSelectAttachment={handleSelectAttachment}
                        />
                        {/* Sticky Input Field */}
                        <div className="w-full h-14">
                            <div className="flex items-center bg-slate-300 rounded-full w-full h-14 px-4">
                                <IconButton onClick={handleAttachmentClick}>
                                    <AttachFileOutlined />
                                </IconButton>

                                <TextField
                                    variant="outlined"
                                    placeholder="Type a message..."
                                    size="small"
                                    className='w-5/6'
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'white',
                                            borderRadius: '20px',
                                        },
                                    }}
                                />

                                <IconButton>
                                    <MicOutlined />
                                </IconButton>

                                <IconButton>
                                    <SendOutlined />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
