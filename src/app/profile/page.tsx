'use client';
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

const Profile = () => {
    const router = useRouter()
    const [data, setData] = useState('');


    useEffect(() => {
        const getUserDetails = async () => {
            const res = await axios.post('/api/profile')
            setData(res.data.data.username);
        }

        getUserDetails()
    }, [])


    const logout = async () => {
        await axios.get('/api/logout');
        router.push('/login');
    }
    return (
        <div className="h-full w-full bg-black text-white flex justify-center items-center">
            <div className="space-y-6 text-center">
                <h1 className="text-5xl font-bold">Profile</h1>
                <h3 className="text-2xl font-bold">{data}</h3>
                <button
                    className="px-6 py-2 border-2 border-white rounded-md text-white font-bold text-xl hover:text-black hover:bg-white duration-200"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Profile