'use client';

import { Spinner } from '@/components/svgs';
import { Button } from '@/components/ui/button';
import { Input, InputPassword, InputWithCharacterCounter } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axiosPost from '@/functions/axios/axiosPost';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function NewUser() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [role, setRole] = useState('member');
	const [loading, setLoading] = useState(false);

	// request new user creation
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true);
		e.preventDefault();

		if (loading) return;

		const usernameRegex = /^[A-Za-z][A-Za-z0-9]*$/;
		if (!usernameRegex.test(username)) {
			toast.error('Username must start with an alphabet and contain only alphabets and numbers!');
			setLoading(false);
			return;
		}

		// Validate email format
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			toast.error('Please enter a valid email address!');
			setLoading(false);
			return;
		}

		if (password?.length > 18 || confirmPassword?.length > 18) {
			toast.error('Password too long! Please keep it under 18 characters.');
			setLoading(false);
			return;
		}

		try {
			// make sure the passwords match
			if (password !== confirmPassword) {
				toast.error('Passwords do not match!');
				setLoading(false);
				return;
			}

			// send the data to the server
			const axiosRes = await axiosPost('/api/user/create', {
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				email: email.trim(),
				username: username.trim(),
				password: password.trim(),
				role,
			});

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
				toast.success('User created successfully!');
				setLoading(false);
				window.location.href = '/users';
			} else {
				toast.error(axiosRes?.data?.msg || 'Failed to create user!');
				setLoading(false);
			}
		} catch (error) {
			toast.error('Failed to create user!');
			setLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-4">
			<h1 className="text-2xl font-semibold mb-6 text-center">Add a User</h1>
			<form onSubmit={e => handleSubmit(e)}>
				<div className="mb-6">
					<label className="block text-[#44475B] font-medium mb-2">Enter name *</label>
					<div className="grid grid-cols-2 gap-4">
						<Input
							type="text"
							required
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
							placeholder="First name"
							className="w-full -mt-2"
						/>
						<Input
							type="text"
							value={lastName}
							onChange={e => setLastName(e.target.value)}
							required
							placeholder="Last name"
							className="w-full -mt-2"
						/>
					</div>
				</div>

				<div className="mb-6">
					<label className="block text-base mb-3 font-medium leading-6 text-[#44475B]">
						Enter the email *
					</label>
					<InputWithCharacterCounter
						maxLength={63}
						value={email}
						type="email"
						required
						onChange={e => setEmail(e.target.value)}
						placeholder="email@domain.com"
					/>
				</div>

				<div className="mb-6">
					<label className="block text-base mb-3 font-medium leading-6 text-[#44475B]">
						Enter username *
					</label>
					<InputWithCharacterCounter
						maxLength={63}
						value={username}
						required
						onChange={e => setUsername(e.target.value)}
						placeholder="username"
					/>
				</div>

				<div className="grid grid-cols-2 gap-4 mb-6">
					<div>
						<label className="block text-base mb-3 font-medium leading-6 text-[#44475B]">
							Set a password *
						</label>
						<InputPassword value={password} onChange={e => setPassword(e.target.value)} required />
					</div>
					<div>
						<label className="block text-base mb-3 font-medium leading-6 text-[#44475B]">
							Confirm password *
						</label>
						<InputPassword
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
				</div>

				<div className="mb-6 flex items-center justify-between ">
					<label className="mr-4 flex-shrink-0 block text-base  font-medium leading-6 text-[#44475B]">
						Set a specific role for them *
					</label>

					<Select className="flex-grow" value={role} onValueChange={(value: string) => setRole(value)}>
						<SelectTrigger className="max-w-[180px] border border-[#C4C7E3] rounded-[8px]">
							<SelectValue placeholder="Select role" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{/* <SelectLabel>Fruits</SelectLabel> */}
								<SelectItem value="admin">Admin</SelectItem>
								<SelectItem value="moderator">Moderator</SelectItem>
								<SelectItem value="member">Member</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				{/* <div className="mb-4">
					<label className="block mb-2">Add members to your groups (optional)</label>
					<MultiSelectInput
						options={[
							{ value: 'admin', label: 'Admin' },
							{ value: 'editors', label: 'Editors' },
							{ value: 'creators', label: 'Creators' },
							{ value: 'viewers', label: 'Viewers' },
						]}
					/>
				</div> */}
				<div className="mb-4 flex justify-center gap-2">
					<Link href={'/users'}>
						<Button type="button" className="bg-white text-black p-6 rounded-[8px]">
							<ArrowLeftIcon className="mr-2 h-4 w-4" />
							Back
						</Button>
					</Link>
					<Button
						type="submit"
						className={
							'w-[124px] h-[48px] text-base font-medium rounded-[8px] text-white bg-[#298DFF] hover:bg-blue-700'
						}>
						{loading ? (
							<>
								<Spinner className="w-6 h-6 mr-2" />
							</>
						) : (
							<span>Add user</span>
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
