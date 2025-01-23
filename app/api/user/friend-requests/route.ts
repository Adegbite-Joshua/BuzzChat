import { connectDB } from '@/configs/connectToDB';
import { decodeJwtToken } from '@/utils';
import { NextResponse } from 'next/server';
import FriendRequestsModel from '@/models/friendRequests.models';
import SentFriendRequestsModel from '@/models/sentFriendRequests.models';

await connectDB();

// GET: Fetch received friend requests
export async function GET(req: Request) {
    try {
        const token = req.headers.get('cookie')?.split('; ').find((cookie) => cookie.startsWith('token='))?.split('=')[1];

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id, email, error } = decodeJwtToken(token);

        const friendRequests = await FriendRequestsModel.findOneAndUpdate(
            { _id: id },
            { $setOnInsert: { friendRequests: [] } },
            { new: true, upsert: true }
        ).populate('friendRequests', 'firstName lastName _id bio email');

        return NextResponse.json(friendRequests);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error fetching friend requests' }, { status: 500 });
    }
}

// POST: Add a new friend request
export async function POST(req: Request) {
    const token = req.headers.get('cookie')?.split('; ').find((cookie) => cookie.startsWith('token='))?.split('=')[1];

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = decodeJwtToken(token);
    const { friendId } = await req.json(); // Parse request body

    if (!friendId) {
        return NextResponse.json({ error: 'Friend ID is required' }, { status: 400 });
    }

    try {
        // Add to received friend requests
        await FriendRequestsModel.findOneAndUpdate(
            { _id: friendId }, // Friend's document
            { $addToSet: { friendRequests: id } }, // Add the user's ID to the friend's received requests
            { new: true, upsert: true }
        );

        // Add to sent friend requests
        const updatedSentRequests = await SentFriendRequestsModel.findOneAndUpdate(
            { _id: id }, // User's document
            { $addToSet: { friendRequests: friendId } }, // Add the friend's ID to the user's sent requests
            { new: true, upsert: true }
        );

        return NextResponse.json(updatedSentRequests);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error sending friend request' }, { status: 500 });
    }
}

// DELETE: Remove a friend request
export async function DELETE(req: Request) {
    const token = req.headers.get('cookie')?.split('; ').find((cookie) => cookie.startsWith('token='))?.split('=')[1];

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = decodeJwtToken(token);
    const { friendId } = await req.json(); // Parse request body

    if (!friendId) {
        return NextResponse.json({ error: 'Friend ID is required' }, { status: 400 });
    }

    try {
        // Remove from received friend requests
        await FriendRequestsModel.findByIdAndUpdate(
            friendId, // Friend's document
            { $pull: { friendRequests: id } }, // Remove the user's ID from the friend's received requests
            { new: true }
        );

        // Remove from sent friend requests
        const updatedSentRequests = await SentFriendRequestsModel.findByIdAndUpdate(
            id, // User's document
            { $pull: { friendRequests: friendId } }, // Remove the friend's ID from the user's sent requests
            { new: true }
        );

        if (!updatedSentRequests) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(updatedSentRequests);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error removing friend request' }, { status: 500 });
    }
}
