import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/configs/connectToDB';
import UserModel from '@/models/user.models';
import { NextResponse } from 'next/server';



export async function POST(req: Request, res: NextApiResponse) {
    try {
      await connectDB();
      const { firstName, lastName, email, password, phoneNumber, dateOfBirth, address, gender, bio } = await req.json();
        
      // Check if email already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
    }

      // Encrypt the password
      const passwordSaltSalting = Number(process.env.PASSWORD_SALTING);
      
      const hashedPassword = await bcrypt.hash(password, passwordSaltSalting);

      // Create a new user
      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        dateOfBirth,
        address,
        gender,
        bio,
      });

      // Save the user to the database
      await newUser.save();

      return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

