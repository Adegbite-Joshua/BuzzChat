import React from 'react';
import DividedBorders from './DividedBorder';

interface UserProps {
    index: number;
    highlight: {
        posts: { viewed: boolean; timestamp: string }[];
        profilePicture: { url: string };
        username: string;
    };
    setCurrentUserIndex: (index: number) => void;
    setCurrentPostIndex: (index: number) => void;
}

const User: React.FC<UserProps> = ({ index, highlight, setCurrentUserIndex, setCurrentPostIndex }) => {
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

    const getHighlightUploadTime = (isoTimestamp: string): string => {
        const date = new Date(isoTimestamp); // Parse the ISO string to a Date object
        const now = new Date(); // Current date and time

        // Convert both dates to numbers (milliseconds since Unix epoch)
        const diffMs = now.getTime() - date.getTime(); // Time difference in milliseconds
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHr / 24);

        if (diffSec < 60) return `${diffSec} seconds ago`;
        if (diffMin < 60) return `${diffMin} minutes ago`;
        if (diffHr < 24) return `${diffHr} hours ago`;
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleString(); // Fallback to full date and time
    }

    return (
        <div
            id={`user-${index}`}
            onClick={handleUserClick}
            className="flex items-center gap-2 cursor-pointer my-1 bg-slate-100 rounded-md"
        >
            <DividedBorders
                imageUrl={highlight.profilePicture.url}
                numberOfStatus={highlight.posts.length}
            />
            <div>
                <p className="text-2xl">{highlight.username}</p>
                <small>{getHighlightUploadTime(highlight.posts[0].timestamp)}</small>
            </div>
        </div>
    );
};

export default User;
