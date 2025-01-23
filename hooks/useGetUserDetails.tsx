import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUserDetails } from '@/contexts/UserDetailsContext';
import { useRouter } from 'next/navigation';
// import { useSocket } from '@/contexts/SocketContext';

const useGetUserDetails = () => {
    const {userDetails, setUserDetails} = useUserDetails();
    // const { connectToSocket } = useSocket();
    const [isLoading, setIsLoading] = useState(false);
    const isFetching = useRef(false);
    const router = useRouter();

    useEffect(() => {
        if (isFetching.current) return;

        isFetching.current = true;

        axios.get(`/api/user/details`, { withCredentials: true })
            .then(response => {
                setUserDetails(response.data.user);
                // connectToSocket(response.data);
                setIsLoading(true);
                isFetching.current = false;
            })
            .catch(error => {
                toast.error('Invalid token');
                router.push('/login');
                console.error(error);
                isFetching.current = false;
            });
    }, []);

    return { userDetails, isLoading };
};

export default useGetUserDetails;
