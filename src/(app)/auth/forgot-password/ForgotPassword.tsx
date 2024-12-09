'use client';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { LogoSymbol } from '@/components/svgs';
import * as Form from '@radix-ui/react-form';
import { useRouter } from 'next/navigation';
const ForgotPassword = () => {
    const [useremail, setUseremail] = useState('');
    const [hasError, setHasError] = useState(false);
    const router = useRouter();
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/auth/password-reset');
      
    };

    return (
        <div className="flex flex-col w-full min-h-lvh justify-center items-center">
            <div className="max-w-[400px] flex flex-col w-full justify-center items-center">
                <LogoSymbol className="w-[75.18px] h-[68px]" />
                <h1 className="text-2xl text-[#44475B] mt-2 font-semibold mb-2">Forgot password?</h1>
                <span className="text-[#8C8FA3] text-base font-normal">
                    No worries, we’ll send you reset instructions.
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
                        <button type="submit" className="bg-[#298DFF] w-auto mx-auto text-white px-6 py-3 font-medium rounded-[8px] outline-none">
                        Reset password
                        </button>
                    </Form.Submit>
                </Form.Root>

                <Link href="/auth/login" className="text-[#298DFF] font-medium text-sm">
                    {'<'} Back to login
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
