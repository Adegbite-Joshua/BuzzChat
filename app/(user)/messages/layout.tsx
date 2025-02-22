"use client"

import AttachmentPopover from '@/components/messages/AttachmentPopover'
import MessagedUser from '@/components/messages/MessagedUser'
import ReceiverMessage from '@/components/messages/ReceiverMessage'
import SenderMessage from '@/components/messages/SenderMessage'
import BottomNavbar from '@/components/navbar/BottomNavbar'
import { Add, AttachFileOutlined, CallOutlined, ChatRounded, CloseOutlined, CopyAllOutlined, DeleteOutline, EditOutlined, FmdGoodOutlined, InfoOutlined, MicOutlined, MoreHorizOutlined, ReplyAllOutlined, SearchOutlined, SendOutlined, UndoOutlined, VideocamOutlined } from '@mui/icons-material'
import { Button, IconButton, TextField, Tooltip, Fade } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation';
import useGetUserDetails from '@/hooks/useGetUserDetails'
import { useUserDetails } from '@/contexts/UserDetailsContext'
import MessageFriend from '@/components/messages/MessageFriend'
import axios from 'axios'
import { toast } from 'react-toastify'

export const ActionButtons = ({ type, isMessagesSelected }: { type?: string, isMessagesSelected?: boolean }) => {
    if (isMessagesSelected && type == 'messages') {
        return (
            <div className="flex text-slate-400 gap-3 items-center">
                <Tooltip title="Copy" arrow>
                    <IconButton>
                        <CopyAllOutlined fontSize='large' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Vioce Call" arrow>
                    <IconButton>
                        <DeleteOutline fontSize='large' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="More" arrow>
                    <IconButton className='h-10 w-10 flex justify-center items-center border rounded-full'>
                        <InfoOutlined fontSize='large' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="More" arrow>
                    <IconButton className='h-10 w-10 flex justify-center items-center border rounded-full'>
                        <ReplyAllOutlined fontSize='large' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="More" arrow>
                    <IconButton className='h-10 w-10 flex justify-center items-center border rounded-full'>
                        <UndoOutlined fontSize='large' />
                    </IconButton>
                </Tooltip>
            </div>
        )
    }

    return (
        <div className="flex text-slate-400 gap-3 items-center">
            <Tooltip title="Video Call" arrow>
                <IconButton>
                    <VideocamOutlined fontSize='large' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Vioce Call" arrow>
                <IconButton>
                    <CallOutlined fontSize='large' />
                </IconButton>
            </Tooltip>
            <Tooltip title="More" arrow>
                <IconButton className='h-10 w-10 flex justify-center items-center border rounded-full'>
                    <MoreHorizOutlined fontSize='large' />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default function Layout() {
    const [showMessages, setShowMessages] = useState(false);
    const [isMediumSize, setIsMediumSize] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
    const [isMessagesSelected, setIsMessagesSelected] = useState(false);
    const params = useParams();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const { userFriends, friendInChatWith, setFriendInChatWith } = useUserDetails();

    const handleAttachmentClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleSelectAttachment = () => {

    };

    useEffect(() => {
        console.log("Selected Messages:", selectedMessages);
        setIsMessagesSelected(selectedMessages.length > 0);
    }, [selectedMessages]);

    const handleSetSelectedMessages = (messageId: string) => {
        setSelectedMessages((prev) => {
            if (prev.includes(messageId)) {
                return prev.filter((id) => id !== messageId);
            } else {
                return [...prev, messageId];
            }
        });

    };

    useEffect(() => {
        selectedMessages.length > 0 ? setIsMessagesSelected(true) : setIsMessagesSelected(false);
    }, [selectedMessages]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMediumSize(width <= 1024);
        };

        const { id } = params;

        if (!friendInChatWith) {
            axios.get(`/api/user/details/${id}`)
            .then((response) => {
                setFriendInChatWith(response.data.user);
            })
            .catch((error) => {
                toast.error('Error fetching user details')
                console.error(error);
            });
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [params]);

    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const [viewProfile, setViewProfile] = useState(false);

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isViewingAllFriends, setIsViewingAllFriends] = useState(false);
    const [filteredMessages, setFilteredMessages] = useState<string[]>([]);
    const searchInputRef = useRef(null);

    const toggleSearch = () => {
        setIsSearchVisible((prev) => !prev);
    };

    const toggleViewAllFriends = () => {
        setIsViewingAllFriends((prev) => !prev);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;

        if (!target) return;

        const searchText = target.value.toLowerCase();
        const filtered = ['hhhh', 'jjj'].filter((msg) =>
            msg.toLowerCase().includes(searchText)
        );

        setFilteredMessages(filtered);
    };

    useEffect(() => {
        if (isSearchVisible && searchInputRef.current) {
            // searchInputRef.current.focus();
        }
    }, [isSearchVisible]);

    return (
        <div className='basis-full md:basis-10/12 flex'>
            <div className="basis-full md:basis-2/6 border-r border-slate-200">
                <div className='h-[10%] md:h-1/6 p-3 flex items-center justify-between relative'>
                    <div>
                        <Button
                            className='md:hidden text-blue-600 font-bold text-sm flex items-center'
                            startIcon={
                                <Image src={'/logo-t.png'} alt='Logo' height={40} width={40} />
                            }
                        >
                            BUZZCHAT
                        </Button>
                        <p className="text-sm md:text-xl text-blue-600">Messages</p>
                    </div>
                    <div className="flex items-center relative">
                        <IconButton onClick={toggleViewAllFriends}>
                            <Add className='text-slate-400 mx-2' />
                        </IconButton>

                        <IconButton onClick={toggleSearch}>
                            <SearchOutlined className='text-slate-400 mx-2' />
                        </IconButton>

                        <Fade in={isSearchVisible}>
                            <div className="absolute right-0 top-full mt-2 w-64">
                                <TextField
                                    inputRef={searchInputRef}
                                    variant="outlined"
                                    size="small"
                                    placeholder="Search messages..."
                                    onChange={handleSearch}
                                    autoComplete="off"
                                    fullWidth
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '4px',
                                        boxShadow: 1,
                                    }}
                                />
                            </div>
                        </Fade>
                        <Fade in={isViewingAllFriends}>
                            <div className="absolute right-0 top-full mt-2 w-64 bg-gray-200 p-3">
                                {userFriends.map(friend => (
                                    <MessageFriend toggleViewAllFriends={toggleViewAllFriends} user={friend} />
                                ))}
                            </div>
                        </Fade>
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
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-slate-400 flex text-sm gap-3 p-2'>
                            <ChatRounded fontSize='small' />
                            <span>All Message</span>
                        </div>
                        <div>
                            <MessagedUser />                           
                        </div>
                    </div>
                </div>
                <BottomNavbar isMediumSize={isMediumSize} />
            </div>
            <div className={`${friendInChatWith && isMediumSize ? 'block absolute top-0 left-0 z-10 w-full h-full' : 'hidden'} md:block md:basis-4/6 bg-slate-200`}>
                <div className='w-full h-full relative'>
                    <div className='h-1/6 p-3 bg-white flex items-center justify-between'>
                        <div className='flex gap-3'>
                            <Link href={'/messages'} className='flex justify-center items-center'>
                                <img src={`/logo.png`} alt={`Another friend`} className='h-12 w-12 aspect-square rounded-full' />
                            </Link>
                            <div onClick={() => setViewProfile(!viewProfile)} className='cursor-pointer'>
                                <p className="font-bold">{friendInChatWith?.firstName} {friendInChatWith?.lastName}</p>
                                {/* <p className="text-green-400 text-sm">Typing...</p> */}
                            </div>
                        </div>
                        <ActionButtons type={'messages'} isMessagesSelected={isMessagesSelected} />
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
                                {["1"].map((id) => (
                                    <SenderMessage key={id} messageId={id} selectedMessages={selectedMessages} handleSetSelectedMessages={handleSetSelectedMessages} isMessagesSelected={isMessagesSelected} />
                                ))}
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
                                <Tooltip title="Attach files">
                                    <IconButton onClick={handleAttachmentClick}>
                                        <AttachFileOutlined />
                                    </IconButton>
                                </Tooltip>

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

                                <Tooltip title="Voice note">
                                    <IconButton>
                                        <MicOutlined />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Send">
                                    <IconButton>
                                        <SendOutlined />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    {viewProfile &&
                        <div className="absolute top-0 left-0 w-full h-full p-3 bg-slate-200">
                            <Tooltip title="Close" arrow>
                                <IconButton onClick={() => setViewProfile(false)}>
                                    <CloseOutlined />
                                </IconButton>
                            </Tooltip>
                            <div className="flex flex-col items-center">
                                <img src="/logo.png" className="h-24 w-24 relative rounded-full border-2 border-blue-600" />
                                <div className="flex gap-2 items-center">
                                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                                    <p className="font-bold text-2xl">Adegbite Joshua</p>
                                </div>
                                <small className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, quo?...</small>
                                <ActionButtons />
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}
