import { UserRole } from '@/data/allowedRoles';
import { MAIN_URL } from '@/data/env';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import axiosPost from '@/functions/axios/axiosPost';
import hashPassword from '@/functions/passwords/hashPassword';
import canPerformAction from '@/functions/users/canPerformAction';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
	let success = false,
		msg = '';
	try {
		// check if the user is logged in here
		// check if the user is logged in here
		const userSession = await getServerSession(authOptions);
		const userObj = userSession?.user,
			email = userObj?.email;

		if (!userObj || !email) {
			msg = 'Please login to continue!';
			throw new Error(msg);
		}

		// -> Get the role of the logged in user <-
		const sqlRes = await sqlAsync.getAsync(`SELECT * FROM ${tableNames.users} WHERE email = ?`, email);
		if (!sqlRes) {
			msg = 'Logged in user not found!';
			throw new Error(msg);
		}

		const user_role = sqlRes?.role || '';

		const requestJson = await request.json();
		const username = z.string().safeParse(requestJson?.username).success ? requestJson?.username : '';
		const firstName = z.string().safeParse(requestJson?.firstName).success ? requestJson?.firstName : '';
		const lastName = z.string().safeParse(requestJson?.lastName).success ? requestJson?.lastName : '';
		const password = z.string().max(18).safeParse(requestJson?.password).success ? requestJson?.password : '';
		const new_password = z.string().max(18).safeParse(requestJson?.new_password).success
			? requestJson?.new_password
			: '';

		if (!username) {
			msg = 'Username is required!';
			throw new Error(msg);
		}

		// make sure that only the admin or mod can edit user data
		if (user_role !== UserRole.OWNER && user_role !== UserRole.ADMIN && user_role !== UserRole.MODERATOR) {
			msg = "You don't have permission to edit user data!";
			throw new Error(msg);
		}

		// check if the user exists in the database
		const userData = await sqlAsync.getAsync(`SELECT username, role FROM ${tableNames.users} WHERE username = ?`, [
			username,
		]);
		let target_user_role = '';

		if (!userData) {
			msg = "Couldn't find the user!";
			throw new Error(msg);
		}

		target_user_role = userData?.role;

		// only a higher authority can remove a user
		if (!canPerformAction(user_role, target_user_role) && username !== sqlRes?.username) {
			msg = "You don't have permission to edit this user!";
			throw new Error(msg);
		}

		// edit the user data
		if (firstName) {
			await sqlAsync.runAsync(`UPDATE ${tableNames.users} SET first_name = ? WHERE username = ?`, [
				firstName,
				username,
			]);
		}
		if (lastName) {
			await sqlAsync.runAsync(`UPDATE ${tableNames.users} SET last_name = ? WHERE username = ?`, [
				lastName,
				username,
			]);
		}
		if (new_password) {
			const hashed_password = await hashPassword(new_password);
			await sqlAsync.runAsync(`UPDATE ${tableNames.users} SET password = ? WHERE username = ?`, [
				hashed_password,
				username,
			]);

			// update the SMB password of the user
			const axiosRes = await axiosPost(`${MAIN_URL}/api/service/smb/change-password`, {
				username: username,
				new_password: new_password,
			});

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
				// success
				console.log('Successfully changed SMB password! Res: ', axiosRes?.data);
			} else {
				console.error('Failed to update the SMB password of the user!');
			}
		}

		// respond
		success = true;
		msg = 'Successfully edited the user!';
	} catch (error) {
		console.error('An error has occurred while editing the user! Error ->', error);
		msg = msg || "Couldn't edit the user!";
	} finally {
		return NextResponse.json({ success, msg });
	}
}
