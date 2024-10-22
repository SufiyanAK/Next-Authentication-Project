'use client';

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
    const [token, setToken] = useState('');
    const [error, setError] = useState(false);
    const [verified, setVerified] = useState(false)

    const verification = async () => {
        try {
            await axios.post(`/api/verifyemail`, { token });
            setVerified(true);
        } catch (error) {
            setError(true);
            console.log(true)
            console.log("VERIFICATION EMAIL FAILED: ", error)
        }
    }

    useEffect(() => {
        setError(false)
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || '');
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            setError(false)
        } else {
            setError(true)
            console.log(error)
        }
    }, [token])

    return (
        <div className="h-full flex justify-center items-center">
            <div className="text-center space-y-6">
                <h1 className="text-4xl">Verification</h1>
                <h3 className="text-2xl">
                    {token ? `${token}` : 'No Token'}
                </h3>
                {verified && (
                    <div>
                        <p>Email has been verified successfully</p>
                        <p>You can now login</p>
                        <Link href='/login'>Login</Link>
                    </div>
                )}
                <button
                    className={`px-4 py-2 text-2xl ${verified ? 'bg-gray-400' : 'bg-green-500'} font-bold text-white rounded-md`}
                    onClick={verification}
                    disabled={verified}
                >
                    Click Here to Verification
                </button>

                {error && (
                    <div>
                        <p>Invalid or expired token</p>
                        <p>Please request a new verification email</p>
                        <Link href='/signup'>Resend Verification Email</Link>
                    </div>
                )}
            </div>
        </div >
    )
}

export default VerifyEmail