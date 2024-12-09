import allowedRoles from '@/data/allowedRoles';
import { MAIN_URL } from '@/data/env';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import axiosPost from '@/functions/axios/axiosPost';
import hashPassword from '@/functions/passwords/hashPassword';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
	let success = false,
		msg = '';
	try {
		// check if the user is logged in here
		const userSession = await getServerSession(authOptions);
		const userObj = userSession?.user;

		if (!userObj) {
			msg = 'Please login to continue!';
			throw new Error(msg);
		}

		// get the body of the request
		const responseJson = await request.json();
		const firstName = responseJson.firstName?.trim();
		const lastName = responseJson.lastName?.trim();
		const email = responseJson.email?.trim();
		const username = responseJson.username?.trim();
		const password = responseJson.password?.trim();
		const role = responseJson.role?.trim();

		// verify that the count is within the constraints
		if (
			z.string().min(1).max(63).safeParse(firstName).success === false ||
			z.string().min(1).max(63).safeParse(lastName).success === false ||
			z.string().email().max(63).safeParse(email).success === false ||
			z.string().min(1).max(63).safeParse(username).success === false
		) {
			msg = 'Invalid input! Please enter correct details!';
			throw new Error(msg);
		}

		// check username contains only alphabets and numbers and starts with alphabet and nothing else
		const usernameRegex = /^[A-Za-z][A-Za-z0-9]*$/;
		if (!usernameRegex.test(username)) {
			msg = 'Invalid username!';
			throw new Error(msg);
		}

		if (z.string().min(1).max(18).safeParse(password).success === false) {
			msg = 'Password too long!';
			throw new Error(msg);
		}

		// make sure that the role is valid
		if (!allowedRoles.includes(role) || role === 'owner') {
			msg = 'Invalid role provided!';
			throw new Error(msg);
		}

		// make sure that the email and username doesn't exist in the database
		const sqlRes = await sqlAsync.getAsync(`SELECT * FROM ${tableNames.users} WHERE email = ? OR username = ?`, [
			email,
			username,
		]);
		if (sqlRes) {
			msg = `Username or email already taken!`;
			throw new Error(msg);
		}

		// check if user exists in the linux system
		const linuxRes = await axiosPost(`${MAIN_URL}/api/identity/user/check`, {
			username,
		});
		if (!linuxRes || linuxRes?.data?.exists) {
			msg = `Username already taken!`;
			throw new Error(msg);
		}

		// else signup the user
		const hashed_password = await hashPassword(password);

		await sqlAsync.runAsync(
			`INSERT INTO ${tableNames.users} (username, email, password, first_name, last_name, role, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[username, email, hashed_password, firstName, lastName, role, Date.now()]
		);

		// create a linux user with the same username
		const linuxRes2 = await axiosPost(`${MAIN_URL}/api/identity/user/create`, {
			username,
		});
		if (linuxRes2 && linuxRes2?.data?.success) {
			success = true;
			msg = 'Successfully created user!';
		} else {
			// delete the user from the database if linux user creation failed
			await sqlAsync.runAsync(`DELETE FROM ${tableNames.users} WHERE username = ?`, [username]);

			msg = linuxRes2?.data?.message || 'Failed to create linux user!';
			throw new Error(msg);
		}

		// create the SMB password for the user
		// update the SMB password of the user
		const axiosRes = await axiosPost(`${MAIN_URL}/api/service/smb/change-password`, {
			username: username,
			new_password: password,
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			// success
			console.log('Successfully changed SMB password! Res: ', axiosRes?.data);
		} else {
			console.error('Failed to update the SMB password of the user!');
		}
	} catch (error) {
		console.error('An error has occurred while creating a new user! Error ->', error);
		msg = msg || "Couldn't signup the user!";
	} finally {
		return NextResponse.json({
			success,
			msg,
		});
	}
}
