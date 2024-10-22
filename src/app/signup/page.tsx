'use client';

import { FormEvent, useEffect, useState } from "react"
import axios from "axios";
import { toast } from 'react-hot-toast'
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Link from "next/link";

interface InitialUserState {
    username: string,
    email: string,
    password: string
}

const InitialState: InitialUserState = {
    username: '',
    email: '',
    password: ''
}


const Signup = () => {
    const router = useRouter()
    const [user, setUser] = useState(InitialState)
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/signup', user);
            console.log(response);
            toast.success('User Registration Success');
            router.push('login');
            setUser(InitialState)
            setLoading(false);
        } catch (error: any) {
            console.log("SignUp Failed", error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
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
                        <h2 className="text-center text-4xl">Sign Up</h2>
                        <form onSubmit={onSignUp} className="space-y-2 flex flex-col items-center w-full">
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-lg" htmlFor="name">Username</label>
                                <input
                                    className="border border-black p-2 rounded-md"
                                    id='name'
                                    type="text"
                                    placeholder="Username..."
                                    value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                />
                            </div>
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
                                    Sign Up
                                </button>
                            </div>
                        </form>
                        <Link className="text-blue-500 hover:text-blue-800 hover:underline text-lg" href='/login'>Login</Link>
                    </div>
            }
        </div>
    )
}

export default Signup