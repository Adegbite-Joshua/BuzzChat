import { User } from "@/types";
import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface iUserDetailsContext {
    userDetails: User;
    setUserDetails: (user: User) => void;
    fetchAllUsers: () => void;
    allUsers: User[];
    friendRequests: User[];
    userFriends: User[];
    friendInChatWith: User | null;
    fetchUserFriendsRequest: () => void;
    sentFriendRequests: string[];
    fetchUserSentFriendRequests: () => void;
    // fetchUserFriends: () => void;
    handleSendFriendRequest: (friendIdd: string) => void;
    handleAcceptFriendRequest: (details: User) => void;
    setFriendInChatWith: (details: User) => void;
    handleDeleteFriendRequest: (details: User, type: "sent" | "received") => void;
}

export const UserDetailsContext = createContext<iUserDetailsContext | null>(null);

export const UserDetailsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userDetails, setUserDetails] = useState<User>({});
    const [userFriends, setUserFriends] = useState<User[]>([]);
    const [friendInChatWith, setFriendInChatWith] = useState<User | null>(null);
    const [friendRequests, setFriendRequests] = useState<User[]>([]);
    const [sentFriendRequests, setSentFriendRequests] = useState<string[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);


    const fetchAllUsers = useCallback(() => {
        axios.get('/api/users/')
            .then(response => {
                setAllUsers(response.data.users);
            })
            .catch(err => {
                console.error(err);
                toast.error('Error fetching all users')
            });
    }, []);

    const fetchUserFriendsRequest = useCallback(() => {
        axios.get('/api/user/friend-requests')
            .then(response => {
                setFriendRequests(response.data.friendRequests);
            })
            .catch(err => {
                console.error(err);
                toast.error('Error fetching friend requests')
            });
    }, []);

    const fetchUserSentFriendRequests = useCallback(() => {
        axios.get('/api/user/sent-requests')
            .then(response => {
                setSentFriendRequests(response.data.friendRequests);
            })
            .catch(err => {
                console.error(err);
                toast.error('Error fetching sent friend requests')
            });
    }, []);

    useEffect(() => {        
        axios.get('/api/user/friends')
            .then(response => {
                setUserFriends(response.data.friends);
            })
            .catch(err => {
                console.error(err);
                toast.error('Error fetching friends')
            });
    }, []);

    const handleSendFriendRequest = (friendId: string) => {
        setSentFriendRequests((prev) => [...prev, friendId]);

        // setAllUsers((prevUsers) =>
        //     prevUsers.map((user) =>
        //         user._id === friendId ? { ...user, requestSent: true } : user
        //     )
        // );
    };

    const handleAcceptFriendRequest = (details: User) => {
        setFriendRequests((prevRequests) =>
            prevRequests.filter((request) => request._id !== details._id)
        );

        setUserFriends((prevFriends) => [...prevFriends, details]);

        // setAllUsers((prevUsers) =>
        //     prevUsers.map((user) =>
        //         user._id === friendId ? { ...user, isFriend: true } : user
        //     )
        // );
    };

    const handleDeleteFriendRequest = (details: User, type: "sent" | "received") => {
        if (type === "sent") {
            setSentFriendRequests((prevRequests) =>
                prevRequests.filter((id) => id !== details._id)
            );
        } else {
            setFriendRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== details._id)
            );
        }

        setAllUsers((prevUsers) =>
            prevUsers.map((user) =>
                user._id === details._id
                    ? { ...user, requestSent: false, requestReceived: false }
                    : user
            )
        );
    };


    return <UserDetailsContext.Provider value={{
        userDetails,
        setUserDetails,
        fetchAllUsers,
        allUsers,
        friendRequests,
        friendInChatWith,
        fetchUserFriendsRequest,
        sentFriendRequests,
        fetchUserSentFriendRequests,
        // fetchUserFriends,
        userFriends,
        handleSendFriendRequest,
        handleAcceptFriendRequest,
        handleDeleteFriendRequest,
        setFriendInChatWith
    }}>
        {children}
    </UserDetailsContext.Provider>
}

export const useUserDetails = () => {
    const context = useContext(UserDetailsContext);

    if (context === null) {
        throw new Error(`useUserDetails must be used within UserDetailsContextProvider`);
    }

    return context;
}