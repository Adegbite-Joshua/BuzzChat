import { User } from "@/types";
import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface iUserDetailsContext {
    userDetails: User;
    setUserDetails: (user: User) => void;
    fetchAllUsers: ()=>void;
    allUsers: User[];
    friendRequests: User[];
    fetchUserFriendsRequest: ()=>void;
    sentFriendRequests: string[];
    fetchUserSentFriendRequests: ()=>void;
}

export const UserDetailsContext = createContext<iUserDetailsContext | null>(null);

export const UserDetailsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userDetails, setUserDetails] = useState<User>({});
    const [userFriends, setUserFriends] = useState<User[]>([]);
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

    return <UserDetailsContext.Provider value={{
        userDetails,
        setUserDetails,
        fetchAllUsers,
        allUsers,
        friendRequests,
        fetchUserFriendsRequest,
        sentFriendRequests,
        fetchUserSentFriendRequests,
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