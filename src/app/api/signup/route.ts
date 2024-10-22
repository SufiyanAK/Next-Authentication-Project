import { connectDB } from '@/db/dbConfig'
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailHelper';

connectDB();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = await req.json();

        const { username, email, password } = reqBody;

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        // Send Email for Varification
        await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

        return NextResponse.json({
            message: 'User Registration Success',
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 504 });
    }
}
