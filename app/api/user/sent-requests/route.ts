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

        const sentRequests = await SentFriendRequestsModel.findOneAndUpdate(
            { _id: id },
            { $setOnInsert: { friendRequests: [] } },
            { new: true, upsert: true }
        );

        return NextResponse.json(sentRequests);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error fetching friend requests' }, { status: 500 });
    }
}
