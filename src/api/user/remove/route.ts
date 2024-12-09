import { UserRole } from '@/data/allowedRoles';
import { MAIN_URL } from '@/data/env';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import axiosPost from '@/functions/axios/axiosPost';
import canPerformAction from '@/functions/users/canPerformAction';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

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
		const sqlRes = await sqlAsync.getAsync(`SELECT * FROM ${tableNames.users} WHERE email = ?`, email);
		if (!sqlRes) {
			msg = 'Logged in user not found!';
			throw new Error(msg);
		}

		const user_role = sqlRes?.role || '';

		const requestJson = await request.json();
		const username = requestJson?.username;

		// make sure that only the admin or mod can remove users
		if (user_role !== UserRole.OWNER && user_role !== UserRole.ADMIN && user_role !== UserRole.MODERATOR) {
			msg = "You don't have permission to remove users!";
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

		// only a higher or same authority can remove a user
		if (!canPerformAction(user_role, target_user_role)) {
			msg = "You don't have permission to remove this user!";
			throw new Error(msg);
		}

		// remove the user
		const axiosRes = await axiosPost(`${MAIN_URL}/api/identity/user/delete`, { username });

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
		}

		// remove the user from the database
		await sqlAsync.runAsync(`DELETE FROM ${tableNames.userGroupRelation} WHERE username = ?`, [username]);
		await sqlAsync.runAsync(`DELETE FROM ${tableNames.users} WHERE username = ?`, [username]);

		// respond
		success = true;
		msg = success ? 'Successfully removed the user!' : "Couldn't remove the user!";
	} catch (error) {
		console.error('An error has occurred while removing the user! Error ->', error);
		msg = msg || "Couldn't remove the user!";
	} finally {
		return NextResponse.json({ success, msg });
	}
}
