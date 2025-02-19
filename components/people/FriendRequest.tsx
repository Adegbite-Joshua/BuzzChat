import Link from 'next/link';
import React, { } from 'react';

type FriendRequestProps = {
    name: string;
    id: string;
    details: string;
    imageUrl: string;
    onAccept: () => void;
    onDelete: () => void;
};

export default function FriendRequest({
    name,
    id,
    details,
    imageUrl,
    onAccept,
    onDelete,
}: FriendRequestProps) {
    return (
        <div className='bg-white p-4 shadow-md w-full max-w-sm my-1'>
            <div className="flex items-center gap-4 rounded-lg ">

                <Link className="w-12 h-12" href={`/people/${id}`}>
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                </Link>

                <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                    <p className="text-sm text-gray-500">{details}</p>
                </div>
            </div>

            <div className="flex gap-2 justify-end">
                <button
                    onClick={onAccept}
                    className="bg-green-600 text-sm font-semibold text-white px-2 py-1 rounded-md hover:bg-green-700"
                >
                    Accept
                </button>
                <button
                    onClick={onDelete}
                    className="bg-red-600 text-sm font-semibold text-white px-2 py-1 rounded-md hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
