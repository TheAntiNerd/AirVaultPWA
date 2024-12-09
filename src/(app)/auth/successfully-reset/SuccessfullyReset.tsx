'use client';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { BsCheckSquareFill, LogoSymbol } from '@/components/svgs';
import * as Form from '@radix-ui/react-form';
import { useRouter } from 'next/navigation';
const SuccessfullyReset = () => {

    const router = useRouter();
    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push('/dashboard');
    };

    return (
        <div className="flex flex-col w-full min-h-lvh justify-center items-center">
            <div className="max-w-[400px] flex flex-col w-full justify-center items-center">
                <BsCheckSquareFill className="w-[68px] h-[68px]" />
                <h1 className="text-2xl text-[#44475B] mt-2 font-semibold mb-2">Password reset</h1>
                <span className="text-[#8C8FA3] text-center text-base font-normal">
                    Your password has been successfully reset.<br/>
                    Click below to login.
                </span>
                <button  onClick={handleLogin} className="bg-[#298DFF] mb-3 mt-6 w-[176px] mx-auto text-white px-6 py-3 font-medium rounded-[8px] outline-none">
                    Continue
                </button>
                <Link href="/auth/login" className="text-[#298DFF] font-medium text-sm">
                    {'<'} Back to login
                </Link>
            </div>
        </div>
    );
};

export default SuccessfullyReset;
