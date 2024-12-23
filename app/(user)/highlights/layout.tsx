"use client"

import BottomNavbar from '@/components/navbar/BottomNavbar'
import { CallOutlined, DeleteOutline, EditOutlined, EmailOutlined, RecentActors, SearchOutlined, VideocamOutlined, PersonRemoveOutlined, ChatOutlined } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import FriendRequest from '@/components/people/FriendRequest'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Friend from '@/components/people/Friend'
import AddUser from '@/components/people/AddUser'
import Avatar from "@mui/material/Avatar";
import DividedBorders from '@/components/highlights/DividedBorder'
import User from '@/components/highlights/User'


interface StatusContent {
    url?: string;
    caption?: string;
}

interface Post {
    postId: string;
    type: "text" | "image" | "video";
    content: string | StatusContent;
    timestamp: string;
}

interface User {
    userId: string;
    username: string;
    profilePicture: {
        url: string;
        viewPage: string;
    };
    posts: Post[];
}


export default function Layout({ children }: { children: React.ReactNode }) {
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

    const [tabValue, settabValue] = React.useState('friends');

    const handleChange = (event: React.SyntheticEvent, newtabValue: string) => {
        settabValue(newtabValue);
    };

    const [highlights, setHighlights] = useState([
        {
            "userId": "user001",
            "username": "Alice Johnson",
            "profilePicture": {
                "url": "https://via.placeholder.com/150",
                "viewPage": "https://example.com/profile/user001"
            },
            "posts": [
                {
                    "postId": "post001",
                    "type": "text",
                    "content": "Just finished a great book!",
                    "timestamp": "2024-12-22T10:00:00Z",
                    "viewed": false
                },
                {
                    "postId": "post002",
                    "type": "image",
                    "content": {
                        "url": "https://via.placeholder.com/300",
                        "caption": "Lovely morning walk 🌅"
                    },
                    "timestamp": "2024-12-22T11:00:00Z",
                    "viewed": false
                },
                {
                    "postId": "post003",
                    "type": "video",
                    "content": {
                        "url": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                        "caption": "A quick tutorial I found useful!"
                    },
                    "timestamp": "2024-12-22T12:00:00Z",
                    "viewed": false
                }
            ]
        },
        {
            "userId": "user002",
            "username": "Bob Smith",
            "profilePicture": {
                "url": "https://via.placeholder.com/600x400",
                "viewPage": "https://example.com/profile/user002"
            },
            "posts": [
                {
                    "postId": "post004",
                    "type": "text",
                    "content": "Coffee first ☕️",
                    "timestamp": "2024-12-22T09:00:00Z",
                    "viewed": false
                },
                {
                    "postId": "post005",
                    "type": "image",
                    "content": {
                        "url": "https://via.placeholder.com/300",
                        "caption": "Midday vibes!"
                    },
                    "timestamp": "2024-12-22T14:00:00Z",
                    "viewed": false
                }
            ]
        }
    ]);

    const getHighlightUploadTime = (isoTimestamp: string): string => {
        const date = new Date(isoTimestamp); // Parse the ISO string to a Date object
        const now = new Date(); // Current date and time

        // Convert both dates to numbers (milliseconds since Unix epoch)
        const diffMs = now.getTime() - date.getTime(); // Time difference in milliseconds
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHr / 24);

        if (diffSec < 60) return `${diffSec} seconds ago`;
        if (diffMin < 60) return `${diffMin} minutes ago`;
        if (diffHr < 24) return `${diffHr} hours ago`;
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleString(); // Fallback to full date and time
    }

    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [currentPostIndex, setCurrentPostIndex] = useState(0);
    const [posts, setPosts] = useState(highlights[currentUserIndex].posts);
    useEffect(() => {
      setPosts(highlights[currentUserIndex].posts);
    }, [currentPostIndex, currentUserIndex])
    
    const currentUser = highlights[currentUserIndex];
    const currentPost = currentUser.posts[currentPostIndex];

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentPostIndex < currentUser.posts.length - 1) {
                setCurrentPostIndex((prev) => prev + 1);
            } else if (currentUserIndex < highlights.length - 1) {
                setCurrentPostIndex(0);
                setCurrentUserIndex((prev) => prev + 1);
            } else {
                setCurrentPostIndex(0);
                setCurrentUserIndex(0); // Restart from the first user
            }

            setPosts(highlights[currentUserIndex].posts);
        }, 30000); // 30 seconds(30000)

        return () => clearTimeout(timer);
    }, [currentPostIndex, currentUserIndex]);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) return prev + 3.33; // Adjust for 30s (100 / 30s * interval time)
                clearInterval(interval);
                handleNext();
                return 0;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentPostIndex]);

    const handleNext = () => {
        setProgress(0);
        setCurrentPostIndex((prev) =>
            prev < posts.length - 1 ? prev + 1 : 0
        );
    };

    const handlePrevious = () => {
        setProgress(0);
        setCurrentPostIndex((prev) =>
            prev > 0 ? prev - 1 : posts.length - 1
        );
    };

    const renderPost = () => {
        if (highlights[currentUserIndex].posts[currentPostIndex].viewed == false) {
            setHighlights(prev => {
                const updatedHighlights = [...prev];
                const updatedPosts = [...updatedHighlights[currentUserIndex].posts];
                updatedPosts[currentPostIndex] = {
                    ...updatedPosts[currentPostIndex],
                    viewed: true,
                };
                updatedHighlights[currentUserIndex] = {
                    ...updatedHighlights[currentUserIndex],
                    posts: updatedPosts,
                };
                return updatedHighlights;
            });
        }

        switch (currentPost.type) {
            case "text":
                return <p id={`${Math.random()}`} className='bg-red-300'>{currentPost.content as string}</p>;
            case "image":
                return (
                    <div id={`${Math.random()}`}>
                        <img
                            src={(currentPost.content as StatusContent).url!}
                            alt="status"
                            style={{ width: "300px", height: "200px" }}
                        />
                        <p>{(currentPost.content as StatusContent).caption}</p>
                    </div>
                );
            case "video":
                return (
                    <div id={`${Math.random()}`}>
                        <video
                            controls
                            autoPlay
                            style={{ width: "300px", height: "200px" }}
                        >
                            <source
                                src={(currentPost.content as StatusContent).url!}
                                type="video/mp4"
                            />
                        </video>
                        <p>{(currentPost.content as StatusContent).caption}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='basis-full md:basis-10/12 flex'>
            <div className="basis-full md:basis-2/6 border-r border-slate-200">
                <div className='h-[10%] md:h-1/6 p-3 flex items-center justify-between'>
                    <div>
                        <Button className='md:hidden text-blue-600 font-bold text-sm items-center' startIcon={
                            <Image src={'/logo-t.png'} alt='Logo' height={40} width={40} />
                        }>BUZZCHAT</Button>
                        <p className="text-sm md:text-xl text-blue-600">Highlights</p>
                    </div>
                </div>
                <hr />
                <div className='h-[80%] md:h-5/6 p-3 overflow-auto scrollbar-hidden'>
                    <div>
                        {highlights.map((highlight, index) => (
                            <User highlight={highlight} index={index} setCurrentPostIndex={setCurrentPostIndex} setCurrentUserIndex={setCurrentUserIndex}/>
                        ))}
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
                        
                    </div>
                </div>
                <hr />
                <div className="h-5/6 p-3 relative flex flex-col items-center bg-gray-100">
                    <div className="relative w-full h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
                        {/* Progress Bars */}
                        <div className="absolute top-0 left-0 right-0 flex justify-between px-2 py-1">
                            {posts.map((_, index) => (
                                <div
                                    key={index}
                                    className="h-1 flex-1 mx-1 bg-gray-500 rounded overflow-hidden"
                                >
                                    <div
                                        className={`h-full ${index === currentPostIndex
                                            ? "bg-green-500"
                                            : "bg-gray-700"
                                            }`}
                                        style={{
                                            width: `${index === currentPostIndex ? progress : index < currentPostIndex ? 100 : 0}%`,
                                            transition: "width 1s linear",
                                        }}
                                    ></div>
                                </div>
                            ))}
                        </div>

                        {/* Post Content */}
                        <div className="flex flex-col items-center justify-center w-full h-full px-4">
                            {renderPost()}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl bg-gray-800 rounded-full p-2"
                            onClick={handlePrevious}
                        >
                            &#8249;
                        </button>
                        <button
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl bg-gray-800 rounded-full p-2"
                            onClick={handleNext}
                        >
                            &#8250;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
