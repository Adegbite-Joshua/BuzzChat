import { connectDB } from '@/configs/connectToDB';
import { decodeJwtToken } from '@/utils';
import { NextResponse } from 'next/server';
import FriendRequestsModel from '@/models/friendRequests.models';
import SentFriendRequestsModel from '@/models/sentFriendRequests.models';
import FriendsModel from '@/models/friends.model';

await connectDB();

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
        // Remove from received friend requests
        await FriendRequestsModel.findByIdAndUpdate(
            id,
            { $pull: { friendRequests: friendId } },
            { new: true }
        );

        // Remove from sent friend requests
        await SentFriendRequestsModel.findByIdAndUpdate(
            friendId,
            { $pull: { friendRequests: id } },
            { new: true }
        );

        // Ensure both users have a FriendsModel document and add each other as friends
        await FriendsModel.findOneAndUpdate(
            { _id: id }, // Find by user ID
            { $addToSet: { friends: friendId } }, // Add friendId if not already present
            { new: true, upsert: true }
        );

        await FriendsModel.findOneAndUpdate(
            { _id: friendId }, // Find by friend ID
            { $addToSet: { friends: id } }, // Add id if not already present
            { new: true, upsert: true }
        );

        return NextResponse.json({ message: "Request accepted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error removing friend request' }, { status: 500 });
    }
}
