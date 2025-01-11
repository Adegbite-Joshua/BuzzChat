import React from 'react';
import DividedBorders from './DividedBorder';
import Link from 'next/link';
import { AddOutlined } from '@mui/icons-material';

interface AddHighlightProps {
    index: number;
    highlight: {
        posts: { viewed: boolean; timestamp: string }[];
        profilePicture: { url: string };
        username: string;
    };
    setCurrentUserIndex: (index: number) => void;
    setCurrentPostIndex: (index: number) => void;
}

const AddHighlight: React.FC<AddHighlightProps> = ({ index, highlight, setCurrentUserIndex, setCurrentPostIndex }) => {
    const handleUserClick = () => {
        setCurrentUserIndex(index);

        const allPostsViewed = highlight.posts.every(post => post.viewed);
        if (allPostsViewed) {
            setCurrentPostIndex(0);
        } else {
            const lastUnviewedPostIndex = highlight.posts
                .slice()
                .reverse()
                .findIndex(post => !post.viewed);

            setCurrentPostIndex(highlight.posts.length - 1 - lastUnviewedPostIndex);
        }
    };

    return (
        <div
            id={`user-${index}`}
            className="flex items-center gap-2 cursor-pointer my-1 bg-slate-100 rounded-md"
        >
            <DividedBorders
                onClick={handleUserClick}
                imageUrl={highlight.profilePicture.url}
                numberOfStatus={highlight.posts.length}
            />
            <div className="text-xl flex items-center text-green-600">
                <AddOutlined className='text-2xl font-bold'/> 
                <span>Add Highlight</span>
            </div>
        </div>
    );
};

export default AddHighlight;
