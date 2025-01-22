import { SocketContextProvider } from "@/contexts/SocketContext";

const SocketProvider = ({children}: {children: React.ReactNode}) => {
    return ( <SocketContextProvider>
        {children}
    </SocketContextProvider> );
}
 
export default SocketProvider;