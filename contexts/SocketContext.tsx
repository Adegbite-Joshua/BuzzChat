import { OnlineUser } from "@/types";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useUserDetails } from "./UserDetailsContext";

interface iSocketContext {
    onlineUsers: OnlineUser[];
}

export const SocketContext = createContext<iSocketContext | null>(null);

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

    const { userDetails } = useUserDetails();

    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };

    }, [])

    useEffect(() => {
        if (!socket) return;

        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsSocketConnected(true);
        }

        function onDisconnect() {
            setIsSocketConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        }
    }, [socket])

    useEffect(() => {
        if (!socket || !isSocketConnected) return;

        // Emit the addNewUser event to notify the server of the user
        socket.emit('addNewUser', userDetails);

        // Handlers for socket events
        const handleGetOnlineUsers = (users: OnlineUser[]) => {
            setOnlineUsers(users); // Replace the state with the full list of online users
        };

        const handleNewUserJoin = (user: OnlineUser) => {
            console.log('adding new user');
            
            setOnlineUsers(prev => {
                if (Array.isArray(prev) && !prev.some(u => u.userId === user.userId)) {
                    return [user, ...prev];
                }
                return prev;
            });
        };

        const handleUserDisconnect = (user: OnlineUser) => {
            console.log('removing user');
            
            setOnlineUsers(prev => prev.filter(u => u.userId !== user.userId));
        };

        // Register socket listeners
        socket.on('getAlreadyOnlineUsers', handleGetOnlineUsers);
        socket.on('newUserJoin', handleNewUserJoin);
        socket.on('userDisconnect', handleUserDisconnect);

        // Cleanup event listeners
        return () => {
            socket.off('getAlreadyOnlineUsers', handleGetOnlineUsers);
            socket.off('newUserJoin', handleNewUserJoin);
            socket.off('userDisconnect', handleUserDisconnect);
        };
    }, [socket, isSocketConnected, userDetails]);

    return <SocketContext.Provider value={{
        onlineUsers
    }}>
        {children}
    </SocketContext.Provider>
}

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (context === null) {
        throw new Error(`useSocket must be used within SocketContextProvider`);
    }

    return context;
}