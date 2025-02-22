import { useUserDetails } from '@/contexts/UserDetailsContext';
import { User } from '@/types'
import Link from 'next/link'
import React from 'react'

export default function MessageFriend({user, toggleViewAllFriends }: {user: User, toggleViewAllFriends: ()=>void}) {
    const { setFriendInChatWith } = useUserDetails();
    return (
        <div className='h-20 md:h-16 grid grid-cols-9 gap-2 items-center justify-center'>
            <div className='col-span-2 flex justify-center items-center cursor-pointer'>
                <img src={`/logo.png`} alt={`Another friend`} className='h-12 w-12 aspect-square rounded-full' />
            </div>
            <Link href={`/messages/${user._id}`} onClick={()=>{
                setFriendInChatWith(user)
                toggleViewAllFriends()
                }} className='col-span-7 flex flex-col justify-center cursor-pointer'>
                <div className='flex justify-between items-stretch'>
                    <p className="font-bold">Chinedu Oyenre</p>
                    {/* <p className="text-slate-400 text-sm md:text-base">05:11 PM</p> */}
                </div>
            </Link>
        </div>
    )
}
