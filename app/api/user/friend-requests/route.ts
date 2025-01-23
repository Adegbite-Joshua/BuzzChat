import { connectDB } from '@/configs/connectToDB';
import { decodeJwtToken } from '@/utils';
import { NextResponse } from 'next/server';
import FriendRequestsModel from '@/models/friendRequest.models';


await connectDB();

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
// POST: Add a new friend request
export async function POST(req: Request) {
    const token = req.headers.get('cookie')?.split('; ').find((cookie) => cookie.startsWith('token='))?.split('=')[1];

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id, email, error } = decodeJwtToken(token);
    const { friendId } = await req.json(); // Parse request body

    if (!friendId) {
        return NextResponse.json({ error: 'Friend ID is required' }, { status: 400 });
    }

    try {
        const updatedRequests = await FriendRequestsModel.findOneAndUpdate(
            { _id: id }, // Find document by user ID
            { $addToSet: { friendRequests: friendId } }, // Add friendId to the array if not already present
            { new: true, upsert: true } // Create document if it doesn't exist
        );
        return NextResponse.json(updatedRequests);
    } catch (error) {
        return NextResponse.json({ error: 'Error adding friend request' }, { status: 500 });
    }
}


// DELETE: Remove a friend request
export async function DELETE(req: Request) {
    const token = req.headers.get('cookie')?.split('; ').find((cookie) => cookie.startsWith('token='))?.split('=')[1];
    
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    
    const { id, email, error } = decodeJwtToken(token);
    const { friendId } = await req.json(); // Parse request body

    if (!friendId) {
        return NextResponse.json({ error: 'User ID and Friend ID are required' }, { status: 400 });
    }

    try {
        const updatedRequests = await FriendRequestsModel.findByIdAndUpdate(
            id,
            { $pull: { friendRequests: friendId } }, // Remove friendId from the array
            { new: true }
        );
        if (!updatedRequests) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(updatedRequests);
    } catch (error) {
        return NextResponse.json({ error: 'Error removing friend request' }, { status: 500 });
    }
}
