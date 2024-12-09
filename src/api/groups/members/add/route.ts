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
			msg = "You don't have permission to add members to group!";
			throw new Error(msg);
		}

		const requestJson = await request.json();
		const groupName = z.string().min(1).safeParse(requestJson?.groupName)?.success ? requestJson?.groupName : '';
		const usernames = z.string().array().safeParse(requestJson?.usernames)?.success ? requestJson?.usernames : [];

		console.log({ usernames, groupName });

		if (!groupName) {
			msg = 'Group name is required!';
			throw new Error(msg);
		}

		if (usernames?.length === 0) {
			msg = 'No members provided!';
			throw new Error(msg);
		}

		// add the members to the group in the database
		const now = Date.now();
		for (const username of usernames) {
			// add the members to the group on linux
			const axiosRes = await axiosPost(`${MAIN_URL}/api/identity/group/add-user`, {
				username,
				group_name: groupName,
			});

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
				// add the entry to the group list
				await sqlAsync.runAsync(
					`INSERT INTO ${tableNames.userGroupRelation} (group_name, username, created_at)
					VALUES (?, ?, ?)
					ON CONFLICT(group_name, username) DO NOTHING
				`,
					[groupName, username, now]
				);

				success = true;
			}
		}

		// return the list
		msg = success ? 'Successfully added members to the group!' : "Couldn't add members to the group!";
	} catch (error) {
		console.error('An error has occurred while adding members to the group! Error ->', error);
		msg = msg || "Couldn't add members to the group!";
	} finally {
		return NextResponse.json({ success, msg });
	}
}
