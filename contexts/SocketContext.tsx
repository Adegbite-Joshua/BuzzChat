import { OnlineUser } from "@/types";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useUserDetails } from "./UserDetailsContext";

interface iSocketContext {
    connectToSocket: (user: any) => void;
    onlineUsers: OnlineUser[];
}

export const SocketContext = createContext<iSocketContext | null>(null);

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);    

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

    const connectToSocket = useCallback((user: any) => {
        if (!socket || !isSocketConnected) return;
        socket.emit('addNewUser', user);
        socket.on('getAlreadyOnlineUsers', (users: OnlineUser[])=>{
            setOnlineUsers(users);
        })
    }, [socket, isSocketConnected]);


    return <SocketContext.Provider value={{
        connectToSocket,
        onlineUsers
    }}>
        {children}
    </SocketContext.Provider>
}

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error(`useSocket must be used within SocketContextProvider`);
    }

    return context;
}