"use client"


import RecentCall from '@/components/calls/RecentCall'
import BottomNavbar from '@/components/navbar/BottomNavbar'
import { CallOutlined, DeleteOutline, EditOutlined, EmailOutlined, ExpandLess, ExpandMore, RecentActors, SearchOutlined, VideocamOutlined } from '@mui/icons-material'
import { Box, Button, Collapse, IconButton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import FriendRequest from '@/components/people/FriendRequest'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function Layout() {
    const [showCalls, setShowCalls] = useState(false);
    const [isMediumSize, setIsMediumSize] = useState(false);
    const params = useParams();


    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMediumSize(width <= 1024);
        };

        const { id } = params;
        setShowCalls(id ? true : false);

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [params]);

    const [openFriendRequests, setOpenFriendRequests] = useState(true);

    const handleOpenFriendRequestsToggle = () => {
        setOpenFriendRequests(!openFriendRequests);
    };

    const [requests, setRequests] = useState([
        {
            id: 1,
            name: 'John Doe',
            details: 'Software Engineer at ABC Corp',
            imageUrl: 'https://via.placeholder.com/50',
        },
        {
            id: 2,
            name: 'Alice Smith',
            details: 'Product Designer at XYZ Inc.',
            imageUrl: 'https://via.placeholder.com/50',
        },
    ]);

    const handleAccept = (id: number) => {
        setRequests((prev) => prev.filter((request) => request.id !== id));
        alert(`Friend request from ID ${id} accepted!`);
    };

    const handleDelete = (id: number) => {
        setRequests((prev) => prev.filter((request) => request.id !== id));
        alert(`Friend request from ID ${id} deleted!`);
    };

    const [tabValue, settabValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newtabValue: string) => {
        settabValue(newtabValue);
    };
    return (
        <div className='basis-full md:basis-10/12 flex'>
            <div className="basis-full md:basis-2/6 border-r border-slate-200">
                <div className='h-[10%] md:h-1/6 p-3 flex items-center justify-between'>
                    <div>
                        <Button className='md:hidden text-blue-600 font-bold text-sm items-center' startIcon={
                            <Image src={'/logo-t.png'} alt='Logo' height={40} width={40} />
                        }>BUZZCHAT</Button>
                        <p className="text-sm md:text-xl text-blue-600">People</p>
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
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={tabValue}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Friends" value="friends" />
                                        <Tab label="Request" value="requests" />
                                        <Tab label="Find People" value="find" />
                                    </TabList>
                                </Box>
                                <TabPanel value="friends">
                                    <IconButton className='text-slate-400' onClick={handleOpenFriendRequestsToggle}>
                                        <RecentActors fontSize='small' />
                                        <span className='text-sm'>Friend request</span>
                                    </IconButton>

                                    <div>
                                        {requests.map((request) => (
                                            <FriendRequest
                                                key={request.id}
                                                name={request.name}
                                                details={request.details}
                                                imageUrl={request.imageUrl}
                                                onAccept={() => handleAccept(request.id)}
                                                onDelete={() => handleDelete(request.id)}
                                            />
                                        ))}
                                    </div>
                                </TabPanel>
                                <TabPanel value="requests">Item Two</TabPanel>
                                <TabPanel value="find">Item Three</TabPanel>
                            </TabContext>
                        </Box>

                    </div>
                </div>
                <BottomNavbar isMediumSize={isMediumSize} />
            </div>
            <div className={`${showCalls && isMediumSize ? 'block absolute top-0 left-0 z-10 w-full h-full' : 'hidden'} md:block md:basis-4/6 bg-slate-200`}>
                <div className='h-1/6 p-3 bg-white flex items-center justify-between'>
                    <div className='flex gap-3'>
                        <Link href={'/messages'} className='flex justify-center items-center'>
                            <img src={`/logo.png`} alt={`Another friend`} className='h-12 w-12 aspect-square rounded-full' />
                        </Link>
                        <div className=''>
                            <p className="font-bold">Chinedu Oyenre</p>
                            <p className="text-green-400 text-sm">Short bio ...</p>
                        </div>
                    </div>
                    <div className="flex text-slate-400 gap-3 items-center">
                        <IconButton>
                            <EmailOutlined fontSize='large' />
                        </IconButton>
                        <IconButton>
                            <VideocamOutlined fontSize='large' />
                        </IconButton>
                        <IconButton>
                            <CallOutlined fontSize='large' />
                        </IconButton>
                        <IconButton>
                            <DeleteOutline className='text-red-500' fontSize='large' />
                        </IconButton>
                    </div>
                </div>
                <hr />
                <div className="h-5/6 p-3 relative">

                </div>
            </div>
        </div>
    )
}
