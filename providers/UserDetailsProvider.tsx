import { UserDetailsContextProvider } from "@/contexts/UserDetailsContext";

const UserDetailsProvider = ({children}: {children: React.ReactNode}) => {
    return ( <UserDetailsContextProvider>
        {children}
    </UserDetailsContextProvider> );
}
 
export default UserDetailsProvider;