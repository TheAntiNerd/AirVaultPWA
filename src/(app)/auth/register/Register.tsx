'use client';

import axiosPost from '@/functions/axios/axiosPost';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			// confirm that the passwords are the same & email, names and username are valid
			if (confirmPassword !== password) toast.error("Passwords don't match!");

			// send the values to a signup route
			const axiosRes = await axiosPost('/api/signup', {
				email,
				username,
				firstName,
				lastName,
				password,
			});

			if (axiosRes && axiosRes.status === 200 && axiosRes.data?.success === true) {
				toast.success('New account created!');

				// login the user with the username and password
				const res = await signIn('credentials', {
					username: username,
					password: password,
					redirect: false,
				});

				if (res?.ok === true) {
					// check if the device is registered
					const axiosSetupStatus = await axiosPost('/api/setup/status');
					if (
						axiosSetupStatus &&
						axiosSetupStatus.status === 200 &&
						axiosSetupStatus.data?.success === true
					) {
						if (axiosSetupStatus.data?.registered === true) {
							window.location.href = '/dashboard';
						} else {
							window.location.href = '/setup'; // send the user to the setup page
						}
					}
				} else {
					toast.error(res?.error || 'Unable to login!');
				}
			} else {
				toast.error(axiosRes?.data?.msg || "Couldn't create user account!");
			}
		} catch (error) {
			toast.error(`Something bad has happened when creating a user account! :(`);
			console.error('Error while signing up user! Error -> ', error);
		}
	};

	return (
		<>
			<div className="flex flex-col w-full h-lvh justify-center items-center">
				<h1 className="text-4xl font-semibold mb-4">Sign up</h1>
				<form onSubmit={e => handleRegister(e)} className="flex flex-col w-full max-w-md mx-auto gap-2 mb-4">
					<input
						type="text"
						className="border border-gray-300 rounded p-2 outline-none"
						placeholder="Username"
						required
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<input
						type="text"
						className="border border-gray-300 rounded p-2 outline-none"
						placeholder="Email"
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<div className="grid grid-cols-2 gap-2 w-full">
						<input
							type="text"
							className="border border-gray-300 rounded p-2 outline-none"
							placeholder="First Name"
							required
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
						/>
						<input
							type="text"
							className="border border-gray-300 rounded p-2 outline-none"
							placeholder="Last Name"
							required
							value={lastName}
							onChange={e => setLastName(e.target.value)}
						/>
					</div>
					<input
						type="password"
						className="border border-gray-300 rounded p-2 outline-none"
						placeholder="Password"
						required
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<input
						type="password"
						className="border border-gray-300 rounded p-2 outline-none"
						placeholder="Confirm Password"
						required
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					/>
					<button type="submit" className="bg-blue-500 text-white p-2 rounded outline-none">
						Login
					</button>
				</form>
				{/* <p className="text-sm text-gray-500">
					Already have an account?{' '}
					<Link href="/auth/login" className="text-blue-500">
						Login
					</Link>
				</p> */}
			</div>
		</>
	);
}
