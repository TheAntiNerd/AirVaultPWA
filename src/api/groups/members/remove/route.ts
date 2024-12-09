import { UserRole } from '@/data/allowedRoles';
import { MAIN_URL } from '@/data/env';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import axiosPost from '@/functions/axios/axiosPost';
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
		const userObj = userSession?.user,
			email = userObj?.email;

		if (!userObj || !email) {
			msg = 'Please login to continue!';
			throw new Error(msg);
		}

		// -> Get the role of the logged in user <-
		const sqlRes1 = await sqlAsync.getAsync(`SELECT * FROM ${tableNames.users} WHERE email = ?`, email);
		if (!sqlRes1) {
			msg = 'Logged in user not found!';
			throw new Error(msg);
		}

		const user_role = sqlRes1?.role || '';

		// make sure that only the admin or mod can edit user data
		if (user_role !== UserRole.OWNER && user_role !== UserRole.ADMIN && user_role !== UserRole.MODERATOR) {
			msg = "You don't have permission to remove group members!";
			throw new Error(msg);
		}

		const requestJson = await request.json();
		const groupName = z.string().min(1).safeParse(requestJson?.groupName)?.success ? requestJson?.groupName : '';
		const username = z.string().min(1).safeParse(requestJson?.username)?.success ? requestJson?.username : '';

		if (!groupName) {
			msg = 'Group name is required!';
			throw new Error(msg);
		}

		if (!username) {
			msg = 'Username is required!';
			throw new Error(msg);
		}

		// remove the user from the group in the linux system
		const axiosRes = await axiosPost(`${MAIN_URL}/api/identity/group/remove-user`, {
			username,
			group_name: groupName,
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			// remove the user from the group in the database
			await sqlAsync.runAsync(
				`DELETE FROM ${tableNames.userGroupRelation} WHERE group_name = ? AND username = ?`,
				[groupName, username]
			);

			// return the list
			success = true;
		}

		msg = success ? 'Successfully removed user from group!' : "Couldn't remove the user from the group!";
	} catch (error) {
		console.error('An error has occurred while removing a user from a group! Error ->', error);
		msg = msg || "Couldn't remove the user from the group!";
	} finally {
		return NextResponse.json({ success, msg });
	}
}
