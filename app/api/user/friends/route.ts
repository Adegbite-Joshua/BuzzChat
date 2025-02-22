import { connectDB } from '@/configs/connectToDB';
import { decodeJwtToken } from '@/utils';
import { NextResponse } from 'next/server';
import FriendsModel from '@/models/friends.model';

await connectDB();

// GET: Fetch received friend requests
export async function GET(req: Request) {
    try {
        const token = req.headers.get('cookie')?.split('; ').find((cookie) => cookie.startsWith('token='))?.split('=')[1];

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = decodeJwtToken(token);

        const friends = await FriendsModel.findOne({ _id: id}).populate('friends');

        return NextResponse.json(friends);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error fetching friend requests' }, { status: 500 });
    }
}