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
			msg = "You don't have permission to delete group!";
			throw new Error(msg);
		}

		// check if the user has permission to do this
		if (user_role !== UserRole.OWNER && user_role !== UserRole.ADMIN && user_role !== UserRole.MODERATOR) {
			msg = "You don't have permission to create a group!";
			throw new Error(msg);
		}

		const responseJson = await request.json();
		const groupName = z.string().safeParse(responseJson?.groupName).success ? responseJson?.groupName : '';

		// check if the group exists in the database
		const groupRes = await sqlAsync.getAsync(`SELECT * FROM ${tableNames.groups} WHERE group_name = ?`, groupName);
		if (!groupRes) {
			msg = 'Group does not exist!';
			throw new Error(msg);
		}

		// Delete the group from the Linux system
		const axiosRes = await axiosPost(`${MAIN_URL}/api/identity/group/delete`, { group_name: groupName });

		// Delete the group from the database
		await sqlAsync.runAsync(`DELETE FROM ${tableNames.userGroupRelation} WHERE group_name = ?`, [groupName]);
		await sqlAsync.runAsync(`DELETE FROM ${tableNames.groups} WHERE group_name = ?`, [groupName]);

		// return the list
		success = true;

		msg = success ? 'Successfully deleted group!' : "Couldn't delete the group!";
	} catch (error) {
		console.error('An error has occurred while deleting the group! Error ->', error);
		msg = msg || "Couldn't delete the group!";
	} finally {
		return NextResponse.json({ success, msg });
	}
}
