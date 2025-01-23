import { connectDB } from '@/configs/connectToDB';
import UserModel from '@/models/user.models';
import { decodeJwtToken } from '@/utils';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


export async function GET(req: Request) {
    try {
        const token = req.headers.get('cookie')?.split('; ').find((cookie) => cookie.startsWith('token='))?.split('=')[1];

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id, email, error } = decodeJwtToken(token);

        await connectDB();

        const users = await UserModel.find({ _id: { $ne: id } }).select('-password');

        return NextResponse.json({ message: 'Users details retrieved successfully', users }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}