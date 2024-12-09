'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			// login the user with the username and password
			const res = await signIn('credentials', {
				username: username,
				password: password,
				redirect: false,
			});

			// if login success, send to dashboard, or show error
			console.log(res);
			if (res?.ok === true) {
				window.location.href = '/dashboard';
			} else {
				toast.error(res?.error || 'Unable to login!');
			}
		} catch (error) {
			console.log(error);
			toast.error('Invalid credentials!');
		}
	};

	return (
		<>
			<div className="flex flex-col w-full h-lvh justify-center items-center">
				<h1 className="text-4xl font-semibold mb-4">Login</h1>
				<form onSubmit={e => handleLogin(e)} className="flex flex-col w-full max-w-md mx-auto gap-2 mb-4">
					<input
						type="text"
						className="border border-gray-300 rounded p-2 outline-none"
						placeholder="Username"
						required
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<input
						type="password"
						className="border border-gray-300 rounded p-2 outline-none"
						placeholder="Password"
						required
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<button type="submit" className="bg-blue-500 text-white p-2 rounded outline-none">
						Login
					</button>
				</form>

				<Link href="/auth/forgot-password" className="text-blue-500 font-medium text-sm">
					Forgot password?
				</Link>

				{/* <p className="text-sm text-gray-500">
					Don't have an account?{' '}
					<Link href="/auth/register" className="text-blue-500">
						Register
					</Link>
				</p> */}
			</div>
		</>
	);
}
