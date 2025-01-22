import { SocketContextProvider } from "@/contexts/SocketContext";

const UserDetailsProvider = ({children}: {children: React.ReactNode}) => {
    return ( <SocketContextProvider>
        {children}
    </SocketContextProvider> );
}
 
export default UserDetailsProvider;