import { connectDB } from '@/db/dbConfig'
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

connectDB();

interface payloadType {
    id: string,
    username: string,
    email: string,
}

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email: email }).select('+password');

        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
        } else if (!user.isVerified) {
            return NextResponse.json({ error: 'User is not verified, Please verify user' }, { status: 401 })
        }

        const match = await bcryptjs.compare(password, user.password);

        if (!match) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 404 });
        }

        const tokenPayload: payloadType = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: 'Logged In successfully',
            success: true,
            data: user,
        }, { status: 200 })

        response.cookies.set("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 3600 * 1000)
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}