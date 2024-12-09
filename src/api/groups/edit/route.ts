import { UserRole } from '@/data/allowedRoles';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
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
			msg = "You don't have permission to edit group!";
			throw new Error(msg);
		}

		const responseJson = await request.json();
		const groupName = z.string().safeParse(responseJson?.groupName).success ? responseJson?.groupName : '';
		const newGroupName = z.string().safeParse(responseJson?.newGroupName).success ? responseJson?.newGroupName : '';

		// check if the group exists in the database
		const groupRes = await sqlAsync.getAsync(`SELECT * FROM ${tableNames.groups} WHERE group_name = ?`, groupName);
		if (!groupRes) {
			msg = 'Group does not exist!';
			throw new Error(msg);
		}

		// Edit the name of the group in the Linux system
		// -> code here <-

		// Edit the name of the group in the database

		await sqlAsync.sqliteDb.transaction(async tx => {
			await tx
				.prepare(`UPDATE ${tableNames.userGroupRelation} SET group_name = ? WHERE group_name = ?;`, [
					newGroupName,
					groupName,
				])
				.run();
			await tx
				.prepare(`UPDATE ${tableNames.groups} SET group_name = ? WHERE group_name = ?;`, [
					newGroupName,
					groupName,
				])
				.run();
		});

		// return the list
		success = true;
		msg = 'Successfully edited group name!';
	} catch (error) {
		console.error('An error has occurred while editing the group name! Error ->', error);
		msg = msg || "Couldn't edit the group name!";
	} finally {
		return NextResponse.json({ success, msg });
	}
}
