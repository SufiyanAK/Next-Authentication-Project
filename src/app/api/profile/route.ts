import { connectDB } from '@/db/dbConfig'
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { getDataFromToken } from '@/helpers/getDataFromToken';

connectDB();

export async function POST(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json({ error: 'Invalid Token, User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User Found', data: user })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}