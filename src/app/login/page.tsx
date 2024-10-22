'use client';

import { FormEvent, useEffect, useState } from "react"
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast'
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Link from "next/link";

interface InitialUserState {
    email: string,
    password: string
}

const InitialState: InitialUserState = {
    email: '',
    password: ''
}


const Login = () => {
    const router = useRouter()
    const [user, setUser] = useState(InitialState)
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/login', user);
            toast.success('User Login Success');
            router.push('/profile');
            setUser(InitialState)
            setLoading(false);
        } catch (error: any) {
            console.log("Login Failed", error.response.data.error)
            toast.error(error.response.data.error)
            setTimeout(() => {
                setLoading(false);
            }, 3000)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])


    return (
        <div className="h-full flex justify-center items-center bg-blue-500">
            {
                loading ? <Loader /> :
                    <div className="w-[28rem] p-8 rounded-md bg-white flex flex-col gap-4 items-center">
                        <h2 className="text-center text-4xl">Login</h2>
                        <form onSubmit={onLogin} className="space-y-2 flex flex-col items-center w-full">
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-lg" htmlFor="email">Email</label>
                                <input
                                    className="border border-black p-2 rounded-md"
                                    id='email'
                                    type="email"
                                    placeholder="Email..."
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-lg" htmlFor="password">Password</label>
                                <input
                                    className="border border-black p-2 rounded-md"
                                    id='password'
                                    type="password"
                                    placeholder="Password..."
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                            </div>
                            <div>
                                <button
                                    disabled={buttonDisabled}
                                    className={`${buttonDisabled ? 'bg-gray-400' : 'bg-blue-500'} px-4 py-1 mt-2 text-lg text-white rounded-md`} type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                        <Link className="text-blue-500 hover:text-blue-800 hover:underline text-lg" href='/signup'>Sign Up</Link>
                    </div>
            }
            <Toaster />
        </div>
    )
}

export default Login