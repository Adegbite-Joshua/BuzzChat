import { connectDB } from '@/configs/connectToDB';
import FriendRequestsModel from '@/models/friendRequests.models';
import UserModel from '@/models/user.models';
import { decodeJwtToken } from '@/utils';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.headers.get('cookie')?.split('; ').find((cookie) => cookie.startsWith('token='))?.split('=')[1];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }


    const { error } = decodeJwtToken(token);
    if (error) {
      return NextResponse.json({ message: 'Unauthorized or token expired' }, { status: 401 });
    }

    const { id } = params;
    
    await connectDB();

    const user = await UserModel.findOne({ _id: id }).select('-password'); // Exclude the password

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User details retrieved successfully', user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
