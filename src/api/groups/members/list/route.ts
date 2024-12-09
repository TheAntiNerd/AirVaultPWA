import { UserRole } from '@/data/allowedRoles';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
	let success = false,
		msg = '',
		list: { username: string; role: string }[] = [];
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
			msg = "You don't have permission to list group members!";
			throw new Error(msg);
		}

		const requestJson = await request.json();
		const groupName = z.string().min(1).safeParse(requestJson?.groupName)?.success ? requestJson?.groupName : '';

		if (!groupName) {
			msg = 'Group name is required!';
			throw new Error(msg);
		}

		// get the list from the database
		const membersList = await sqlAsync.allAsync(
			`SELECT u.username, u.role FROM ${tableNames.userGroupRelation} ugr LEFT JOIN ${tableNames.users} u ON ugr.username = u.username WHERE ugr.group_name = ? ORDER BY ugr.created_at DESC`,
			[groupName]
		);
		if (!membersList) {
			success = true;
			msg = 'No members found! Please add some members first.';
			return;
		}

		list = membersList?.map(group => ({
			username: group?.username || '',
			role: group?.role || '',
		}));

		// return the list
		success = true;
		msg = 'Successfully fetched group list!';
	} catch (error) {
		console.error('An error has occurred while fetching the group members! Error ->', error);
		msg = msg || "Couldn't fetch the group list!";
	} finally {
		return NextResponse.json({ success, msg, list });
	}
}
