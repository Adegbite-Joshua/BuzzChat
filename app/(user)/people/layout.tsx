"use client"

import BottomNavbar from '@/components/navbar/BottomNavbar'
import { CallOutlined, DeleteOutline, EditOutlined, EmailOutlined, RecentActors, SearchOutlined, VideocamOutlined, PersonRemoveOutlined, ChatOutlined } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import FriendRequest from '@/components/people/FriendRequest'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Friend from '@/components/people/Friend'
import AddUser from '@/components/people/AddUser'
import Avatar from "@mui/material/Avatar";
import { useUserDetails } from '@/contexts/UserDetailsContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { User } from '@/types'



export default function Layout() {
    const [showCalls, setShowCalls] = useState(false);
    const [isMediumSize, setIsMediumSize] = useState(false);
    const params = useParams();
    const router = useRouter();
    const [selectedUserId, setselectedUserId] = useState<string | null>(null);
    const [selectedUserDetails, setSelectedUserDetails] = useState<User | null>(null)
    
    const { setUserDetails, userDetails, handleAcceptFriendRequest, handleSendFriendRequest, userFriends, allUsers, fetchAllUsers, friendRequests, fetchUserFriendsRequest, sentFriendRequests, fetchUserSentFriendRequests, fetchUserFriends } = useUserDetails();


    useEffect(() => {
        if(!selectedUserId) return;
        axios.get(`/api/user/details/${selectedUserId}`)
            .then((response) => {
                setSelectedUserDetails(response.data.user);
            })
            .catch((error) => {
                toast.error('Error fetching user details')
                console.error(error);
            });
    }, [selectedUserId])

console.log(userFriends);


    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMediumSize(width <= 1024);
        };

        const { id } = params;

        setselectedUserId(id as string);
        setShowCalls(id ? true : false);

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [params]);

    const handleAccept = (user: User) => {
        axios.post('/api/user/accept-friend-request', {friendId: user._id})
        .then((response) => {
            console.log(response.data);
            toast.success('Request accepted');
            handleAcceptFriendRequest(user);
        })
        .catch((error) => {
            console.error(error);
            toast.error('Error sending friend request')
        });
    };

    const handleDelete = (id: number | string) => {
        alert(`Friend request from ID ${id} deleted!`);
    };

    const [tabValue, settabValue] = React.useState('friends');

    const handleChange = (event: React.SyntheticEvent, newtabValue: string) => {
        settabValue(newtabValue);
    };

    useEffect(() => {
        fetchAllUsers();
        fetchUserFriendsRequest();
        fetchUserSentFriendRequests();
        fetchUserFriends();
    }, [])

    const [isSending, setIsSending] = useState(false);

    async function sendFriendRequest(friendId: string) {
        try {
            if (!friendId) {
                throw new Error('Friend ID is required to send a friend request.');
            }

            // Send a POST request to the API
            const response = await axios.post(
                '/api/user/friend-requests',
                { friendId }, // Request body
                { withCredentials: true } // Ensure cookies are sent with the request
            );

            // Success handling
            toast.success('Friend request sent successfully!');
            return response.data; // Return the response data if needed
        } catch (error: unknown) {
            // Handle errors gracefully
            const errorMessage =
                axios.isAxiosError(error) && error.response?.data?.error
                    ? error.response.data.error
                    : error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred';
            toast.error(errorMessage); // Optional: Notify user of the error
            console.error('Error sending friend request:', errorMessage);
            throw error; // Rethrow the error if you need to handle it elsewhere
        }
    }

    const handleSendRequest = async (friendId: string) => {
        setIsSending(true);
        try {
            await sendFriendRequest(friendId);
            handleSendFriendRequest(friendId);
        } catch (error) {
            console.log(error);
            toast.error('Error sending friend request');
            // Error handling is already handled within the function
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        axios.get(`/api/user/details`, {
            withCredentials: true,
        })
            .then((response) => {
                setUserDetails(response.data.user as User);
            })
            .catch(error => {
                toast.error('Invalid token')
                router.push('/login');
                console.error(error);
            });
    }, []);

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
                                    <IconButton className='text-slate-400'>
                                        <RecentActors fontSize='small' />
                                        <span className='text-sm'>Friends</span>
                                    </IconButton>

                                    <div>
                                        {userFriends.map((request) => (
                                            <Friend
                                                id={request._id as string}
                                                key={request._id}
                                                name={`${request.firstName} ${request.lastName}`}
                                                details={request.bio as string}
                                                imageUrl={''}
                                                friends={[]}
                                            />
                                        ))}
                                    </div>
                                </TabPanel>
                                <TabPanel value="requests">
                                    <IconButton className='text-slate-400'>
                                        <RecentActors fontSize='small' />
                                        <span className='text-sm'>Friend request</span>
                                    </IconButton>

                                    <div>
                                        {friendRequests.length == 0 ?
                                            <div>No friend request yet</div> :
                                            friendRequests.map((request) => (
                                                <FriendRequest
                                                    key={request._id}
                                                    id={request._id as string}
                                                    name={`${request.firstName} ${request.lastName}`}
                                                    details={request.bio as string}
                                                    imageUrl={''}
                                                    onAccept={() => handleAccept(request)}
                                                    onDelete={() => handleDelete(request._id as string)}
                                                />
                                            ))}
                                    </div>
                                </TabPanel>
                                <TabPanel value="find">
                                    <IconButton className='text-slate-400'>
                                        <RecentActors fontSize='small' />
                                        <span className='text-sm'>Add friends</span>
                                    </IconButton>

                                    <div>
                                        {allUsers.length == 0 ?
                                            <div>No friends yet</div> :
                                            allUsers.map((user) => (
                                                <AddUser
                                                    key={user._id}
                                                    name={`${user.firstName} ${user.lastName}`}
                                                    details={user.bio as string}
                                                    imageUrl={''}
                                                    id={user._id as string}
                                                    isFriend={userFriends.some(friend => friend._id === user._id)}
                                                    userHasSentFriendRequest={friendRequests.some(request => request._id === user._id)}
                                                    isRequestSent={sentFriendRequests.includes(user._id as string)}
                                                    onAddFriend={() => handleSendRequest(user._id as string)}
                                                    onAccept={() => handleAccept(user)}
                                                    onDelete={() => handleDelete(user._id as string)}
                                                />
                                            ))}
                                    </div>
                                </TabPanel>
                            </TabContext>
                        </Box>

                    </div>
                </div>
                <BottomNavbar isMediumSize={isMediumSize} />
            </div>
            <div className={`${showCalls && isMediumSize ? 'block absolute top-0 left-0 z-10 w-full h-full' : 'hidden'} md:block md:basis-4/6 bg-slate-200`}>
                {selectedUserId && <>
                    <div className='h-1/6 p-3 bg-white flex items-center justify-between'>
                        <div className='flex gap-3'>
                            <Link href={'/messages'} className='flex justify-center items-center'>
                                <img src={`/logo.png`} alt={`Another friend`} className='h-12 w-12 aspect-square rounded-full' />
                            </Link>
                            <div className=''>
                                <p className="font-bold">{selectedUserDetails?.firstName} {selectedUserDetails?.lastName}</p>
                                <p className="text-green-400 text-sm">{selectedUserDetails?.bio}</p>
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
                    <div className="h-5/6 p-3 relative flex flex-col items-center bg-gray-100">
                        <div className="flex flex-col justify-center items-center mt-6">
                            <Avatar
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                                className="w-28 h-28"
                            />
                            <div>
                                <p className="text-2xl">{selectedUserDetails?.firstName} {selectedUserDetails?.lastName}</p>
                                <div className='flex gap-5'>
                                    <p><span className='font-semibold'>20</span> friends</p>
                                    <p><span className='font-semibold'>20</span> friends</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-5 my-2 font-semibold'>
                            <button className='p-2 bg-slate-300 text-blue-600 flex gap-2 items-center rounded-md'>
                                <PersonRemoveOutlined />
                                Unfriend
                            </button>
                            <button className='p-2 bg-blue-600 text-white flex gap-2 items-center rounded-md'>
                                <ChatOutlined />
                                Message
                            </button>
                        </div>
                        <div>
                            <p>From <span className='font-semibold'>Ogbomoso, Nigeria</span></p>
                        </div>
                    </div>
                </>}
                {!selectedUserId && <>
                    <div className='flex flex-col justify-center items-center h-full w-full'>
                        <Avatar
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            className="w-56 h-5w-56"
                        />
                        <h1 className='text-3xl'>No User Selected</h1>
                    </div>
                </>}
            </div>
        </div>
    )
}
