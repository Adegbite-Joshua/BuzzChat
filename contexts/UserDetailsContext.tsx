import { User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

interface iUserDetailsContext {
    userDetails: User;
    setUserDetails: (user: User) => void;
}

export const UserDetailsContext = createContext<iUserDetailsContext | null>(null);

export const UserDetailsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userDetails, setUserDetails] = useState<User>({});

    return <UserDetailsContext.Provider value={{
        userDetails,
        setUserDetails
    }}>
        {children}
    </UserDetailsContext.Provider>
}

export const useUserDetails = () => {
    const context = useContext(UserDetailsContext);

    if (!context) {
        throw new Error(`useUserDetails must be used within UserDetailsContextProvider`);
    }

    return context;
}