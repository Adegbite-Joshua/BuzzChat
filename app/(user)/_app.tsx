import SocketProvider from "@/providers/SocketProvider";
import UserDetailsProvider from "@/providers/UserDetailsProvider";

const app = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserDetailsProvider>
            <SocketProvider>
                {children}
            </SocketProvider>
        </UserDetailsProvider>
    );
}

export default app;