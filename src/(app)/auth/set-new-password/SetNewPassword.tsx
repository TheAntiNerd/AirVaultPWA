'use client';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { LogoSymbol } from '@/components/svgs';
import * as Form from '@radix-ui/react-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const SetNewPassword = () => {
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [passwordError, setPasswordError] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPasswordError('');

		// Password validation
		if (newPassword?.length < 8) {
			setPasswordError('Password must be at least 8 characters');
			return;
		}

		if (newPassword?.length > 18) {
			setPasswordError('Password must be at least 18 characters');
			return;
		}

		if (newPassword !== confirmPassword) {
			setPasswordError('Passwords do not match');
			return;
		}

		// Proceed with your form submission logic here
		router.push('/auth/successfully-reset');
	};

	return (
		<div className="flex flex-col w-full min-h-lvh justify-center items-center">
			<div className="max-w-[400px] flex flex-col w-full justify-center items-center">
				<LogoSymbol className="w-[75.18px] h-[68px]" />
				<h1 className="text-2xl text-[#44475B] mt-2 font-semibold mb-2">Set new password</h1>

				<Form.Root onSubmit={handleSubmit} className="flex flex-col mt-6 mb-3 w-full gap-6">
					{/* New Password Field */}
					<Form.Field name="newpassword">
						<div className="flex items-baseline justify-between">
							<Form.Label className="block text-base mb-3 font-medium leading-6 text-[#44475B]">
								New password
							</Form.Label>
						</div>
						<div className="relative w-full">
							<Form.Control asChild={true}>
								<input
									required
									id="newpassword"
									name="newpassword"
									type={showNewPassword ? 'text' : 'password'}
									placeholder="Enter new password"
									value={newPassword}
									onChange={e => setNewPassword(e.target.value)}
									className={`border rounded-[8px] pl-6 pr-12 py-3 outline-none block w-full shadow-base ring-0 placeholder:text-[#A3A09F] 
                                        ${
											passwordError ? 'border-[#EB7B71]' : 'border-[#C4C7E3]'
										} focus:border-[#298DFF]`}
								/>
							</Form.Control>
							<button
								type="button"
								onClick={() => setShowNewPassword(!showNewPassword)}
								className="absolute right-6 top-1/2 transform -translate-y-1/2">
								{showNewPassword ? <EyeOff color="#8F92A6" /> : <Eye color="#8F92A6" />}
							</button>
						</div>
						{passwordError && <span className="text-[13px] text-[#EB7B71]">{passwordError}</span>}
					</Form.Field>

					{/* Confirm Password Field */}
					<Form.Field name="confirmpassword">
						<div className="flex items-baseline justify-between">
							<Form.Label className="block text-base mb-3 font-medium leading-6 text-[#44475B]">
								Confirm password
							</Form.Label>
						</div>
						<div className="relative w-full">
							<Form.Control asChild>
								<input
									required
									id="confirmpassword"
									name="confirmpassword"
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder="Confirm new password"
									value={confirmPassword}
									onChange={e => setConfirmPassword(e.target.value)}
									className={`border rounded-[8px] pl-6 pr-12 py-3 outline-none block w-full shadow-base ring-0 placeholder:text-[#A3A09F] 
                                        ${
											passwordError ? 'border-[#EB7B71]' : 'border-[#C4C7E3]'
										} focus:border-[#298DFF]`}
								/>
							</Form.Control>
							<button
								type="button"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								className="absolute right-6 top-1/2 transform -translate-y-1/2">
								{showConfirmPassword ? <EyeOff color="#8F92A6" /> : <Eye color="#8F92A6" />}
							</button>
						</div>
						{passwordError && <span className="text-[13px] text-[#EB7B71]">{passwordError}</span>}
					</Form.Field>

					{/* Submit Button */}
					<Form.Submit asChild>
						<button
							type="submit"
							className="bg-[#298DFF] w-auto mx-auto text-white px-6 py-3 font-medium rounded-[8px] outline-none">
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

export default SetNewPassword;
