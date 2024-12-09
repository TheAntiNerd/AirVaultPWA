'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import React from 'react';
import { LogoSymbol } from '@/components/svgs';
import * as Form from '@radix-ui/react-form';
import { useRouter } from 'next/navigation';

const PasswordReset = () => {
    const [useremail, setUseremail] = useState('');
    const [hasError, setHasError] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/auth/set-new-password');
    };

    const handleResend = () => {
        setCountdown(5); // Start 5-second countdown
        // Implement resend logic here if needed
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    return (
        <div className="flex flex-col w-full min-h-lvh justify-center items-center">
            <div className="max-w-[400px] flex flex-col w-full justify-center items-center">
                <LogoSymbol className="w-[75.18px] h-[68px]" />
                <h1 className="text-2xl text-[#44475B] mt-2 font-semibold mb-2">Check your email</h1>
                <span className="text-[#8C8FA3] text-center text-base font-normal">
                    We sent a password reset link to
                </span>
                <span className="text-[#8C8FA3]  text-center text-base font-medium">
                    username@domain.com
                </span>

                <Form.Root onSubmit={handleLogin} className="flex flex-col mt-6 mb-3 w-full gap-6">
                    <Form.Field name="email">
                        <div className="flex items-baseline justify-between">
                            <Form.Label className="block text-base mb-3 font-medium leading-6 text-[#44475B]">
                                Email
                            </Form.Label>
                        </div>
                        <Form.Control asChild>
                            <input
                                required
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={useremail}
                                onChange={(e) => setUseremail(e.target.value)}
                                onInvalid={() => setHasError(true)}
                                onInput={() => setHasError(false)}
                                className={`border rounded-[8px] px-6 py-3 outline-none block w-full shadow-base ring-0 placeholder:text-[#A3A09F] 
                                    ${hasError ? 'border-[#EB7B71] focus:border-[#EB7B71]' : 'border-[#C4C7E3]'} focus:border-[#298DFF]`}
                            />
                        </Form.Control>
                        <Form.Message
                            className="text-[13px] text-[#EB7B71] "
                            match="valueMissing"
                        >
                            Please enter your email
                        </Form.Message>
                        <Form.Message
                            className="text-[13px] text-[#EB7B71] "
                            match="typeMismatch"
                        >
                            Please provide a valid email
                        </Form.Message>
                    </Form.Field>

                    <Form.Submit asChild>
                        <button type="submit"  className="bg-[#298DFF] w-auto mx-auto text-white px-6 py-3 font-medium rounded-[8px] outline-none">
                            Open email app
                        </button>
                    </Form.Submit>
                    <div className='flex items-center justify-center w-full'>
                        <span className='text-sm text-[#8C8FA3] font-normal'>
                            Didn’t receive email?
                        </span>
                        <button 
                            className='text-[#298DFF] disabled:text-[#298dffcc] text-sm font-medium ml-1' 
                            type='button' 
                            onClick={handleResend}
                            disabled={countdown > 0}
                        >
                            {countdown > 0 ? `Click to resend ${countdown}s` : 'Click to resend'}
                        </button>
                    </div>
                </Form.Root>

                <Link href="/auth/login" className="text-[#298DFF] font-medium text-sm">
                    {'<'} Back to login
                </Link>
            </div>
        </div>
    );
};

export default PasswordReset;
