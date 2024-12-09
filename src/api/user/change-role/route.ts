import { UserRole } from '@/data/allowedRoles';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import canPerformAction from '@/functions/users/canPerformAction';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextResponse) {
	let success = false,
		msg = '';
	try {
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
			msg = "You don't have permission to check for updates!";
			throw new Error(msg);
		}

		// change the role
		const requestJson = await request.json();
		const username = z.string().min(1).safeParse(requestJson?.username)?.success ? requestJson?.username : '';
		const role = z.string().min(1).safeParse(requestJson?.role)?.success ? requestJson?.role : '';

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

		// only a higher or same authority can remove a user
		if (!canPerformAction(user_role, target_user_role)) {
			msg = "You don't have permission to remove this user!";
			throw new Error(msg);
		}

		if (!username) {
			msg = 'Please provide a valid username!';
			throw new Error(msg);
		}
		if (!role || (role !== UserRole.ADMIN && role !== UserRole.MODERATOR && role !== UserRole.MEMBER)) {
			msg = 'Please provide a valid user role!';
			throw new Error(msg);
		}

		if (target_user_role === UserRole.OWNER) {
			msg = 'You cannot change the role of the owner!';
			throw new Error(msg);
		}

		await sqlAsync.runAsync(`UPDATE ${tableNames.users} SET role = ? WHERE username = ?`, [role, username]);

		success = true;
		msg = 'Successfully updated user role!';
	} catch (error) {
		console.error(`An error has occurred while changing the role of a user! Error: `, error);
		msg = msg || 'Failed to update user role!';
	} finally {
		return NextResponse.json({ success, msg });
	}
}
