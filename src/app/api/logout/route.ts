import { connectDB } from '@/db/dbConfig'
import { NextRequest, NextResponse } from 'next/server'

connectDB();


export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.json({
            message: 'User Logout Successfully',
            success: true
        });

        response.cookies.set("token", '', {
            httpOnly: true,
            expires: new Date(0),
        })

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}