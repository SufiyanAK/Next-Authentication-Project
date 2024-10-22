import { connectDB } from '@/db/dbConfig'
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server'

connectDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody

        const user = await User.findOne({
            'verifyUser.token': token,
            'verifyUser.expires': { $gt: new Date() }  // Checking if token is still valid
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        const userVerified = await User.findByIdAndUpdate(user._id, {
            $set: {
                isVerified: true,
                'verifyUser.token': null,
                'verifyUser.expires': null
            }
        }, { new: true });

        await userVerified.save();

        return NextResponse.json({ message: 'User verified successfully', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}